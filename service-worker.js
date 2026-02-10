// GitHub Pages のパスに合わせたキャッシュ名
const CACHE_NAME = "wixoss-log-cache-v1";

// キャッシュするファイル（最低限）
const FILES_TO_CACHE = [
  "/wixoss-log/",
  "/wixoss-log/index.html",
];

// インストール時にキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 有効化
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// オフライン時は index.html を返す
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match("/wixoss-log/index.html"))
  );
});
