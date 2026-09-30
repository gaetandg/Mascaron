import { useSyncExternalStore } from 'react'

// Installation de l'app sur l'écran d'accueil du téléphone (PWA).
// Android (Chrome…) : le navigateur propose l'installation via l'événement « beforeinstallprompt ».
// iPhone : pas d'événement, il faut passer par le bouton Partager puis « Sur l'écran d'accueil ».

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferred: InstallPromptEvent | null = null
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

/** Déjà ouverte comme une app installée (et non dans le navigateur) */
export const isInstalled =
  window.matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true

export const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

/** À appeler au démarrage : garde l'offre d'installation et prépare le mode hors-ligne */
export function setupInstall() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as InstallPromptEvent
    notify()
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    notify()
  })
  // Le service worker n'existe que dans l'app construite (pas avec « npm run dev »)
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => void navigator.serviceWorker.register('./sw.js').catch(() => {}))
  }
}

/** Vrai quand le navigateur propose l'installation en un clic */
export function useCanInstall() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => deferred !== null,
  )
}

export async function install() {
  if (!deferred) return
  await deferred.prompt()
  await deferred.userChoice
  deferred = null
  notify()
}
