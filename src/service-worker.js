import { precacheAndRoute } from 'workbox-precaching';
/* eslint-disable no-restricted-globals */

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('app-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/static/js/bundle.js',
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/favicon.ico',
                '/manifest.json',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
precacheAndRoute(self.__WB_MANIFEST || []);
