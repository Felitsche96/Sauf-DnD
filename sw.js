const CACHE_NAME = "letzter-kasten-v28";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=28",
  "./app.js?v=28",
  "./manifest.webmanifest?v=28",
  "./assets/quest-parchment.png",
  "./assets/quest-parchment-wide.png",
  "./assets/gegelle-boys-group.jpeg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
