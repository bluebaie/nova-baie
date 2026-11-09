import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  await page.route('**/*', route => new URL(route.request().url()).hostname === 'localhost' ? route.continue() : route.abort());
  await page.addInitScript(() => {
    window.rmPerf = { cls: 0, lcp: 0 };
    new PerformanceObserver(list => list.getEntries().forEach(entry => { window.rmPerf.lcp = entry.startTime; })).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => list.getEntries().forEach(entry => { if (!entry.hadRecentInput) window.rmPerf.cls += entry.value; })).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto(`http://localhost:${process.env.PLAYWRIGHT_PORT ?? '3146'}/realisations/le-refuge-de-la-marmotte`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const metrics = await page.evaluate(() => ({ ...window.rmPerf, resources: performance.getEntriesByType('resource').map(entry => ({ name: entry.name.split('/').pop(), transfer: entry.transferSize, bytes: entry.encodedBodySize })) }));
  await fs.mkdir('artifacts/lot-c8', { recursive: true });
  await fs.writeFile('artifacts/lot-c8/performance.json', JSON.stringify(metrics, null, 2));
  for (const [index, section] of (await page.locator('[data-refuge-case] header, [data-refuge-case] section').all()).entries()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `artifacts/lot-c8/scene-${index}.png` });
  }
  console.log(JSON.stringify({ lcp: metrics.lcp, cls: metrics.cls, bytes: metrics.resources.reduce((sum, resource) => sum + resource.bytes, 0) }));
} finally { await browser.close(); }
