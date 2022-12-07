const CACHE_VERSION = 'v1';
const CACHE_NAME = `${self.registration.scope}!${CACHE_VERSION}`;

const urlsToCache = [
    ".",
    "index.css",
    "img/icon_192x192.png",
    "img/icon_512x512.png",
    "main.js"
];

self.addEventListener("install", (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            }).catch((err) => {
                console.error(err);
            })
    );
});

self.addEventListener("activate", (evt) => {
    evt.waitUntil(
        caches.keys().then((cacheNames) => {
            // Find different version cache
            return cacheNames.filter((cacheName) => {
                return cacheName.startsWith(`${self.registration.scope}!`) &&
                    cacheName !== CACHE_NAME;
            });
        }).then((cachesToDelete) => {
            // Delete different version cache
            return Promise.all(cachesToDelete.map((cacheName) => {
                return caches.delete(cacheName);
            }));
        })
    );
});

self.addEventListener("fetch", (evt) => {
    evt.respondWith(
        caches.match(evt.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                // Clone and detach to prevent destruction by external processing.
                let fetchRequest = evt.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        // If it is not a cache target, return it as is.
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone and detach to prevent destruction by external processing.
                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(evt.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});
