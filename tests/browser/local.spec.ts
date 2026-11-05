import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

test.beforeEach(async ({ context }) => {
  // Browser tests must never execute GTM, analytics or visit client/Make websites.
  await context.route('**/*', route => new URL(route.request().url()).origin === 'http://localhost:3146' ? route.continue() : route.abort());
});

for (const prefix of ['', '/en']) {
  for (const path of ['', '/services', '/realisations', '/actualites', '/a-propos', '/contact', '/mentions-legales']) {
    test(`HTTP ${prefix}${path || '/'} / canonical / language / navigation`, async ({ page }) => {
      const response = await page.goto(`${prefix}${path}` || '/');
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', prefix ? 'en' : 'fr');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.nova-baie.com${prefix}${path}`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', `https://www.nova-baie.com/en${path}`);
      expect((await page.title()).match(/Nova Baie/g)?.length).toBe(1);
    });
  }
  test(`localized 404 ${prefix}`, async ({ page }) => {
    const response = await page.goto(`${prefix}/unknown-lot-a`);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(prefix ? 'Page not found' : 'Page introuvable');
    await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
  for (const status of [202, 500, 429, 504]) test(`contact UI ${prefix || 'fr'} / HTTP ${status}`, async ({ page }) => {
    await page.route('**/api/contact', route => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify({ code: status === 202 ? 'accepted' : 'upstream_error' }) }));
    await page.goto(`${prefix}/contact`);
    await page.locator('#contact-nom').fill('Test local');
    await page.locator('#contact-email').fill('test@example.invalid');
    await page.locator('#contact-type').selectOption('presence');
    await page.locator('#contact-message').fill('Simulation locale uniquement');
    await page.locator('form button[type="submit"]').click();
    if (status === 202) {
      await expect(page.getByRole('status')).toContainText(prefix ? 'Request accepted' : 'Demande acceptée');
      await expect(page.getByRole('status')).toBeFocused();
    } else {
      await expect(page.locator('form').getByRole('alert')).toContainText(prefix ? 'An error' : 'Une erreur');
      await expect(page.locator('form').getByRole('alert')).toBeFocused();
      await expect(page.getByRole('status')).toHaveCount(0);
      await expect(page.locator('form button[type="submit"]')).toBeEnabled();
    }
  });
}

test('mobile menu and language switch remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await page.locator('header').getByRole('link', { name: 'Contact', exact: true }).last().click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await page.locator('header').getByRole('button', { name: 'English' }).last().click();
  await expect(page).toHaveURL(/\/en\/contact$/);
});

test('existing logo and hero actually load in the browser', async ({ page }) => {
  await page.goto('/');
  for (const selector of ['header img', 'main section:first-child img']) {
    await expect.poll(() => page.locator(selector).first().evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});

test('URL normalization, robots, sitemap and safe unconfigured API', async ({ request }) => {
  for (const path of ['', '/services', '/realisations', '/actualites', '/a-propos', '/contact', '/mentions-legales']) {
    const response = await request.get(`/fr${path}`, { maxRedirects: 0, headers: { 'accept-language': 'en' } });
    expect([307, 308]).toContain(response.status());
    expect(new URL(response.headers().location, 'http://localhost:3146').pathname).toBe(path || '/');
  }
  for (const path of ['/en/contact/', '/realisations/']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect([307, 308]).toContain(response.status());
  }
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).not.toContain('Disallow: /_next');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toMatch(/lastmod|mentions-legales/);
  const contact = await request.post('/api/contact', { headers: { origin: 'http://localhost:3146' }, data: { nom: 'Local', email: 'test@example.invalid', telephone: '', structure: '', typeProjet: 'presence', message: 'Local only' } });
  expect(contact.status()).toBe(503);
  expect((await request.get('/api/contact')).status()).toBe(405);
  const home = await request.get('/');
  expect(home.headers()['x-content-type-options']).toBe('nosniff');
  expect(home.headers()['x-frame-options']).toBe('DENY');
  expect(home.headers()['x-xss-protection']).toBeUndefined();
});

test('private contact configuration stays out of client bundles', () => {
  function files(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]);
  }
  const bundles = files('.next/static').filter(file => file.endsWith('.js'));
  expect(bundles.length).toBeGreaterThan(0);
  for (const file of bundles) expect(readFileSync(file, 'utf8')).not.toMatch(/MAKE_WEBHOOK_URL|CONTACT_REDIS_REST_TOKEN|CONTACT_RATE_LIMIT_SECRET|hook\.[a-z0-9-]+\.make\.com/);
});
