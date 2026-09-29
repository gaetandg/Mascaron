export type CategoryId =
  | 'fontaine'
  | 'eglise'
  | 'monument'
  | 'sculpture'
  | 'facade'
  | 'plaque'
  | 'street-art'
  | 'nature'
  | 'memoire'
  | 'autre'

export type QuartierId =
  | 'nansouty'
  | 'saint-genes'
  | 'victoire'
  | 'saint-michel'
  | 'belcier'
  | 'centre'
  | 'meriadeck'
  | 'saint-seurin'
  | 'cauderan'
  | 'chartrons'
  | 'bacalan'
  | 'bastide'
  | 'ailleurs'

export interface Photo {
  /** URL de l'image (chemin public, URL distante ou data URL pour les lieux créés localement) */
  url: string
  author?: string
  license?: string
  /** Page d'origine de la photo (Wikimedia, Mapillary, photo perso…) */
  sourceUrl?: string
  /** Zoom sur le détail à trouver : centre en % de l'image et facteur de zoom (1 = pas de zoom) */
  focus?: { x: number; y: number; zoom: number }
}

export interface Place {
  id: string
  title: string
  category: CategoryId
  /** Quartier (pour ranger le carnet). Absent : déduit du lieu de départ le plus proche. */
  quartier?: QuartierId
  lat: number
  lng: number
  /** Ce qu'il faut repérer une fois sur place */
  challenge: string
  photo?: Photo
  /** Indices révélés un par un, du plus vague au plus précis */
  hints: string[]
  /** 1 = facile (visible de loin), 2 = moyen, 3 = petit détail difficile */
  difficulty?: 1 | 2 | 3
  /** Anecdote dévoilée quand on a trouvé */
  story: string
  /** Contenu pas encore vérifié sur le terrain */
  toVerify?: boolean
  /** 'seed' = livré avec l'app, 'local' = créé sur cet appareil */
  origin: 'seed' | 'local'
  createdAt: string
}
