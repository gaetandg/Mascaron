import { createClient } from '@supabase/supabase-js'

// Projet Supabase de Mascaron. Cette clé est « publique » : elle est faite pour être dans l'app,
// ce sont les règles de sécurité de la base (voir supabase/schema.sql) qui protègent les carnets.
const SUPABASE_URL = 'https://hzpixgfuzocoxwtqhqzh.supabase.co'
const SUPABASE_KEY = 'sb_publishable_I4hIbIwAOWW9_Jcconlvig_-ZL0lVa3'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    // Le retour de Google (ou d'un autre service) revient avec « ?code=… » dans l'adresse
    flowType: 'pkce',
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true,
  },
})

/** Adresse où revenir après la connexion (Google…) */
export const AUTH_REDIRECT = new URL(import.meta.env.BASE_URL, location.href).href

/** Services de connexion activés dans Supabase (Google, Apple…) */
export async function enabledProviders(): Promise<Record<string, boolean>> {
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/settings`, { headers: { apikey: SUPABASE_KEY }, signal: AbortSignal.timeout(10000) })
    const s = (await r.json()) as { external?: Record<string, boolean> }
    return s.external ?? {}
  } catch {
    return {}
  }
}
