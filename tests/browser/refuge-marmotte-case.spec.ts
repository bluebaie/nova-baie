import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';
import { publishedCaseStudies } from '../../src/lib/projects';
const requirePackage = createRequire(`${process.cwd()}/package.json`);
const path = '/realisations/le-refuge-de-la-marmotte';

test('Refuge: responsive scenes, authentic gallery, SEO, navigation and accessibility', async ({ page }) => {
  test.setTimeout(150_000);
  const origin = `http://localhost:${process.env.PLAYWRIGHT_PORT ?? '3146'}`;
  await page.context().route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    await page.evaluate(() => scrollTo(0, 0));
    await expect(page.locator('h1')).toBeVisible();
    for (const section of await page.locator('[data-refuge-case] section').all()) {
      await section.scrollIntoViewIfNeeded();
      await expect(section.locator('h2')).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `test-results/refuge-${width}.png`, fullPage: true, animations: 'disabled' });
  }
  const gallery = page.locator('[data-rm-frame]');
  for (let index = 0; index < 3; index++) {
    const tab = gallery.locator('[aria-pressed]').nth(index);
    await tab.click();
    await expect(tab).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => gallery.locator('button img').evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await gallery.locator('button:has(img)').click();
    await expect(page.locator('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog')).not.toBeVisible();
    await expect(gallery.locator('button:has(img)')).toBeFocused();
  }
  await page.addScriptTag({ path: requirePackage.resolve('axe-core/axe.min.js') });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    const violations = await page.evaluate(async () => {
      const axe = (window as unknown as { axe: { run: (options: unknown) => Promise<{ violations: unknown[] }> } }).axe;
      return (await axe.run({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations;
    });
    expect(violations).toEqual([]);
  }
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.nova-baie.com${path}`);
  expect(JSON.parse(await page.locator('script[type="application/ld+json"]').last().innerHTML())['@type']).toBe('CreativeWork');
  for (const link of await page.locator('[data-refuge-case] a[target="_blank"]').all()) await expect(link).toHaveAttribute('href', 'https://www.ski-saintefoy.com/');
  await page.goto(`/en${path}`);
  await expect(page.locator('h1')).toHaveText('Le Refuge dela Marmotte.');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.nova-baie.com/en${path}`);
  await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute('href', `https://www.nova-baie.com${path}`);
  await expect(page.getByRole('heading', { name: 'A window onto the stay.' })).toBeVisible();
  await page.screenshot({ path: 'test-results/refuge-en.png', fullPage: true, animations: 'disabled' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'test-results/refuge-en-mobile.png', fullPage: true, animations: 'disabled' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/realisations');
  await page.locator('[data-project="refuge-marmotte"] [data-project-image-link]').click();
  await expect(page).toHaveURL(new RegExp(`${path}$`));
  await page.goBack();
  await expect(page).toHaveURL(/\/realisations$/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.context().clearCookies();
  await page.goto(path);
  await expect(page.locator('h1')).toBeVisible();
  await page.evaluate(() => { scrollTo(0, document.body.scrollHeight); scrollTo(0, 0); });
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('link', { name: 'Parlons de votre projet' }).last().click();
  await expect(page).toHaveURL(/\/contact$/);
  expect(errors).toEqual([]);
});

test('Refuge integration preserves existing cases, locale redirects and technical assets', async ({ request }) => {
  for (const { slug } of publishedCaseStudies) {
    for (const prefix of ['', '/en', '/fr']) {
      const response = await request.get(`${prefix}/realisations/${slug}`, { maxRedirects: 5 });
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('<h1');
    }
  }
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('/en/realisations/le-refuge-de-la-marmotte');
  const response = await request.get(path);
  const html = await response.text();
  expect(html).toContain('og:image');
  const icon = html.match(/<link[^>]+rel="icon"[^>]+href="([^"]+)"/);
  expect(icon).not.toBeNull();
  if (icon) expect((await request.get(icon[1], { maxRedirects: 5 })).status()).toBe(200);
});
