var CACHE_NAME = 'notepad-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
	'/js/cache-polyfill.js',
	'/js/jquery.min.js',
	'/js/note-list.js',
    '/manifest.json'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
 
self.addEventListener('activate', function activator(event) {
event.waitUntil(
        caches.keys().then(function (keys) {
        return Promise.all(keys
            .filter(function (key) {
                return key.indexOf(CACHE_NAME) !== 0;
            })
            .map(function (key) {
                return caches.delete(key);
            })
        );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});