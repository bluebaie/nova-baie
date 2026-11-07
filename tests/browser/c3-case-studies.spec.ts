import { test, expect } from '@playwright/test';

test.use({ video: 'on' });
const testOrigin = `http://localhost:${process.env.PLAYWRIGHT_PORT ?? '3146'}`;

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => new URL(route.request().url()).origin === testOrigin ? route.continue() : route.abort());
});

for (const [slug, style] of [
  ['blue-baie-conciergerie', 'ecosystem'],
] as const) {
  test(`C5 ${slug}: authentic gallery, brand links, keyboard dialog and responsive`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`/realisations/${slug}`);
    await expect(page.locator(`[data-case-style="${style}"]`)).toBeVisible();
    await expect(page.locator('h1')).toContainText(slug === 'blue-baie-conciergerie' ? 'Blue Baie' : 'Saint-Jean');

    const demo = page.locator('.bb-admin-demo');
    await demo.scrollIntoViewIfNeeded();
    await expect(demo.getByText('Interface de démonstration — données fictives').first()).toBeVisible();
    await demo.locator('.bb-admin-content').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished.catch(() => undefined))));
    await demo.locator('.bb-admin-shell').screenshot({ path: 'test-results/lot-c5-1-admin-demo-desktop.png' });
    await expect(demo.getByRole('tab')).toHaveCount(8);
    await demo.getByRole('tab', { name: /Réservations/ }).focus();
    await page.keyboard.press('Enter');
    await expect(demo.getByRole('tabpanel')).toContainText('La Dune Claire');
    await expect(demo.getByRole('tabpanel')).toContainText('Planning des séjours');
    const panels = ['Vue d’ensemble', 'Réservations', 'Logements', 'Fiche logement', 'Facturation', 'Contenus', 'Visibilité & SEO', 'Intégrations & IA'];
    for (const [index, title] of panels.entries()) {
      const tab = demo.getByRole('tab').nth(index);
      await tab.click();
      await expect(demo.getByRole('tabpanel').getByRole('heading', { level: 3 })).toHaveText(title);
      await expect(demo.getByText('Interface de démonstration — données fictives').last()).toBeVisible();
    }
    await demo.getByRole('tab', { name: /Intégrations & IA/ }).click();
    await expect(demo.getByRole('tabpanel')).toContainText('Beds24');
    await expect(demo.getByRole('tabpanel')).toContainText('Keycafe');
    await expect(demo.getByRole('tabpanel')).toContainText('Périmètre à qualifier');
    await expect(demo.getByRole('tabpanel')).toContainText('Interface de démonstration — données fictives');
    await demo.locator('.bb-admin-content').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished.catch(() => undefined))));
    await demo.locator('.bb-admin-shell').screenshot({ path: 'test-results/lot-c5-1-admin-integrations-desktop.png' });

    const clientVisit = page.locator('.bb-visit');
    await expect(clientVisit).toHaveAttribute('target', '_blank');
    await expect(clientVisit).toHaveAttribute('rel', 'noopener noreferrer');

    const heroImage = page.locator('.bb-hero-screen img');
    await expect.poll(() => heroImage.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(heroImage).toHaveAttribute('src', /home-desktop/);

    const gallery = page.locator('.bb-gallery');
    await gallery.scrollIntoViewIfNeeded();
    await expect(gallery.locator('.bb-gallery-item')).toHaveCount(8);
    await expect.poll(() => gallery.locator('.bb-gallery-item img').first().evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const galleryItem = gallery.locator('button').first();
    await galleryItem.focus();
    await expect(galleryItem).toBeFocused();
    await galleryItem.press('Enter');
    await expect(page.locator('.bb-lightbox[open]')).toBeVisible();
    await expect(page.locator('.bb-lightbox img')).toHaveAttribute('src', /home-desktop/);
    await page.locator('.bb-lightbox-close').click();
    await expect(page.locator('.bb-lightbox[open]')).toHaveCount(0);
    await page.evaluate(async () => {
      for (const image of Array.from(document.images)) image.loading = 'eager';
      await Promise.all(Array.from(document.images).map(image => image.decode().catch(() => undefined)));
    });
    await expect.poll(() => page.locator('.bb-photo img').evaluateAll(images => images.filter(image => (image as HTMLImageElement).naturalWidth > 0).length)).toBe(5);
    await page.locator('.bb-photo-grid').screenshot({ path: 'test-results/lot-c5-blue-baie-photography.png' });
    await page.locator('.bb-finale').scrollIntoViewIfNeeded();
    await expect(page.locator('.bb-finale h2')).toHaveCSS('color', 'rgb(255, 255, 255)');
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: 'test-results/lot-c5-blue-baie-desktop.png', fullPage: true, animations: 'disabled' });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/realisations/${slug}`);
    await page.locator('.bb-admin-demo').scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('.bb-demo-kpis').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.locator('.bb-admin-content').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished.catch(() => undefined))));
    await page.locator('.bb-admin-demo .bb-admin-shell').screenshot({ path: 'test-results/lot-c5-1-admin-demo-mobile.png' });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.bb-hero-screen img')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: 'test-results/lot-c5-blue-baie-mobile.png', fullPage: true, animations: 'disabled' });

    if (style === 'ecosystem') {
      await expect(page.locator('.bb-system-map')).toContainText('Site public');
    }
  });
}

test('C5 Blue Baie English route has localized metadata, gallery and no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en/realisations/blue-baie-conciergerie');
  await expect(page.locator('h1')).toContainText('Blue Baie');
  await expect(page.locator('h2').first()).toContainText('concierge');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/realisations\/blue-baie-conciergerie$/);
  await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute('href', /\/realisations\/blue-baie-conciergerie$/);
  await expect(page.locator('.bb-gallery-item')).toHaveCount(8);
  const demo = page.locator('.bb-admin-demo');
  await demo.scrollIntoViewIfNeeded();
  await expect(demo.getByText('Demonstration interface — fictional data').first()).toBeVisible();
  await demo.getByRole('tab', { name: /Integrations & AI/ }).click();
  await expect(demo.getByRole('tabpanel')).toContainText('Future direction');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

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
