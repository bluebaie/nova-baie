import { test } from 'node:test';
import assert from 'node:assert/strict';
import sitemap from '../src/app/sitemap';
import robots from '../src/app/robots';
import { localeAlternates } from '../src/lib/seo';

test('sitemap retains commercial pages in both languages; excludes noindex and artificial dates', () => {
  const entries = sitemap();
  assert.equal(entries.length, 24);
  for (const prefix of ['', '/en']) for (const path of ['', '/services', '/realisations', '/actualites', '/a-propos', '/contact']) {
    assert.ok(entries.some(entry => entry.url === `https://www.nova-baie.com${prefix}${path}`));
  }
  assert.ok(entries.some(entry => entry.url === 'https://www.nova-baie.com/realisations/blue-baie-conciergerie'));
  assert.ok(entries.some(entry => entry.url === 'https://www.nova-baie.com/en/realisations/conciergerie-saint-jean'));
  assert.ok(entries.some(entry => entry.url === 'https://www.nova-baie.com/realisations/le-bout-du-monde'));
  assert.ok(entries.some(entry => entry.url === 'https://www.nova-baie.com/en/realisations/le-bout-du-monde'));
  assert.ok(entries.some(entry => entry.url === 'https://www.nova-baie.com/realisations/gites-en-baie'));
  assert.ok(entries.some(entry => entry.url === 'https://www.nova-baie.com/en/realisations/gites-en-baie'));
  for (const prefix of ['', '/en']) assert.ok(entries.some(entry => entry.url === `https://www.nova-baie.com${prefix}/realisations/cyclosport-crotellois`));
  assert.ok(!entries.some(entry => entry.url.includes('vercel.app')));
  for (const prefix of ['', '/en']) assert.ok(entries.some(entry => entry.url === `https://www.nova-baie.com${prefix}/realisations/le-refuge-de-la-marmotte`));
  assert.ok(entries.every(entry => !entry.lastModified && !entry.url.includes('mentions-legales')));
});

test('robots applies one consistent rule and permits rendering resources', () => {
  const rules = robots().rules;
  assert.ok(Array.isArray(rules));
  assert.equal(rules.length, 1);
  assert.ok(!JSON.stringify(rules).includes('_next'));
  assert.equal(robots().sitemap, 'https://www.nova-baie.com/sitemap.xml');
});

test('canonical/hreflang pairs stay on the same page', () => {
  const alternates = localeAlternates('en', '/contact');
  assert.equal(alternates.canonical, 'https://www.nova-baie.com/en/contact');
  assert.equal(alternates.languages.fr, 'https://www.nova-baie.com/contact');
});
