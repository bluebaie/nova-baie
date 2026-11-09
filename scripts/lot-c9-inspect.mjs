// LOT C.9 — visual inspection of the CycloSport Crotellois case study.
// Usage: node scripts/lot-c9-inspect.mjs [baseUrl] [outDir]
// Captures full pages and individual scenes at 390/768/1024/1440 px, checks
// horizontal overflow, broken images, console errors and runs axe (WCAG A/AA).
import { chromium } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const base = process.argv[2] ?? 'http://127.0.0.1:3159';
const out = process.argv[3] ?? 'artifacts/lot-c9';
await mkdir(out, { recursive: true });
const axeSource = await readFile(path.resolve('node_modules/axe-core/axe.min.js'), 'utf8');
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];

for (const [locale, prefix] of [['fr', ''], ['en', '/en']]) {
  for (const width of [390, 768, 1024, 1440]) {
    if (locale === 'en' && ![390, 1440].includes(width)) continue;
    const context = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, locale: locale === 'en' ? 'en-GB' : 'fr-FR', reducedMotion: process.env.REDUCED ? 'reduce' : 'no-preference' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const response = await page.goto(`${base}${prefix}/realisations/cyclosport-crotellois`, { waitUntil: 'networkidle' });
    // Scroll through the page so lazy images load and scroll scenes settle.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 500) { await page.evaluate(top => window.scrollTo(0, top), y); await page.waitForTimeout(60); }
    await page.waitForTimeout(600);
    const scenes = ['header[data-csc-hero]', '#csc-challenge', 'section:has(> .wrap h2) >> nth=0'];
    void scenes;
    const tag = `${locale}-${width}`;
    let index = 0;
    for (const section of await page.locator('[data-csc-case] > header, [data-csc-case] > section').all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      await section.screenshot({ path: `${out}/scene-${tag}-${String(index++).padStart(2, '0')}.png` });
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/full-${tag}.png`, fullPage: true });
    const audit = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      h1: document.querySelectorAll('h1').length,
      brokenImages: Array.from(document.images).filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc || img.src),
      canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href'),
      hreflang: Array.from(document.querySelectorAll('link[rel=alternate][hreflang]')).map(link => `${link.getAttribute('hreflang')}=${link.getAttribute('href')}`),
      ld: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(script => JSON.parse(script.textContent ?? '{}')['@graph']?.map(item => item['@type']).join('+') ?? JSON.parse(script.textContent ?? '{}')['@type']),
      title: document.title,
      vercelLinks: Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('vercel.app')).length,
      externalWithoutRel: Array.from(document.querySelectorAll('a[target=_blank]')).filter(a => !/noopener/.test(a.rel)).length
    }));
    await page.addScriptTag({ content: axeSource });
    const axe = await page.evaluate(async () => {
      // @ts-expect-error injected
      const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } });
      return result.violations.map(v => `${v.id} (${v.nodes.length}) ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`);
    });
    results.push({ tag, status: response?.status(), ...audit, axe, errors });
    await context.close();
  }
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
