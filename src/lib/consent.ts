// Cookie consent for audience measurement (Google Tag Manager → Google Analytics 4).
// Google Analytics is not exempt from consent in France (CNIL): GTM is only loaded
// after an explicit opt-in, so no Google request is made before or without consent.

export const GTM_ID = 'GTM-MV4VJGBB';
export const CONSENT_KEY = 'nova-consent';
export const CONSENT_VERSION = 1;
/** A choice is remembered for six months, then asked again (CNIL recommendation). */
export const CONSENT_MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000;
export const OPEN_CONSENT_EVENT = 'nova:open-consent';

export type ConsentChoice = { v: number; analytics: boolean; date: number };

type DataLayerWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; __novaGtmLoaded?: boolean };

export function readConsent(now = Date.now()): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (parsed.v !== CONSENT_VERSION || typeof parsed.analytics !== 'boolean' || typeof parsed.date !== 'number') return null;
    if (now - parsed.date > CONSENT_MAX_AGE_MS || parsed.date > now + 60_000) return null;
    return parsed as ConsentChoice;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean, now = Date.now()): ConsentChoice {
  const choice = { v: CONSENT_VERSION, analytics, date: now };
  try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify(choice)); } catch { /* private mode: choice applies to this page only */ }
  return choice;
}

export function hasAnalyticsConsent() {
  return typeof window !== 'undefined' && readConsent()?.analytics === true;
}

function gtagFunction(win: DataLayerWindow) {
  win.dataLayer = win.dataLayer ?? [];
  // gtag must push the `arguments` object itself (Google tag contract).
  win.gtag = win.gtag ?? function gtag() { win.dataLayer!.push(arguments); }; // eslint-disable-line prefer-rest-params
  return win.gtag;
}

/** Loads GTM once, with Consent Mode v2 signals: analytics granted, advertising denied. */
export function loadAnalytics() {
  const win = window as DataLayerWindow;
  if (win.__novaGtmLoaded) return;
  win.__novaGtmLoaded = true;
  const gtag = gtagFunction(win);
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied', functionality_storage: 'denied', personalization_storage: 'denied', security_storage: 'granted'
  });
  gtag('consent', 'update', { analytics_storage: 'granted' });
  gtag('set', 'ads_data_redaction', true);
  // CNIL: audience cookies must not exceed 13 months (395 days).
  gtag('set', { cookie_expires: 395 * 24 * 60 * 60 });
  win.dataLayer!.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/** Withdraws consent: denies storage, removes Google Analytics cookies, then reloads without GTM. */
export function withdrawAnalytics() {
  const win = window as DataLayerWindow;
  if (win.gtag) win.gtag('consent', 'update', { analytics_storage: 'denied' });
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  for (const name of document.cookie.split(';').map(cookie => cookie.split('=')[0].trim()).filter(name => /^_ga|^_gid$|^_gat/.test(name))) {
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
  }
  if (win.__novaGtmLoaded) window.location.reload();
}

/**
 * Records a lead in GA4 only after the server confirmed the message (HTTP 202) and only
 * with consent. No personal data is sent: just the form, language and project category.
 */
export function trackLead(projectType: string, language: string) {
  if (!hasAnalyticsConsent()) return;
  const win = window as DataLayerWindow;
  if (!win.__novaGtmLoaded) return;
  gtagFunction(win)('event', 'generate_lead', { form_id: 'contact', project_type: projectType, language });
}
