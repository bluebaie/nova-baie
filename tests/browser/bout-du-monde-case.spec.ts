import { test, expect } from '@playwright/test';

const origin = `http://localhost:${process.env.PLAYWRIGHT_PORT ?? '3146'}`;

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
});

test('Le Bout du Monde case study: translated route, authentic gallery and responsive composition', async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/realisations/le-bout-du-monde', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('Le Bout');
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(120);
    await page.screenshot({ path: `test-results/bout-du-monde-hero-${width}.png`, animations: 'disabled' });
    await expect(page.locator('h1')).toContainText('Le Bout');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/realisations\/le-bout-du-monde$/);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://www.nova-baie.com/en/realisations/le-bout-du-monde');
    await expect(page.getByRole('link', { name: /Visiter le site/ }).first()).toHaveAttribute('href', 'https://www.le-bout-du-monde.org/');
    await expect(page.locator('.bdm-gallery-rail button')).toHaveCount(3);

    for (const [index, label] of ['Accueil', 'Les gîtes', 'Gîte 2'].entries()) {
      await page.locator('.bdm-gallery-rail button').nth(index).click();
      await expect(page.locator('.bdm-gallery-caption strong')).toHaveText(label);
      await page.locator('.bdm-gallery-image').click();
      await expect(page.locator('.bdm-lightbox')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('.bdm-lightbox')).not.toBeVisible();
    }

    await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 4000))]));
    const layout = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
      heroLoaded: (document.querySelector('.bdm-hero-landscape') as HTMLImageElement).naturalWidth > 0,
      galleryLoaded: (document.querySelector('.bdm-gallery-image img') as HTMLImageElement).naturalWidth > 0,
    }));
    expect(layout.width, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(layout.viewport);
    expect(layout.heroLoaded, `hero image did not load at ${width}px`).toBe(true);
    expect(layout.galleryLoaded, `selected public capture did not load at ${width}px`).toBe(true);
    await page.screenshot({ path: `test-results/bout-du-monde-${width}.png`, fullPage: width === 390, animations: 'disabled' });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/en/realisations/le-bout-du-monde', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('Le Bout');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/realisations\/le-bout-du-monde$/);
  await expect(page.getByRole('heading', { name: 'The experience begins before arrival.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Visit the website/ }).first()).toHaveAttribute('href', 'https://www.le-bout-du-monde.org/');
});

test('Le Bout du Monde reduced motion keeps images, content and actions available', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/realisations/le-bout-du-monde', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'L’expérience commence avant l’arrivée.' })).toBeVisible();
  await expect(page.locator('.bdm-finale').getByRole('link', { name: /Parlons de votre projet/ })).toBeVisible();
});
