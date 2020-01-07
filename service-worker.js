const staticCacheName = 'OSAPP-v1'
const dynamicCache = 'OSAPP-dynamic-v1'
const assets = [
    '/',
    'index.html',
    'cad_user.html',
    'busca_os.html',
    'busca_user.html',
    'contato.html',
    'nova_os.html',
    'assets/bootstrap/css/bootstrap.min.css',
    'assets/css/menu.css',
    'assets/css/main.css',
    'assets/js/jquery.js',
    'assets/bootstrap/js/bootstrap.min.js',
    'assets/js/menu.js',
    'image/icone.png',
    'image/logo-icone.png',
    'image/logo.png'
]

// Event Install
self.addEventListener('install', evt => {
    //console.log("Service worker tem sido instalado")
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets')
        cache.addAll(assets)
        })
    )
})

self.addEventListener('activate', evt => {
    //console.log("Service worker tem sido ativado")
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys)
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone())
                    return fetchRes
                })
            })
        })
    )
})