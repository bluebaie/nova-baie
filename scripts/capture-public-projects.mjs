// Explicitly authorised public homepage captures. Never visits admin or submits a form.
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';

const projects = [
  { id: 'blue-baie', url: 'https://www.bluebaie.fr/' },
  { id: 'saint-jean', url: 'https://conciergeriesaintjean.fr/' },
];
const hosts = new Set(['www.bluebaie.fr', 'bluebaie.fr', 'conciergeriesaintjean.fr', 'www.conciergeriesaintjean.fr']);
mkdirSync('public/images/projects', { recursive: true });
mkdirSync('test-results/public-captures', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const manifest = [];
try {
  for (const project of projects) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, serviceWorkers: 'block', locale: 'fr-FR', reducedMotion: 'reduce' });
    await context.route('**/*', route => {
      const request = route.request();
      const url = new URL(request.url());
      const allowed = hosts.has(url.hostname) && ['GET', 'HEAD'].includes(request.method()) && !/^\/(?:api|admin|back-office|login)(?:\/|$)/i.test(url.pathname);
      return allowed ? route.continue() : route.abort();
    });
    try {
      const page = await context.newPage();
      const response = await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30_000 });
      if (response?.status() !== 200) throw new Error('Public page unavailable');
      // Local preference in this disposable profile only; no acceptance, no remote writes.
      const refuse = page.getByRole('button', { name: 'Tout refuser', exact: true });
      if (await refuse.isVisible()) await refuse.click();
      await page.evaluate(() => document.fonts.ready);
      await page.locator('body').waitFor({ state: 'visible' });
      const png = await page.screenshot({ animations: 'disabled', fullPage: false });
      const file = `public/images/projects/${project.id}-public.webp`;
      await sharp(png).webp({ quality: 86 }).toFile(file);
      writeFileSync(`test-results/public-captures/${project.id}.png`, png);
      manifest.push({ id: project.id, requested: project.url, final: page.url(), status: response.status(), capturedAt: new Date().toISOString(), width: 1440, height: 1000, file, title: await page.title() });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.reload({ waitUntil: 'networkidle', timeout: 30_000 });
      await page.evaluate(() => document.fonts.ready);
      const mobile = await page.screenshot({ animations: 'disabled', fullPage: false });
      const mobileFile = `public/images/projects/${project.id}-mobile.webp`;
      await sharp(mobile).webp({ quality: 86 }).toFile(mobileFile);
      writeFileSync(`test-results/public-captures/${project.id}-mobile.png`, mobile);
      manifest.push({ id: `${project.id}-mobile`, requested: project.url, final: page.url(), status: 200, capturedAt: new Date().toISOString(), width: 390, height: 844, file: mobileFile });
      console.log(`${project.id}: public capture saved`);
    } finally { await context.close(); }
  }
  writeFileSync('test-results/public-captures/manifest.json', JSON.stringify(manifest, null, 2));
} finally { await browser.close(); }
