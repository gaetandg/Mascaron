interface Props {
  date: string
  /** Animation « coup de tampon » au moment où l'on trouve */
  animate?: boolean
  size?: 'big' | 'small'
}

/** Tampon « Trouvé » apposé sur la photo, comme dans un carnet de voyage. */
export function Stamp({ date, animate, size = 'big' }: Props) {
  const d = new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })
  return (
    <div className={`stamp stamp-${size} ${animate ? 'stamp-animate' : ''}`} aria-label={`Trouvé le ${d}`}>
      <span className="stamp-word">Trouvé</span>{' '}
      <span className="stamp-date">{d}</span>
    </div>
  )
}

export function Difficulty({ level }: { level?: 1 | 2 | 3 }) {
  if (!level) return null
  const labels = { 1: 'Facile', 2: 'Moyen', 3: 'Difficile' }
  return (
    <span className="difficulty" title={`Difficulté : ${labels[level]}`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= level ? 'dot dot-on' : 'dot'} />
      ))}
      <span className="difficulty-label">{labels[level]}</span>
    </span>
  )
}
