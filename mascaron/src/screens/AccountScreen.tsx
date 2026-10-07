import { useEffect, useState, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Provider } from '@supabase/supabase-js'
import { AUTH_REDIRECT, enabledProviders, supabase } from '../data/supabase'
import { authReturnError, consumeLoginRedirect, useAccount } from '../data/account'
import { signOutAndClear, useFound, useSyncStatus } from '../data/progress'
import { usePlaces } from '../data/places'
import { install, isInstalled, isIos, useCanInstall } from '../data/install'
import { Mascot } from '../components/Mascot'

export function AccountScreen() {
  const { session, ready } = useAccount()
  const navigate = useNavigate()
  // Connexion réussie (retour de Google…) : direction la carte
  useEffect(() => {
    if (session && consumeLoginRedirect()) navigate('/')
  }, [session, navigate])
  return (
    <div className="screen screen-page account">
      <header className="page-header carnet-header">
        <div>
          <h1>Mon compte</h1>
          <p className="hand">Facultatif : pour retrouver ton carnet sur un autre téléphone.</p>
        </div>
        <Mascot mood={session ? 'happy' : 'idle'} size={64} />
      </header>
      {!ready ? null : session ? <LoggedIn email={session.user.email} /> : <Login />}
      {!isInstalled && <InstallCard />}
      <p className="account-legal">
        <a href={`${import.meta.env.BASE_URL}confidentialite.html`}>Confidentialité</a> ·{' '}
        <a href={`${import.meta.env.BASE_URL}conditions.html`}>Conditions d'utilisation</a>
      </p>
    </div>
  )
}

function LoggedIn({ email }: { email?: string }) {
  const found = useFound()
  const places = usePlaces()
  const sync = useSyncStatus()
  // Seulement les lieux qui existent encore dans le jeu (un lieu disparu peut avoir été retiré)
  const n = places.filter((p) => found[p.id]).length
  return (
    <div className="account-card">
      <p>
        Connecté avec <b>{email}</b>
      </p>
      <p className="account-sync">
        {sync === 'syncing' && 'Synchronisation du carnet…'}
        {sync === 'ok' && `Carnet sauvegardé en ligne : ${n} lieu${n > 1 ? 'x' : ''} trouvé${n > 1 ? 's' : ''}.`}
        {sync === 'error' && "Le carnet n'a pas pu être sauvegardé en ligne pour l'instant (pas de réseau ?). Il reste sur ce téléphone."}
      </p>
      <button className="btn btn-ghost" onClick={() => void signOutAndClear()}>
        Se déconnecter
      </button>
      <p className="account-note">
        En te déconnectant, ton carnet est retiré de ce téléphone (pratique si vous le partagez) : il revient dès que
        tu te reconnectes.
      </p>
    </div>
  )
}

/** Ajouter Mascaron à l'écran d'accueil, comme une vraie app */
function InstallCard() {
  const canInstall = useCanInstall()
  return (
    <div className="account-card">
      <h2>Mascaron sur ton écran d'accueil</h2>
      <p className="account-note">Installe l'app : elle s'ouvre en plein écran, d'un seul geste, même avec peu de réseau.</p>
      {canInstall ? (
        <button className="btn btn-primary btn-big" onClick={() => void install()}>
          Installer l'app
        </button>
      ) : isIos ? (
        <>
          <p>
            Dans Safari, touche le bouton <b>Partager</b> (le carré avec une flèche vers le haut), puis{' '}
            <b>« Sur l'écran d'accueil »</b>.
          </p>
          <p className="account-note">
            Sur iPhone, l'app installée a son propre carnet, séparé de celui de Safari : connecte-toi à ton compte pour y
            retrouver tes lieux trouvés.
          </p>
        </>
      ) : (
        <p>
          Ouvre le menu du navigateur (les trois points <b>⋮</b>), puis choisis <b>« Installer l'application »</b> ou{' '}
          <b>« Ajouter à l'écran d'accueil »</b>.
        </p>
      )}
    </div>
  )
}

// Services de connexion proposés : un bouton apparaît tout seul dès qu'un service est activé dans Supabase.
// Pas de connexion par e-mail : pas d'e-mails à envoyer, pas de mot de passe à retenir.
const PROVIDERS: { id: Provider; label: string; Logo: () => ReactElement; scopes?: string }[] = [
  { id: 'google', label: 'Google', Logo: GoogleLogo },
  { id: 'apple', label: 'Apple', Logo: AppleLogo },
  { id: 'azure', label: 'Microsoft', Logo: MicrosoftLogo, scopes: 'email' },
  { id: 'facebook', label: 'Facebook', Logo: FacebookLogo },
]

function Login() {
  const [enabled, setEnabled] = useState<Record<string, boolean> | null>(null)
  const [error, setError] = useState(authReturnError ?? '')

  useEffect(() => {
    void enabledProviders().then(setEnabled)
  }, [])

  async function signIn(id: Provider, scopes?: string) {
    setError('')
    const { error: err } = await supabase.auth.signInWithOAuth({ provider: id, options: { redirectTo: AUTH_REDIRECT, scopes } })
    if (err) setError('La connexion n’a pas pu démarrer. Vérifie ton réseau et réessaie.')
  }

  const list = PROVIDERS.filter((p) => enabled?.[p.id])
  return (
    <div className="account-card">
      <h2>Se connecter</h2>
      <p className="account-note">Pas de mot de passe à créer : utilise un compte que tu as déjà.</p>
      {enabled === null ? null : list.length === 0 ? (
        <p className="error">La connexion n’est pas disponible pour l’instant (pas de réseau ?). Ton carnet reste sur ce téléphone.</p>
      ) : (
        list.map(({ id, label, Logo, scopes }) => (
          <button key={id} className="btn btn-ghost btn-big" onClick={() => void signIn(id, scopes)}>
            <Logo /> Continuer avec {label}
          </button>
        ))
      )}
      {error && <p className="error">{error}</p>}
    </div>
  )
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

function AppleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.3-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.5.9-1.4 1.3-2.8 1.3-2.8s-2.6-1-2.6-4.1zM13.9 5c.7-.8 1.2-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z"
      />
    </svg>
  )
}

function MicrosoftLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  )
}

function FacebookLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path fill="#fff" d="M13.4 23v-8.2h2.7l.4-3.2h-3.1V9.6c0-.9.3-1.6 1.6-1.6h1.7V5.2c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.4v3.2h2.7V23h3.3z" />
    </svg>
  )
}
