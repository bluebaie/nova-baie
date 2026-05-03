import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync } from 'fs'

// PNG actualités → WebP
const pngFiles = readdirSync('public/images/actualites').filter(f => f.endsWith('.png'))
console.log(`\n== Images actualités (${pngFiles.length} fichiers PNG) ==`)
for (const file of pngFiles) {
  const input = `public/images/actualites/${file}`
  const output = input.replace('.png', '.webp')
  const before = (statSync(input).size / 1024).toFixed(0)
  await sharp(input).webp({ quality: 75 }).toFile(output)
  const after = (statSync(output).size / 1024).toFixed(0)
  console.log(`✓ ${file} → ${file.replace('.png', '.webp')}  ${before} Ko → ${after} Ko`)
}

// JPG réalisations
const jpgFiles = [
  'public/images/project-gites-en-baie.jpg',
  'public/images/project-ski-saintefoy.jpg',
  'public/images/realisation-le-bout-du-monde.jpg',
  'public/images/hero-nova-baie.jpg',
]
console.log('\n== Images JPG ==')
for (const file of jpgFiles) {
  const before = (statSync(file).size / 1024).toFixed(0)
  const tmp = file.replace('.jpg', '-opt.jpg')
  await sharp(file).jpeg({ quality: 75, mozjpeg: true }).toFile(tmp)
  const after = (statSync(tmp).size / 1024).toFixed(0)
  unlinkSync(file)
  const { renameSync } = await import('fs')
  renameSync(tmp, file)
  console.log(`✓ ${file}  ${before} Ko → ${after} Ko`)
}
