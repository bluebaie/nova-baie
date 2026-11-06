import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import fr from '../messages/fr.json';
import en from '../messages/en.json';
import { projects, localizeProjects, featuredProjectIds } from '../src/lib/projects';
import { expertiseIds, processIds } from '../src/lib/expertises';
import { getActualites } from '../src/lib/actualites-data';
import { buildStructuredData } from '../src/lib/structured-data';

function keys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') return [prefix];
  return Object.entries(value).flatMap(([key, child]) => keys(child, `${prefix}.${key}`)).sort();
}

test('FR/EN cover the same editorial and accessible UI keys', () => {
  assert.deepEqual(keys(fr), keys(en));
  for (const locale of [fr, en]) {
    assert.deepEqual(Object.keys(locale.expertises), [...expertiseIds]);
    assert.deepEqual(Object.keys(locale.method.steps), [...processIds]);
  }
});

test('six stable, fully translated project identities; CSC remains unfinished', () => {
  assert.equal(projects.length, 6);
  assert.equal(new Set(projects.map(project => project.id)).size, 6);
  for (const locale of ['fr', 'en']) {
    const localized = localizeProjects(locale);
    for (const project of projects) {
      assert.equal(localized.find(item => item.id === project.id)?.description, project.copy[locale as 'fr' | 'en'].description);
      for (const copy of Object.values(project.copy)) assert.ok(copy.summary && copy.description && copy.tags.length);
      if (project.image) assert.ok(existsSync(`public${project.image}`));
      if (project.video) assert.ok(existsSync(`public${project.video}`));
    }
  }
  assert.equal(projects.find(project => project.id === 'csc')?.status, 'finalizing');
  assert.equal(projects.find(project => project.id === 'csc')?.externalUrl, undefined);
  assert.equal(projects.find(project => project.id === 'csc')?.detailStatus, 'draft');
  assert.ok(featuredProjectIds.every(id => projects.some(project => project.id === id)));
  assert.ok(projects.every(project => project.slug && project.portfolioOrder && Array.isArray(project.technologyIds)));
  assert.equal(new Set(projects.map(project => project.portfolioOrder)).size, projects.length);
  assert.ok(projects.filter(project => project.homeVisible).every(project => project.homeOrder !== null));
  assert.ok(projects.filter(project => project.detailStatus === 'published').every(project => project.copy.fr.caseStudy && project.copy.en.caseStudy));
  assert.ok(projects.filter(project => project.externalUrl).every(project => project.externalUrl?.startsWith('https://') && project.externalUrlCheckedOn === '2026-11-06'));
  for (const id of ['blue-baie', 'saint-jean']) {
    const project = projects.find(project => project.id === id);
    if (id === 'blue-baie') {
      assert.equal(project?.image, `/images/projects/${id}-public.webp`);
      assert.equal(project?.mobileImage, `/images/projects/${id}-mobile.webp`);
    } else {
      assert.equal(project?.image, '/media/projects/conciergerie-saint-jean/screens/home-desktop.jpg');
      assert.equal(project?.mobileImage, '/media/projects/conciergerie-saint-jean/screens/home-mobile1.jpg');
      assert.equal(project?.videoPoster, '/media/projects/conciergerie-saint-jean/poster.jpg');
    }
    assert.ok(existsSync(`public${project?.mobileImage}`));
  }
  assert.equal(projects.find(project => project.id === 'csc')?.image, undefined);
});

test('historical publications retain dates and existing images with translated copy', () => {
  const french = getActualites('fr');
  const english = getActualites('en');
  assert.equal(french.length, 3);
  assert.deepEqual(french.map(({ id, date, images }) => ({ id, date, images })), english.map(({ id, date, images }) => ({ id, date, images })));
  assert.ok(english.every(item => item.title && item.body && !item.body.includes('Nous concevons')));
  for (const item of french) for (const image of item.images) assert.ok(existsSync(`public${image}`));
});

test('public copy and schema contain no legacy packages, prices or automatic commitments', () => {
  const prohibited = /€|\b\d+\s*EUR\b|priceRange|Site Essentiel|Site Signature|Site Performance|3 niveaux|3 levels|24h|48h|3 mois|3 months|100% tourisme|100% tourism|\b900 avis\b/i;
  for (const locale of [fr, en]) assert.doesNotMatch(JSON.stringify(locale), prohibited);
  assert.doesNotMatch(JSON.stringify(projects), prohibited);
  assert.doesNotMatch(JSON.stringify(getActualites('fr')), prohibited);
  for (const locale of ['fr', 'en']) {
    const schema = buildStructuredData(locale, 'Digital development', [...expertiseIds]);
    assert.doesNotMatch(JSON.stringify(schema), prohibited);
    assert.equal(schema['@graph'][0].inLanguage, locale === 'en' ? 'en-GB' : 'fr-FR');
  }
  assert.doesNotMatch(`${JSON.stringify(fr)} ${JSON.stringify(en)}`, /(?:six|seven|eight|three|trois|sept|huit)\s+(?:projects|projets|websites|sites|realisations|réalisations)/i);
});
