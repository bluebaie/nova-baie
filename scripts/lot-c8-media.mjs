import fs from 'node:fs/promises';
import sharp from 'sharp';
const root = 'public/media/projects/le-refuge-de-la-marmotte';
const files = (await fs.readdir(root)).filter(file => file.endsWith('.jpg')).sort();
await fs.mkdir(`${root}/optimized`, { recursive: true });
for (const [index, file] of files.entries()) {
  const source = `${root}/${file}`;
  const meta = await sharp(source).metadata();
  const target = ['home', 'gallery', 'contact'][index];
  await sharp(source).extract({ left: 0, top: 0, width: meta.width - 17, height: meta.height }).webp({ quality: 94, effort: 6 }).toFile(`${root}/optimized/${target}.webp`);
  console.log(file, meta.width, meta.height, target);
  if (target === 'gallery') await sharp(source).extract({ left: 316, top: 412, width: 625, height: 590 }).webp({ quality: 95, effort: 6 }).toFile(`${root}/optimized/interior-detail.webp`);
}
