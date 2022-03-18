;
const CACHE_NAME = 'v1_cache_programador_fitness',
  urlsToCache = [
    './',

    './script.js',

    './assets/js/jquery-3.5.1.min.js',
  
    './assets/js/bootstrap.bundle.min.js',
  
    './assets/vendor/wow/wow.min.js',
  
    './assets/vendor/owl-carousel/js/owl.carousel.min.js',
  
    './assets/vendor/waypoints/jquery.waypoints.min.js',
  
    './assets/vendor/animateNumber/jquery.animateNumber.min.js',
  
    './assets/js/google-maps.js',
  
    './assets/js/theme.js',

    './assets/vendor/animate/animate.css',
  
    './assets/css/bootstrap.css',
  
    './assets/css/maicons.css',
  
    './assets/vendor/owl-carousel/css/owl.carousel.css',
  
    './assets/css/theme.css',

    './assets/img/skylar-spence512.png',

    './assets/img/marble512.png'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})