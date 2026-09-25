import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { CategoryId, Photo, Place } from '../types'
import { CATEGORIES, CATEGORY_IDS } from '../categories'
import { deletePlace, newPlaceId, savePlace, usePlaces } from '../data/places'
import { MapView } from '../components/MapView'
import { FocusPhoto } from '../components/FocusPhoto'

const MAX_IMAGE_SIZE = 1400

/** Réduit une image choisie sur l'appareil pour la stocker légèrement. */
function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(img.src)
      resolve(canvas.toDataURL('image/jpeg', 0.82))
    }
    img.onerror = () => reject(new Error("Impossible de lire l'image"))
    img.src = URL.createObjectURL(file)
  })
}

function emptyPlace(): Place {
  return {
    id: newPlaceId(),
    title: '',
    category: 'facade',
    lat: NaN,
    lng: NaN,
    challenge: '',
    hints: [''],
    difficulty: 2,
    story: '',
    toVerify: true,
    origin: 'local',
    createdAt: new Date().toISOString(),
  }
}

export function CreatorEditScreen() {
  const { id } = useParams()
  const places = usePlaces()
  const navigate = useNavigate()
  const existing = useMemo(() => places.find((p) => p.id === id), [places, id])
  const isNew = id === 'nouveau'

  if (!isNew && !existing) {
    return (
      <div className="screen screen-page">
        <p>Lieu introuvable.</p>
      </div>
    )
  }
  return <Editor key={id} initial={existing ?? emptyPlace()} isNew={isNew} onDone={() => navigate('/creer')} />
}

