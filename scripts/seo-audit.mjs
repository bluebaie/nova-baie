// Pre-publication SEO and link audit.
// Usage: node scripts/seo-audit.mjs [baseUrl] [--external]
// Reads sitemap.xml, then for every page checks status, title/description,
// canonical/hreflang, robots, H1/heading order, image alt, JSON-LD validity,
// Open Graph image, internal links, and (with --external) external links.
import { chromium } from '@playwright/test';

const base = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:3158';
const checkExternal = process.argv.includes('--external');
const PROD = 'https://www.nova-baie.com';
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replace(PROD, base));
const robots = await (await fetch(`${base}/robots.txt`)).text();

const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
const page = await context.newPage();
const issues = [];
const rows = [];
const internal = new Set();
const external = new Set();

for (const url of urls) {
  await context.clearCookies();
  const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
  const data = await page.evaluate(() => {
    const meta = name => document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)?.getAttribute('content') ?? '';
    const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => Number(h.tagName[1]));
    let skips = 0;
    for (let i = 1; i < headings.length; i++) if (headings[i] > headings[i - 1] + 1) skips++;
    const ld = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => { try { const j = JSON.parse(s.textContent); return j['@graph'] ? j['@graph'].map(g => g['@type']).join('+') : j['@type']; } catch { return 'INVALID'; } });
    return {
      title: document.title, description: meta('description'), robots: meta('robots'),
      canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href') ?? '',
      hreflang: Array.from(document.querySelectorAll('link[rel=alternate][hreflang]')).map(l => l.getAttribute('hreflang')).sort().join(','),
      ogImage: meta('og:image'), ogTitle: meta('og:title'), twitter: meta('twitter:card'), lang: document.documentElement.lang,
      h1: document.querySelectorAll('h1').length, skips,
      noAlt: Array.from(document.images).filter(img => !img.hasAttribute('alt')).length,
      ld, words: document.querySelector('main')?.innerText.split(/\s+/).filter(Boolean).length ?? 0,
      links: Array.from(document.querySelectorAll('a[href]')).map(a => a.href)
    };
  });
  for (const link of data.links) {
    if (link.startsWith(base)) internal.add(link.split('#')[0]);
    else if (/^https?:/.test(link)) external.add(link);
  }
  const path = url.replace(base, '') || '/';
  const expectedCanonical = url.replace(base, PROD);
  const problems = [];
  if (response?.status() !== 200) problems.push(`status ${response?.status()}`);
  if (!data.title || data.title.length > 75) problems.push(`title ${data.title.length}`);
  if (data.description.length < 70 || data.description.length > 175) problems.push(`description ${data.description.length}`);
  if (data.canonical.replace(/\/$/, '') !== expectedCanonical.replace(/\/$/, '')) problems.push(`canonical ${data.canonical}`);
  if (data.hreflang !== 'en,fr,x-default') problems.push(`hreflang ${data.hreflang}`);
  if (/noindex/.test(data.robots)) problems.push('noindex');
  if (data.h1 !== 1) problems.push(`h1 ${data.h1}`);
  if (data.noAlt) problems.push(`img without alt ${data.noAlt}`);
  if (data.ld.includes('INVALID')) problems.push('invalid JSON-LD');
  if (!data.ogImage || !data.ogTitle || data.twitter !== 'summary_large_image') problems.push('social metadata');
  if (data.lang !== (path.startsWith('/en') ? 'en' : 'fr')) problems.push(`lang ${data.lang}`);
  rows.push({ path, title: data.title.length, desc: data.description.length, h1: data.h1, skips: data.skips, words: data.words, ld: data.ld.join(' | ') });
  if (problems.length) issues.push(`${path}: ${problems.join('; ')}`);
}

// Internal links: every target must answer 200 (after redirects, at most 1 hop).
for (const link of internal) {
  const response = await fetch(link, { redirect: 'manual' });
  if (response.status >= 300 && response.status < 400) {
    const final = await fetch(link);
    if (final.status !== 200) issues.push(`internal link ${link}: ${final.status}`);
  } else if (response.status !== 200) issues.push(`internal link ${link}: ${response.status}`);
}
const externalResults = [];
if (checkExternal) for (const link of external) {
  try {
    const response = await fetch(link, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'Mozilla/5.0 (link check)' } });
    externalResults.push(`${response.status} ${link}`);
  } catch (error) { externalResults.push(`ERROR ${link} (${error.cause?.code ?? error.name})`); }
}
await browser.close();
console.table(rows);
console.log('robots.txt:\n' + robots);
console.log(`pages: ${urls.length}, internal links: ${internal.size}, external links: ${external.size}`);
if (checkExternal) console.log(externalResults.join('\n'));
console.log(issues.length ? `ISSUES:\n${issues.join('\n')}` : 'NO ISSUES');
