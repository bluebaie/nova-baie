import { test, expect } from '@playwright/test';

test.use({ video: 'on' });

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => new URL(route.request().url()).origin === 'http://localhost:3146' ? route.continue() : route.abort());
});

for (const [slug, mediaName, style] of [
  ['blue-baie-conciergerie', 'blue-baie', 'ecosystem'],
  ['conciergerie-saint-jean', 'saint-jean', 'editorial'],
] as const) {
  test(`C3 ${slug}: authentic brand media, variant, controls, keyboard and responsive`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`/realisations/${slug}`);
    await expect(page.locator(`[data-case-style="${style}"]`)).toBeVisible();
    await expect(page.locator('h1')).toContainText(slug === 'blue-baie-conciergerie' ? 'Blue Baie' : 'Saint-Jean');

    const clientVisit = page.locator('[data-case-visit]');
    await expect(clientVisit).toHaveAttribute('target', '_blank');
    await expect(clientVisit).toHaveAttribute('rel', 'noopener noreferrer');

    const heroImage = page.locator('[data-case-hero] .case-hero-image img');
    await expect.poll(() => heroImage.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(heroImage).toHaveAttribute('src', new RegExp(`${mediaName}-public`));

    const mediaViewer = page.locator('[data-case-media]');
    await mediaViewer.scrollIntoViewIfNeeded();
    await expect(mediaViewer.locator('[data-active-view="desktop"] img')).toBeVisible();
    await expect.poll(() => mediaViewer.locator('[data-active-view="desktop"] img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `test-results/lot-c3-case-${mediaName}-desktop.png`, fullPage: true, animations: 'disabled' });
    const mobileToggle = mediaViewer.locator('[data-media-view="mobile"]');
    await mobileToggle.focus();
    await expect(mobileToggle).toBeFocused();
    await mobileToggle.click();
    await expect(mediaViewer.locator('[data-active-view="mobile"] img')).toHaveAttribute('src', new RegExp(`${mediaName}-mobile`));
    await expect(mediaViewer.locator('[data-media-view="mobile"]')).toHaveAttribute('aria-pressed', 'true');
    await mediaViewer.screenshot({ path: `test-results/lot-c3-case-${mediaName}-viewer-mobile.png` });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/realisations/${slug}`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-case-hero] .case-hero-image img')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/lot-c3-case-${mediaName}-mobile.png`, fullPage: true, animations: 'disabled' });

    if (style === 'ecosystem') {
      const scopeMap = page.locator('[data-scope-diagram] .case-scope-map');
      await scopeMap.scrollIntoViewIfNeeded();
      await expect(scopeMap.locator('.case-scope-core img')).toHaveAttribute('src', /logo-blue-baie/);
    }
  });
}

test('C3 keeps interactive capabilities and reduced-motion compatibility', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const tabs = page.getByRole('tablist').getByRole('tab');
  await tabs.nth(1).focus();
  await tabs.nth(1).press('Enter');
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.stage-index')).toContainText('02');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
