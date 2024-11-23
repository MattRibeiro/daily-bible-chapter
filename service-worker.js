self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static-cache').then((cache) => {
            return cache.addAll([
                '/', // Cache the root page (index.html)
                'https://unpkg.com/@picocss/pico@1.5.7/css/pico.min.css', // Pico.css CDN
            ]);
        })
    );
    console.log('Service Worker installed and Pico.css cached.');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
