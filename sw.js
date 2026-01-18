const cacheName = 'hash-player-v1';
// Sirf files ke naam likhein, slash (/) ka khayal rakhein
const assets = [
  'index.html',
  'icon.png',
  'manifest.json'
];

// Install Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // Is se saari files offline save ho jayengi
      return cache.addAll(assets);
    })
  );
});

// Fetch files from cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      // Agar cache mein file hai toh wahan se uthao, warna internet se
      return res || fetch(e.request);
    })
  );
});
