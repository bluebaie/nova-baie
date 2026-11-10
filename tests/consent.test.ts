import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CONSENT_KEY, CONSENT_MAX_AGE_MS, hasAnalyticsConsent, readConsent, writeConsent } from '../src/lib/consent';

function fakeWindow() {
  const store = new Map<string, string>();
  (globalThis as unknown as { window: unknown }).window = {
    localStorage: { getItem: (key: string) => store.get(key) ?? null, setItem: (key: string, value: string) => { store.set(key, value); } }
  };
  return store;
}

test('no stored choice means no analytics consent', () => {
  fakeWindow();
  assert.equal(readConsent(), null);
  assert.equal(hasAnalyticsConsent(), false);
});

test('accept and refuse are both remembered', () => {
  fakeWindow();
  writeConsent(true);
  assert.equal(hasAnalyticsConsent(), true);
  writeConsent(false);
  assert.equal(readConsent()?.analytics, false);
  assert.equal(hasAnalyticsConsent(), false);
});

test('a choice expires after six months and malformed or old versions are ignored', () => {
  const store = fakeWindow();
  const now = Date.now();
  writeConsent(true, now - CONSENT_MAX_AGE_MS - 1000);
  assert.equal(readConsent(now), null);
  store.set(CONSENT_KEY, JSON.stringify({ v: 0, analytics: true, date: now }));
  assert.equal(readConsent(now), null);
  store.set(CONSENT_KEY, '{not json');
  assert.equal(readConsent(now), null);
});

test('Google Tag Manager is never loaded unconditionally by the layout', () => {
  const layout = readFileSync('src/app/[locale]/layout.tsx', 'utf8');
  assert.doesNotMatch(layout, /googletagmanager|gtm\.js|GTM-/);
  assert.match(layout, /<ConsentManager \/>/);
});
