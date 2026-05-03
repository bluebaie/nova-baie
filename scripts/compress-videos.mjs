import { execFileSync } from 'child_process'
import { createRequire } from 'module'
import { statSync, renameSync } from 'fs'

const require = createRequire(import.meta.url)
const ffmpeg = require('ffmpeg-static')

const videos = [
  { file: 'public/videos/le-bout-du-monde-demo.mp4', crf: 32 },
  { file: 'public/videos/gites-en-baie-demo.mp4',    crf: 28 },
  { file: 'public/videos/sainte-foy-demo.mp4',       crf: 28 },
]

for (const { file, crf } of videos) {
  const tmp = file.replace('.mp4', '-new.mp4')
  const before = (statSync(file).size / 1024 / 1024).toFixed(1)
  console.log(`\nCompressing ${file} (${before} Mo)...`)

  execFileSync(ffmpeg, [
    '-i', file,
    '-vcodec', 'libx264',
    '-crf', String(crf),
    '-preset', 'fast',
    '-vf', 'scale=1280:-2',
    '-acodec', 'aac',
    '-b:a', '64k',
    '-movflags', '+faststart',
    '-y', tmp,
  ], { stdio: 'inherit' })

  renameSync(tmp, file)
  const after = (statSync(file).size / 1024 / 1024).toFixed(1)
  console.log(`✓ ${file}: ${before} Mo → ${after} Mo`)
}
