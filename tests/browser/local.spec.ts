import { test, expect } from '@playwright/test';
const testOrigin = `http://localhost:${process.env.PLAYWRIGHT_PORT ?? '3146'}`;
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

test.beforeEach(async ({ context }) => {
  // Browser tests must never execute GTM, analytics or visit client/Make websites.
  await context.route('**/*', route => new URL(route.request().url()).origin === testOrigin ? route.continue() : route.abort());
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
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://www.nova-baie.com${prefix}${path}`);
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', /https:\/\/www\.nova-baie\.com\/opengraph-image/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S.{30,}/);
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', (await page.locator('meta[property="og:title"]').getAttribute('content'))!);
      expect((await page.title()).match(/Nova Baie/g)?.length).toBe(1);
      await expect(page.locator('header nav').first().locator('a')).toHaveCount(4);
      const body = await page.locator('main').innerText();
      expect(body).not.toMatch(/€|\b\d+\s*EUR\b|Site Essentiel|Site Signature|Site Performance|24h|48h|3 mois|3 months|3 niveaux|3 levels/);
      const headings = await page.locator('main').evaluate(main => [...main.querySelectorAll('h1,h2,h3,h4')].map(heading => Number(heading.tagName[1])));
      expect(headings.every((level, index) => index === 0 || level <= headings[index - 1] + 1)).toBe(true);
      const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? '{}');
      expect(schema['@graph'][0].inLanguage).toBe(prefix ? 'en-GB' : 'fr-FR');
      expect(JSON.stringify(schema)).not.toMatch(/priceRange|€|sites web premium pour les professionnels du tourisme/i);
      const links = await page.locator('a[href^="/"]').evaluateAll(anchors => [...new Set(anchors.map(anchor => anchor.getAttribute('href')!))]);
      for (const href of links) {
        const local = new URL(href, testOrigin);
        const linked = await page.request.get(local.pathname);
        expect(linked.status(), href).toBe(200);
        if (local.hash) expect(await linked.text(), href).toContain(`id="${local.hash.slice(1)}"`);
      }
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
    await page.locator('#contact-type').selectOption('website');
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
  for (const slug of ['blue-baie-conciergerie', 'conciergerie-saint-jean']) test(`case study ${prefix || 'fr'} / ${slug} / metadata / links`, async ({ page }) => {
    await page.goto(`${prefix}/realisations/${slug}`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.nova-baie.com${prefix}/realisations/${slug}`);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', `https://www.nova-baie.com/en/realisations/${slug}`);
    const clientLink = slug === 'conciergerie-saint-jean' ? page.locator('.sj-visit') : slug === 'blue-baie-conciergerie' ? page.locator('.bb-visit') : page.locator('.case-hero-actions a[href^="https://"]');
    await expect(clientLink).toContainText(slug === 'conciergerie-saint-jean' ? (prefix ? 'Visit the client website' : 'Visiter le site client') : slug === 'blue-baie-conciergerie' ? (prefix ? 'Visit bluebaie.fr' : 'Visiter bluebaie.fr') : (prefix ? 'Visit the website' : 'Visiter le site'));
    await expect(clientLink).toHaveAttribute('rel', 'noopener noreferrer');
    const body = await page.locator('main').innerText();
    expect(body).not.toMatch(/â‚¬|\b\d+\s*EUR\b|six projects|six projets/i);
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
  const menu = page.getByRole('button', { name: 'Open menu' });
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});

test('existing logo and hero actually load in the browser', async ({ page }) => {
  await page.goto('/');
  for (const selector of ['header img', 'main section:first-child img']) {
    await expect.poll(() => page.locator(selector).first().evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  expect(await page.locator('h1').evaluate(heading => getComputedStyle(heading).fontFamily)).toMatch(/playfair/i);
  expect(await page.locator('body').evaluate(body => getComputedStyle(body).fontFamily)).toMatch(/inter/i);
});

test('URL normalization, robots, sitemap and safe unconfigured API', async ({ request }) => {
  for (const path of ['', '/services', '/realisations', '/actualites', '/a-propos', '/contact', '/mentions-legales']) {
    const response = await request.get(`/fr${path}`, { maxRedirects: 0, headers: { 'accept-language': 'en' } });
    expect([307, 308]).toContain(response.status());
    expect(new URL(response.headers().location, testOrigin).pathname).toBe(path || '/');
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
  const contact = await request.post('/api/contact', { headers: { origin: testOrigin }, data: { nom: 'Local', email: 'test@example.invalid', telephone: '', structure: '', typeProjet: 'website', message: 'Local only' } });
  expect(contact.status()).toBe(503);
  expect((await request.get('/api/contact')).status()).toBe(405);
  const home = await request.get('/');
  expect(home.headers()['x-content-type-options']).toBe('nosniff');
  expect(home.headers()['x-frame-options']).toBe('DENY');
  expect(home.headers()['x-xss-protection']).toBeUndefined();
  const og = await request.get('/opengraph-image');
  expect(og.status()).toBe(200);
  expect(og.headers()['content-type']).toContain('image/png');
  expect((await og.body()).length).toBeGreaterThan(1000);
});

test('reduced motion disables decorative movement and smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.body, '::before').animationName)).toBe('none');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('private contact configuration stays out of client bundles', () => {
  function files(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]);
  }
  const bundles = files('.next/static').filter(file => file.endsWith('.js'));
  expect(bundles.length).toBeGreaterThan(0);
  for (const file of bundles) expect(readFileSync(file, 'utf8')).not.toMatch(/MAKE_WEBHOOK_URL|CONTACT_REDIS_REST_TOKEN|CONTACT_RATE_LIMIT_SECRET|hook\.[a-z0-9-]+\.make\.com/);
});

for (const prefix of ['', '/en']) {
  test(`compact homepage and truthful portfolio entries ${prefix || 'fr'}`, async ({ page }) => {
    const videos: string[] = [];
    page.on('request', request => { if (request.url().includes('.mp4')) videos.push(request.url()); });
    await page.goto(prefix || '/');
    await expect(page.locator('main > section')).toHaveCount(6);
    await expect(page.locator('[data-project]')).toHaveCount(4);
    await expect(page.locator('[data-project]').first()).toHaveAttribute('data-project', 'csc');
    for (const image of await page.locator('[data-project] img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `test-results/lot-b-home-${prefix ? 'en' : 'fr'}-desktop.png`, fullPage: true });
    await page.goto(`${prefix}/realisations`);
    await expect(page.locator('[data-project]')).toHaveCount(6);
    await expect(page.locator('[data-project]').first()).toHaveAttribute('data-project', 'csc');
    await expect(page.locator('[data-project="csc"] [data-project-visit]')).toHaveAttribute('href', 'https://www.cyclosportcrotellois.fr/');
    await expect(page.locator('[data-project="saint-jean"] [data-project-visit]')).toHaveAttribute('href', 'https://conciergeriesaintjean.fr/');
    await expect(page.locator('[data-project="saint-jean"] [data-project-visit]')).toHaveAttribute('rel', 'noopener noreferrer');
    expect(videos).toHaveLength(0);
    await expect(page.locator('video')).toHaveCount(0);
    for (const image of await page.locator('[data-project] img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `test-results/lot-b-projects-${prefix ? 'en' : 'fr'}.png`, fullPage: true });
    await page.locator('[data-project="bout-du-monde"] button').click();
    const video = page.locator('video');
    await expect(video).toHaveAttribute('preload', 'none');
    await expect(video).not.toHaveAttribute('autoplay');
    await expect(video).toHaveJSProperty('paused', true);
    expect(videos).toHaveLength(0);
    await video.evaluate(async element => { const player = element as HTMLVideoElement; player.muted = true; await player.play(); });
    await expect.poll(() => video.evaluate(element => (element as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
    await video.evaluate(element => (element as HTMLVideoElement).pause());
  });
  test(`seven contact topics and three required fields ${prefix || 'fr'}`, async ({ page }) => {
    let payload: Record<string, string> | undefined;
    await page.route('**/api/contact', async route => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 202, contentType: 'application/json', body: '{"code":"accepted"}' });
    });
    for (const type of ['website', 'business_app', 'automation_api', 'ai', 'identity_design', 'seo', 'other']) {
      await page.goto(`${prefix}/contact`);
      await expect(page.locator('form [required]')).toHaveCount(3);
      await expect(page.locator('#contact-type option')).toHaveCount(7);
      await page.locator('#contact-nom').fill('Test local');
      await page.locator('#contact-email').fill('test@example.invalid');
      await page.locator('#contact-type').selectOption(type);
      await page.locator('#contact-message').fill('Local simulation');
      await page.locator('form button[type="submit"]').click();
      await expect(page.getByRole('status')).toBeVisible();
      expect(payload?.typeProjet).toBe(type);
      expect(payload).not.toHaveProperty('source');
      expect(payload).not.toHaveProperty('date');
    }
  });
  for (const width of [390, 768, 1024]) test(`responsive main pages ${prefix || 'fr'} at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ['', '/services', '/realisations', '/contact']) {
      await page.goto(`${prefix}${path}` || '/');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if (width === 390 && path === '') {
        for (const image of await page.locator('[data-project] img').all()) {
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: `test-results/lot-b-home-${prefix ? 'en' : 'fr'}-mobile.png`, fullPage: true });
      }
    }
  });
}
