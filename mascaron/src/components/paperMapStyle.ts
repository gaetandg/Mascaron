import type { StyleSpecification, LayerSpecification } from 'maplibre-gl'

// Transforme le style OpenFreeMap « liberty » en carte façon papier ancien / sépia,
// assortie à la direction artistique « carnet d'explorateur ».

const C = {
  paper: '#EFE3C8',
  green: '#D5D2A6',
  greenLine: '#C9C394',
  residential: '#EADCBF',
  civic: '#E7D8B9',
  water: '#B7C8C3',
  building: '#E0CFAE',
  buildingLine: '#CDB892',
  casing: '#D2BF98',
  street: '#FBF6EA',
  major: '#F6E6C2',
  motorway: '#EFD6A2',
  rail: '#B8A788',
  text: '#5A4632',
  halo: '#F3E9D2',
}

const HIDDEN = /^(poi_|highway-shield|road_shield|road_one_way|building-3d|natural_earth|aeroway)/

function roadColor(id: string) {
  if (id.includes('casing')) return C.casing
  if (id.includes('rail')) return C.rail
  if (id.includes('motorway')) return C.motorway
  if (/secondary|tertiary|trunk|primary|link/.test(id)) return C.major
  return C.street
}

function paintFor(layer: LayerSpecification): Record<string, unknown> | null {
  const id = layer.id
  switch (layer.type) {
    case 'background':
      return { 'background-color': C.paper }
    case 'fill':
      if (id === 'water') return { 'fill-color': C.water }
      if (id === 'building') return { 'fill-color': C.building, 'fill-outline-color': C.buildingLine }
      if (/park|wood|grass|wetland|pitch|track|cemetery/.test(id)) return { 'fill-color': C.green, 'fill-outline-color': C.greenLine }
      if (id === 'landuse_residential') return { 'fill-color': C.residential }
      if (/hospital|school|sand|ice/.test(id)) return { 'fill-color': C.civic }
      return null
    case 'line':
      if (id.startsWith('waterway')) return { 'line-color': C.water }
      if (id === 'park_outline') return { 'line-color': C.greenLine }
      if (id.startsWith('boundary')) return { 'line-color': C.rail }
      if (/^(road|tunnel|bridge)_/.test(id)) return { 'line-color': roadColor(id) }
      return null
    case 'symbol':
      return { 'text-color': C.text, 'text-halo-color': C.halo }
    default:
      return null
  }
}

export function paperize(style: StyleSpecification): StyleSpecification {
  return {
    ...style,
    layers: style.layers.map((layer) => {
      if (HIDDEN.test(layer.id)) return { ...layer, layout: { ...layer.layout, visibility: 'none' } } as LayerSpecification
      const paint = paintFor(layer)
      return paint ? ({ ...layer, paint: { ...layer.paint, ...paint } } as LayerSpecification) : layer
    }),
  }
}
