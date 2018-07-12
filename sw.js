let cacheName = 'ver1';
let cacheFiles = [
    '/',
    'index.html',
    'restaurant.html',
    'css/styles.css',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    'data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
 ];

self.addEventListener('install', function(e) {
  console.log("[ServiceWorker] Installed");

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching files");
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log("[ServiceWorker] Activated");

  e.waitUntil(

  caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.map(function(thisCacheName) {

      // deletes old cache
      if (thisCacheName !== cacheName) {

        console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
        return caches.delete(thisCacheName);
      }
    }));
  })
);
})

self.addEventListener('fetch', function(e) {
  console.log("[ServiceWorker] Fetching", e.request.url);
})

