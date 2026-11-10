export async function submitContact(data: Record<string, string>, fetcher: typeof fetch = fetch, locale = 'fr') {
  const response = await fetcher('/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Form-Locale': locale === 'en' ? 'en' : 'fr' },
    body: JSON.stringify(data), signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok || response.status !== 202) throw new Error('Contact not accepted');
  const body: unknown = await response.json();
  if ((body as { code?: string })?.code !== 'accepted') throw new Error('Contact not accepted');
}
