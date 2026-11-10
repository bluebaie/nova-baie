import { randomBytes } from 'node:crypto';
import { ContactInputError, validateContact } from './validation';
import type { ContactLimiter } from './rate-limit';
import type { ContactMailer } from '../serverEmail';

type Dependencies = {
  /** Sends the email and resolves only once the SMTP server accepted it; null when not configured. */
  mailer: ContactMailer | null;
  origins: string[];
  limiter: ContactLimiter;
  now?: () => Date;
  timeoutMs?: number;
  log?: (event: string, details: Record<string, string | number>) => void;
};
const MAX_BYTES = 24_000;
const reply = (status: number, code: string, headers: Record<string, string> = {}, extra: Record<string, string> = {}) => Response.json(
  { code, ...extra }, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers } },
);
/** Short, non-sensitive tracking id shared by the response, the email and the server log. */
const newRef = () => `NB-${randomBytes(5).toString('hex').toUpperCase()}`;
// Only the event, status and reference are logged: never visitor data, addresses or credentials.
const defaultLog = (event: string, details: Record<string, string | number>) => console.info(`[contact] ${event}`, details);

async function readBody(request: Request) {
  const declared = request.headers.get('content-length');
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > MAX_BYTES)) throw new RangeError();
  if (!request.body) throw new ContactInputError();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const deadline = new Promise<never>((_, reject) => {
      timer = setTimeout(() => { void reader.cancel(); reject(new ContactInputError()); }, 5000);
    });
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      size += value.length;
      if (size > MAX_BYTES) { void reader.cancel(); throw new RangeError(); }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}

export function createContactHandler(deps: Dependencies) {
  const log = deps.log ?? defaultLog;
  return async (request: Request): Promise<Response> => {
    if (request.method !== 'POST') return reply(405, 'method_not_allowed', { Allow: 'POST' });
    if (!deps.origins.length) return reply(503, 'unavailable');
    const origin = request.headers.get('origin');
    if (!origin || !deps.origins.includes(origin) || request.headers.get('sec-fetch-site') === 'cross-site') return reply(403, 'forbidden');
    if (!/^application\/json(?:\s*;.*)?$/i.test(request.headers.get('content-type') ?? '')) return reply(415, 'invalid_content_type');
    let data;
    try { data = validateContact(await readBody(request)); }
    catch (error) { return reply(error instanceof RangeError ? 413 : 400, 'invalid_request'); }
    if (!deps.mailer) { log('unavailable', { reason: 'smtp_not_configured' }); return reply(503, 'unavailable'); }
    try {
      const limit = await deps.limiter(data.email);
      if (!limit.allowed) return reply(429, 'rate_limited', { 'Retry-After': String(limit.retryAfter) });
    } catch { log('unavailable', { reason: 'limiter' }); return reply(503, 'unavailable'); }
    const ref = newRef();
    const language = request.headers.get('x-form-locale') === 'en' ? 'en' : 'fr';
    const started = Date.now();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      // Success is returned only after the SMTP server accepted the message.
      await Promise.race([
        deps.mailer(data, { receivedAt: (deps.now ?? (() => new Date()))(), ref, language }),
        new Promise<never>((_, reject) => { timer = setTimeout(() => reject(Object.assign(new Error('timeout'), { name: 'TimeoutError' })), deps.timeoutMs ?? 20_000); })
      ]);
      log('sent', { ref, ms: Date.now() - started });
      return reply(202, 'accepted', {}, { ref });
    } catch (error) {
      const timeout = error instanceof Error && error.name === 'TimeoutError';
      // Error class and SMTP response code only: no message body, address or credential.
      const smtpCode = (error as { responseCode?: number })?.responseCode;
      log('failed', { ref, kind: timeout ? 'timeout' : error instanceof Error ? error.name : 'unknown', ...(smtpCode ? { smtpCode } : {}) });
      return reply(timeout ? 504 : 502, 'upstream_error', {}, { ref });
    } finally {
      clearTimeout(timer);
    }
  };
}
