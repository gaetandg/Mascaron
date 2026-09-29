import { Link } from 'react-router-dom'
import { usePlaces } from '../data/places'
import { useFound } from '../data/progress'
import { CATEGORIES, CATEGORY_IDS } from '../categories'
import { QUARTIERS, quartierOf } from '../quartiers'
import { FocusPhoto } from '../components/FocusPhoto'
import { Mascot } from '../components/Mascot'
import { Stamp } from '../components/Stamp'
import type { Place } from '../types'

export function CarnetScreen() {
  const places = usePlaces()
  const found = useFound()
  const foundCount = places.filter((p) => found[p.id]).length

  const byCategory = CATEGORY_IDS.map((c) => ({
    c,
    total: places.filter((p) => p.category === c).length,
    done: places.filter((p) => p.category === c && found[p.id]).length,
  })).filter((x) => x.total > 0)

  // Un album par quartier : chaque lieu garde toujours sa case (même ordre),
  // trouvé ou pas, pour voir les trous qui restent à remplir.
  const sections = QUARTIERS.map((q) => {
    const list = places.filter((p) => quartierOf(p) === q.id)
    return { ...q, list, done: list.filter((p) => found[p.id]).length }
  }).filter((s) => s.list.length > 0)

  const goTo = (id: string) => document.getElementById(`quartier-${id}`)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="screen screen-page carnet">
      <header className="page-header carnet-header">
        <div>
          <h1>Mon carnet d'explorateur</h1>
          <p className="hand">
            {foundCount} lieu{foundCount > 1 ? 'x' : ''} trouvé{foundCount > 1 ? 's' : ''} sur {places.length}
          </p>
        </div>
        <Mascot mood={foundCount > 0 ? 'happy' : 'idle'} size={64} />
      </header>

      <ul className="collection">
        {byCategory.map(({ c, total, done }) => {
          const { Icon, label } = CATEGORIES[c]
          return (
            <li key={c} className={done === total ? 'collection-done' : ''} title={label}>
              <Icon size={16} aria-hidden />
              <span>
                {done}/{total}
              </span>
            </li>
          )
        })}
      </ul>

      {foundCount === 0 && (
        <div className="empty">
          <p>Ton carnet attend son premier tampon.</p>
          <Link className="btn btn-primary" to="/">
            Partir explorer
          </Link>
        </div>
      )}

      <nav className="quartier-nav" aria-label="Quartiers">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            className={s.done === s.list.length ? 'quartier-done' : ''}
            onClick={() => goTo(s.id)}
          >
            {s.label} <b>{s.done}/{s.list.length}</b>
          </button>
        ))}
      </nav>

      {sections.map((s) => (
        <section key={s.id} id={`quartier-${s.id}`} className="quartier">
          <h2 className="quartier-title">
            <span>{s.label}</span>
            <span className={`quartier-count${s.done === s.list.length ? ' quartier-count-done' : ''}`}>
              {s.done === s.list.length ? 'Complet !' : `${s.done}/${s.list.length}`}
            </span>
          </h2>
          <ul className="polaroids">
            {s.list.map((p) => (found[p.id] ? <FoundCard key={p.id} place={p} date={found[p.id]} /> : <EmptyCard key={p.id} place={p} />))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function FoundCard({ place: p, date }: { place: Place; date: string }) {
  const { Icon } = CATEGORIES[p.category]
  return (
    <li>
      <Link to={`/?lieu=${p.id}`} className="polaroid">
        <span className="tape" aria-hidden />
        <div className="polaroid-photo">
          {p.photo ? (
            <FocusPhoto photo={p.photo} zoomed={false} className="polaroid-img" />
          ) : (
            // Pas encore de photo : une illustration du type de lieu, sur un fond bien différent des cases « à découvrir »
            <div className="polaroid-img polaroid-illu">
              <Icon size={54} strokeWidth={1.3} aria-hidden />
            </div>
          )}
          <Stamp date={date} size="small" />
        </div>
        <span className="polaroid-title">{p.title}</span>
      </Link>
    </li>
  )
}

// Case vide : aucun indice, juste un point d'interrogation (un clic montre le lieu sur la carte)
function EmptyCard({ place: p }: { place: Place }) {
  return (
    <li>
      <Link to={`/?lieu=${p.id}`} className="polaroid polaroid-empty" aria-label="Lieu mystère, à découvrir">
        <div className="polaroid-photo">
          <div className="polaroid-img polaroid-icon">
            <span className="mystery">?</span>
          </div>
        </div>
        <span className="polaroid-title">À découvrir</span>
      </Link>
    </li>
  )
}