function Editor({ initial, isNew, onDone }: { initial: Place; isNew: boolean; onDone: () => void }) {
  const places = usePlaces()
  const [p, setP] = useState<Place>({ ...initial, hints: initial.hints.length ? initial.hints : [''] })
  const [photoUrlInput, setPhotoUrlInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const hasPoint = Number.isFinite(p.lat) && Number.isFinite(p.lng)
  const others = places.filter((x) => x.id !== p.id)
  const update = (patch: Partial<Place>) => setP((cur) => ({ ...cur, ...patch }))
  const updatePhoto = (patch: Partial<Photo>) =>
    setP((cur) => (cur.photo ? { ...cur, photo: { ...cur.photo, ...patch } } : cur))

  function useMyPosition() {
    navigator.geolocation.getCurrentPosition(
      (pos) => update({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setError("Position indisponible (autorise la localisation dans le navigateur)."),
      { enableHighAccuracy: true },
    )
  }

  async function onFile(file: File) {
    try {
      const url = await resizeImage(file)
      update({ photo: { url, author: '', license: '', focus: { x: 50, y: 50, zoom: 1 } } })
    } catch (e) {
      setError((e as Error).message)
    }
  }

  function setFocusFromClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10
    updatePhoto({ focus: { x, y, zoom: p.photo?.focus?.zoom && p.photo.focus.zoom > 1 ? p.photo.focus.zoom : 3 } })
  }

  async function save() {
    if (!p.title.trim()) return setError('Il manque un titre.')
    if (!hasPoint) return setError('Place le lieu sur la carte.')
    setSaving(true)
    await savePlace({ ...p, hints: p.hints.map((h) => h.trim()).filter(Boolean) })
    onDone()
  }

  async function remove() {
    const msg =
      p.origin === 'seed'
        ? 'Annuler tes modifications et revenir à la version d’origine de ce lieu ?'
        : 'Supprimer définitivement ce lieu ?'
    if (!confirm(msg)) return
    await deletePlace(p.id)
    onDone()
  }

  return (
    <div className="screen screen-page editor">
      <header className="page-header">
        <h1>{isNew ? 'Nouveau lieu' : 'Modifier le lieu'}</h1>
      </header>

      <section>
        <h2>1. Emplacement</h2>
        <p className="muted small">Touche la carte à l'endroit exact du lieu.</p>
        <div className="editor-map">
          <MapView
            places={others}
            onMapClick={(ll) => update({ lat: ll.lat, lng: ll.lng })}
            draftPoint={hasPoint ? { lat: p.lat, lng: p.lng } : null}
          />
        </div>
        <div className="row">
          <button className="btn btn-ghost" onClick={useMyPosition}>
            📍 Ma position actuelle
          </button>
          <span className="muted small">{hasPoint ? `${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}` : 'Aucun point'}</span>
        </div>
      </section>

      <section>
        <h2>2. Le lieu</h2>
        <label>
          Titre (révélé une fois trouvé)
          <input value={p.title} onChange={(e) => update({ title: e.target.value })} placeholder="Le mascaron qui tire la langue" />
        </label>
        <label>
          Catégorie
          <select value={p.category} onChange={(e) => update({ category: e.target.value as CategoryId })}>
            {CATEGORY_IDS.map((c) => (
              <option key={c} value={c}>
                {CATEGORIES[c].label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Difficulté
          <select
            value={p.difficulty ?? 2}
            onChange={(e) => update({ difficulty: Number(e.target.value) as 1 | 2 | 3 })}
          >
            <option value={1}>Facile : visible de loin</option>
            <option value={2}>Moyen : il faut chercher un peu</option>
            <option value={3}>Difficile : un petit détail</option>
          </select>
        </label>
        <label>
          Le défi (ce qu'il faut repérer)
          <textarea
            rows={3}
            value={p.challenge}
            onChange={(e) => update({ challenge: e.target.value })}
            placeholder="Sur cette façade, un visage tire la langue. Trouve-le !"
          />
        </label>
      </section>

      <section>
        <h2>3. Photo</h2>
        {!p.photo ? (
          <>
            <label className="btn btn-ghost file-btn">
              📷 Choisir une photo
              <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
            </label>
            <div className="row">
              <input
                value={photoUrlInput}
                onChange={(e) => setPhotoUrlInput(e.target.value)}
                placeholder="…ou colle l'adresse d'une image (Wikimedia, Mapillary)"
              />
              <button
                className="btn btn-ghost"
                disabled={!photoUrlInput.trim()}
                onClick={() => update({ photo: { url: photoUrlInput.trim(), focus: { x: 50, y: 50, zoom: 1 } } })}
              >
                OK
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="muted small">Touche la photo à l'endroit du détail à trouver, puis règle le zoom.</p>
            <div className="editor-photos">
              <div>
                <p className="small">Photo entière</p>
                <div className="editor-full" onClick={setFocusFromClick}>
                  <img src={p.photo.url} alt="" draggable={false} />
                  {p.photo.focus && (
                    <span className="focus-dot" style={{ left: `${p.photo.focus.x}%`, top: `${p.photo.focus.y}%` }} />
                  )}
                </div>
              </div>
              <div>
                <p className="small">Ce que voit le joueur</p>
                <FocusPhoto photo={p.photo} zoomed className="editor-photo" />
              </div>
            </div>
            <label>
              Zoom sur le détail : ×{p.photo.focus?.zoom ?? 1}
              <input
                type="range"
                min={1}
                max={6}
                step={0.5}
                value={p.photo.focus?.zoom ?? 1}
                onChange={(e) =>
                  updatePhoto({ focus: { x: p.photo?.focus?.x ?? 50, y: p.photo?.focus?.y ?? 50, zoom: Number(e.target.value) } })
                }
              />
            </label>
            <div className="grid-2">
              <label>
                Auteur de la photo
                <input value={p.photo.author ?? ''} onChange={(e) => updatePhoto({ author: e.target.value })} placeholder="Moi / nom Wikimedia" />
              </label>
              <label>
                Licence
                <input value={p.photo.license ?? ''} onChange={(e) => updatePhoto({ license: e.target.value })} placeholder="CC BY-SA 4.0, perso…" />
              </label>
            </div>
            <label>
              Lien vers la source (facultatif)
              <input value={p.photo.sourceUrl ?? ''} onChange={(e) => updatePhoto({ sourceUrl: e.target.value })} placeholder="https://commons.wikimedia.org/…" />
            </label>
            <button className="btn btn-ghost" onClick={() => update({ photo: undefined })}>
              Retirer la photo
            </button>
          </>
        )}
      </section>

      <section>
        <h2>4. Indices</h2>
        <p className="muted small">Du plus vague au plus précis. Ils sont dévoilés un par un.</p>
        {p.hints.map((h, i) => (
          <div className="row" key={i}>
            <input
              value={h}
              onChange={(e) => update({ hints: p.hints.map((x, j) => (j === i ? e.target.value : x)) })}
              placeholder={`Indice ${i + 1}`}
            />
            <button className="btn btn-ghost" aria-label="Retirer l'indice" onClick={() => update({ hints: p.hints.filter((_, j) => j !== i) })}>
              ×
            </button>
          </div>
        ))}
        <button className="btn btn-ghost" onClick={() => update({ hints: [...p.hints, ''] })}>
          ＋ Ajouter un indice
        </button>
      </section>

      <section>
        <h2>5. L'anecdote</h2>
        <label>
          Dévoilée quand on a trouvé
          <textarea
            rows={5}
            value={p.story}
            onChange={(e) => update({ story: e.target.value })}
            placeholder="Ce visage représente…"
          />
        </label>
        <label className="check">
          <input type="checkbox" checked={Boolean(p.toVerify)} onChange={(e) => update({ toVerify: e.target.checked })} />À vérifier sur place
        </label>
      </section>

      {error && <p className="error">{error}</p>}

      <div className="editor-actions">
        <button className="btn btn-primary btn-big" onClick={save} disabled={saving}>
          Enregistrer
        </button>
        <button className="btn btn-ghost" onClick={onDone}>
          Annuler
        </button>
        {!isNew && (
          <button className="btn btn-danger" onClick={remove}>
            {p.origin === 'seed' ? 'Revenir à l’original' : 'Supprimer'}
          </button>
        )}
      </div>
    </div>
  )
}
