const base = 'https://www.nova-baie.com';

export function localeAlternates(locale: string, path = '') {
  return {
    canonical: `${base}${locale === 'en' ? '/en' : ''}${path}`,
    languages: { fr: `${base}${path}`, en: `${base}/en${path}`, 'x-default': `${base}${path}` },
  };
}
