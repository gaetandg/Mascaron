import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { exportLocalPlaces, importPlaces, usePlaces } from '../data/places'
import { CATEGORIES } from '../categories'

export function CreatorListScreen() {
  const places = usePlaces()
  const fileRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function handleExport() {
    const json = await exportLocalPlaces()
    const blob = new Blob([json], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `mascaron-lieux-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  async function handleImport(file: File) {
    try {
      const n = await importPlaces(await file.text())
      setMessage(`${n} lieu(x) importé(s).`)
    } catch (e) {
      setMessage(`Import impossible : ${(e as Error).message}`)
    }
  }

  return (
    <div className="screen screen-page">
      <header className="page-header">
        <h1>Mode créateur</h1>
        <p className="muted">Ajoute et modifie les lieux du jeu.</p>
      </header>

      <Link className="btn btn-primary btn-big" to="/creer/nouveau">
        ＋ Nouveau lieu
      </Link>

      <ul className="creator-list">
        {places.map((p) => (
          <li key={p.id}>
            <Link to={`/creer/${p.id}`}>
              {(() => {
                const { Icon } = CATEGORIES[p.category]
                return <Icon size={18} className="creator-icon" aria-hidden />
              })()}
              <span className="creator-title">{p.title || 'Sans titre'}</span>
              {p.toVerify && <span className="badge-verify">à vérifier</span>}
            </Link>
          </li>
        ))}
      </ul>

      <section className="creator-tools">
        <h2>Sauvegarde</h2>
        <p className="muted small">
          Pour l'instant, les lieux que tu crées restent dans ce navigateur. Exporte-les pour les sauvegarder ou les
          transférer sur un autre appareil (en attendant la synchronisation en ligne).
        </p>
        <div className="sheet-actions">
          <button className="btn btn-ghost" onClick={handleExport}>
            Exporter mes lieux
          </button>
          <button className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
            Importer un fichier
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])}
          />
        </div>
        {message && <p className="small">{message}</p>}
      </section>
    </div>
  )
}
