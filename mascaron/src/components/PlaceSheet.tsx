import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Footprints, X } from 'lucide-react'
import type { Place } from '../types'
import { CATEGORIES } from '../categories'
import { markFound, unmarkFound } from '../data/progress'
import { useAccount } from '../data/account'
import { FocusPhoto, PhotoCredit } from './FocusPhoto'
import { Mascot } from './Mascot'
import { Difficulty, Stamp } from './Stamp'

interface Props {
  place: Place
  foundAt?: string
  onClose: () => void
}

// Proposition de compte : une seule fois, au premier lieu trouvé sans être connecté
const ASKED_KEY = 'mascaron.loginAsked'
function alreadyAsked() {
  try {
    return localStorage.getItem(ASKED_KEY) === '1'
  } catch {
    return true
  }
}
function rememberAsked() {
  try {
    localStorage.setItem(ASKED_KEY, '1')
  } catch {
    // tant pis : on pourra redemander
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export function PlaceSheet({ place, foundAt, onClose }: Props) {
  return (
    <div className="sheet" role="dialog" aria-label={place.title}>
      <button className="sheet-close" onClick={onClose} aria-label="Fermer">
        <X size={18} />
      </button>
      <GameContent place={place} foundAt={foundAt} />
      {place.photo && <PhotoCredit photo={place.photo} />}
    </div>
  )
}

function CategoryLine({ place }: { place: Place }) {
  const { Icon, label } = CATEGORIES[place.category]
  return (
    <p className="sheet-cat">
      <Icon size={15} aria-hidden />
      {label}
      <Difficulty level={place.difficulty} />
      {place.toVerify && <span className="badge-verify">à vérifier</span>}
    </p>
  )
}

function directionsUrl(place: Place) {
  return `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&travelmode=walking`
}

function GameContent({ place, foundAt }: { place: Place; foundAt?: string }) {
  const [hintsShown, setHintsShown] = useState(0)
  const [zoomed, setZoomed] = useState(true)
  const [justFound, setJustFound] = useState(false)
  const [askLogin, setAskLogin] = useState(false)
  const { session, ready } = useAccount()
  const isFound = Boolean(foundAt)
  const canZoom = Boolean(place.photo?.focus && place.photo.focus.zoom > 1)

  function handleFound() {
    markFound(place.id)
    setJustFound(true)
    if (ready && !session && !alreadyAsked()) {
      setAskLogin(true)
      rememberAsked()
    }
    setZoomed(false)
  }

  const bubble = isFound
    ? justFound
      ? 'Bravo, tu l’as trouvé ! Lis vite ce que je sais sur cet endroit…'
      : null
    : hintsShown === 0
      ? place.hints.length
        ? 'Psst… si tu sèches, je connais quelques indices.'
        : 'Ouvre grand les yeux, le détail est tout près !'
      : null

  return (
    <>
      <CategoryLine place={place} />
      <h2>{isFound ? place.title : 'Lieu mystère'}</h2>

      {place.photo ? (
        <div className="sheet-photo-wrap">
          <FocusPhoto
            photo={place.photo}
            zoomed={!isFound && zoomed}
            fit="contain"
            className="sheet-photo"
            onClick={() => !isFound && canZoom && setZoomed((z) => !z)}
          />
          {isFound && <Stamp date={foundAt!} animate={justFound} />}
          {!isFound && canZoom && (
            <p className="photo-note">{zoomed ? 'touche la photo pour dézoomer' : 'touche la photo pour revoir le détail'}</p>
          )}
        </div>
      ) : (
        isFound && (
          <div className="sheet-nophoto">
            <Stamp date={foundAt!} animate={justFound} />
          </div>
        )
      )}

      {!isFound && <p className="challenge">{place.challenge}</p>}

      {(bubble || hintsShown > 0) && (
        <div className="mascot-row">
          <div className="mascot-id">
            <Mascot mood={isFound ? 'happy' : hintsShown > 0 ? 'hint' : 'idle'} size={64} />
            <span className="mascot-name">Mascaron</span>
          </div>
          <div className="bubble" aria-label="Mascaron dit">
            {bubble && <p>{bubble}</p>}
            {!isFound &&
              place.hints.slice(0, hintsShown).map((h, i) => (
                <p key={i} className={i === hintsShown - 1 ? 'hint-latest' : 'hint-old'}>
                  {h}
                </p>
              ))}
            {!isFound && hintsShown < place.hints.length && (
              <button className="link" onClick={() => setHintsShown((n) => n + 1)}>
                {hintsShown === 0 ? 'Un indice, s’il te plaît !' : 'Encore un indice'}
              </button>
            )}
          </div>
        </div>
      )}

      {!isFound ? (
        <>
          <div className="sheet-actions">
            <a className="btn btn-ghost" href={directionsUrl(place)} target="_blank" rel="noreferrer">
              <Footprints size={17} aria-hidden /> Y aller
            </a>
            <button className="btn btn-primary btn-grow" onClick={handleFound}>
              J'ai trouvé !
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="story">
            <p className="story-title">Le savais-tu ?</p>
            <p>{place.story}</p>
          </div>
          {askLogin && (
            <div className="ask-login">
              <p>
                <b>Garde ton carnet précieusement !</b> Avec un compte (facultatif), tes trouvailles sont sauvegardées et tu
                les retrouves sur un autre téléphone.
              </p>
              <div className="ask-login-actions">
                <button className="link" onClick={() => setAskLogin(false)}>
                  Plus tard
                </button>
                <Link className="btn btn-primary" to="/compte">
                  Me connecter
                </Link>
              </div>
            </div>
          )}
          <p className="found-note">
            Trouvé le {formatDate(foundAt!)} ·{' '}
            <button className="link" onClick={() => unmarkFound(place.id)}>
              remettre à trouver
            </button>
          </p>
        </>
      )}
    </>
  )
}
