import { useEffect, useRef, useState } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import type { CategoryId, Place } from '../types'
import { CATEGORIES } from '../categories'
import { paperize } from './paperMapStyle'

// En développement, MapLibre trouve son worker tout seul (à côté de son propre fichier).
// Dans l'app publiée, le worker est servi tel quel depuis public/maplibre (copié par « npm run copy-maplibre »).
if (!import.meta.env.DEV) {
  maplibregl.setWorkerUrl(new URL(`${import.meta.env.BASE_URL}maplibre/maplibre-gl-worker.mjs`, location.href).href)
}

const STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'
const START: [number, number] = [-0.5725, 44.8255]

// Le style de carte est téléchargé une seule fois puis « vieilli » façon papier
let paperStyle: Promise<maplibregl.StyleSpecification> | null = null
function loadPaperStyle() {
  paperStyle ??= fetch(STYLE_URL)
    .then((r) => r.json() as Promise<maplibregl.StyleSpecification>)
    .then(paperize)
  return paperStyle
}

// Dernière vue de la carte, conservée quand on change d'écran (vide à l'ouverture de l'app)
let lastView: { center: [number, number]; zoom: number } | null = null

// Position du joueur (GPS), suivie dès l'ouverture de l'app et partagée par toutes les cartes
let userPos: [number, number] | null = null
const userListeners = new Set<() => void>()
let watching = false
function watchUser() {
  if (watching || !('geolocation' in navigator)) return
  watching = true
  navigator.geolocation.watchPosition(
    (pos) => {
      userPos = [pos.coords.longitude, pos.coords.latitude]
      userListeners.forEach((l) => l())
    },
    () => {},
    { enableHighAccuracy: true, maximumAge: 10_000 },
  )
}

// Au-delà de cette distance de Bordeaux (en degrés, ~20 km), on ne cherche pas à montrer le joueur sur la vue d'ensemble
const NEAR = 0.25

// Vue d'ensemble : tous les lieux (tout Bordeaux), plus le joueur s'il est dans les parages
function overviewBounds(places: Place[]) {
  const b = new maplibregl.LngLatBounds()
  places.forEach((p) => b.extend([p.lng, p.lat]))
  if (b.isEmpty()) b.extend([START, START])
  const c = b.getCenter()
  if (userPos && Math.abs(userPos[0] - c.lng) < NEAR && Math.abs(userPos[1] - c.lat) < NEAR) b.extend(userPos)
  return b
}

// Marges pour que les lieux ne passent pas sous l'en-tête et les boutons
const OVERVIEW_PADDING = { top: 130, bottom: 40, left: 40, right: 60 }

// Bouton « me localiser » : centre la carte sur le point GPS
class LocateControl implements maplibregl.IControl {
  private box?: HTMLDivElement
  onAdd(map: maplibregl.Map) {
    this.box = document.createElement('div')
    this.box.className = 'maplibregl-ctrl maplibregl-ctrl-group'
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'maplibregl-ctrl-geolocate'
    btn.title = 'Me localiser'
    btn.setAttribute('aria-label', 'Me localiser')
    btn.innerHTML = '<span class="maplibregl-ctrl-icon" aria-hidden="true"></span>'
    btn.addEventListener('click', () => {
      watchUser()
      if (userPos) map.flyTo({ center: userPos, zoom: Math.max(map.getZoom(), 16) })
    })
    this.box.appendChild(btn)
    return this.box
  }
  onRemove() {
    this.box?.remove()
  }
}

interface Props {
  places: Place[]
  found?: Record<string, string>
  selectedId?: string | null
  onSelect?: (id: string) => void
  /** Mode créateur : clic sur la carte pour placer un point */
  onMapClick?: (lngLat: { lat: number; lng: number }) => void
  draftPoint?: { lat: number; lng: number } | null
}

// Icône de la catégorie (dessin SVG), calculée une fois par catégorie
const iconCache = new Map<CategoryId, string>()
function categoryIconSvg(category: CategoryId) {
  let svg = iconCache.get(category)
  if (!svg) {
    const { Icon } = CATEGORIES[category] ?? CATEGORIES.autre
    svg = renderToStaticMarkup(createElement(Icon, { size: 17, strokeWidth: 2.2, 'aria-hidden': true }))
    iconCache.set(category, svg)
  }
  return svg
}

// Cachet de cire : icône du type de lieu, rouge si à trouver, vert avec une coche si trouvé
function pinElement(place: Place, isFound: boolean, isSelected: boolean) {
  const el = document.createElement('button')
  el.className = ['pin', isFound ? 'pin-found' : '', isSelected ? 'pin-selected' : ''].filter(Boolean).join(' ')
  const label = (CATEGORIES[place.category] ?? CATEGORIES.autre).label
  el.setAttribute('aria-label', isFound ? `${place.title} (trouvé)` : `Lieu mystère : ${label}`)
  el.title = isFound ? place.title : label
  el.innerHTML = categoryIconSvg(place.category) + (isFound ? '<span class="pin-check" aria-hidden="true">✓</span>' : '')
  return el
}

