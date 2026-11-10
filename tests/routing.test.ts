import assert from 'node:assert/strict';
import { test } from 'node:test';
import { NextRequest } from 'next/server';
import middleware, { config } from '../src/middleware';

test('generated OG image and technical resources bypass locale middleware', () => {
  const matcher = new RegExp(`^${config.matcher[0]}$`);
  for (const path of ['/opengraph-image', '/api/contact', '/_next/image', '/robots.txt', '/sitemap.xml']) assert.equal(matcher.test(path), false, path);
  assert.equal(matcher.test('/realisations'), true);
});

for (const path of ['', '/services', '/realisations', '/actualites', '/a-propos', '/contact', '/mentions-legales']) {
  test(`middleware normalizes /fr${path || '/'} without a loop`, () => {
    const base = 'http://localhost:3146';
    const response = middleware(new NextRequest(`${base}/fr${path}`, { headers: { 'accept-language': 'en' } }));
    assert.ok([307, 308].includes(response.status));
    const location = response.headers.get('location');
    assert.ok(location);
    assert.equal(new URL(location).pathname, path || '/');
    const destination = middleware(new NextRequest(new URL(location), { headers: { cookie: 'NEXT_LOCALE=fr' } }));
    assert.equal(destination.status, 200);
    assert.equal(destination.headers.get('location'), null);
  });
  test(`middleware preserves /en${path || '/'} and French ${path || '/'}`, () => {
    const en = middleware(new NextRequest(`http://localhost:3146/en${path}`));
    assert.equal(en.status, 200);
    assert.equal(en.headers.get('location'), null);
    const fr = middleware(new NextRequest(`http://localhost:3146${path}`, { headers: { 'accept-language': 'fr' } }));
    assert.equal(fr.status, 200);
    assert.ok(fr.headers.get('x-middleware-rewrite')?.includes(`/fr${path}`));
  });
  test(`middleware lets an already-rewritten /fr${path || '/'} route continue`, () => {
    const internal = middleware(new NextRequest(`http://localhost:3146/fr${path}`, {
      headers: { 'x-next-intl-locale': 'fr' },
    }));
    assert.equal(internal.status, 200);
    assert.equal(internal.headers.get('location'), null);
    assert.equal(internal.headers.get('x-middleware-rewrite'), null);

    // A normal browser request to the historical /fr URL still normalizes to
    // the canonical French URL without a prefix.
    const external = middleware(new NextRequest(`http://localhost:3146/fr${path}`));
    assert.ok([307, 308].includes(external.status));
    assert.equal(new URL(external.headers.get('location')!).pathname, path || '/');
  });
}

test('French URLs are never redirected by browser language or locale cookie (SEO)', () => {
  for (const path of ['', '/services', '/realisations/cyclosport-crotellois']) {
    const response = middleware(new NextRequest(`http://localhost:3146${path}`, { headers: { 'accept-language': 'en-US,en;q=0.9', cookie: 'NEXT_LOCALE=en' } }));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('location'), null);
    assert.ok(response.headers.get('x-middleware-rewrite')?.includes(`/fr${path}`));
  }
});
