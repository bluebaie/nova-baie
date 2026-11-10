import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createContactHandler } from '../src/lib/contact/handler';
import { validateContact, CONTACT_LIMITS, PROJECT_TYPES } from '../src/lib/contact/validation';
import type { ContactData } from '../src/lib/contact/validation';
import { createRedisLimiter } from '../src/lib/contact/rate-limit';
import { submitContact } from '../src/lib/contact/submit';
import { buildContactEmail, createContactMailer, type ContactMailer, type MailMeta } from '../src/lib/serverEmail';

const valid = { nom: ' Test ', email: 'test@example.invalid', telephone: '', structure: 'Demo', typeProjet: 'website', message: 'Test uniquement' };
const origin = 'https://nova.example.invalid';
type Sent = { data: ContactData; meta: MailMeta };
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/contact`, { method: 'POST', headers: { origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
}
const allow = async () => ({ allowed: true, retryAfter: 0 });
const quiet = () => {};
function setup(mailer: ContactMailer | null = async () => {}, limiter = allow, timeoutMs = 50) {
  return createContactHandler({ origins: [origin], mailer, limiter, timeoutMs, now: () => new Date('2026-11-05T12:00:00Z'), log: quiet });
}

test('normalized data reaches the mailer; success only after it resolves, with a tracking reference', async () => {
  const sent: Sent[] = [];
  const response = await setup(async (data, meta) => { sent.push({ data, meta }); })(request({ ...valid, website: '' }, { 'x-form-locale': 'en' }));
  assert.equal(response.status, 202);
  const body = await response.json();
  assert.equal(body.code, 'accepted');
  assert.match(body.ref, /^NB-[0-9A-F]{10}$/);
  assert.deepEqual(sent[0].data, { ...valid, nom: 'Test' });
  assert.equal(sent[0].meta.ref, body.ref);
  assert.equal(sent[0].meta.language, 'en');
  assert.equal(sent[0].meta.receivedAt.toISOString(), '2026-11-05T12:00:00.000Z');
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

for (const typeProjet of PROJECT_TYPES) test(`topic ${typeProjet} is delivered`, async () => {
  let seen = '';
  const response = await setup(async data => { seen = data.typeProjet; })(request({ ...valid, typeProjet }));
  assert.equal(response.status, 202);
  assert.equal(seen, typeProjet);
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
  nameInjection: { ...valid, nom: 'Test\nBcc: x@example.invalid' },
  control: { ...valid, message: 'test\u0000' },
  emailDots: { ...valid, email: 'test..name@example.invalid' },
  emptyDomainLabel: { ...valid, email: 'test@example..invalid' },
  invalidDomainLabel: { ...valid, email: 'test@-example.invalid' },
})) test(`rejects ${name} without sending`, async () => {
  const response = await setup(async () => { assert.fail('No email for invalid input'); })(request(body));
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

test('SMTP failure or timeout never produces success nor leaks details', async () => {
  const failing = await setup(async () => { throw Object.assign(new Error('535 bad credentials secret'), { responseCode: 535 }); })(request());
  assert.equal(failing.status, 502);
  const text = await failing.text();
  assert.equal(/535|secret|credential/.test(text), false);
  assert.match(text, /NB-/);
  const slow = setup(() => new Promise(() => {}), allow, 5);
  assert.equal((await slow(request())).status, 504);
});

test('limiter failures are closed and limits are enforced before sending', async () => {
  assert.equal((await setup(undefined, async () => { throw new Error('private redis'); })(request())).status, 503);
  const response = await setup(async () => { assert.fail('No email when rate limited'); }, async () => ({ allowed: false, retryAfter: 900 }))(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '900');
});

test('missing SMTP configuration never reports success', async () => {
  assert.equal((await setup(null)(request())).status, 503);
  assert.equal(createContactMailer({}), null);
  assert.equal(createContactMailer({ SMTP_USER: 'a@example.invalid' }), null);
});

test('email: explicit subject, all fields, escaped HTML, plain text, no secrets', () => {
  const data = { nom: 'Ada <b>', email: 'ada@example.invalid', telephone: '', structure: '', typeProjet: 'business_app', message: 'Bonjour <script>x</script>\nLigne 2' };
  const mail = buildContactEmail(data, { receivedAt: new Date('2026-11-10T09:30:00Z'), ref: 'NB-0123456789', language: 'fr' });
  assert.equal(mail.subject, 'Nova Baie — Nouvelle demande de contact');
  for (const part of ['Ada <b>', 'ada@example.invalid', 'Non renseigné', 'Non renseignée', 'Application métier', '10:30', 'Formulaire de contact Nova Baie', 'NB-0123456789', 'Ligne 2']) assert.ok(mail.text.includes(part), part);
  assert.ok(mail.html.includes('Ada &lt;b&gt;') && !mail.html.includes('<script>'));
  assert.ok(!/pass|token|smtp/i.test(mail.text + mail.html));
});

test('mailer: authenticated sender, fixed recipient, visitor only as Reply-To; refused recipient is failure', async () => {
  const calls: Record<string, unknown>[] = [];
  const transport = { sendMail: async (options: Record<string, unknown>) => { calls.push(options); return { accepted: ['contact.novabaie@gmail.com'], rejected: [] }; } };
  const env = { SMTP_USER: 'sender@example.invalid', SMTP_PASS: 'fake fake fake fake' };
  const mailer = createContactMailer(env, transport as never)!;
  await mailer({ ...valid, nom: 'Test' }, { receivedAt: new Date(), ref: 'NB-AAAAAAAAAA', language: 'fr' });
  assert.deepEqual(calls[0].from, { name: 'Site Nova Baie', address: 'sender@example.invalid' });
  assert.equal(calls[0].to, 'contact.novabaie@gmail.com');
  assert.deepEqual(calls[0].replyTo, { name: 'Test', address: valid.email });
  const refused = createContactMailer(env, { sendMail: async () => ({ accepted: [], rejected: ['contact.novabaie@gmail.com'] }) } as never)!;
  await assert.rejects(refused({ ...valid }, { receivedAt: new Date(), ref: 'NB-B', language: 'fr' }));
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

test('client accepts only explicit 202/accepted, sends the page locale, never HTTP error or malformed success', async () => {
  for (const response of [new Response('', { status: 500 }), Response.json({ code: 'accepted' }), Response.json({ code: 'bad' }, { status: 202 }), new Response('bad', { status: 202 })]) {
    await assert.rejects(submitContact(valid, async () => response));
  }
  await submitContact(valid, async (url, init) => {
    assert.equal(url, '/api/contact');
    assert.equal(new Headers(init?.headers).get('x-form-locale'), 'en');
    return Response.json({ code: 'accepted', ref: 'NB-X' }, { status: 202 });
  }, 'en');
});
