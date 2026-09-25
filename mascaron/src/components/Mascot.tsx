export type MascotMood = 'idle' | 'hint' | 'happy'

interface Props {
  mood?: MascotMood
  size?: number
  className?: string
}

/** Petit mascaron dessiné au trait : il souffle les indices et se réjouit quand on trouve. */
export function Mascot({ mood = 'idle', size = 56, className }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`mascot mascot-${mood} ${className ?? ''}`}
      role="img"
      aria-label="Mascaron, la mascotte"
      fill="none"
      stroke="var(--ink)"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Feuilles d'acanthe en guise de cheveux */}
      <path d="M22 46 C14 30 30 16 42 26" fill="var(--leaf)" />
      <path d="M36 26 C38 8 62 8 64 26" fill="var(--leaf)" />
      <path d="M58 26 C70 16 86 30 78 46" fill="var(--leaf)" />
      <path d="M26 36 q4 -2 6 2 M47 16 q3 3 0 6 M70 32 q-4 -1 -5 3" strokeWidth={1.8} />
      {/* Visage de pierre */}
      <path d="M22 48 C22 30 78 30 78 48 C80 70 68 90 50 90 C32 90 20 70 22 48 Z" fill="var(--stone-face)" />
      {/* Sourcils */}
      {mood === 'hint' ? (
        <>
          <path d="M33 46 Q39 43 45 46" />
          <path d="M55 43 Q61 37 67 41" />
        </>
      ) : (
        <>
          <path d="M33 45 Q39 41 45 45" />
          <path d="M55 45 Q61 41 67 45" />
        </>
      )}
      {/* Yeux */}
      {mood === 'happy' ? (
        <>
          <path d="M34 54 Q39 48 44 54" />
          <path d="M56 54 Q61 48 66 54" />
        </>
      ) : (
        <>
          <circle cx={39} cy={53} r={3.2} fill="var(--ink)" stroke="none" />
          <circle cx={61} cy={53} r={3.2} fill="var(--ink)" stroke="none" />
        </>
      )}
      {/* Nez */}
      <path d="M50 54 L46.5 65 Q50 67.5 53.5 65" />
      {/* Bouche */}
      {mood === 'happy' && <path d="M38 71 Q50 86 62 71 Z" fill="var(--wine)" />}
      {mood === 'hint' && <ellipse cx={51} cy={74} rx={4} ry={3.2} />}
      {mood === 'idle' && <path d="M41 73 Q50 79 59 73" />}
      {/* Joues */}
      <path d="M28 64 q3 2 6 0 M66 64 q3 2 6 0" strokeWidth={1.6} stroke="var(--wine)" opacity={0.5} />
    </svg>
  )
}
