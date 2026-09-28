import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CATEGORIES, CATEGORY_IDS } from '../categories'
import type { CategoryId } from '../types'
import { MapView } from '../components/MapView'
import { PlaceSheet } from '../components/PlaceSheet'
import { usePlaces } from '../data/places'
import { useFound } from '../data/progress'

type Filter = 'all' | 'todo' | 'found'

export function MapScreen() {
  const places = usePlaces()
  const found = useFound()
  const [params, setParams] = useSearchParams()
  const selectedId = params.get('lieu')
  const [filter, setFilter] = useState<Filter>('all')
  // Types de lieux affichés (vide = tous)
  const [cats, setCats] = useState<CategoryId[]>([])
  const [legendOpen, setLegendOpen] = useState(false)

  const visible = useMemo(
    () =>
      places.filter(
        (p) =>
          (filter === 'all' ? true : filter === 'found' ? Boolean(found[p.id]) : !found[p.id]) &&
          (cats.length === 0 || cats.includes(p.category)),
      ),
    [places, found, filter, cats],
  )

  // Nombre de lieux trouvés / total pour chaque type présent sur la carte
  const byCategory = useMemo(
    () =>
      CATEGORY_IDS.map((id) => {
        const list = places.filter((p) => p.category === id)
        return { id, total: list.length, found: list.filter((p) => found[p.id]).length }
      }).filter((c) => c.total > 0),
    [places, found],
  )

  const toggleCat = (id: CategoryId) =>
    setCats((cur) => (cur.includes(id) ? cur.filter((c) => c !== id) : [...cur, id]))
  const selected = places.find((p) => p.id === selectedId)
  const foundCount = places.filter((p) => found[p.id]).length

  const select = useCallback(
    (id: string) => {
      setLegendOpen(false)
      setParams({ lieu: id })
    },
    [setParams],
  )
  const close = useCallback(() => {
    setLegendOpen(false)
    setParams({})
  }, [setParams])

  return (
    <div className="screen screen-map">
      <MapView places={visible} found={found} selectedId={selectedId} onSelect={select} onMapClick={close} />

      <div className="map-top">
        <div className="brand">
          <span className="brand-name">Mascaron</span>
          <span className="brand-score">
            <strong>{foundCount}</strong> / {places.length}
          </span>
        </div>
        <div className="chips">
          {(
            [
              ['all', 'Tous'],
              ['todo', 'À trouver'],
              ['found', 'Trouvés'],
            ] as const
          ).map(([id, label]) => (
            <button key={id} className={`chip ${filter === id ? 'chip-on' : ''}`} onClick={() => setFilter(id)}>
              {label}
            </button>
          ))}
          <button
            className={`chip chip-types ${cats.length ? 'chip-on' : ''}`}
            onClick={() => setLegendOpen((o) => !o)}
            aria-expanded={legendOpen}
          >
            Types{cats.length ? ` (${cats.length})` : ''}
            {legendOpen ? <ChevronUp size={14} aria-hidden /> : <ChevronDown size={14} aria-hidden />}
          </button>
        </div>

        {legendOpen && (
          <div className="legend">
            <div className="legend-keys">
              <span className="legend-key">
                <span className="mini-seal" aria-hidden /> à trouver
              </span>
              <span className="legend-key">
                <span className="mini-seal mini-seal-found" aria-hidden>
                  ✓
                </span>{' '}
                trouvé
              </span>
            </div>
            <ul className="legend-list">
              {byCategory.map(({ id, total, found: n }) => {
                const { Icon, label } = CATEGORIES[id]
                const on = cats.includes(id)
                return (
                  <li key={id}>
                    <button className={`legend-row ${on ? 'legend-row-on' : ''}`} onClick={() => toggleCat(id)} aria-pressed={on}>
                      <span className={`mini-seal ${n === total ? 'mini-seal-found' : ''}`} aria-hidden>
                        <Icon size={13} strokeWidth={2.4} />
                      </span>
                      <span className="legend-label">{label}</span>
                      <span className="legend-count">
                        {n}/{total}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            {cats.length > 0 && (
              <button className="link" onClick={() => setCats([])}>
                Afficher tous les types
              </button>
            )}
          </div>
        )}
      </div>

      {selected && <PlaceSheet key={selected.id} place={selected} foundAt={found[selected.id]} onClose={close} />}
    </div>
  )
}
