var cacheName = "after-school-app-v1";
var cacheFiles = [
    "index.html",
    //"products.js",
    "images/afterschool_64x64.png",
    "images/afterschool_512x512.png",
    "images/screenshot1.png",
    "images/screenshot2.png",
];
self.addEventListener("install", function (e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener("fetch", function (e) {
    console.log("[Service Worker] Fetching", e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response) {
                console.log("[Service Worker] Found in cache", e.request.url);
                return response;
            }
            var requestClone = e.request.clone();
            fetch(requestClone)
                .then(function (response) {
                    if (!response) {
                        console.log("[Service Worker] No response from fetch");
                        return response;
                    }
                    var responseClone = response.clone();
                    if (e.request.url.startsWith('http') || e.request.url.startsWith('https')) {
                        caches.open(cacheName).then(function (cache) {
                            cache.put(e.request, responseClone);
                        });
                    }
                    return response;
                });
        })
    );
});