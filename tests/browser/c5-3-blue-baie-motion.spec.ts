import { mkdir } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

test.use({ video: 'on' });

test('C5.3 Blue Baie current journey remains visible through scroll and reverse scroll', async ({ page }) => {
  test.setTimeout(90_000);
  const reviewDir = 'test-results/lot-c5-3';
  await mkdir(reviewDir, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/realisations/blue-baie-conciergerie');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.bb-hero h1')).toBeVisible();

  const scenes = [
    ['tide', '.bb-current-seam--tide'],
    ['public', '.bb-public'],
    ['platform-transition', '.bb-current-seam--platform'],
    ['portal-transition', '.bb-current-seam--portal'],
    ['admin', '.bb-admin-demo'],
    ['connected-horizon', '.bb-current-seam--horizon'],
    ['finale', '.bb-finale'],
  ] as const;

  for (const [name, selector] of scenes) {
    const scene = page.locator(selector);
    await scene.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.waitForTimeout(240);
    await expect(scene).toBeVisible();
    await page.screenshot({ path: `${reviewDir}/${name}-1440.png`, animations: 'disabled' });
  }

  const adminTabs = page.getByRole('tab');
  await expect(adminTabs).toHaveCount(8);
  for (let index = 0; index < 8; index += 1) {
    await adminTabs.nth(index).click();
    await expect(page.getByRole('tabpanel')).toBeVisible();
    await expect(page.getByText(/Interface de démonstration — données fictives/).first()).toBeVisible();
  }

  // Quick movement through the full narrative, then back to ensure scrubbed paths reverse cleanly.
  await page.mouse.wheel(0, 2600);
  await page.waitForTimeout(180);
  await page.mouse.wheel(0, 2600);
  await page.waitForTimeout(180);
  await expect(page.locator('.bb-finale h2')).toBeVisible();
  await page.mouse.wheel(0, -5200);
  await page.waitForTimeout(260);
  await expect(page.locator('.bb-hero h1')).toBeVisible();

  const geometry = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    blankSeams: Array.from(document.querySelectorAll<SVGSVGElement>('[data-bb-seam] svg')).some(svg => !svg.querySelector('path')),
    titlesVisible: Array.from(document.querySelectorAll<HTMLElement>('.bb-case h1, .bb-case h2')).every(node => {
      const style = getComputedStyle(node);
      return style.visibility !== 'hidden' && Number(style.opacity) > 0.8 && node.getBoundingClientRect().width > 120;
    }),
    badImages: Array.from(document.images).filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc),
  }));
  expect(geometry.overflow).toBe(false);
  expect(geometry.blankSeams).toBe(false);
  expect(geometry.titlesVisible).toBe(true);
  expect(geometry.badImages).toEqual([]);
});

test('C5.3 reduced motion and mobile keep all transition decoration non-blocking', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/realisations/blue-baie-conciergerie');
  await expect(page.locator('.bb-hero h1')).toBeVisible();
  await expect(page.locator('#bb-admin-title')).toBeVisible();
  const details = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: innerWidth,
    lines: Array.from(document.querySelectorAll<SVGPathElement>('[data-bb-seam] path')).every(path => getComputedStyle(path).visibility !== 'hidden'),
    titleOpacity: Number(getComputedStyle(document.querySelector('.bb-admin-heading h2')!).opacity),
  }));
  expect(details.width).toBeLessThanOrEqual(details.viewport);
  expect(details.lines).toBe(true);
  expect(details.titleOpacity).toBeGreaterThan(0.8);
});
