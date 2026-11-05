import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createContactHandler } from '../src/lib/contact/handler';
import { validateContact, CONTACT_LIMITS, PROJECT_TYPES } from '../src/lib/contact/validation';
import { createRedisLimiter } from '../src/lib/contact/rate-limit';
import { submitContact } from '../src/lib/contact/submit';

const valid = { nom: ' Test ', email: 'test@example.invalid', telephone: '', structure: 'Demo', typeProjet: 'website', message: 'Test uniquement' };
const origin = 'https://nova.example.invalid';
const webhookUrl = 'https://hook.eu1.make.com/FAKE-NOT-A-REAL-WEBHOOK';
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/contact`, { method: 'POST', headers: { origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
}
const allow = async () => ({ allowed: true, retryAfter: 0 });
function setup(fetcher: typeof fetch = async () => new Response('Accepted'), limiter = allow, timeoutMs = 50) {
  return createContactHandler({ origins: [origin], webhookUrl, fetcher, limiter, timeoutMs, now: () => new Date('2026-11-05T12:00:00Z') });
}

test('normalization and unchanged Make contract; source/date server-owned, honeypot excluded', async () => {
  let payload: unknown;
  const handler = setup(async (url, init) => {
    assert.equal(String(url), webhookUrl);
    assert.equal(init?.redirect, 'error');
    payload = JSON.parse(String(init?.body));
    return new Response('Accepted', { status: 200 });
  });
  const response = await handler(request({ ...valid, website: '' }));
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { code: 'accepted' });
  assert.deepEqual(payload, { ...valid, nom: 'Test', source: 'Site Nova Baie', date: '2026-11-05T12:00:00.000Z' });
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

for (const typeProjet of PROJECT_TYPES) test(`new topic ${typeProjet} preserves the Make payload structure`, async () => {
  const response = await setup(async (_url, init) => {
    const payload = JSON.parse(String(init?.body));
    assert.equal(payload.typeProjet, typeProjet);
    assert.deepEqual(Object.keys(payload).sort(), ['nom', 'email', 'telephone', 'structure', 'typeProjet', 'message', 'source', 'date'].sort());
    return new Response('Accepted');
  })(request({ ...valid, typeProjet }));
  assert.equal(response.status, 202);
});

test('project topic is optional, and former package codes are rejected', () => {
  assert.equal(validateContact({ nom: 'Test', email: valid.email, message: 'A need' }).typeProjet, 'other');
  for (const typeProjet of ['presence', 'conversion', 'acquisition', 'maintenance', 'conseil']) {
    assert.throws(() => validateContact({ ...valid, typeProjet }));
  }
});

for (const [name, body] of Object.entries({
  missing: { email: valid.email }, invalidEmail: { ...valid, email: 'bad' }, array: [], null: null,
  wrongType: { ...valid, nom: 42 }, invalidProject: { ...valid, typeProjet: 'admin' },
  unknown: { ...valid, admin: true }, spoofedSource: { ...valid, source: 'Injected' }, spoofedDate: { ...valid, date: 'yesterday' },
  honeypot: { ...valid, website: 'spam' }, blank: { ...valid, message: '   ' }, injection: { ...valid, email: 'a@example.invalid\nBcc:test@example.invalid' },
  control: { ...valid, message: 'test\u0000' },
  emailDots: { ...valid, email: 'test..name@example.invalid' },
  emptyDomainLabel: { ...valid, email: 'test@example..invalid' },
  invalidDomainLabel: { ...valid, email: 'test@-example.invalid' },
})) test(`rejects ${name} without outbound calls`, async () => {
  const response = await setup(async () => { assert.fail('Outbound call forbidden'); })(request(body));
  assert.equal(response.status, 400);
});

for (const [key, max] of Object.entries(CONTACT_LIMITS)) test(`limits ${key}`, async () => {
  assert.throws(() => validateContact({ ...valid, [key]: 'x'.repeat(max + 1) }));
});

test('streamed body and declared body limits; malformed JSON', async () => {
  assert.equal((await setup()(request(valid, { 'content-length': '24001' }))).status, 413);
  assert.equal((await setup()(request({ ...valid, message: 'x'.repeat(25000) }))).status, 413);
  const bad = new Request(`${origin}/api/contact`, { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: '{' });
  assert.equal((await setup()(bad)).status, 400);
});

test('origin, fetch metadata, method and media type gates', async () => {
  assert.equal((await setup()(request(valid, { origin: 'https://attacker.invalid' }))).status, 403);
  assert.equal((await setup()(request(valid, { origin: '' }))).status, 403);
  assert.equal((await setup()(request(valid, { 'sec-fetch-site': 'cross-site' }))).status, 403);
  assert.equal((await setup()(request(valid, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await setup()(new Request(`${origin}/api/contact`))).status, 405);
});

for (const status of [301, 400, 429, 500]) test(`Make ${status} cannot produce success or leak body`, async () => {
  const response = await setup(async () => new Response('SENSITIVE_UPSTREAM_BODY', { status }))(request());
  assert.equal(response.status, 502);
  assert.equal((await response.text()).includes('SENSITIVE'), false);
});

test('timeout aborts outbound request and returns failure', async () => {
  const handler = setup(async (_url, init) => new Promise((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => reject(init.signal?.reason), { once: true });
    // Keep a referenced timer: AbortSignal.timeout itself is unref'ed in Node.
    setTimeout(() => reject(new Error('Timeout test guard')), 100).unref();
  }), allow, 5);
  const keepAlive = setTimeout(() => {}, 150);
  try { assert.equal((await handler(request())).status, 504); }
  finally { clearTimeout(keepAlive); }
});

test('network and limiter failures are closed, not success', async () => {
  assert.equal((await setup(async () => { throw new Error('private detail'); })(request())).status, 502);
  assert.equal((await setup(undefined, async () => { throw new Error('private redis'); })(request())).status, 503);
  const response = await setup(async () => { assert.fail('No Make call'); }, async () => ({ allowed: false, retryAfter: 900 }))(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '900');
});

test('missing/invalid webhook config never sends', async () => {
  for (const url of ['', 'http://hook.eu1.make.com/x', 'https://attacker.invalid/x', 'https://user:pass@hook.eu1.make.com/x']) {
    const handler = createContactHandler({ origins: [origin], webhookUrl: url, limiter: allow, fetcher: async () => { assert.fail('No outbound call'); } });
    assert.equal((await handler(request())).status, 503);
  }
});

test('distributed limiter uses atomic EVAL, HMAC key and TTLs; no raw email', async () => {
  let body = '';
  const limiter = createRedisLimiter('https://redis.example.invalid', 'FAKE-TOKEN', 'x'.repeat(32), async (_url, init) => {
    body = String(init?.body);
    return Response.json({ result: [0, 899] });
  });
  assert.deepEqual(await limiter(valid.email), { allowed: false, retryAfter: 899 });
  assert.ok(body.includes('EVAL') && body.includes('EXPIRE'));
  assert.equal(body.includes(valid.email), false);
  assert.throws(() => createRedisLimiter('', '', ''));
});

test('limiter rejects malformed or failed backend response', async () => {
  for (const response of [Response.json({ result: 'bad' }), new Response('', { status: 500 })]) {
    const limiter = createRedisLimiter('https://redis.example.invalid', 'fake', 'x'.repeat(32), async () => response);
    await assert.rejects(limiter(valid.email));
  }
});

test('client accepts only explicit 202/accepted, never HTTP error or malformed success', async () => {
  for (const response of [new Response('', { status: 500 }), Response.json({ code: 'accepted' }), Response.json({ code: 'bad' }, { status: 202 }), new Response('bad', { status: 202 })]) {
    await assert.rejects(submitContact(valid, async () => response));
  }
  await submitContact(valid, async (url) => {
    assert.equal(url, '/api/contact');
    return Response.json({ code: 'accepted' }, { status: 202 });
  });
});
