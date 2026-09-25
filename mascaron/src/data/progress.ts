import { useSyncExternalStore } from 'react'

// Lieux trouvés sur cet appareil : { idDuLieu: date ISO }.
// Plus tard : synchronisé avec le compte (facultatif) du joueur.
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
  if (!found[id]) persist({ ...found, [id]: new Date().toISOString() })
}

export function unmarkFound(id: string) {
  const { [id]: _removed, ...rest } = found
  persist(rest)
}
