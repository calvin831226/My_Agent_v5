const CACHE_NAME = 'desktop-assistant-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // 遇到 Google Apps Script 的 API 請求時，直接走網路抓最新資料，不讀取快取
    if (event.request.url.includes('script.google.com')) {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});