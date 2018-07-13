// thanks a lot for help from youtube tutorial https://www.youtube.com/watch?v=BfL3pprhnms&t=246s

let cacheName = 'ver1337';
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

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Installed');

  e.waitUntil(
    //open cache and add files
    caches.open(cacheName).then(function (cache) {

      console.log('[ServiceWorker] Caching cacheFiles');
      return cache.addAll(cacheFiles);
    })
  );
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activated');

  e.waitUntil(
    //deletes old cache if there is a new one
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {

        if (thisCacheName !== cacheName) {

          console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  );

});


self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);

  // Check in cache for the request
  e.respondWith(

    caches.match(e.request)


    .then(function (response) {

      if (response) {
        console.log("[ServiceWorker] Found in Cache", e.request.url, response);
        return response;
      }

      var requestClone = e.request.clone();
      fetch(requestClone)
        .then(function (response) {

          if (!response) {
            console.log("[ServiceWorker] No response from fetch ")
            return response;
          }

          var responseClone = response.clone();

          caches.open(cacheName).then(function (cache) {

            cache.put(e.request, responseClone);
            console.log('[ServiceWorker] New Data Cached', e.request.url);

            return response;

          });
          //checking for errors
        })
        .catch(function (err) {
          console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
        });


    })
  );
});