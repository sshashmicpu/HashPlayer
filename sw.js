const cacheName = 'hash-player-v2.2'; // Version change
const assets = [
  'index.html',
  'icon.png',
  'manifest.json'
];

// Install Service Worker
self.addEventListener('install', e => {
  // Naye version ko foran activate karne ke liye
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Purana Cache Saaf Karna (Activation)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('Old cache deleted:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Foran control lene ke liye
});

// Fetch files from cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
