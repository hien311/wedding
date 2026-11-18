export const PHOTO_IDS = [
  'MIN04060',
  'MIN04114',
  'MIN04154',
  'MIN04164',
  'MIN04177',
  'MIN04235',
  'MIN04328',
  'MIN04346',
  'MIN04372',
  'MIN04404',
  'MIN04424',
  'MIN04428',
  'MIN04461',
  'MIN04481',
  'MIN04572',
  'MIN04585',
  'MIN04606',
  'MIN04633',
  'MIN04652',
  'MIN04686',
  'MIN04739',
  'MIN04755',
  'MIN04790',
  'MIN04815',
  'MIN04820',
  'MIN04824',
  'MIN04829',
  'MIN04840',
  'MIN04854',
  'MIN04862',
] as const

export type PhotoId = (typeof PHOTO_IDS)[number]

export function gallerySrc(id: PhotoId) {
  return `/images/gallery/${id}.webp`
}

export function thumbSrc(id: PhotoId) {
  return `/images/thumb/${id}.webp`
}

export function heroSrc(id: PhotoId) {
  return `/images/hero/${id}.webp`
}

/** Hero background slideshow (hero-sized WebP). */
export const HERO_SLIDES: PhotoId[] = [
  'MIN04572',
  'MIN04820',
  'MIN04328',
  'MIN04755',
  'MIN04060',
]

/** Curated gallery — few strong shots only. */
export const GALLERY_ORDER: PhotoId[] = [
  'MIN04328',
  'MIN04755',
  'MIN04060',
  'MIN04686',
  'MIN04154',
  'MIN04840',
]
