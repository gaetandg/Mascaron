import { useSyncExternalStore } from 'react'
import { createStore, del, get, set, values } from 'idb-keyval'
import type { Place } from '../types'
import { SEED_PLACES } from './seed'

// Pour l'instant les lieux créés sont stockés dans le navigateur (IndexedDB).
// Quand Supabase sera branché, seule cette couche changera.
const localDb = createStore('mascaron', 'places')

let places: Place[] = SEED_PLACES
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

async function refresh() {
  const local = (await values<Place>(localDb)).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  // Un lieu modifié localement remplace sa version d'origine (même id)
  const byId = new Map(SEED_PLACES.map((p) => [p.id, p]))
  local.forEach((p) => byId.set(p.id, p))
  places = [...byId.values()]
  emit()
}
void refresh()

export function usePlaces(): Place[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => places,
  )
}

export function getPlace(id: string): Place | undefined {
  return places.find((p) => p.id === id)
}

export async function savePlace(place: Place) {
  await set(place.id, place, localDb)
  await refresh()
}

export async function deletePlace(id: string) {
  await del(id, localDb)
  await refresh()
}

export async function exportLocalPlaces(): Promise<string> {
  const local = await values<Place>(localDb)
  return JSON.stringify(local, null, 2)
}

export async function importPlaces(json: string): Promise<number> {
  const data = JSON.parse(json) as Place[]
  if (!Array.isArray(data)) throw new Error('Fichier invalide')
  for (const p of data) {
    if (!p.id || typeof p.lat !== 'number' || typeof p.lng !== 'number') continue
    const existing = await get<Place>(p.id, localDb)
    await set(p.id, { ...existing, ...p }, localDb)
  }
  await refresh()
  return data.length
}

export function newPlaceId() {
  return `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}
