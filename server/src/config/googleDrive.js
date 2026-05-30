const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

let driveClient = null;

const getDriveFolderId = () => {
  let folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (folderId && folderId.includes('folders/')) {
    folderId = folderId.split('folders/')[1].split('?')[0];
    console.log(`[Google Drive API] Parsed folder ID from URL: ${folderId}`);
  }

  return folderId;
};

/**
 * Initializes the Google Drive client based on available environment variables.
 * Supports Service Account JWT and OAuth2 refresh tokens.
 * Gracefully falls back to null if no valid credentials exist (triggers Mock Mode).
 */
const getDriveClient = () => {
  if (driveClient !== null) {
    return driveClient;
  }

  const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
  const serviceAccountEmail = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_EMAIL;
  let serviceAccountPrivateKey = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const serviceAccountSubject = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT;
  const authMethod = (process.env.GOOGLE_DRIVE_AUTH_METHOD || 'auto').toLowerCase();

  if (serviceAccountPrivateKey) {
    // Standard service account key cleanup (replacing escaped newlines)
    serviceAccountPrivateKey = serviceAccountPrivateKey.replace(/\\n/g, '\n');
  }

  const canUseOAuth = clientId && clientSecret && refreshToken;
  const canUseServiceAccount = serviceAccountEmail && serviceAccountPrivateKey;

  try {
    if (authMethod === 'oauth') {
      if (!canUseOAuth) {
        throw new Error('Google Drive auth method is set to OAuth, but OAuth credentials are missing');
      }
      console.log('[Google Drive Auth] Initializing using OAuth2 Web App credentials...');
      const auth = new google.auth.OAuth2({ clientId, clientSecret });
      auth.setCredentials({ refresh_token: refreshToken });
      driveClient = google.drive({ version: 'v3', auth });
      return driveClient;
    }

    if (authMethod === 'service-account') {
      if (!canUseServiceAccount) {
        throw new Error('Google Drive auth method is set to Service Account, but service account credentials are missing');
      }
      console.log('[Google Drive Auth] Initializing using Service Account credentials...');
      const authOptions = {
        email: serviceAccountEmail,
        key: serviceAccountPrivateKey,
        scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive']
      };
      if (serviceAccountSubject) {
        authOptions.subject = serviceAccountSubject;
        console.log(`[Google Drive Auth] Using delegated service account subject: ${serviceAccountSubject}`);
      }
      const auth = new google.auth.JWT(authOptions);
      driveClient = google.drive({ version: 'v3', auth });
      return driveClient;
    }

    if (authMethod === 'auto') {
      if (canUseOAuth) {
        console.log('[Google Drive Auth] Initializing using OAuth2 Web App credentials...');
        const auth = new google.auth.OAuth2({ clientId, clientSecret });
        auth.setCredentials({ refresh_token: refreshToken });
        driveClient = google.drive({ version: 'v3', auth });
        return driveClient;
      }
      if (canUseServiceAccount) {
        console.log('[Google Drive Auth] Initializing using Service Account credentials...');
        const authOptions = {
          email: serviceAccountEmail,
          key: serviceAccountPrivateKey,
          scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive']
        };
        if (serviceAccountSubject) {
          authOptions.subject = serviceAccountSubject;
          console.log(`[Google Drive Auth] Using delegated service account subject: ${serviceAccountSubject}`);
        }
        const auth = new google.auth.JWT(authOptions);
        driveClient = google.drive({ version: 'v3', auth });
        return driveClient;
      }
    }
  } catch (err) {
    console.error('[Google Drive Auth Error] Failed to initialize API Client:', err.message);
  }

  console.log('[Google Drive] No valid credentials found. Falling back to local/MOCK Uploads.');
  driveClient = false; // explicitly mark as false to indicate mock fallback
  return null;
};

/**
 * Uploads a file with retry logic and timeout handling
 * @param {Object} drive - Google Drive client
 * @param {Object} fileMetadata - File metadata
 * @param {Object} media - Media object with stream
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} timeoutMs - Timeout per attempt in milliseconds
 * @returns {Promise<Object>} Upload response
 */
