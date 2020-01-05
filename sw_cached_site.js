const cacheName = "v2";

// Call the install event
self.addEventListener("install", e => {
  console.log("SW is installed");
});

// call activate event
self.addEventListener("activate", e => {
  console.log("SW is activated");
  // remove unwanted caches
  e.waitUntil(
    // a promise object of all cachenames will be
    // returned to you, you wanna go over them one
    // by one and remove those ones that donot match
    // the current cacheName
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // cache here represents a value of each cacheNames values and passed into a callback
          if (cache !== cacheName) {
            console.log("SW: clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// call fetch event
self.addEventListener("fetch", e => {
  console.log("SW: Fetching");

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // make copy/clone of response
        const resClone = res.clone();
        // open cache
        caches.open(cacheName).then(cache => {
          // add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
