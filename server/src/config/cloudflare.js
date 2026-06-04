const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

dotenv.config();

function getCloudflareConfig() {
  return {
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_R2_BUCKET: process.env.CLOUDFLARE_R2_BUCKET,
    CLOUDFLARE_R2_ACCESS_KEY_ID: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || process.env.Access_Key_ID,
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || process.env['Secret Access Key'],
  };
}

let s3Client = null;

function getS3Client() {
  if (s3Client) return s3Client;

  const {
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_R2_ACCESS_KEY_ID,
    CLOUDFLARE_R2_SECRET_ACCESS_KEY
  } = getCloudflareConfig();

  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_R2_ACCESS_KEY_ID || !CLOUDFLARE_R2_SECRET_ACCESS_KEY) {
    throw new Error('Cloudflare R2 is not fully configured. Set CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY_ID, and CLOUDFLARE_R2_SECRET_ACCESS_KEY.');
  }

  s3Client = new S3Client({
    endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
    region: 'auto',
    forcePathStyle: true,
  });

  return s3Client;
}

function getR2ObjectUrl(objectKey) {
  const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_R2_BUCKET } = getCloudflareConfig();
  const formattedKey = objectKey.split('/').map(encodeURIComponent).join('/');
  return `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${CLOUDFLARE_R2_BUCKET}/${formattedKey}`;
}

// ✅ Accepts Buffer (memoryStorage) or file path (legacy)
async function uploadFileToCloudflareR2(filePathOrBuffer, objectKey, contentType) {
  const { CLOUDFLARE_R2_BUCKET } = getCloudflareConfig();
  const client = getS3Client();

  const body = Buffer.isBuffer(filePathOrBuffer)
    ? filePathOrBuffer
    : fs.createReadStream(filePathOrBuffer);

  await client.send(new PutObjectCommand({
    Bucket: CLOUDFLARE_R2_BUCKET,
    Key: objectKey,
    Body: body,
    ContentType: contentType || 'application/octet-stream',
  }));

  return {
    objectKey,
    url: getR2ObjectUrl(objectKey),
  };
}

async function deleteFileFromCloudflareR2(objectKey) {
  const { CLOUDFLARE_R2_BUCKET } = getCloudflareConfig();
  const client = getS3Client();

  try {
    await client.send(new DeleteObjectCommand({
      Bucket: CLOUDFLARE_R2_BUCKET,
      Key: objectKey,
    }));
  } catch (error) {
    if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) {
      return true;
    }
    throw error;
  }

  return true;
}

/**
 * Generate a presigned PUT URL so the browser can upload directly to R2.
 * The file never passes through Railway — eliminates timeout issues entirely.
 *
 * @param {string} objectKey  - R2 object key (path inside the bucket)
 * @param {string} contentType - MIME type of the file being uploaded
 * @param {number} expiresIn   - Seconds until the URL expires (default 3600 = 1h)
 * @returns {{ uploadUrl: string, objectKey: string, publicUrl: string }}
 */
async function generatePresignedUploadUrl(objectKey, contentType, expiresIn = 3600) {
  const { CLOUDFLARE_R2_BUCKET } = getCloudflareConfig();
  const client = getS3Client();

  const command = new PutObjectCommand({
    Bucket: CLOUDFLARE_R2_BUCKET,
    Key: objectKey,
    ContentType: contentType || 'application/octet-stream',
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn });

  return {
    uploadUrl,
    objectKey,
    publicUrl: getR2ObjectUrl(objectKey),
  };
}

module.exports = {
  getR2ObjectUrl,
  uploadFileToCloudflareR2,
  deleteFileFromCloudflareR2,
  generatePresignedUploadUrl,
  getS3Client,
  fetchFn: typeof globalThis.fetch === 'function' ? globalThis.fetch.bind(globalThis) : null,
};