export function MapView({ places, found = {}, selectedId, onSelect, onMapClick, draftPoint }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])
  const draftRef = useRef<maplibregl.Marker | null>(null)
  const clickRef = useRef(onMapClick)
  clickRef.current = onMapClick
  const placesRef = useRef(places)
  placesRef.current = places

  const [ready, setReady] = useState(false)

  useEffect(() => {
    let map: maplibregl.Map | null = null
    let cancelled = false
    let stopUser = () => {}
    // Le style est chargé avant de créer la carte (changer de style après coup bloque MapLibre)
    loadPaperStyle()
      .catch(() => STYLE_URL)
      .then((style) => {
        if (cancelled) return
        const selected = placesRef.current.find((p) => p.id === selectedId)
        // À l'ouverture de l'app : tout Bordeaux (et le joueur). Sinon : la dernière vue, ou le point / lieu visé.
        const overview = !draftPoint && !selected && !lastView
        const m = new maplibregl.Map({
          container: containerRef.current!,
          style,
          ...(overview
            ? { bounds: overviewBounds(placesRef.current), fitBoundsOptions: { padding: OVERVIEW_PADDING } }
            : {
                center: draftPoint
                  ? [draftPoint.lng, draftPoint.lat]
                  : selected
                    ? [selected.lng, selected.lat]
                    : (lastView?.center ?? START),
                zoom: draftPoint || selected ? Math.max(lastView?.zoom ?? 0, 16) : (lastView?.zoom ?? 14.2),
              }),
          attributionControl: { compact: true },
        })
        m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
        m.addControl(new LocateControl(), 'top-right')

        // Point GPS du joueur
        const dot = document.createElement('div')
        dot.className = 'user-dot'
        const userMarker = new maplibregl.Marker({ element: dot })
        let touched = false
        m.on('dragstart', () => (touched = true))
        m.on('zoomstart', (e) => {
          if (e.originalEvent) touched = true
        })
        const showUser = () => {
          if (!userPos) return
          userMarker.setLngLat(userPos).addTo(m)
          // Première position reçue hors de la vue d'ensemble : on élargit pour montrer le joueur
          if (overview && !touched && !m.getBounds().contains(userPos)) {
            m.fitBounds(overviewBounds(placesRef.current), { padding: OVERVIEW_PADDING, duration: 600 })
          }
        }
        userListeners.add(showUser)
        stopUser = () => userListeners.delete(showUser)
        showUser()
        watchUser()

        m.on('moveend', () => {
          const c = m.getCenter()
          lastView = { center: [c.lng, c.lat], zoom: m.getZoom() }
        })
        m.on('click', (e) => clickRef.current?.({ lat: e.lngLat.lat, lng: e.lngLat.lng }))
        map = m
        mapRef.current = m
        if (import.meta.env.DEV) (window as unknown as { __map: maplibregl.Map }).__map = m
        setReady(true)
      })
    return () => {
      cancelled = true
      stopUser()
      map?.remove()
      mapRef.current = null
      markersRef.current = []
      draftRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Marqueurs des lieux (cachets de cire)
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    markersRef.current.forEach((m) => m.remove())
    markersRef.current = places.map((p) => {
      const el = pinElement(p, Boolean(found[p.id]), p.id === selectedId)
      el.addEventListener('click', (ev) => {
        ev.stopPropagation()
        onSelect?.(p.id)
      })
      return new maplibregl.Marker({ element: el }).setLngLat([p.lng, p.lat]).addTo(map)
    })
  }, [ready, places, found, selectedId, onSelect])

  // Point en cours de création
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (!draftPoint) {
      draftRef.current?.remove()
      draftRef.current = null
      return
    }
    if (!draftRef.current) {
      const el = document.createElement('div')
      el.className = 'pin pin-draft'
      el.innerHTML = '<span>+</span>'
      draftRef.current = new maplibregl.Marker({ element: el }).setLngLat([draftPoint.lng, draftPoint.lat]).addTo(map)
    } else {
      draftRef.current.setLngLat([draftPoint.lng, draftPoint.lat])
    }
  }, [ready, draftPoint])

  // Centrer sur le lieu sélectionné
  useEffect(() => {
    const p = places.find((x) => x.id === selectedId)
    if (p && mapRef.current) {
      mapRef.current.easeTo({ center: [p.lng, p.lat], offset: [0, -140], duration: 500 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, selectedId])

  return <div ref={containerRef} className="map" />
}
