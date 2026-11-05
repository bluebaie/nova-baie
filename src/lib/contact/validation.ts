export const CONTACT_LIMITS = { nom: 120, email: 254, telephone: 40, structure: 200, message: 5000 } as const;
export const PROJECT_TYPES = ['presence', 'conversion', 'acquisition', 'maintenance', 'conseil'] as const;
export type ContactData = { nom: string; email: string; telephone: string; structure: string; typeProjet: string; message: string };
export class ContactInputError extends Error {}

export function validateContact(input: unknown): ContactData {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new ContactInputError();
  const data = input as Record<string, unknown>;
  const allowed = new Set([...Object.keys(CONTACT_LIMITS), 'typeProjet', 'website']);
  if (Object.keys(data).some(key => !allowed.has(key))) throw new ContactInputError();
  if (data.website !== undefined && data.website !== '') throw new ContactInputError();
  const result: Record<string, string> = {};
  for (const [key, max] of Object.entries({ ...CONTACT_LIMITS, typeProjet: 32 })) {
    const value = data[key] ?? (key === 'telephone' || key === 'structure' ? '' : undefined);
    if (typeof value !== 'string' || value.length > max) throw new ContactInputError();
    const normalized = value.normalize('NFC').replace(/\r\n?/g, '\n').trim();
    // Keep multiline messages, but reject control characters and header injection in other fields.
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(normalized) || (key !== 'message' && /[\n\t]/.test(normalized))) throw new ContactInputError();
    if (!normalized && key !== 'telephone' && key !== 'structure') throw new ContactInputError();
    result[key] = normalized;
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(result.email)) throw new ContactInputError();
  const [local, domain] = result.email.split('@');
  if (local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..') ||
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local) ||
    domain.split('.').some(label => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label))) throw new ContactInputError();
  if (!PROJECT_TYPES.includes(result.typeProjet as typeof PROJECT_TYPES[number])) throw new ContactInputError();
  return result as ContactData;
}
