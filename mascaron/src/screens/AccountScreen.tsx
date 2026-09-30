import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AUTH_REDIRECT, enabledProviders, supabase } from '../data/supabase'
import { authReturnError, consumeLoginRedirect, expectLogin, recoveryDone, useAccount } from '../data/account'
import { signOutAndClear, useFound, useSyncStatus } from '../data/progress'
import { install, isInstalled, isIos, useCanInstall } from '../data/install'
import { Mascot } from '../components/Mascot'

type Mode = 'login' | 'signup' | 'magic' | 'reset'

// Messages d'erreur de Supabase traduits en français simple
function frError(message: string) {
  const m = message.toLowerCase()
  if (m.includes('invalid login credentials')) return 'E-mail ou mot de passe incorrect.'
  if (m.includes('already registered')) return 'Un compte existe déjà avec cet e-mail : connecte-toi.'
  if (m.includes('email not confirmed')) return "Confirme d'abord ton adresse avec le lien reçu par e-mail."
  if (m.includes('not authorized')) return "L'envoi d'e-mails n'est pas encore ouvert à toutes les adresses. Utilise Google ou demande à Gaëtan."
  if (m.includes('rate limit')) return "Trop d'e-mails envoyés : réessaie un peu plus tard."
  if (m.includes('password should be')) return 'Le mot de passe doit faire au moins 6 caractères.'
  if (m.includes('valid email') || m.includes('invalid format')) return "Cette adresse e-mail n'a pas l'air valide."
  return message
}

export function AccountScreen() {
  const { session, recovering, ready } = useAccount()
  const navigate = useNavigate()
  // Connexion réussie (mot de passe, lien e-mail, Google) : direction la carte
  useEffect(() => {
    if (session && !recovering && consumeLoginRedirect()) navigate('/')
  }, [session, recovering, navigate])
  return (
    <div className="screen screen-page account">
      <header className="page-header carnet-header">
        <div>
          <h1>Mon compte</h1>
          <p className="hand">Facultatif : pour retrouver ton carnet sur un autre téléphone.</p>
        </div>
        <Mascot mood={session ? 'happy' : 'idle'} size={64} />
      </header>
      {!ready ? null : recovering && session ? <NewPassword /> : session ? <LoggedIn email={session.user.email} /> : <Login />}
      {!isInstalled && <InstallCard />}
    </div>
  )
}

function LoggedIn({ email }: { email?: string }) {
  const found = useFound()
  const sync = useSyncStatus()
  const n = Object.keys(found).length
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

function Login() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(authReturnError ?? '')
  const [info, setInfo] = useState('')
  const [google, setGoogle] = useState(false)

  useEffect(() => {
    void enabledProviders().then((p) => setGoogle(Boolean(p.google)))
  }, [])

  const switchTo = (m: Mode) => {
    setMode(m)
    setError('')
    setInfo('')
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setInfo('')
    const opts = { emailRedirectTo: AUTH_REDIRECT }
    let err: { message: string } | null = null
    if (mode === 'login') {
      expectLogin()
      err = (await supabase.auth.signInWithPassword({ email, password })).error
    } else if (mode === 'signup') {
      expectLogin()
      const r = await supabase.auth.signUp({ email, password, options: opts })
      err = r.error
      if (!err && !r.data.session) setInfo('Presque fini ! Clique sur le lien reçu par e-mail pour confirmer ton adresse.')
    } else if (mode === 'magic') {
      err = (await supabase.auth.signInWithOtp({ email, options: opts })).error
      if (!err) setInfo('C’est parti ! Ouvre le lien reçu par e-mail sur ce téléphone pour te connecter.')
    } else {
      err = (await supabase.auth.resetPasswordForEmail(email, { redirectTo: AUTH_REDIRECT })).error
      if (!err) setInfo('Ouvre le lien reçu par e-mail pour choisir un nouveau mot de passe.')
    }
    if (err) {
      expectLogin(false)
      setError(frError(err.message))
    }
    setBusy(false)
  }

  const titles: Record<Mode, string> = {
    login: 'Se connecter',
    signup: 'Créer un compte',
    magic: 'Recevoir un lien de connexion',
    reset: 'Mot de passe oublié',
  }

  return (
    <div className="account-card">
      {google && (
        <>
          <button
            className="btn btn-ghost btn-big"
            onClick={() => void supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: AUTH_REDIRECT } })}
          >
            <GoogleLogo /> Continuer avec Google
          </button>
          <p className="account-or">ou</p>
        </>
      )}

      <form onSubmit={submit}>
        <h2>{titles[mode]}</h2>
        <label>
          E-mail
          <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {(mode === 'login' || mode === 'signup') && (
          <label>
            Mot de passe
            <input
              type="password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        )}
        {error && <p className="error">{error}</p>}
        {info && <p className="account-info">{info}</p>}
        <button className="btn btn-primary btn-big" disabled={busy}>
          {mode === 'login' ? 'Se connecter' : mode === 'signup' ? 'Créer mon compte' : 'Envoyer le lien'}
        </button>
      </form>

      <div className="account-links">
        {mode !== 'login' && (
          <button className="link" onClick={() => switchTo('login')}>
            J'ai déjà un compte
          </button>
        )}
        {mode !== 'signup' && (
          <button className="link" onClick={() => switchTo('signup')}>
            Créer un compte
          </button>
        )}
        {mode !== 'magic' && (
          <button className="link" onClick={() => switchTo('magic')}>
            Sans mot de passe (lien par e-mail)
          </button>
        )}
        {mode === 'login' && (
          <button className="link" onClick={() => switchTo('reset')}>
            Mot de passe oublié ?
          </button>
        )}
      </div>
    </div>
  )
}

function NewPassword() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    setBusy(false)
    if (err) setError(frError(err.message))
    else recoveryDone()
  }
  return (
    <form className="account-card" onSubmit={submit}>
      <h2>Nouveau mot de passe</h2>
      <label>
        Mot de passe
        <input type="password" autoComplete="new-password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p className="error">{error}</p>}
      <button className="btn btn-primary btn-big" disabled={busy}>
        Enregistrer
      </button>
    </form>
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
