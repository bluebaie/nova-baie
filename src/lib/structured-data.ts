import { company } from './site-data';

const sectors = {
  fr: ['Création de site internet', 'Plateformes métier et back-offices', 'Sites pour associations et clubs sportifs', 'Sites pour le tourisme et l’hébergement', 'Conciergerie et immobilier', 'Référencement naturel (SEO)'],
  en: ['Website design', 'Business platforms and back offices', 'Websites for associations and sports clubs', 'Tourism and accommodation websites', 'Concierge and real estate', 'Search engine optimisation (SEO)']
};

export function buildStructuredData(locale: string, description: string, expertises: string[]) {
  const base = 'https://www.nova-baie.com';
  const language = locale === 'en' ? 'en-GB' : 'fr-FR';
  const organization = `${base}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite', '@id': `${base}/${locale === 'en' ? 'en' : ''}#website`, url: `${base}${locale === 'en' ? '/en' : ''}`,
        name: company.name, description, inLanguage: language, publisher: { '@id': organization }
      },
      {
        '@type': 'ProfessionalService', '@id': organization, name: company.name, url: base,
        logo: `${base}/logo-nova-baie.jpg`, image: `${base}/images/hero-nova-baie.jpg`,
        description, telephone: company.phone, email: company.email,
        address: { '@type': 'PostalAddress', streetAddress: '28 Route de Forest-Montiers', addressLocality: 'Saint-Quentin-en-Tourmont', addressRegion: 'Hauts-de-France', postalCode: '80120', addressCountry: 'FR' },
        areaServed: [{ '@type': 'Country', name: 'France' }, ...['Somme', 'Baie de Somme', 'Côte d’Opale', 'Pas-de-Calais'].map(name => ({ '@type': 'Place', name }))],
        contactPoint: { '@type': 'ContactPoint', contactType: locale === 'en' ? 'project enquiries' : 'demandes de projet', email: company.email, telephone: company.phone, availableLanguage: ['French', 'English'], areaServed: 'FR' },
        knowsAbout: [...expertises, ...sectors[locale === 'en' ? 'en' : 'fr']],
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: locale === 'en' ? 'Areas of expertise' : 'Expertises',
          itemListElement: expertises.map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, provider: { '@id': organization } } }))
        },
        parentOrganization: { '@type': 'Organization', name: 'Blue Baie Conciergerie', url: company.partnerUrl },
      },
    ],
  };
}
