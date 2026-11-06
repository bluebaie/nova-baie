import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');
const origin = process.argv[2] ?? 'http://localhost:3147';
const pages = process.argv[3] ? process.argv[3].split(',') : ['/', '/services', '/realisations', '/contact'];
const formFactors = process.argv[4] ? process.argv[4].split(',') : ['mobile', 'desktop'];
const outputDirectory = 'test-results/lighthouse-c2';
await mkdir(outputDirectory, { recursive: true });
const summary = [];

for (const formFactor of formFactors) {
  for (const path of pages) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'] });
    try {
      const url = new URL(path, origin).href;
      const result = await lighthouse(url, {
        port: chrome.port,
        output: 'json',
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        emulatedFormFactor: formFactor,
        throttlingMethod: 'simulate',
        blockedUrlPatterns: ['https://*'],
        maxWaitForLoad: 45_000,
      });
      const report = result.lhr;
      const safePath = path === '/' ? 'home' : path.slice(1).replaceAll('/', '-');
      await writeFile(`${outputDirectory}/${safePath}-${formFactor}.json`, JSON.stringify(report));
      summary.push({
        page: path,
        formFactor,
        performance: Math.round(report.categories.performance.score * 100),
        accessibility: Math.round(report.categories.accessibility.score * 100),
        bestPractices: Math.round(report.categories['best-practices'].score * 100),
        seo: Math.round(report.categories.seo.score * 100),
        lcp: Math.round(report.audits['largest-contentful-paint'].numericValue),
        fcp: Math.round(report.audits['first-contentful-paint'].numericValue),
        tbt: Math.round(report.audits['total-blocking-time'].numericValue),
        cls: Number(report.audits['cumulative-layout-shift'].numericValue.toFixed(4)),
      });
      console.log(`${formFactor} ${path}: ${summary.at(-1).performance} performance, LCP ${summary.at(-1).lcp} ms`);
    } finally {
      await chrome.kill();
    }
  }
}

await writeFile(`${outputDirectory}/summary.json`, JSON.stringify(summary, null, 2));
console.table(summary);
// Lighthouse keeps process-wide observers open after Chrome has been closed.
process.exit(0);
