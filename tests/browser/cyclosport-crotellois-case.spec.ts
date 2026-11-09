import { test, expect, type Page } from '@playwright/test';
import { createRequire } from 'node:module';
const requirePackage = createRequire(`${process.cwd()}/package.json`);
const path = '/realisations/cyclosport-crotellois';

async function axeViolations(page: Page) {
  await page.addScriptTag({ path: requirePackage.resolve('axe-core/axe.min.js') });
  return page.evaluate(async () => {
    // @ts-expect-error injected by axe-core
    const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } });
    return result.violations.map((violation: { id: string }) => violation.id);
  });
}

test('CSC: flagship case study — scenes, viewer, cockpit, SEO and accessibility', async ({ page }) => {
  test.setTimeout(180_000);
  const origin = `http://localhost:${process.env.PLAYWRIGHT_PORT ?? '3146'}`;
  await page.context().route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('Une identité');

  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 960 });
    await page.evaluate(() => scrollTo(0, 0));
    await expect(page.locator('h1')).toBeVisible();
    for (const section of await page.locator('[data-csc-case] > section').all()) {
      await section.scrollIntoViewIfNeeded();
      await expect(section.locator('h2').first()).toBeVisible();
    }
    for (const image of await page.locator('[data-csc-case] img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `test-results/csc-${width}.png`, fullPage: true, animations: 'disabled' });
  }

  // Shared viewer: open, close with Escape, focus returns to the trigger.
  const zoom = page.locator('[data-csc-screen] [data-csc-zoom]').first();
  await zoom.scrollIntoViewIfNeeded();
  await zoom.click();
  await expect(page.locator('dialog[open]')).toBeVisible();
  await expect.poll(() => page.locator('dialog[open] img').evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await expect(zoom).toBeFocused();

  // Back-office cockpit: four anonymised modules.
  const cockpit = page.locator('[data-csc-cockpit]');
  for (let index = 0; index < 4; index++) {
    const tab = cockpit.locator('[aria-pressed]').nth(index);
    await tab.click();
    await expect(tab).toHaveAttribute('aria-pressed', 'true');
    await expect(cockpit.locator('[data-csc-zoom] img')).toHaveAttribute('src', /admin-/);
  }

  // SEO and links.
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://www.nova-baie.com/realisations/cyclosport-crotellois');
  await expect(page.locator('link[hreflang=en]')).toHaveAttribute('href', 'https://www.nova-baie.com/en/realisations/cyclosport-crotellois');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-cyclosport-crotellois\.jpg/);
  const graphs = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(graphs.some(text => text.includes('BreadcrumbList') && text.includes('CreativeWork'))).toBe(true);
  expect(graphs.join('')).not.toContain('vercel.app');
  const official = page.locator('a[href="https://www.cyclosportcrotellois.fr/"]');
  await expect(official.first()).toHaveAttribute('rel', 'noopener noreferrer');
  expect(await page.locator('a[href*="vercel.app"]').count()).toBe(0);
  expect(await page.locator('body').innerText()).not.toMatch(/bientôt disponible|en construction|en finalisation/i);

  expect(await axeViolations(page)).toEqual([]);
  expect(errors).toEqual([]);

  // Reduced motion: static but complete.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(path);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('[data-csc-photo]')).toBeVisible();
  expect(await page.locator('[data-csc-line]').first().evaluate(node => getComputedStyle(node).transform)).toBe('none');

  // English version.
  await page.goto(`/en${path}`);
  await expect(page.locator('h1')).toContainText('An identity');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/csc-en.png', fullPage: true, animations: 'disabled' });
});

test('CSC: first in the portfolio and on the home page, FR and EN, no redirect loop', async ({ page }) => {
  for (const prefix of ['', '/en']) {
    await page.context().clearCookies();
    await page.goto(prefix || '/');
    await expect(page.locator('[data-project]').first()).toHaveAttribute('data-project', 'csc');
    await page.goto(`${prefix}/realisations`);
    expect(await page.locator('[data-project]').evaluateAll(nodes => nodes.map(node => (node as HTMLElement).dataset.project))).toEqual(['csc', 'blue-baie', 'saint-jean', 'bout-du-monde', 'gites-en-baie', 'refuge-marmotte']);
    await page.locator('[data-project="csc"] [data-project-detail-link]').first().click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/realisations/cyclosport-crotellois$`));
  }
  const redirects: number[] = [];
  page.on('response', response => { if (response.status() >= 300 && response.status() < 400) redirects.push(response.status()); });
  await page.context().clearCookies();
  const normalized = await page.goto('/fr/realisations/cyclosport-crotellois');
  expect(normalized?.status()).toBe(200);
  expect(redirects.length).toBeLessThanOrEqual(5);
  await expect(page).toHaveURL(/\/realisations\/cyclosport-crotellois$/);
  const sitemap = await (await page.request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('https://www.nova-baie.com/realisations/cyclosport-crotellois');
  expect(sitemap).toContain('https://www.nova-baie.com/en/realisations/cyclosport-crotellois');
});
