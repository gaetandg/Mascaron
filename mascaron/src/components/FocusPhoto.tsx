import { useLayoutEffect, useRef, useState } from 'react'
import type { Photo } from '../types'

interface Props {
  photo: Photo
  /** true = zoom sur le détail à trouver, false = photo entière */
  zoomed: boolean
  /** Cadrage quand on n'est pas zoomé : 'cover' remplit le cadre, 'contain' montre toute la photo */
  fit?: 'cover' | 'contain'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

/**
 * Photo qui peut être zoomée sur un point précis (le détail à trouver).
 * Le point (focus.x, focus.y) est exprimé en % de l'image d'origine,
 * quel que soit le format du cadre.
 */
export function FocusPhoto({ photo, zoomed, fit = 'cover', className, onClick }: Props) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [boxRatio, setBoxRatio] = useState(4 / 3)
  const [imgRatio, setImgRatio] = useState<number | null>(null)

  useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const update = () => el.clientHeight && setBoxRatio(el.clientWidth / el.clientHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const f = photo.focus ?? { x: 50, y: 50, zoom: 1 }
  let imgStyle: React.CSSProperties = { objectFit: fit }
  let boxStyle: React.CSSProperties | undefined

  if (zoomed && imgRatio && f.zoom > 1) {
    // Taille de l'image (en % du cadre) pour couvrir le cadre, multipliée par le zoom
    const wider = imgRatio > boxRatio
    const w = (wider ? imgRatio / boxRatio : 1) * f.zoom * 100
    const h = (wider ? 1 : boxRatio / imgRatio) * f.zoom * 100
    // On place le point à trouver au centre du cadre, sans sortir de l'image
    const left = clamp(50 - (f.x / 100) * w, 100 - w, 0)
    const top = clamp(50 - (f.y / 100) * h, 100 - h, 0)
    imgStyle = { position: 'absolute', width: `${w}%`, height: `${h}%`, left: `${left}%`, top: `${top}%`, maxWidth: 'none' }
  } else if (fit === 'contain' && imgRatio) {
    // Photo entière : le cadre prend la forme de la photo (dans des limites raisonnables), sans bandes vides
    // (pour une photo en hauteur, le cadre rétrécit en largeur plutôt que de devenir immense)
    const ratio = clamp(imgRatio, 0.6, 1.9)
    boxStyle = { aspectRatio: String(ratio), width: `min(100%, calc(62vh * ${ratio.toFixed(3)}))`, marginInline: 'auto' }
  }

  return (
    <div ref={boxRef} className={`focus-photo ${className ?? ''}`} style={boxStyle} onClick={onClick}>
      <img
        src={photo.url}
        alt=""
        draggable={false}
        style={imgStyle}
        onLoad={(e) => setImgRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
      />
    </div>
  )
}

export function PhotoCredit({ photo }: { photo: Photo }) {
  if (!photo.author && !photo.license) return null
  const text = [photo.author, photo.license].filter(Boolean).join(' · ')
  return (
    <p className="credit">
      Photo :{' '}
      {photo.sourceUrl ? (
        <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
          {text}
        </a>
      ) : (
        text
      )}
    </p>
  )
}
