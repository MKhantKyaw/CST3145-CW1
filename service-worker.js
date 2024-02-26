var cacheName = "after-school-app-v1";
var cacheFiles = [
    "index.html",
    //"products.js",
    "images/afterschool_64x64.png",
    "images/afterschool_512x512.png",
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