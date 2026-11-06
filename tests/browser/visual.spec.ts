import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';

const resolvePackage = createRequire(`${process.cwd()}/package.json`);
test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => new URL(route.request().url()).origin === 'http://localhost:3146' ? route.continue() : route.abort());
});

for (const prefix of ['', '/en']) for (const width of [390, 768, 1024, 1440]) {
  test(`art review ${prefix || 'fr'} ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const path of ['', '/services', '/realisations', '/contact', '/realisations/blue-baie-conciergerie', '/realisations/conciergerie-saint-jean']) {
      await page.goto(`${prefix}${path}` || '/');
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `test-results/lot-c-${prefix ? 'en' : 'fr'}-${path.slice(1) || 'home'}-${width}.png`, fullPage: true, animations: 'disabled' });
      await page.addScriptTag({ path: resolvePackage.resolve('axe-core/axe.min.js') });
      const violations = await page.evaluate(async () => {
        const axe = (window as unknown as { axe: { run: (options: unknown) => Promise<{ violations: { id: string; nodes: { target: string[]; failureSummary: string }[] }[] }> } }).axe;
        return (await axe.run({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations;
      });
      expect(violations, `${prefix}${path} ${width}: ${JSON.stringify(violations)}`).toEqual([]);
    }
  });
}

test('hero readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await context.route('**/*', route => new URL(route.request().url()).origin === 'http://localhost:3146' ? route.continue() : route.abort());
  const page = await context.newPage();
  await page.goto('http://localhost:3146/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('main section').first().getByRole('link').first()).toBeVisible();
  await expect.poll(() => page.locator('main section').first().locator('img').evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await context.close();
});

test('motion preferences can change; portfolio keyboard has hover equivalent', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.locator('[data-hero]').evaluate(el => (el as HTMLElement).style.setProperty('--hero-x', '6px'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  await expect.poll(() => page.locator('[data-hero]').evaluate(el => (el as HTMLElement).style.getPropertyValue('--hero-x'))).toBe('');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length)).toBe(0);
  await page.goto('/realisations');
  const link = page.locator('[data-project="blue-baie"] [data-project-image-link]');
  await link.focus();
  await expect(link).toBeFocused();
  expect(await link.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
});
