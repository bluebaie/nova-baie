// Portfolio / home card visual for CycloSport Crotellois.
// A graphic composition (no rider photography in the foreground): two of the
// most typographic captures of the club website in browser frames, over the
// club's black/orange language — slash, trajectory, speed lines, bay contours.
// Output: public/media/projects/csc/optimized/card-csc.webp (1600 × 1312, ratio of the card frame).
import sharp from 'sharp';
import path from 'node:path';

const dir = path.resolve('public/media/projects/csc/optimized');
const W = 1600, H = 1312;

async function framed(file, width, height, crop) {
  const bar = 34, radius = 14;
  const shot = await sharp(path.join(dir, file)).extract(crop).resize(width, height - bar).toBuffer();
  const chrome = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs><clipPath id="c"><rect width="${width}" height="${height}" rx="${radius}"/></clipPath></defs>
    <g clip-path="url(#c)"><rect width="${width}" height="${height}" fill="#1b1b1b"/>
    <circle cx="26" cy="${bar / 2}" r="6.5" fill="#ff5a20"/><circle cx="48" cy="${bar / 2}" r="6.5" fill="#4a4a4a"/><circle cx="70" cy="${bar / 2}" r="6.5" fill="#4a4a4a"/>
    <rect x="98" y="8" width="${Math.min(300, width * 0.32)}" height="${bar - 16}" rx="9" fill="#2c2c2c"/></g></svg>`);
  const mask = Buffer.from(`<svg width="${width}" height="${height - bar}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height - bar + radius}" y="${-radius}" rx="${radius}" fill="#fff"/></svg>`);
  const rounded = await sharp(shot).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  return sharp(chrome).composite([{ input: rounded, top: bar, left: 0 }]).png().toBuffer();
}

function shadow(width, height, blur = 40, opacity = 0.65) {
  const pad = blur * 3;
  return Buffer.from(`<svg width="${width + pad * 2}" height="${height + pad * 2}" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="s" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${blur}"/></filter></defs>
    <rect x="${pad}" y="${pad + 24}" width="${width}" height="${height}" rx="18" fill="#000" opacity="${opacity}" filter="url(#s)"/></svg>`);
}

const background = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="78%" cy="70%" r="70%"><stop offset="0" stop-color="#3a1a0c"/><stop offset=".55" stop-color="#120d0b"/><stop offset="1" stop-color="#0a0a0a"/></radialGradient>
    <linearGradient id="streak" x1="0" x2="1"><stop offset="0" stop-color="#ff5a20" stop-opacity="0"/><stop offset="1" stop-color="#ff5a20" stop-opacity=".9"/></linearGradient>
    <linearGradient id="streakW" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".5"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g fill="none" stroke="#ffffff" stroke-opacity=".07" stroke-width="1.5">
    ${Array.from({ length: 10 }, (_, i) => `<path d="M${-80 + i * 12} ${180 + i * 95}C${300 + i * 10} ${80 + i * 80} ${520 - i * 8} ${560 + i * 30} ${860 + i * 6} ${440 + i * 48}S${1340 - i * 12} ${150 + i * 70} ${1700} ${260 + i * 80}"/>`).join('')}
  </g>
  <path d="M960 -40 L1640 -40 L1240 1360 L560 1360 Z" fill="#ff5a20"/>
  <path d="M1030 -40 L1110 -40 L710 1360 L630 1360 Z" fill="#0a0a0a" opacity=".22"/>
  <g>
    <rect x="0" y="118" width="640" height="3" fill="url(#streak)"/>
    <rect x="0" y="162" width="420" height="2" fill="url(#streakW)"/>
    <rect x="760" y="760" width="520" height="3" fill="url(#streak)"/>
    <rect x="760" y="806" width="300" height="2" fill="url(#streakW)"/>
    <rect x="0" y="1150" width="700" height="2" fill="url(#streak)"/>
  </g>
</svg>`);

const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <path d="M-40 660C300 560 520 760 820 640S1180 520 1420 700 1600 1080 1660 1180" fill="none" stroke="#ff5a20" stroke-width="9" stroke-linecap="round"/>
  <path d="M-40 690C300 590 520 790 820 670S1180 550 1420 730" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="3 14"/>
  <circle cx="1420" cy="700" r="17" fill="#f4f1ea"/><circle cx="1420" cy="700" r="8" fill="#ff5a20"/>
</svg>`);

// Main screen: dark News header only (line-drawn bike, condensed title, orange route).
const mainW = 1300, mainH = 422;
const main = await framed('actualites.webp', mainW, mainH, { left: 0, top: 0, width: 1796, height: Math.round(1796 * (mainH - 34) / mainW) });
// Back office: News module, anonymised capture (sidebar + homepage positions).
const adminW = 640, adminH = 400;
const admin = await framed('admin-news.webp', adminW, adminH, { left: 0, top: 0, width: 1180, height: Math.round(1180 * (adminH - 34) / adminW) });
// Contact header with the orange brush stroke.
const subW = 780, subH = 308;
const sub = await framed('contact.webp', subW, subH, { left: 180, top: 120, width: 1500, height: Math.round(1500 * (subH - 34) / subW) });

const mainPos = { left: 90, top: 140 };
const adminPos = { left: 90, top: 690 };
const subPos = { left: 740, top: 900 };
await sharp(background)
  .composite([
    { input: shadow(mainW, mainH), left: mainPos.left - 120, top: mainPos.top - 120 },
    { input: main, ...mainPos },
    { input: overlay, left: 0, top: 0 },
    { input: shadow(adminW, adminH, 30, 0.7), left: adminPos.left - 90, top: adminPos.top - 90 },
    { input: admin, ...adminPos },
    { input: shadow(subW, subH, 30, 0.75), left: subPos.left - 90, top: subPos.top - 90 },
    { input: sub, ...subPos }
  ])
  .webp({ quality: 88, effort: 6 })
  .toFile(path.join(dir, 'card-csc.webp'));
console.log('card-csc.webp', W, H);
