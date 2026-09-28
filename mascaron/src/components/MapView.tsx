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

// Dernière vue de la carte, conservée quand on change d'écran
let lastView: { center: [number, number]; zoom: number } = { center: START, zoom: 14.2 }

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

  const [ready, setReady] = useState(false)

  useEffect(() => {
    let map: maplibregl.Map | null = null
    let cancelled = false
    // Le style est chargé avant de créer la carte (changer de style après coup bloque MapLibre)
    loadPaperStyle()
      .catch(() => STYLE_URL)
      .then((style) => {
        if (cancelled) return
        const m = new maplibregl.Map({
          container: containerRef.current!,
          style,
          center: draftPoint ? [draftPoint.lng, draftPoint.lat] : lastView.center,
          zoom: draftPoint ? Math.max(lastView.zoom, 17) : lastView.zoom,
          attributionControl: { compact: true },
        })
        m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
        m.addControl(
          new maplibregl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
          }),
          'top-right',
        )
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
