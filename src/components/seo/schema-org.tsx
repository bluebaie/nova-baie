export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.nova-baie.com/#website",
        "url": "https://www.nova-baie.com",
        "name": "Nova Baie",
        "description": "Création de sites web premium pour les professionnels du tourisme",
        "inLanguage": "fr-FR"
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.nova-baie.com/#organization",
        "name": "Nova Baie",
        "url": "https://www.nova-baie.com",
        "logo": "https://www.nova-baie.com/logo-nova-baie.jpg",
        "description": "Création de sites web premium pour les professionnels du tourisme — conciergeries, gîtes, hébergements, hôtels indépendants.",
        "telephone": "+33763546727",
        "email": "contact.novabaie@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Saint-Quentin-en-Tourmont",
          "addressRegion": "Hauts-de-France",
          "postalCode": "80120",
          "addressCountry": "FR"
        },
        "areaServed": {
          "@type": "Country",
          "name": "France"
        },
        "serviceType": [
          "Création de site web",
          "Site web tourisme",
          "Site web conciergerie",
          "Site web hébergement"
        ],
        "priceRange": "€€",
        "parentOrganization": {
          "@type": "Organization",
          "name": "Blue Baie Conciergerie",
          "url": "https://bluebaie.fr"
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
