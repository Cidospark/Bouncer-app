const cacheName = "v1";
const cacheAssets = [
  "index.html",
  "style.css",
  "js/main.js",
  "asset/img1.png",
  "asset/img2.png",
  "asset/img3.png",
  "asset/img4.png",
  "asset/img5.png",
  "asset/img6.png",
  "asset/img7.png",
  "asset/img8.png",
  "asset/img9.png",
  "asset/img10.png",
  "asset/img11.png",
  "asset/img12.png",
  "asset/img13.png",
  "asset/img14.png",
  "asset/img15.png",
  "asset/img16.png",
  "asset/img17.png",
  "asset/img18.png",
  "asset/img19.png",
  "asset/mastercard.png",
  "asset/paypal.png",
  "asset/Snapshot1.png",
  "asset/Snapshot2.png",
  "asset/Snapshot3.png",
  "asset/visa.png",
  "asset/western-union.png"
];

// Call the install event
self.addEventListener("install", e => {
  //console.log("SW is installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// call activate event
self.addEventListener("activate", e => {
  //console.log("SW is activated");
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
  //console.log("SW: Fetching");

  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
