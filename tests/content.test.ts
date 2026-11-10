import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import fr from '../messages/fr.json';
import en from '../messages/en.json';
import { projects, localizeProjects, featuredProjectIds } from '../src/lib/projects';
import { expertiseIds, processIds } from '../src/lib/expertises';
import { getActualites } from '../src/lib/actualites-data';
import { buildStructuredData } from '../src/lib/structured-data';
import { blueBaieCaseMedia, getPublishedCaseMedia } from '../src/lib/project-case-media';
import { blueBaieCaseContent } from '../src/lib/blue-baie-case-content';
import { boutDuMondeCaseContent } from '../src/lib/bout-du-monde-case-content';

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
  assert.ok(featuredProjectIds.every(id => projects.some(project => project.id === id)));
  assert.ok(projects.every(project => project.slug && project.portfolioOrder && Array.isArray(project.technologyIds)));
  assert.equal(new Set(projects.map(project => project.portfolioOrder)).size, projects.length);
  assert.ok(projects.filter(project => project.homeVisible).every(project => project.homeOrder !== null));
  assert.ok(projects.filter(project => project.detailStatus === 'published').every(project => project.copy.fr.caseStudy && project.copy.en.caseStudy));
  // The CSC official domain is checked during the global pre-publication review, so it carries no check date yet.
  assert.ok(projects.filter(project => project.externalUrl).every(project => project.externalUrl?.startsWith('https://') && (project.id === 'csc' || /^\d{4}-\d{2}-\d{2}$/.test(project.externalUrlCheckedOn ?? ''))));
  for (const id of ['blue-baie', 'saint-jean']) {
    const project = projects.find(project => project.id === id);
    if (id === 'blue-baie') {
      assert.equal(project?.image, '/media/projects/blue-baie/screens/home-desktop.png');
      assert.equal(project?.mobileImage, '/media/projects/blue-baie/screens/derived/home-mobile-clean.webp');
      assert.equal(project?.logo, '/media/projects/blue-baie/images/logo/logo-bluebaie.png');
      assert.ok(project?.gallery.length >= 6);
      assert.ok(project?.copy.fr.caseStudy?.metaTitle.includes('Baie de Somme'));
      assert.ok(project?.copy.en.caseStudy?.metaTitle.includes('Bay of Somme'));
      assert.ok(!project?.gallery.some(src => src.toLowerCase().includes('keycafe')));
    } else {
      assert.equal(project?.image, '/media/projects/conciergerie-saint-jean/screens/home-desktop.jpg');
      assert.equal(project?.mobileImage, '/media/projects/conciergerie-saint-jean/screens/home-mobile1.jpg');
      assert.equal(project?.videoPoster, '/media/projects/conciergerie-saint-jean/poster.jpg');
    }
    assert.ok(existsSync(`public${project?.mobileImage}`));
  }
});

test('CycloSport Crotellois is the published flagship, first in portfolio and home, with its official domain', () => {
  const project = projects.find(item => item.id === 'csc');
  assert.equal(project?.slug, 'cyclosport-crotellois');
  assert.equal(project?.status, 'completed');
  assert.equal(project?.detailStatus, 'published');
  assert.equal(project?.flagship, true);
  assert.equal(project?.externalUrl, 'https://www.cyclosportcrotellois.fr/');
  assert.ok(!JSON.stringify(project).includes('vercel.app'));
  assert.deepEqual(localizeProjects('fr').map(item => item.id), ['csc', 'blue-baie', 'saint-jean', 'bout-du-monde', 'gites-en-baie', 'refuge-marmotte']);
  assert.equal(featuredProjectIds[0], 'csc');
  for (const src of [project?.image, project?.logo, ...(project?.gallery ?? [])]) assert.ok(src && existsSync(`public${src}`), src);
  for (const locale of ['fr', 'en'] as const) {
    const copy = project?.copy[locale];
    assert.ok(copy?.caseStudy?.metaTitle && copy.caseStudy.metaTitle.length <= 70, copy?.caseStudy?.metaTitle);
    assert.ok(copy?.caseStudy?.metaDescription && copy.caseStudy.metaDescription.length <= 170);
    assert.ok(!/bientôt|en construction|finalisation|coming soon|under construction/i.test(JSON.stringify(copy)));
  }
  for (const name of ['admin-news.webp', 'admin-members.webp', 'admin-partners.webp', 'admin-media.webp', 'peloton.webp', 'cyclocross.webp', 'og-cyclosport-crotellois.jpg']) {
    assert.ok(existsSync(`public/media/projects/csc/optimized/${name}`), name);
  }
});

