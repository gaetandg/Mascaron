import type { Place } from '../types'
import { SEED_PLACES } from './seed'

// Les lieux sont dans le code (seed.ts) : c'est Claude qui les ajoute et les corrige.
// Le jour où les joueurs pourront proposer des lieux, seule cette couche changera.
export function usePlaces(): Place[] {
  return SEED_PLACES
}
