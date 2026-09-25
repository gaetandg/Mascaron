import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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

  const visible = useMemo(
    () =>
      places.filter((p) =>
        filter === 'all' ? true : filter === 'found' ? Boolean(found[p.id]) : !found[p.id],
      ),
    [places, found, filter],
  )
  const selected = places.find((p) => p.id === selectedId)
  const foundCount = places.filter((p) => found[p.id]).length

  const select = useCallback((id: string) => setParams({ lieu: id }), [setParams])
  const close = useCallback(() => setParams({}), [setParams])

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
        </div>
      </div>

      {selected && <PlaceSheet key={selected.id} place={selected} foundAt={found[selected.id]} onClose={close} />}
    </div>
  )
}
