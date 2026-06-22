// Firebase Messaging Service Worker
// This file must be placed in /public so it is served from the root of the site.
// FCM requires the service worker to be at /firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// ── Firebase config is embedded at build time via a query param trick,
//    OR you can hard-code VITE-resolved values here if you control the build.
//    For flexibility we read from a self-posted message in the install handler.
// ────────────────────────────────────────────────────────────────────────────

let messaging = null;

// Listen for config posted from the main thread after SW registration
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    try {
      const app = firebase.initializeApp(event.data.config);
      messaging = firebase.messaging(app);

      messaging.onBackgroundMessage((payload) => {
        const { title, body } = payload.notification || {};
        const data = payload.data || {};

        const notificationTitle = title || '🔴 Live Class Started';
        const notificationOptions = {
          body: body || 'Your live class is now available. Tap to join.',
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: `live-class-${data.meetingId || Date.now()}`,
          requireInteraction: true,
          data: {
            click_action: data.click_action || '/',
            roomId: data.roomId || '',
            meetingId: data.meetingId || '',
          },
          actions: [
            {
              action: 'join',
              title: '▶ Join Class',
              icon: '/favicon.ico',
            },
            {
              action: 'dismiss',
              title: 'Dismiss',
            },
          ],
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
      });
    } catch (err) {
      console.error('[SW] Firebase init failed:', err);
    }
  }
});

// Handle notification click — open the live class page
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  if (action === 'dismiss') return;

  const clickAction =
    event.notification.data?.click_action ||
    event.notification.data?.roomId
      ? `${self.location.origin}/live/${event.notification.data.roomId}`
      : self.location.origin;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Focus existing window if already open on the target URL
      for (const client of windowClients) {
        if (client.url === clickAction && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open a new window/tab
      if (clients.openWindow) {
        return clients.openWindow(clickAction);
      }
    })
  );
});
