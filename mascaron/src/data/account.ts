import { useSyncExternalStore } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

// Compte joueur (facultatif). Sans compte, le carnet reste sur ce téléphone.
interface AccountState {
  session: Session | null
  /** Arrivé par le lien « mot de passe oublié » : il faut choisir un nouveau mot de passe */
  recovering: boolean
  ready: boolean
}

// Retour d'un lien reçu par e-mail ou de Google : l'adresse contient « ?code=… » (tout va bien)
// ou « ?error=…#error=… » (lien expiré, déjà utilisé…). Dans les deux cas on ouvre l'écran « Compte ».
function readAuthReturn(): string | null {
  const search = new URLSearchParams(location.search)
  const hash = new URLSearchParams(location.hash.replace(/^#/, ''))
  const code = search.get('error_code') ?? hash.get('error_code')
  const description = search.get('error_description') ?? hash.get('error_description')
  if (code || description) {
    // On nettoie l'adresse (sinon le « #error=… » serait pris pour une page de l'app)
    history.replaceState(null, '', `${location.pathname}#/compte`)
    return code === 'otp_expired'
      ? 'Ce lien a expiré ou a déjà servi. Connecte-toi avec ton mot de passe, ou demande un nouveau lien.'
      : (description ?? 'La connexion a échoué.')
  }
  if (search.has('code')) history.replaceState(null, '', `${location.pathname}${location.search}#/compte`)
  return null
}

/** Message à afficher si le lien de connexion n'a pas marché */
export const authReturnError = readAuthReturn()

let state: AccountState = { session: null, recovering: false, ready: false }
const listeners = new Set<() => void>()

function update(patch: Partial<AccountState>) {
  state = { ...state, ...patch }
  listeners.forEach((l) => l())
}

supabase.auth.onAuthStateChange((event, session) => {
  update({ session, ready: true, ...(event === 'PASSWORD_RECOVERY' ? { recovering: true } : {}) })
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

export function recoveryDone() {
  update({ recovering: false })
}
