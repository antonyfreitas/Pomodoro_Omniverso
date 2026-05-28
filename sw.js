const CACHE_NAME = 'pomodoro-omniverso-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icone-192.png',
  './icone-512.png'
];

// Evento de Instalação (Guarda os ficheiros todos na cache do dispositivo)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Ficheiros guardados na cache (Pronto para Offline!)');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Evento de Ativação (Limpa caches antigas se existirem)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento Fetch (Interceta a internet: Se não houver rede, devolve o que está guardado)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Devolve o ficheiro em modo offline
      }
      return fetch(event.request); // Vai buscar à net se não estiver na cache
    })
  );
});