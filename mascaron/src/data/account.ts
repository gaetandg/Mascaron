import { useSyncExternalStore } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

// Compte joueur (facultatif). Sans compte, le carnet reste sur ce téléphone.
interface AccountState {
  session: Session | null
  ready: boolean
}

// Retour de Google (ou d'un autre service de connexion) : l'adresse contient « ?code=… » (tout va bien)
// ou « ?error=…#error=… » (connexion annulée, refusée…). Dans les deux cas on ouvre l'écran « Compte ».
function readAuthReturn(): string | null {
  const search = new URLSearchParams(location.search)
  const hash = new URLSearchParams(location.hash.replace(/^#/, ''))
  const code = search.get('error_code') ?? hash.get('error_code')
  const description = search.get('error_description') ?? hash.get('error_description')
  if (code || description) {
    // On nettoie l'adresse (sinon le « #error=… » serait pris pour une page de l'app)
    history.replaceState(null, '', `${location.pathname}#/compte`)
    return code === 'access_denied' || !description ? 'La connexion a été annulée.' : `La connexion a échoué : ${description}`
  }
  if (search.has('code')) {
    history.replaceState(null, '', `${location.pathname}${location.search}#/compte`)
    loginRedirect = true
  }
  return null
}

// Après une connexion, on renvoie le joueur sur la carte
let loginRedirect = false
export function consumeLoginRedirect() {
  const r = loginRedirect
  loginRedirect = false
  return r
}

/** Message à afficher si le lien de connexion n'a pas marché */
export const authReturnError = readAuthReturn()

let state: AccountState = { session: null, ready: false }
const listeners = new Set<() => void>()

function update(patch: Partial<AccountState>) {
  state = { ...state, ...patch }
  listeners.forEach((l) => l())
}

supabase.auth.onAuthStateChange((_event, session) => {
  update({ session, ready: true })
})

export function useAccount(): AccountState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}

export function getSession() {
  return state.session
}

export function onSessionChange(l: () => void) {
  listeners.add(l)
}
