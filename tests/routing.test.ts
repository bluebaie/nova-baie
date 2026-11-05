import assert from 'node:assert/strict';
import { test } from 'node:test';
import { NextRequest } from 'next/server';
import middleware from '../src/middleware';

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
}