const uploadWithRetry = async (drive, fileMetadata, media, maxRetries = 3, timeoutMs = 60000) => {
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Google Drive API] Upload attempt ${attempt}/${maxRetries}...`);

      // Create a new stream for each attempt (previous one may be consumed)
      const filePath = media.body.path;
      const newStream = fs.createReadStream(filePath);

      const uploadPromise = drive.files.create({
        resource: fileMetadata,
        media: {
          mimeType: media.mimeType,
          body: newStream
        },
        fields: 'id, name, webViewLink, webContentLink, thumbnailLink',
        supportsAllDrives: true
        , uploadType: 'resumable'
      });

      // Implement timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Upload timeout after ${timeoutMs}ms`)), timeoutMs)
      );

      const result = await Promise.race([uploadPromise, timeoutPromise]);
      console.log(`[Google Drive API] Upload successful on attempt ${attempt}`);
      return result;

    } catch (error) {
      lastError = error;
      console.error(`[Google Drive API] Upload attempt ${attempt} failed:`, error.message);

      // Check if error is retryable
      const isRetryable = error.message?.includes('ECONNRESET') ||
        error.message?.includes('ETIMEDOUT') ||
        error.message?.includes('timeout') ||
        error.code === 'ECONNRESET' ||
        error.code === 'ETIMEDOUT';

      if (!isRetryable || attempt === maxRetries) {
        console.error(`[Google Drive API] Giving up after attempt ${attempt}`);
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
      console.log(`[Google Drive API] Retrying in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError || new Error('Upload failed after all retry attempts');
};

/**
 * Uploads a file to Google Drive (or mock local folder if API credentials are not set).
 * Sets file sharing permissions to "anyone with the link can view".
 * @param {string} filePath - Absolute path to the local temporary file
 * @param {string} fileName - File name to save as in Drive
 * @param {string} mimeType - File mimetype
 * @returns {Promise<{fileId: string, viewLink: string, thumbnailLink: string, isMock: boolean}>}
 */
const uploadFileToDrive = async (filePath, fileName, mimeType) => {
  const drive = getDriveClient();

  if (!drive) {
    // MOCK MODE: Copy the file to the local uploads directory to serve it statically
    console.log(`[Google Drive Mock] Processing upload for: ${fileName}`);
    const uploadsDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const destPath = path.join(uploadsDir, fileName);
    fs.copyFileSync(filePath, destPath);

    return {
      fileId: `mock_drive_file_${Date.now()}`,
      viewLink: `/uploads/${fileName}`,
      thumbnailLink: '/default-video-thumb.jpg',
      isMock: true
    };
  }

  try {
    const folderId = getDriveFolderId();

    const uploadTimeoutMs = Number(process.env.GOOGLE_DRIVE_UPLOAD_TIMEOUT_MS) || 180000;

    const fileMetadata = {
      name: fileName,
      parents: folderId ? [folderId] : []
    };

    // Get file size for better error reporting
    const fileStats = fs.statSync(filePath);
    const fileSizeInMB = (fileStats.size / (1024 * 1024)).toFixed(2);
    console.log(`[Google Drive API] File size: ${fileSizeInMB} MB`);

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath)
    };

    console.log(`[Google Drive API] Initiating file upload for: ${fileName}...`);

    // Create upload request with timeout and retry logic
    const file = await uploadWithRetry(
      drive,
      fileMetadata,
      media,
      3, // max retries
      uploadTimeoutMs // timeout per attempt in ms
    );

    const fileId = file.data.id;
    console.log(`[Google Drive API] File created successfully. File ID: ${fileId}. Setting permissions...`);

    // Grant public view permission (anyone with the link can view) so it can play in the iframe
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      },
      supportsAllDrives: true
    });

    return {
      fileId: fileId,
      viewLink: file.data.webViewLink,
      contentLink: file.data.webContentLink,
      thumbnailLink: file.data.thumbnailLink || null,
      isMock: false
    };
  } catch (error) {
    console.error('[Google Drive API Upload Error]', error.message);
    if (error.message && error.message.includes('Service Accounts do not have storage quota')) {
      console.error(
        '[Google Drive API Upload Error] Set GOOGLE_DRIVE_FOLDER_ID to a folder in a shared drive ' +
        'and add the service account as a member of that shared drive/folder.'
      );
      console.error(
        '[Google Drive API Upload Error] If you are using OAuth delegation, set GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT to the user email ' +
        'that has access to the shared drive.'
      );
    }
    throw error;
  }
};

/**
 * Deletes a file from Google Drive (or deletes local mock copy).
 * @param {string} fileId - The Google Drive file ID or mock file ID
 * @param {string} [localFileName] - The file name for mock deletion fallback
 * @returns {Promise<{success: boolean, isMock: boolean}>}
 */
const deleteFileFromDrive = async (fileId, localFileName) => {
  const drive = getDriveClient();

  if (!drive || fileId.startsWith('mock_drive_file_')) {
    console.log(`[Google Drive Mock] Processing delete for: ${fileId}`);
    if (localFileName) {
      const filePath = path.join(__dirname, '../../uploads', localFileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`[Google Drive Mock] Deleted local file: ${filePath}`);
      }
    }
    return { success: true, isMock: true };
  }

  try {
    console.log(`[Google Drive API] Initiating delete for file ID: ${fileId}`);
    await drive.files.delete({ fileId, supportsAllDrives: true });
    return { success: true, isMock: false };
  } catch (error) {
    console.error('[Google Drive API Delete Error]', error);
    throw error;
  }
};

module.exports = {
  getDriveClient,
  uploadFileToDrive,
  deleteFileFromDrive
};
