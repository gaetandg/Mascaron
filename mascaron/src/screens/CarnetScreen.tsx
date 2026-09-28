import { Link } from 'react-router-dom'
import { usePlaces } from '../data/places'
import { useFound } from '../data/progress'
import { CATEGORIES, CATEGORY_IDS } from '../categories'
import { FocusPhoto } from '../components/FocusPhoto'
import { Mascot } from '../components/Mascot'
import { Stamp } from '../components/Stamp'

export function CarnetScreen() {
  const places = usePlaces()
  const found = useFound()
  const foundPlaces = places.filter((p) => found[p.id]).sort((a, b) => found[b.id].localeCompare(found[a.id]))
  const todo = places.filter((p) => !found[p.id])

  const byCategory = CATEGORY_IDS.map((c) => ({
    c,
    total: places.filter((p) => p.category === c).length,
    done: foundPlaces.filter((p) => p.category === c).length,
  })).filter((x) => x.total > 0)

  return (
    <div className="screen screen-page carnet">
      <header className="page-header carnet-header">
        <div>
          <h1>Mon carnet d'explorateur</h1>
          <p className="hand">
            {foundPlaces.length} lieu{foundPlaces.length > 1 ? 'x' : ''} trouvé{foundPlaces.length > 1 ? 's' : ''} sur {places.length}
          </p>
        </div>
        <Mascot mood={foundPlaces.length > 0 ? 'happy' : 'idle'} size={64} />
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

      {foundPlaces.length === 0 && (
        <div className="empty">
          <p>Ton carnet attend son premier tampon.</p>
          <Link className="btn btn-primary" to="/">
            Partir explorer
          </Link>
        </div>
      )}

      <ul className="polaroids">
        {foundPlaces.map((p) => {
          const { Icon } = CATEGORIES[p.category]
          return (
            <li key={p.id}>
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
                  <Stamp date={found[p.id]} size="small" />
                </div>
                <span className="polaroid-title">{p.title}</span>
              </Link>
            </li>
          )
        })}
        {todo.map((p) => {
          const { Icon, label } = CATEGORIES[p.category]
          return (
            <li key={p.id}>
              <Link to={`/?lieu=${p.id}`} className="polaroid polaroid-empty" aria-label={`Lieu mystère : ${label}`}>
                <div className="polaroid-photo">
                  <div className="polaroid-img polaroid-icon">
                    <span className="mystery">?</span>
                    <Icon size={18} aria-hidden />
                  </div>
                </div>
                <span className="polaroid-title">À découvrir</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
