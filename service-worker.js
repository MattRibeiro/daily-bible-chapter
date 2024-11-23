self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static-cache').then((cache) => {
            return cache.addAll([
                '/daily-bible-chapter/', // Cache the root page
                'https://unpkg.com/@picocss/pico@1.5.7/css/pico.min.css', // Cache Pico.css
            ]);
        }).catch((error) => {
            console.error('Failed to cache resources during install:', error);
        })
    );
    console.log('Service Worker installed and resources cached.');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if available, otherwise fetch from network
            return response || fetch(event.request).catch(() => {
                // Fallback for failed network requests
                if (event.request.mode === 'navigate') {
                    return caches.match('/'); // Serve index.html for navigation requests
                }
                return new Response('Offline. Resource not available.', {
                    status: 503,
                    statusText: 'Service Unavailable',
                });
            });
        })
    );
});
