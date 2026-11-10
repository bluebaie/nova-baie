import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';

const origin = `http://localhost:${process.env.PLAYWRIGHT_PORT ?? '3146'}`;
const resolvePackage = createRequire(`${process.cwd()}/package.json`);

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
});

test('Gîtes en Baie case study: authentic gallery, localised metadata and responsive layouts', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/realisations/gites-en-baie', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('La baie');

  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => scrollTo(0, 0));
    await expect(page.locator('.geb-hero h1')).toBeVisible();
    await page.locator('#geb-intro').scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: /Chaque adresse ouvre/ })).toBeVisible();
    await page.locator('.geb-gallery-main').scrollIntoViewIfNeeded();
    for (const [index, label] of ['La baie en ouverture', 'Les hébergements', 'Explorer le territoire'].entries()) {
      await page.locator('.geb-gallery-rail button').nth(index).click();
      await expect(page.locator('.geb-gallery-caption strong')).toHaveText(label);
      const image = page.locator('.geb-gallery-image img');
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      if (index === 0) {
        await page.locator('.geb-gallery-image').click();
        await expect(page.locator('.geb-lightbox')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(page.locator('.geb-lightbox')).not.toBeVisible();
      }
    }
    await page.evaluate(() => scrollTo(0, 0));
    const metrics = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth }));
    expect(metrics.width, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(metrics.viewport);
    await page.screenshot({ path: `test-results/gites-en-baie-${width}.png`, fullPage: width === 390, animations: 'disabled' });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [name, selector] of [
    ['hero', '.geb-hero'], ['intro', '.geb-intro'], ['gallery', '.geb-discovery'], ['story', '.geb-craft'], ['ending', '.geb-finale'],
  ]) {
    await page.locator(selector).evaluate(element => element.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(100);
    await page.screenshot({ path: `test-results/gites-en-baie-desktop-${name}.png`, animations: 'disabled' });
  }
  await page.goto('/en/realisations/gites-en-baie', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('The bay');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/realisations\/gites-en-baie$/);
  await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute('href', 'https://www.nova-baie.com/realisations/gites-en-baie');
  await expect(page.getByRole('link', { name: /Visit the website/ }).first()).toHaveAttribute('href', 'https://www.gite-baie.com/');
  await expect(page.getByRole('heading', { name: 'A website shaped like a walk.' })).toBeVisible();
  await page.screenshot({ path: 'test-results/gites-en-baie-en-1440.png', fullPage: true, animations: 'disabled' });

  await page.goto('/realisations', { waitUntil: 'domcontentloaded' });
  const portfolioCard = page.locator('[data-project="gites-en-baie"]');
  await expect(portfolioCard.locator('[data-project-image-link]')).toHaveAttribute('href', /\/(?:en\/)?realisations\/gites-en-baie$/);
  await expect(portfolioCard.locator('[data-project-visit]')).toHaveAttribute('href', 'https://www.gite-baie.com/');
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-project="gites-en-baie"] [data-project-image-link]')).toHaveAttribute('href', /\/(?:en\/)?realisations\/gites-en-baie$/);
});

test('Gîtes en Baie reduced motion keeps content and actions available', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/realisations/gites-en-baie', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.geb-hero h1')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Chaque adresse ouvre/ })).toBeVisible();
  await expect(page.locator('.geb-finale').getByRole('link', { name: /Parlons de votre projet/ })).toBeVisible();
});

test('Gîtes en Baie page has no axe WCAG AA violations', async ({ page }) => {
  await page.goto('/realisations/gites-en-baie', { waitUntil: 'domcontentloaded' });
  await page.addScriptTag({ path: resolvePackage.resolve('axe-core/axe.min.js') });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const violations = await page.evaluate(async () => {
      const axe = (window as unknown as { axe: { run: (options: unknown) => Promise<{ violations: { id: string; nodes: { target: string[]; failureSummary: string }[] }[] }> } }).axe;
      return (await axe.run({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations;
    });
    expect(violations, `axe violations at ${width}px: ${JSON.stringify(violations)}`).toEqual([]);
  }
});
