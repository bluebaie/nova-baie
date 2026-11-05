import { createHmac } from 'node:crypto';

export type LimitResult = { allowed: boolean; retryAfter: number };
export type ContactLimiter = (email: string) => Promise<LimitResult>;

// Atomic counters shared by all serverless instances. No IP/proxy-header trust required.
// Global hourly ceiling bounds abuse with rotating email addresses; email ceiling is 3/15min.
export const LIMIT_SCRIPT = `
local global = tonumber(redis.call('GET', KEYS[1]) or '0')
local sender = tonumber(redis.call('GET', KEYS[2]) or '0')
if global >= 100 then return {0, redis.call('TTL', KEYS[1])} end
if sender >= 3 then return {0, redis.call('TTL', KEYS[2])} end
if redis.call('INCR', KEYS[1]) == 1 then redis.call('EXPIRE', KEYS[1], 3600) end
if redis.call('INCR', KEYS[2]) == 1 then redis.call('EXPIRE', KEYS[2], 900) end
return {1, 0}
`;

export function createRedisLimiter(url: string, token: string, secret: string, fetcher: typeof fetch = fetch): ContactLimiter {
  const endpoint = new URL(url);
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || !token || secret.length < 32) throw new Error('Invalid limiter configuration');
  return async email => {
    const hash = createHmac('sha256', secret).update(email.toLowerCase()).digest('hex');
    const response = await fetcher(endpoint, {
      method: 'POST', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(3000),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['EVAL', LIMIT_SCRIPT, '2', 'nova:contact:{limits}:global', `nova:contact:{limits}:email:${hash}`]),
    });
    if (!response.ok) throw new Error('Limiter unavailable');
    const body: unknown = await response.json();
    const result = (body as { result?: unknown })?.result;
    if (!Array.isArray(result) || result.length !== 2 || ![0, 1].includes(result[0]) || !Number.isInteger(result[1])) throw new Error('Invalid limiter response');
    return { allowed: result[0] === 1, retryAfter: Math.max(1, Math.min(3600, result[1])) };
  };
}
