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