test('Le Bout du Monde has a published bilingual case study and its supplied media exists', () => {
  const project = projects.find(item => item.id === 'bout-du-monde');
  assert.equal(project?.detailStatus, 'published');
  assert.equal(project?.image, '/media/projects/le-bout-du-monde/realisation-le-bout-du-monde.jpg');
  assert.equal(project?.externalUrl, 'https://www.le-bout-du-monde.org/');
  assert.ok(project?.copy.fr.caseStudy && project.copy.en.caseStudy);
  for (const locale of ['fr', 'en'] as const) {
    const copy = boutDuMondeCaseContent[locale];
    assert.equal(copy.screens.length, 3);
    assert.equal(copy.cottages.length, 3);
    for (const media of [...copy.screens, ...copy.cottages]) assert.ok(existsSync(`public${decodeURIComponent(media.src)}`), media.src);
    assert.ok(copy.galleryTitle && copy.cottagesTitle && copy.finalTitle);
  }
  assert.ok(project?.copy.fr.caseStudy?.metaTitle.includes('Baie de Somme'));
  assert.ok(project?.copy.en.caseStudy?.metaTitle.includes('Bay of Somme'));
  assert.equal(project?.mobileImage, undefined, 'no fabricated mobile screenshot should be implied');
});

test('Gîtes en Baie has a published bilingual case study using only supplied authentic captures', () => {
  const project = projects.find(item => item.id === 'gites-en-baie');
  assert.equal(project?.detailStatus, 'published');
  assert.equal(project?.externalUrl, 'https://www.gite-baie.com/');
  assert.ok(project?.copy.fr.caseStudy && project.copy.en.caseStudy);
  assert.equal(project?.gallery.length, 3);
  assert.equal(project?.mobileImage, undefined, 'no supplied mobile capture should be implied');
  assert.equal(project?.video, undefined, 'no project video was supplied');
  for (const media of project?.gallery ?? []) assert.ok(existsSync(`public${media}`), media);
  assert.ok(project?.copy.fr.caseStudy?.metaTitle.includes('Baie de Somme'));
  assert.ok(project?.copy.en.caseStudy?.metaTitle.includes('Bay of Somme'));
});

test('historical publications retain dates and existing images with translated copy', () => {
  const french = getActualites('fr');
  const english = getActualites('en');
  assert.equal(french.length, 3);
  assert.deepEqual(french.map(({ id, date, images }) => ({ id, date, images })), english.map(({ id, date, images }) => ({ id, date, images })));
  assert.ok(english.every(item => item.title && item.body && !item.body.includes('Nous concevons')));
  for (const item of french) for (const image of item.images) assert.ok(existsSync(`public${image}`));
});

test('Blue Baie case media is localized, ordered and excludes private or unverified operations media', () => {
  assert.equal(new Set(blueBaieCaseMedia.map(item => item.id)).size, blueBaieCaseMedia.length);
  for (const item of blueBaieCaseMedia) {
    assert.equal(item.projectId, 'blue-baie');
    assert.ok(item.title.fr && item.title.en && item.description.fr && item.description.en && item.alt.fr && item.alt.en);
    if (item.placement === 'operations-evidence' && item.status !== 'published') assert.equal(item.src, undefined);
    if (item.src) assert.ok(existsSync(`public${item.src}`), `missing media: ${item.src}`);
  }
  const publicGallery = getPublishedCaseMedia(blueBaieCaseMedia, 'public-gallery');
  assert.deepEqual(publicGallery.map(item => item.order), [...publicGallery].map(item => item.order).sort((a, b) => a - b));
  assert.ok(publicGallery.length >= 6);
  assert.ok(publicGallery.every(item => item.src && item.status === 'published'));
  assert.ok(!publicGallery.some(item => /keycafe|capture d'écran|220943/i.test(item.src ?? '')));
  assert.ok(blueBaieCaseMedia.some(item => item.kind === 'operations-dashboard' && item.status === 'privacy-review' && !item.src));
  assert.ok(blueBaieCaseMedia.some(item => item.kind === 'ai-workflow' && item.status === 'needs-verification' && !item.src));
  for (const locale of ['fr', 'en'] as const) {
    const copy = blueBaieCaseContent[locale];
    assert.match(`${copy.platformTitle} ${copy.platformIntro} ${copy.automationTitle} ${copy.automationBody}`, /plateforme|automatis|platform|automat/i);
  }
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
