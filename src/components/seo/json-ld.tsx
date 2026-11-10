const BASE = 'https://www.nova-baie.com';

/** Serialises structured data safely inside a JSON-LD script. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

/** Absolute, locale-aware URL of a site path (French has no prefix). */
export function siteUrl(locale: string, path = '') {
  return `${BASE}${locale === 'en' ? '/en' : ''}${path}`;
}

/** BreadcrumbList from the home page down to the current page. */
export function breadcrumbData(locale: string, trail: { name: string; path: string }[]) {
  const items = [{ name: locale === 'en' ? 'Home' : 'Accueil', path: '' }, ...trail];
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: siteUrl(locale, item.path) }))
  };
}

export function Breadcrumbs({ locale, trail }: { locale: string; trail: { name: string; path: string }[] }) {
  return <JsonLd data={breadcrumbData(locale, trail)} />;
}
