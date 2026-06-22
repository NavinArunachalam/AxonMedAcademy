// Firebase Messaging Service Worker
// IMPORTANT: This file must be at /public/firebase-messaging-sw.js
// so it is served from the root of the domain (required by Firebase).
//
// This service worker initialises Firebase using config values that are
// injected via a postMessage from the main thread (fcm.ts) after registration.
// Background push notifications are shown here; foreground messages are handled
// in fcm.ts via onMessage().

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

let messaging = null;

// ── Receive Firebase config from the main thread and initialize ───────────────
self.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'FIREBASE_CONFIG') return;
  if (messaging) return; // already initialized

  try {
    const config = event.data.config;
    if (!config || !config.projectId || !config.apiKey) {
      console.error('[SW] Invalid Firebase config received:', config);
      return;
    }

    const app = firebase.initializeApp(config);
    messaging = firebase.messaging(app);

    // Handle background push messages (app is closed or in background)
    messaging.onBackgroundMessage((payload) => {
      console.log('[SW] Background message received:', payload);

      const notification = payload.notification || {};
      const data = payload.data || {};

      const title = notification.title || '🔴 Live Class Started';
      const body = notification.body || 'Your live class is now available. Tap to join.';
      const roomId = data.roomId || '';
      const clickUrl = data.click_action || (roomId ? `${self.location.origin}/live/${roomId}` : self.location.origin);

      const options = {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: `live-class-${data.meetingId || Date.now()}`,
        requireInteraction: true,
        data: { clickUrl, roomId, meetingId: data.meetingId || '' },
        actions: [
          { action: 'join',    title: '▶ Join Class' },
          { action: 'dismiss', title: 'Dismiss' },
        ],
      };

      return self.registration.showNotification(title, options);
    });

    console.log('[SW] Firebase Messaging initialized successfully.');
  } catch (err) {
    // If Firebase is already initialized (hot reload), reuse the existing app
    if (err.code === 'app/duplicate-app') {
      try {
        messaging = firebase.messaging(firebase.app());
        console.log('[SW] Reusing existing Firebase app in service worker.');
      } catch (e2) {
        console.error('[SW] Could not reuse Firebase app:', e2);
      }
    } else {
      console.error('[SW] Firebase init error:', err);
    }
  }
});

// ── Handle notification click ─────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const clickUrl = event.notification.data?.clickUrl || self.location.origin;

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Focus an existing window if one is already open on the target URL
        for (const client of windowClients) {
          if (client.url === clickUrl && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open a new tab
        if (clients.openWindow) {
          return clients.openWindow(clickUrl);
        }
      })
  );
});
