const admin = require('firebase-admin');

let _app = null;

function getFirebaseApp() {
  if (_app) return _app;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('[FCM] Firebase Admin SDK not configured — missing env vars. Push notifications disabled.');
    return null;
  }

  try {
    _app = admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
    console.log('[FCM] Firebase Admin SDK initialized successfully.');
  } catch (err) {
    console.error('[FCM] Failed to initialize Firebase Admin SDK:', err.message);
    _app = null;
  }

  return _app;
}

/**
 * Send a push notification to a list of FCM tokens.
 *
 * @param {string[]} tokens  — device FCM tokens
 * @param {object}   payload — { title, body, data }
 */
async function sendFCMNotification(tokens, { title, body, data = {} }) {
  const app = getFirebaseApp();
  if (!app) {
    console.warn('[FCM] Skipping push — Firebase not configured.');
    return { successCount: 0, failureCount: 0 };
  }

  if (!tokens || tokens.length === 0) {
    console.log('[FCM] No tokens provided — skipping push.');
    return { successCount: 0, failureCount: 0 };
  }

  // FCM allows max 500 tokens per multicast message
  const CHUNK_SIZE = 500;
  let successCount = 0;
  let failureCount = 0;
  const invalidTokens = [];

  for (let i = 0; i < tokens.length; i += CHUNK_SIZE) {
    const chunk = tokens.slice(i, i + CHUNK_SIZE);
    const message = {
      tokens: chunk,
      notification: { title, body },
      data: Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, String(v)])
      ),
      webpush: {
        notification: {
          title,
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          requireInteraction: true,
          actions: [
            { action: 'open', title: 'Join Class', icon: '/favicon.ico' }
          ],
        },
        fcmOptions: {
          link: data.click_action || '/',
        },
      },
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      successCount += response.successCount;
      failureCount += response.failureCount;

      // Collect invalid/expired tokens for cleanup
      response.responses.forEach((r, idx) => {
        if (!r.success) {
          const errCode = r.error?.code;
          if (
            errCode === 'messaging/invalid-registration-token' ||
            errCode === 'messaging/registration-token-not-registered'
          ) {
            invalidTokens.push(chunk[idx]);
          }
          console.warn(`[FCM] Token ${chunk[idx].slice(0, 20)}… failed: ${r.error?.message}`);
        }
      });
    } catch (err) {
      console.error('[FCM] Multicast error:', err.message);
      failureCount += chunk.length;
    }
  }

  console.log(`[FCM] Push sent: ${successCount} succeeded, ${failureCount} failed.`);
  return { successCount, failureCount, invalidTokens };
}

module.exports = { getFirebaseApp, sendFCMNotification };
