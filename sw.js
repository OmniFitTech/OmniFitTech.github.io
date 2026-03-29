/* Service Worker для OmniActive PWA: активация и push */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const show = async () => {
    let title = 'OmniActive';
    let body = '';
    /** @type {Record<string, unknown>} */
    let data = {};
    try {
      const text = event.data ? await event.data.text() : '';
      if (text) {
        const parsed = JSON.parse(text);
        if (typeof parsed.title === 'string') title = parsed.title;
        if (typeof parsed.body === 'string') body = parsed.body;
        if (parsed.data && typeof parsed.data === 'object') data = parsed.data;
      }
    } catch (_) {
      /* ignore */
    }
    await self.registration.showNotification(title, {
      body,
      icon: '/favicon.png',
      badge: '/favicon.png',
      data,
    });
  };
  event.waitUntil(show());
});
