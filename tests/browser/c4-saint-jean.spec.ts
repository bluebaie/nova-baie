import { test, expect } from '@playwright/test';

test.use({ video: 'on' });
const testOrigin = `http://localhost:${process.env.PLAYWRIGHT_PORT ?? '3146'}`;
test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => new URL(route.request().url()).origin === testOrigin ? route.continue() : route.abort());
});

for (const prefix of ['', '/en']) {
  test(`C4 Saint-Jean ${prefix || 'fr'}: case study, authentic media, gallery and film`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${prefix}/realisations/conciergerie-saint-jean`);
    await expect(page.locator('h1')).toContainText('Saint-Jean');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.nova-baie.com${prefix}/realisations/conciergerie-saint-jean`);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://www.nova-baie.com/en/realisations/conciergerie-saint-jean');
    const heroPhoneImage = page.locator('.sj-hero-phone img');
    await expect.poll(() => heroPhoneImage.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const visit = page.locator('.sj-visit');
    await expect(visit).toHaveAttribute('href', 'https://conciergeriesaintjean.fr/');
    await expect(visit).toHaveAttribute('rel', 'noopener noreferrer');
    const screenshots = page.locator('.sj-gallery-item img');
    await expect(screenshots).toHaveCount(8);
    for (const image of await screenshots.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    const tile = page.locator('.sj-gallery-item button').first();
    await tile.focus();
    await expect(tile).toBeFocused();
    await tile.press('Enter');
    const dialog = page.locator('.sj-lightbox');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('img')).toHaveAttribute('src', /home-desktop/);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    const cover = page.locator('.sj-film-cover');
    await expect(cover.locator('img')).toHaveAttribute('src', /poster/);
    await expect(page.locator('video')).toHaveCount(0);
    await cover.click();
    const video = page.locator('.sj-film video');
    await expect(video).toHaveAttribute('src', /presentation-silent\.mp4/);
    await expect(video).toHaveAttribute('controls', '');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/lot-c4-saint-jean-${prefix ? 'en' : 'fr'}-desktop.png`, fullPage: true, animations: 'disabled' });

    for (const width of [390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      await page.waitForTimeout(80);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `horizontal overflow at ${width}px`).toBe(true);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => heroPhoneImage.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await page.screenshot({ path: `test-results/lot-c4-saint-jean-${prefix ? 'en' : 'fr'}-viewport-mobile.png`, animations: 'disabled' });
    await page.screenshot({ path: `test-results/lot-c4-saint-jean-${prefix ? 'en' : 'fr'}-mobile.png`, fullPage: true, animations: 'disabled' });
  });
}

test('C4 Saint-Jean appears with authentic imagery on homepage and portfolio', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const path of ['/', '/realisations']) {
    await page.goto(path);
    const card = page.locator('[data-project="saint-jean"]');
    await expect(card.locator('[data-project-image-link]')).toHaveAttribute('href', '/realisations/conciergerie-saint-jean');
    await expect(card.locator('[data-project-visit]')).toHaveAttribute('href', 'https://conciergeriesaintjean.fr/');
    await expect(card.locator('img').first()).toHaveAttribute('src', /home-desktop/);
  }
});
