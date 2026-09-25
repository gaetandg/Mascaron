import {
  BookMarked,
  Church,
  Drama,
  Droplets,
  Flower2,
  House,
  Landmark,
  type LucideIcon,
  Signpost,
  SprayCan,
  TreeDeciduous,
} from 'lucide-react'
import type { CategoryId } from './types'

export const CATEGORIES: Record<CategoryId, { label: string; Icon: LucideIcon }> = {
  sculpture: { label: 'Mascarons & sculptures', Icon: Drama },
  facade: { label: 'Façades & échoppes', Icon: House },
  eglise: { label: 'Églises & clochers', Icon: Church },
  fontaine: { label: 'Fontaines', Icon: Droplets },
  plaque: { label: 'Plaques & traces du passé', Icon: Signpost },
  monument: { label: 'Monuments', Icon: Landmark },
  'street-art': { label: 'Street art', Icon: SprayCan },
  nature: { label: 'Nature', Icon: TreeDeciduous },
  autre: { label: 'Curiosités', Icon: BookMarked },
  memoire: { label: 'Lieux de mémoire', Icon: Flower2 },
}

export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[]
