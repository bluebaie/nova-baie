import { ContactInputError, validateContact } from './validation';
import type { ContactLimiter } from './rate-limit';

type Dependencies = {
  webhookUrl: string;
  origins: string[];
  limiter: ContactLimiter;
  fetcher?: typeof fetch;
  now?: () => Date;
  timeoutMs?: number;
};
const MAX_BYTES = 24_000;
const reply = (status: number, code: string, headers: Record<string, string> = {}) => Response.json(
  { code }, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers } },
);

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
  return async (request: Request): Promise<Response> => {
    if (request.method !== 'POST') return reply(405, 'method_not_allowed', { Allow: 'POST' });
    if (!deps.origins.length) return reply(503, 'unavailable');
    const origin = request.headers.get('origin');
    if (!origin || !deps.origins.includes(origin) || request.headers.get('sec-fetch-site') === 'cross-site') return reply(403, 'forbidden');
    if (!/^application\/json(?:\s*;.*)?$/i.test(request.headers.get('content-type') ?? '')) return reply(415, 'invalid_content_type');
    let data;
    try { data = validateContact(await readBody(request)); }
    catch (error) { return reply(error instanceof RangeError ? 413 : 400, 'invalid_request'); }
    // No URL or payload is logged or returned. Reject invalid/private configuration before sending.
    let webhook: URL;
    try {
      webhook = new URL(deps.webhookUrl);
      if (webhook.protocol !== 'https:' || !/^hook\.[a-z0-9-]+\.make\.com$/.test(webhook.hostname) || webhook.username || webhook.password || webhook.port || webhook.hash) throw new Error();
    } catch { return reply(503, 'unavailable'); }
    try {
      const limit = await deps.limiter(data.email);
      if (!limit.allowed) return reply(429, 'rate_limited', { 'Retry-After': String(limit.retryAfter) });
    } catch { return reply(503, 'unavailable'); }
    try {
      const response = await (deps.fetcher ?? fetch)(webhook, {
        method: 'POST', redirect: 'error', cache: 'no-store',
        signal: AbortSignal.timeout(deps.timeoutMs ?? 8000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'Site Nova Baie', date: (deps.now ?? (() => new Date()))().toISOString() }),
      });
      // Never forward an upstream response, header, error body or URL to the browser.
      if (response.body) await response.body.cancel();
      if (!response.ok) return reply(502, 'upstream_error');
      return reply(202, 'accepted');
    } catch (error) {
      return reply(error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError') ? 504 : 502, 'upstream_error');
    }
  };
}
