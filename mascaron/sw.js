// Service worker de Mascaron : rend l'app installable et utilisable sans réseau.
// Ce fichier est un modèle : à la construction (npm run build), vite.config.ts remplace
// __VERSION__ et __PRECACHE__ puis l'écrit dans dist/sw.js.
//
// Règles :
// - la page (index.html) vient toujours du réseau quand il y en a, pour avoir la dernière version ;
//   sans réseau, on sert la copie gardée ;
// - le code de l'app, les icônes et MapLibre sont copiés à l'installation ;
// - photos, polices et carte sont gardées au fur et à mesure qu'on les voit.

const VERSION = '__VERSION__' // remplacé à la construction
const PRECACHE = __PRECACHE__ // remplacé à la construction
const APP_CACHE = `mascaron-app-${VERSION}`
const PHOTOS_CACHE = 'mascaron-photos'
const FONTS_CACHE = 'mascaron-fonts'
const MAP_CACHE = 'mascaron-carte'
const MAX_MAP_TILES = 1500

const scope = self.registration.scope
const INDEX = new URL('index.html', scope).href

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP_CACHE)
      .then((cache) => cache.addAll(PRECACHE.map((f) => new URL(f, scope).href)))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('mascaron-app-') && k !== APP_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  if (req.mode === 'navigate' && req.url.startsWith(scope)) {
    event.respondWith(page(req))
  } else if (req.url.startsWith(scope)) {
    if (url.pathname.includes('/seed/')) event.respondWith(staleWhileRevalidate(req, PHOTOS_CACHE))
    else event.respondWith(cacheFirst(req, APP_CACHE))
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req, FONTS_CACHE))
  } else if (url.hostname === 'tiles.openfreemap.org') {
    // Les tuiles ont une adresse datée (elles ne changent jamais) ; le style et la liste des tuiles, si
    if (/\.(pbf|png|jpg|webp)$/.test(url.pathname)) event.respondWith(cacheFirst(req, MAP_CACHE, MAX_MAP_TILES))
    else event.respondWith(networkFirst(req, MAP_CACHE))
  }
  // Tout le reste (Supabase…) passe directement par le réseau
})

/** La page : réseau d'abord (dernière version), copie gardée si pas de réseau */
async function page(req) {
  try {
    const res = await fetch(req)
    if (res.ok) {
      const cache = await caches.open(APP_CACHE)
      await cache.put(INDEX, res.clone())
    }
    return res
  } catch {
    return (await caches.match(INDEX)) ?? Response.error()
  }
}

async function networkFirst(req, cacheName) {
  try {
    const res = await fetch(req)
    if (res.ok) (await caches.open(cacheName)).put(req, res.clone())
    return res
  } catch {
    return (await caches.match(req)) ?? Response.error()
  }
}

async function cacheFirst(req, cacheName, maxEntries) {
  const cached = await caches.match(req)
  if (cached) return cached
  const res = await fetch(req)
  if (res.ok) {
    const cache = await caches.open(cacheName)
    await cache.put(req, res.clone())
    if (maxEntries) void trim(cache, maxEntries)
  }
  return res
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)
  const fresh = fetch(req)
    .then((res) => {
      // « opaque » : feuille de style de Google Fonts, lisible par le navigateur mais pas par nous
      if (res.ok || res.type === 'opaque') void cache.put(req, res.clone())
      return res
    })
    .catch(() => cached ?? Response.error())
  return cached ?? fresh
}

/** Garde seulement les tuiles les plus récentes */
async function trim(cache, maxEntries) {
  const keys = await cache.keys()
  for (let i = 0; i < keys.length - maxEntries; i++) await cache.delete(keys[i])
}
