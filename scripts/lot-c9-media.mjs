// LOT C.9 — CycloSport Crotellois: reproducible WebP derivatives.
// Originals in media-sources/csc/ (outside public/) are never modified. Derivatives are
// written to public/media/projects/csc/optimized/.
// Admin captures are anonymised on the derivative only (blurred regions).
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

// Originals live outside public/ (git-ignored) so captures with personal data are never served.
const root = path.resolve('media-sources/csc');
const out = path.resolve('public/media/projects/csc/optimized');
await mkdir(out, { recursive: true });

const shot = name => path.join(root, `Capture d'écran 2026-11-09 ${name}.jpg`);
// Every capture contains a floating browser-extension button on the right edge
// and a scrollbar. Public captures (full-bleed photography) are simply cropped
// before the button. Admin captures keep their full width: on their flat
// interface background the button is replaced by a vertical interpolation
// between the pixel rows just above and below it.
const PUBLIC_WIDTH = 1796;
const ADMIN_WIDTH = 1898;
const BUTTON = { left: 1828, top: 468, right: 1898, bottom: 572 };

async function patchButton(input, admin) {
  if (!admin) return sharp(input).toBuffer();
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const c = info.channels;
  const right = Math.min(BUTTON.right, info.width);
  for (let x = BUTTON.left; x < right; x++) {
    const above = (BUTTON.top - 1) * info.width * c + x * c;
    const below = BUTTON.bottom * info.width * c + x * c;
    for (let y = BUTTON.top; y < BUTTON.bottom; y++) {
      const t = (y - BUTTON.top + 1) / (BUTTON.bottom - BUTTON.top + 1);
      const i = y * info.width * c + x * c;
      for (let k = 0; k < c; k++) data[i + k] = Math.round(data[above + k] * (1 - t) + data[below + k] * t);
    }
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

async function blurRegions(buffer, regions) {
  if (!regions.length) return buffer;
  const layers = await Promise.all(regions.map(async ([left, top, width, height]) => ({
    input: await sharp(buffer).extract({ left, top, width, height }).blur(16).modulate({ brightness: 1.02 }).toBuffer(),
    left, top
  })));
  return sharp(buffer).composite(layers).toBuffer();
}

const captures = [
  { src: '174557', name: 'home-hero' },
  { src: '174646', name: 'home-practices', height: 903 },
  { src: '174739', name: 'club-terrains' },
  { src: '174905', name: 'hors-bitume' },
  { src: '174951', name: 'actualites' },
  // Only the hero of the contact page is kept: the lower block is a temporary
  // pre-production notice of the club website, not part of the final design.
  { src: '175019', name: 'contact', height: 655 },
  // Admin captures — personal data blurred on the derivative.
  { src: '175127', name: 'admin-news', blur: [[378, 280, 444, 54], [362, 506, 716, 34], [362, 542, 480, 24]] },
  { src: '175201', name: 'admin-members', blur: [[392, 590, 88, 108], [392, 731, 88, 108], [392, 872, 88, 108], [486, 594, 130, 32], [486, 735, 130, 32], [486, 876, 130, 32]] },
  { src: '175236', name: 'admin-partners', blur: [[528, 208, 290, 36]] },
  { src: '175338', name: 'admin-media', blur: [[1500, 12, 210, 38]] }
];

const report = [];
for (const item of captures) {
  const input = shot(item.src);
  const meta = await sharp(input).metadata();
  const admin = item.name.startsWith('admin-');
  let buffer = await patchButton(input, admin);
  buffer = await blurRegions(buffer, item.blur ?? []);
  const height = Math.min(item.height ?? meta.height, meta.height);
  const file = path.join(out, `${item.name}.webp`);
  await sharp(buffer).extract({ left: 0, top: 0, width: Math.min(admin ? ADMIN_WIDTH : PUBLIC_WIDTH, meta.width), height }).webp({ quality: 90, effort: 6 }).toFile(file);
  report.push([item.name, (await stat(file)).size]);
}

// Detail crops at source resolution (no upscaling).
const details = [
  { src: '174557', name: 'detail-title', crop: [250, 236, 960, 660] },
  { src: '174951', name: 'detail-lineart', crop: [1105, 80, 690, 465] }
];
for (const item of details) {
  const [left, top, width, height] = item.crop;
  const file = path.join(out, `${item.name}.webp`);
  await sharp(shot(item.src)).extract({ left, top, width, height }).webp({ quality: 92, effort: 6 }).toFile(file);
  report.push([item.name, (await stat(file)).size]);
}

// Sports photography supplied by the owner.
const photos = [
  { src: '076ea223-4f47-4ee9-a741-782cee4d7784.png', name: 'peloton', quality: 84 },
  { src: 'FB_IMG_1793002768704.jpg', name: 'cyclocross', quality: 84 }
];
for (const item of photos) {
  const file = path.join(out, `${item.name}.webp`);
  await sharp(path.join(root, item.src)).webp({ quality: item.quality, effort: 6 }).toFile(file);
  report.push([item.name, (await stat(file)).size]);
}

// Social sharing image 1200 × 630 from the collective photograph.
const og = path.join(out, 'og-cyclosport-crotellois.jpg');
await sharp(path.join(root, '076ea223-4f47-4ee9-a741-782cee4d7784.png')).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 84, mozjpeg: true }).toFile(og);
report.push(['og-cyclosport-crotellois.jpg', (await stat(og)).size]);

console.table(report.map(([name, size]) => ({ name, kB: Math.round(size / 1024) })));
