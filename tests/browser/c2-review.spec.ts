import { test, expect } from '@playwright/test';

test.use({ video: 'on' });

test.describe('C2 motion review recordings', () => {
  test.beforeEach(async ({ context }) => {
    // Never visit external project sites, analytics or the real contact endpoint.
    await context.route('**/*', route => new URL(route.request().url()).origin === 'http://localhost:3146' ? route.continue() : route.abort());
  });

  test('desktop journey: hero response, capability scene, work and case study', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');
    await expect(page.locator('[data-hero] h1')).toBeVisible();
    await expect.poll(() => page.locator('[data-hero] img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await page.mouse.move(500, 400);
    await expect.poll(() => page.locator('[data-hero]').evaluate(el => parseFloat(getComputedStyle(el as HTMLElement).getPropertyValue('--hero-x')))).not.toBe(0);
    await page.screenshot({ path: 'test-results/lot-c2-home-desktop.png', fullPage: true, animations: 'disabled' });

    await page.locator('[data-hero] a[href="#capabilities-title"]').click();
    const connect = page.getByRole('tab', { name: /connect|relier/i });
    await expect(connect).toBeVisible();
    await connect.click();
    await expect(connect).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel', { name: /connect|relier/i })).toContainText(/API/i);
    await page.getByRole('tab', { name: /develop|évoluer/i }).click();
    await expect(page.getByRole('tabpanel', { name: /develop|évoluer|faire évoluer/i })).toContainText(/performance|référencement|search/i);

    await page.locator('[data-project="blue-baie"]').scrollIntoViewIfNeeded();
    const projectImage = page.locator('[data-project="blue-baie"] [data-project-image-link]');
    await projectImage.hover();
    await expect(projectImage).toHaveAttribute('href', '/realisations/blue-baie-conciergerie');
    await projectImage.click();
    await expect(page).toHaveURL(/\/realisations\/blue-baie-conciergerie$/);
    await expect(page.locator('h1')).toContainText('Blue Baie');
    const external = page.locator('a[href="https://www.bluebaie.fr/"]').first();
    await expect(external).toHaveAttribute('target', '_blank');
    await expect(external).toHaveAttribute('rel', 'noopener noreferrer');
    await page.locator('.case-back').click();
    await expect(page).toHaveURL(/\/realisations$/);
    await page.screenshot({ path: 'test-results/lot-c2-portfolio-desktop.png', fullPage: true, animations: 'disabled' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test('mobile portfolio and case study stay navigable without pointer motion', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/realisations');
    await expect(page.locator('[data-project]')).toHaveCount(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const projectImage = page.locator('[data-project="saint-jean"] [data-project-image-link]');
    await projectImage.scrollIntoViewIfNeeded();
    await projectImage.click();
    await expect(page).toHaveURL(/\/realisations\/conciergerie-saint-jean$/);
    await expect(page.locator('h1')).toContainText('Saint-Jean');
    await page.screenshot({ path: 'test-results/lot-c2-case-mobile.png', fullPage: true, animations: 'disabled' });
    await page.locator('.case-back').click();
    await expect(page).toHaveURL(/\/realisations$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
});
