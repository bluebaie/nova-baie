import { company } from './site-data';

export function buildStructuredData(locale: string, description: string, expertises: string[]) {
  const base = 'https://www.nova-baie.com';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${base}/${locale === 'en' ? 'en' : ''}#website`, url: `${base}${locale === 'en' ? '/en' : ''}`, name: company.name, description, inLanguage: locale === 'en' ? 'en-GB' : 'fr-FR' },
      {
        '@type': 'ProfessionalService', '@id': `${base}/#organization`, name: company.name, url: base,
        logo: `${base}/logo-nova-baie.jpg`, description, telephone: company.phone, email: company.email,
        address: { '@type': 'PostalAddress', addressLocality: 'Saint-Quentin-en-Tourmont', addressRegion: 'Hauts-de-France', postalCode: '80120', addressCountry: 'FR' },
        areaServed: ['Somme', 'Baie de Somme', 'Côte d’Opale', 'Pas-de-Calais'].map(name => ({ '@type': 'Place', name })),
        knowsAbout: expertises,
        parentOrganization: { '@type': 'Organization', name: 'Blue Baie Conciergerie', url: company.partnerUrl },
      },
    ],
  };
}
