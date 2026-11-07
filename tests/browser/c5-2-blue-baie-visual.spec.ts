import { mkdir } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

const reviewDir = 'test-results/lot-c5-2';
const widths = [390, 768, 1024, 1440, 1920];
const sectionSelectors = [
  '.bb-hero', '.bb-origin', '.bb-public', '.bb-journeys', '.bb-platform',
  '.bb-admin-demo', '.bb-ecosystem', '.bb-imagery', '.bb-sibling', '.bb-finale',
];

test('C5.2 full visual review, geometry, media and eight demo modules', async ({ page }) => {
  test.setTimeout(180_000);
  await mkdir(reviewDir, { recursive: true });
  for (const width of widths) {
    console.log(`C5.2 review ${width}px: navigation`);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/realisations/blue-baie-conciergerie');
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
    await page.evaluate(async () => { await document.fonts.ready; });

    const mobileImages = page.locator('.bb-case img[src*="mobile-clean"]');
    await expect(mobileImages).toHaveCount(3);
    for (const image of await mobileImages.all()) {
      await expect(image).toHaveAttribute('src', /(home|content)-mobile-clean\.webp/);
    }

    for (const [index, selector] of sectionSelectors.entries()) {
      console.log(`C5.2 review ${width}px: ${selector}`);
      const section = page.locator(selector).first();
      await section.evaluate(node => {
        const top = node.getBoundingClientRect().top + window.scrollY - 104;
        window.scrollTo({ top, behavior: 'instant' });
      });
      await page.waitForTimeout(180);
      await section.evaluate(async node => {
        const el = node as HTMLElement;
        for (const image of Array.from(el.querySelectorAll('img'))) (image as HTMLImageElement).loading = 'eager';
        await Promise.race([Promise.all(Array.from(el.querySelectorAll('img')).map(img => (img as HTMLImageElement).decode().catch(() => undefined))), new Promise(resolve => setTimeout(resolve, 1200))]);
        const finite = el.getAnimations({ subtree: true }).filter(animation => animation.effect?.getTiming().iterations !== Infinity);
        await Promise.race([Promise.all(finite.map(animation => animation.finished.catch(() => undefined))), new Promise(resolve => setTimeout(resolve, 900))]);
      });
      const brokenSectionImages = await section.locator('img').evaluateAll(nodes => nodes.filter(node => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth === 0).map(node => (node as HTMLImageElement).currentSrc || (node as HTMLImageElement).src));
      expect(brokenSectionImages, `Broken image(s) in ${selector} at ${width}px`).toEqual([]);
      if (selector === '.bb-admin-demo') {
        const heading = page.locator('#bb-admin-title');
        await expect(heading).toBeVisible();
        await expect(heading).toHaveCSS('color', 'rgb(245, 244, 237)');
        const rect = await heading.boundingBox();
        expect(rect?.width).toBeGreaterThan(Math.min(width * .48, 280));
        const shell = page.locator('.bb-admin-shell');
        for (let tab = 0; tab < 8; tab += 1) {
          const button = page.getByRole('tab').nth(tab);
          await button.click();
          await expect(page.getByRole('tabpanel').getByRole('heading', { level: 3 })).toBeVisible();
          await expect(shell.getByText(/Interface de démonstration|Demonstration interface/).first()).toBeVisible();
        }
        await page.getByRole('tab').first().click();
        await heading.evaluate(node => node.scrollIntoView({ block: 'start', behavior: 'instant' }));
        await page.waitForTimeout(120);
        await page.screenshot({ path: `${reviewDir}/admin-${width}.png`, animations: 'disabled' });
      }
      if (selector === '.bb-platform') {
        const widthsFound = await page.locator('.bb-platform-description').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().width));
        expect(widthsFound).toHaveLength(4);
        for (const textWidth of widthsFound) expect(textWidth).toBeGreaterThan(width < 480 ? 180 : 260);
      }
      if (selector === '.bb-finale') {
        const heading = section.locator('h2');
        await expect(heading).toBeVisible();
        const h = await heading.boundingBox();
        const p = await section.locator('p:not(.bb-eyebrow)').boundingBox();
        expect(h && p && p.y >= h.y + h.height + 8).toBeTruthy();
      }
      if (selector === '.bb-origin' || selector === '.bb-public' || selector === '.bb-platform' || selector === '.bb-admin-demo' || selector === '.bb-ecosystem' || selector === '.bb-imagery' || selector === '.bb-finale') {
        const headline = section.locator('h2').first();
        const style = await headline.evaluate(node => ({ opacity: Number(getComputedStyle(node).opacity), visibility: getComputedStyle(node).visibility, box: node.getBoundingClientRect().toJSON() }));
        expect(style.opacity).toBeGreaterThan(.85);
        expect(style.visibility).toBe('visible');
        expect(style.box.width).toBeGreaterThan(140);
      }
      await page.screenshot({ path: `${reviewDir}/section-${index + 1}-${width}.png`, animations: 'disabled' });
    }

    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    const metrics = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, brokenImages: Array.from(document.images).filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src) }));
    expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.width);
    expect(metrics.brokenImages).toEqual([]);
    if (width === 390) {
      await page.evaluate(async () => {
        for (const image of Array.from(document.images)) image.loading = 'eager';
        await Promise.all(Array.from(document.images).map(image => image.decode().catch(() => undefined)));
      });
      await page.screenshot({ path: `${reviewDir}/blue-baie-full-${width}.png`, fullPage: true, animations: 'disabled' });
    }
  }
});

test('C5.2 English, reduced motion, direct anchor and headings remain visible', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/realisations/blue-baie-conciergerie#bb-admin-title');
  const heading = page.locator('#bb-admin-title');
  await expect(heading).toBeVisible();
  await expect(heading).toHaveCSS('color', 'rgb(245, 244, 237)');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/realisations\/blue-baie-conciergerie$/);
  await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute('href', /\/realisations\/blue-baie-conciergerie$/);
  const header = page.locator('.site-header').boundingBox();
  const title = await heading.boundingBox();
  const headerBox = await header;
  expect(title && headerBox && title.y).toBeGreaterThan(headerBox!.y + headerBox!.height - 1);
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await expect(page.locator('.bb-finale h2')).toBeVisible();
  await page.evaluate(() => scrollTo(0, 0));
  await expect(page.locator('h1')).toBeVisible();
});
