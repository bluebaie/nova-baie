export async function submitContact(data: Record<string, string>, fetcher: typeof fetch = fetch) {
  const response = await fetcher('/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok || response.status !== 202) throw new Error('Contact not accepted');
  const body: unknown = await response.json();
  if ((body as { code?: string })?.code !== 'accepted') throw new Error('Contact not accepted');
}
