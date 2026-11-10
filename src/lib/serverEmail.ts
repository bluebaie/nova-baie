import nodemailer, { type Transporter } from 'nodemailer';
import type { ContactData } from './contact/validation';

// Direct SMTP delivery of contact requests (same principle as Blue Baie: Nodemailer + Gmail SMTP
// with an app password). Server-only: credentials never reach the browser.

export const CONTACT_RECIPIENT_DEFAULT = 'contact.novabaie@gmail.com';
export const CONTACT_SUBJECT = 'Nova Baie — Nouvelle demande de contact';

const PROJECT_LABELS: Record<string, string> = {
  website: 'Site internet', business_app: 'Application métier', automation_api: 'Automatisation / intégration API',
  ai: 'Intelligence artificielle', identity_design: 'Identité / design', seo: 'SEO / visibilité', other: 'Autre projet'
};

type Env = Record<string, string | undefined>;
export type MailMeta = { receivedAt: Date; ref: string; language: string };
export type ContactMailer = (data: ContactData, meta: MailMeta) => Promise<void>;

export class MailDeliveryError extends Error {}

function smtpCredentials(env: Env) {
  const user = (env.SMTP_USER || env.GMAIL_USER || '').trim();
  const pass = (env.SMTP_PASS || env.GMAIL_PASS || '').replace(/\s+/g, '');
  return user && pass ? { user, pass } : null;
}

export function createTransport(env: Env): Transporter | null {
  const auth = smtpCredentials(env);
  if (!auth) return null;
  const timeouts = { connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000 };
  if (env.SMTP_HOST) {
    const port = Number(env.SMTP_PORT || 465);
    return nodemailer.createTransport({ host: env.SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465, auth, ...timeouts });
  }
  return nodemailer.createTransport({ service: 'gmail', auth, ...timeouts });
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

export function buildContactEmail(data: ContactData, meta: MailMeta) {
  const date = meta.receivedAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris', dateStyle: 'full', timeStyle: 'short' });
  const rows: [string, string][] = [
    ['Nom', data.nom],
    ['Email', data.email],
    ['Téléphone', data.telephone || 'Non renseigné'],
    ['Entreprise / structure', data.structure || 'Non renseignée'],
    ['Type de projet', PROJECT_LABELS[data.typeProjet] ?? data.typeProjet],
    ['Reçue le', `${date} (heure de Paris)`],
    ['Origine', `Formulaire de contact Nova Baie (${meta.language === 'en' ? 'version anglaise' : 'version française'})`]
  ];
  const text = [
    'Nouvelle demande de contact reçue depuis le site Nova Baie.', '',
    ...rows.map(([label, value]) => `${label} : ${value}`), '',
    'Message :', data.message, '',
    `Répondre à cet email répond directement à ${data.email}.`,
    `Réf. technique : ${meta.ref}`
  ].join('\n');
  const html = `<!doctype html><html lang="fr"><body style="margin:0;padding:24px;background:#f4f3ee;font-family:Arial,Helvetica,sans-serif;color:#092b39">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dfe4df">
<tr><td style="padding:22px 28px;background:#092b39;color:#f6f5ef"><div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#91e0d0">Nova Baie</div><div style="font-size:22px;margin-top:6px">Nouvelle demande de contact</div></td></tr>
<tr><td style="padding:24px 28px"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5">
${rows.map(([label, value]) => `<tr><td style="padding:7px 16px 7px 0;color:#5b6f76;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:7px 0;vertical-align:top">${label === 'Email' ? `<a href="mailto:${escapeHtml(value)}" style="color:#126c72">${escapeHtml(value)}</a>` : escapeHtml(value)}</td></tr>`).join('')}
</table>
<div style="margin-top:20px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#5b6f76">Message</div>
<div style="margin-top:8px;padding:16px;background:#f4f3ee;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</div>
<p style="margin:22px 0 0;font-size:13px;color:#5b6f76">Répondre à cet email répond directement à ${escapeHtml(data.email)}.</p></td></tr>
<tr><td style="padding:14px 28px;border-top:1px solid #dfe4df;font-size:11px;color:#8a9a9f">Réf. technique : ${escapeHtml(meta.ref)}</td></tr>
</table></body></html>`;
  return { subject: CONTACT_SUBJECT, text, html };
}

/** Returns null when SMTP is not configured (the API then answers 503: no false success). */
export function createContactMailer(env: Env = process.env, transport: Transporter | null = createTransport(env)): ContactMailer | null {
  const auth = smtpCredentials(env);
  if (!transport || !auth) return null;
  const to = (env.CONTACT_TO_EMAIL || CONTACT_RECIPIENT_DEFAULT).trim();
  const from = { name: 'Site Nova Baie', address: (env.EMAIL_FROM || auth.user).trim() };
  return async (data, meta) => {
    const message = buildContactEmail(data, meta);
    // The visitor is never the sender: the authenticated account sends, the visitor is Reply-To.
    const info = await transport.sendMail({
      from, to, replyTo: { name: data.nom, address: data.email }, ...message,
      headers: { 'X-Nova-Baie-Ref': meta.ref }
    });
    const accepted = (info.accepted ?? []).map(String).map(address => address.toLowerCase());
    if (!accepted.includes(to.toLowerCase()) || (info.rejected ?? []).length) throw new MailDeliveryError('Recipient not accepted');
  };
}
