import type { Place, QuartierId } from './types'
import { SEED_PLACES } from './data/seed'

// Découpage du carnet par quartier.
// Limites : quartiers IRIS de l'Insee (2024), publiés par Bordeaux Métropole en données ouvertes
// (jeu « se_iri24_s » sur datahub.bordeaux-metropole.fr). L'IRIS « Nansouty » est coupé en deux
// au niveau du cours de la Somme : Saint-Genès à l'ouest, Nansouty à l'est.
// Ordre : du point de départ (place Nansouty) vers le reste de la ville.
export const QUARTIERS: { id: QuartierId; label: string }[] = [
  { id: 'nansouty', label: 'Nansouty' },
  { id: 'saint-genes', label: 'Saint-Genès' },
  { id: 'victoire', label: 'Victoire – Capucins' },
  { id: 'saint-michel', label: 'Saint-Michel – Sainte-Croix' },
  { id: 'belcier', label: 'Belcier – Sacré-Cœur' },
  { id: 'centre', label: 'Centre' },
  { id: 'meriadeck', label: 'Mériadeck – Saint-Bruno' },
  { id: 'saint-seurin', label: 'Saint-Seurin – Fondaudège' },
  { id: 'cauderan', label: 'Caudéran' },
  { id: 'chartrons', label: 'Chartrons – Grand Parc' },
  { id: 'bacalan', label: 'Bacalan – Le Lac' },
  { id: 'bastide', label: 'La Bastide' },
  { id: 'ailleurs', label: 'Ailleurs' },
]

// Distance approximative en mètres (suffisant à l'échelle d'une ville)
function distance(a: Place, b: Place) {
  const dy = (a.lat - b.lat) * 111_320
  const dx = (a.lng - b.lng) * 111_320 * Math.cos((a.lat * Math.PI) / 180)
  return Math.hypot(dx, dy)
}

/** Quartier d'un lieu. Un lieu créé dans l'app prend celui du lieu de départ le plus proche (à moins d'un km). */
export function quartierOf(place: Place): QuartierId {
  if (place.quartier) return place.quartier
  let best: Place | undefined
  let bestDist = 1000
  for (const s of SEED_PLACES) {
    const d = distance(place, s)
    if (d < bestDist) {
      best = s
      bestDist = d
    }
  }
  return best?.quartier ?? 'ailleurs'
}
