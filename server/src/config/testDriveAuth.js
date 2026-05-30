const dotenv = require('dotenv');
const path = require('path');
const { google } = require('googleapis');

// Load .env from server directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

const serviceAccountEmail = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_EMAIL;
let serviceAccountPrivateKey = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_PRIVATE_KEY;
const serviceAccountSubject = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_SUBJECT;

const getDriveFolderId = () => {
  let folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (folderId && folderId.includes('folders/')) {
    folderId = folderId.split('folders/')[1].split('?')[0];
  }

  return folderId;
};

console.log('=== Google Drive Auth Debug ===');
console.log('Service Account Email:', serviceAccountEmail || 'NOT SET');
console.log('Private Key Length:', serviceAccountPrivateKey ? serviceAccountPrivateKey.length : 0);

if (!serviceAccountEmail || !serviceAccountPrivateKey) {
  console.error('MISSING credentials! Check server/.env');
  process.exit(1);
}

// Strip surrounding quotes if present
if (serviceAccountPrivateKey.startsWith('"') && serviceAccountPrivateKey.endsWith('"')) {
  serviceAccountPrivateKey = serviceAccountPrivateKey.slice(1, -1);
  console.log('Stripped surrounding quotes from private key');
}

// Replace escaped newlines
serviceAccountPrivateKey = serviceAccountPrivateKey.replace(/\\n/g, '\n');

const hasBeginMarker = serviceAccountPrivateKey.includes('-----BEGIN PRIVATE KEY-----');
const hasEndMarker = serviceAccountPrivateKey.includes('-----END PRIVATE KEY-----');
console.log('Has BEGIN PRIVATE KEY marker:', hasBeginMarker);
console.log('Has END PRIVATE KEY marker:', hasEndMarker);

if (!hasBeginMarker || !hasEndMarker) {
  console.error('MALFORMED private key! The key markers are missing.');
  process.exit(1);
}

const testAuth = async () => {
  try {
    console.log('\nCreating JWT auth client...');
    const authOptions = {
      email: serviceAccountEmail,
      key: serviceAccountPrivateKey,
      scopes: ['https://www.googleapis.com/auth/drive']
    };
    if (serviceAccountSubject) {
      authOptions.subject = serviceAccountSubject;
      console.log(`Using delegated subject: ${serviceAccountSubject}`);
    }
    const auth = new google.auth.JWT(authOptions);

    console.log('Requesting access token from Google...');
    const tokenInfo = await auth.authorize();
    console.log('\n✅ SUCCESS! Access token obtained!');
    console.log('Token type:', tokenInfo.token_type);
    console.log('Expires at:', new Date(tokenInfo.expiry_date).toISOString());

    const drive = google.drive({ version: 'v3', auth });
    const folderId = getDriveFolderId();
    console.log('\nListing Drive files (top 3)...');
    console.log('Target Folder ID:', folderId || 'NOT SET');
    const res = await drive.files.list({
      pageSize: 3,
      fields: 'files(id, name)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      q: folderId ? `'${folderId}' in parents and trashed = false` : undefined
    });
    console.log('Files found:', res.data.files || []);
    console.log('\n✅ Google Drive API connection working!');
  } catch (error) {
    console.error('\n❌ Auth FAILED:', error.message);
    if (error.response) {
      console.error('HTTP Status:', error.response.status);
      console.error('Error data:', JSON.stringify(error.response.data, null, 2));
    }
    console.log('\n--- TROUBLESHOOTING ---');
    console.log('1. Enable Drive API: https://console.cloud.google.com/apis/library/drive.googleapis.com?project=attandance-system-480104');
    console.log('2. Set GOOGLE_DRIVE_FOLDER_ID to a folder in a shared drive');
    console.log('3. Add the service account as a member of that shared drive/folder');
  }
};

testAuth();
