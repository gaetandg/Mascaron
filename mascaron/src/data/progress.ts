import { useSyncExternalStore } from 'react'
import { supabase } from './supabase'
import { getSession, onSessionChange } from './account'

// Lieux trouvés : { idDuLieu: date ISO }.
// Toujours gardés sur le téléphone ; si le joueur a un compte, ils sont aussi sauvegardés en ligne
// (table « found » de Supabase) et fusionnés entre ses appareils.
const KEY = 'mascaron.found'

type Found = Record<string, string>

function load(): Found {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Found
  } catch {
    return {}
  }
}

let found: Found = load()
const listeners = new Set<() => void>()

function persist(next: Found) {
  found = next
  try {
    localStorage.setItem(KEY, JSON.stringify(found))
  } catch {
    // stockage indisponible (navigation privée…) : la progression reste en mémoire
  }
  listeners.forEach((l) => l())
}

export function useFound(): Found {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => found,
  )
}

export function markFound(id: string) {
  if (found[id]) return
  const date = new Date().toISOString()
  persist({ ...found, [id]: date })
  if (getSession()) void supabase.from('found').upsert({ place_id: id, found_at: date }).then(reportError)
}

export function unmarkFound(id: string) {
  const { [id]: _removed, ...rest } = found
  persist(rest)
  if (getSession()) void supabase.from('found').delete().eq('place_id', id).then(reportError)
}

function reportError({ error }: { error: unknown }) {
  if (error) console.warn('Sauvegarde en ligne impossible', error)
}

// ---------- Synchronisation avec le compte ----------

export type SyncStatus = 'off' | 'syncing' | 'ok' | 'error'
let syncStatus: SyncStatus = 'off'
const syncListeners = new Set<() => void>()
function setSync(s: SyncStatus) {
  syncStatus = s
  syncListeners.forEach((l) => l())
}

export function useSyncStatus(): SyncStatus {
  return useSyncExternalStore(
    (l) => {
      syncListeners.add(l)
      return () => syncListeners.delete(l)
    },
    () => syncStatus,
  )
}

// Fusion : un lieu trouvé sur n'importe quel appareil compte (on garde la date la plus ancienne)
async function sync() {
  const session = getSession()
  if (!session) return setSync('off')
  setSync('syncing')
  const { data, error } = await supabase.from('found').select('place_id, found_at')
  if (error) return setSync('error')
  const merged: Found = { ...found }
  for (const row of data as { place_id: string; found_at: string }[]) {
    if (!merged[row.place_id] || row.found_at < merged[row.place_id]) merged[row.place_id] = row.found_at
  }
  const remote = new Set((data as { place_id: string }[]).map((r) => r.place_id))
  const missing = Object.entries(merged)
    .filter(([id]) => !remote.has(id))
    .map(([place_id, found_at]) => ({ place_id, found_at }))
  if (missing.length) {
    const { error: upErr } = await supabase.from('found').upsert(missing)
    if (upErr) return setSync('error')
  }
  persist(merged)
  setSync('ok')
}

let lastUser: string | undefined
onSessionChange(() => {
  const user = getSession()?.user.id
  if (user === lastUser) return
  lastUser = user
  void sync()
})

/**
 * Déconnexion : le carnet est d'abord sauvegardé dans le compte, puis retiré de ce téléphone
 * (utile quand plusieurs joueurs partagent le même téléphone). Il revient à la prochaine connexion.
 */
export async function signOutAndClear(): Promise<boolean> {
  await sync()
  if (
    syncStatus !== 'ok' &&
    !confirm(
      "Ton carnet n'a pas pu être sauvegardé en ligne (pas de réseau ?). Si tu te déconnectes maintenant, les derniers lieux trouvés seront perdus. Se déconnecter quand même ?",
    )
  )
    return false
  await supabase.auth.signOut()
  persist({})
  return true
}

