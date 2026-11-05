import { createContactHandler } from '@/lib/contact/handler';
import { createRedisLimiter } from '@/lib/contact/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(request: Request) {
  // Read private configuration only at request time. Missing limiter fails closed.
  const origins = (process.env.CONTACT_ALLOWED_ORIGINS ?? '').split(',').map(value => value.trim()).filter(Boolean);
  let limiter;
  try {
    limiter = createRedisLimiter(process.env.CONTACT_REDIS_REST_URL ?? '', process.env.CONTACT_REDIS_REST_TOKEN ?? '', process.env.CONTACT_RATE_LIMIT_SECRET ?? '');
  } catch {
    limiter = async () => { throw new Error('Contact unavailable'); };
  }
  return createContactHandler({ webhookUrl: process.env.MAKE_WEBHOOK_URL ?? '', origins, limiter })(request);
}
