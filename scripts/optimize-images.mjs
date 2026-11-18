import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcDir =
  process.env.WEDDING_RAW_DIR ||
  path.join(root, 'drive-download-20261114T161914Z-1-001')

if (!fs.existsSync(srcDir)) {
  console.error(`Raw photo folder not found: ${srcDir}`)
  console.error('Set WEDDING_RAW_DIR or place originals in drive-download-…')
  process.exit(1)
}


const out = {
  hero: { dir: path.join(root, 'public/images/hero'), width: 1200, quality: 78 },
  gallery: { dir: path.join(root, 'public/images/gallery'), width: 900, quality: 75 },
  thumb: { dir: path.join(root, 'public/images/thumb'), width: 400, quality: 70 },
}

for (const cfg of Object.values(out)) {
  fs.mkdirSync(cfg.dir, { recursive: true })
}

const files = fs
  .readdirSync(srcDir)
  .filter((f) => /\.jpe?g$/i.test(f))
  .sort()

console.log(`Processing ${files.length} images...`)

for (const file of files) {
  const base = path.parse(file).name
  const input = path.join(srcDir, file)
  for (const cfg of Object.values(out)) {
    const dest = path.join(cfg.dir, `${base}.webp`)
    await sharp(input)
      .rotate()
      .resize({ width: cfg.width, withoutEnlargement: true })
      .webp({ quality: cfg.quality, effort: 4 })
      .toFile(dest)
  }
  console.log(`✓ ${base}`)
}

console.log('Done')
