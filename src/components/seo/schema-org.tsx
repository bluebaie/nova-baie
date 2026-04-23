export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.nova-baie.com/#organization",
        "name": "Nova Baie",
        "alternateName": "Nova Baie - Agence web tourisme",
        "url": "https://www.nova-baie.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.nova-baie.com/logo-nova-baie.jpg",
          "width": 400,
          "height": 400
        },
        "image": "https://www.nova-baie.com/images/og-image.jpg",
        "description": "Nova Baie est la branche digitale de Blue Baie Conciergerie, spécialisée dans la création de sites web premium pour professionnels du tourisme. Née de 10 ans de pratique de la location saisonnière en Baie de Somme.",
        "email": "contact.novabaie@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Hauts-de-France",
          "addressCountry": "FR",
          "addressLocality": "Baie de Somme"
        },
        "areaServed": {
          "@type": "Country",
          "name": "France"
        },
        "knowsAbout": [
          "Création de site web",
          "SEO tourisme",
          "Sites hébergement touristique",
          "Sites conciergerie",
          "Design web premium",
          "Optimisation conversion",
          "Location courte durée"
        ],
        "foundingDate": "2026",
        "parentOrganization": {
          "@type": "Organization",
          "name": "Blue Baie Conciergerie",
          "url": "https://bluebaie.fr"
        },
        "sameAs": [
          "https://bluebaie.fr"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.nova-baie.com/#website",
        "url": "https://www.nova-baie.com",
        "name": "Nova Baie",
        "description": "Création de sites web premium pour professionnels du tourisme",
        "publisher": {
          "@id": "https://www.nova-baie.com/#organization"
        },
        "inLanguage": "fr-FR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.nova-baie.com/?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.nova-baie.com/#webpage",
        "url": "https://www.nova-baie.com",
        "name": "Nova Baie — Création de sites web premium pour professionnels du tourisme",
        "isPartOf": { "@id": "https://www.nova-baie.com/#website" },
        "about": { "@id": "https://www.nova-baie.com/#organization" },
        "description": "Agence web spécialisée tourisme. Sites premium pour hébergements, conciergeries, gîtes et hôtels indépendants.",
        "inLanguage": "fr-FR",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://www.nova-baie.com"
            }
          ]
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.nova-baie.com/#service",
        "name": "Nova Baie — Création de sites web tourisme",
        "provider": { "@id": "https://www.nova-baie.com/#organization" },
        "serviceType": "Création de site web",
        "category": "Agence web spécialisée tourisme",
        "areaServed": {
          "@type": "Country",
          "name": "France"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Offres Nova Baie",
          "itemListElement": [
            {
              "@type": "Offer",
              "@id": "https://www.nova-baie.com/services/#presence",
              "name": "Site Présence",
              "description": "Site vitrine premium 2 à 3 pages pour hébergements touristiques et petites structures. Design sur mesure, responsive mobile, formulaire de contact, SEO local de base.",
              "price": "800",
              "priceCurrency": "EUR",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "800",
                "priceCurrency": "EUR",
                "valueAddedTaxIncluded": false,
                "minPrice": "800"
              },
              "url": "https://www.nova-baie.com/services",
              "availability": "https://schema.org/InStock",
              "seller": { "@id": "https://www.nova-baie.com/#organization" }
            },
            {
              "@type": "Offer",
              "@id": "https://www.nova-baie.com/services/#conversion",
              "name": "Site Conversion",
              "description": "Site optimisé conversion 4 à 6 pages pour conciergeries et hébergements premium. UX structurée, design premium complet, optimisation conversion, SEO local avancé.",
              "price": "1500",
              "priceCurrency": "EUR",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "1500",
                "priceCurrency": "EUR",
                "valueAddedTaxIncluded": false,
                "minPrice": "1500"
              },
              "url": "https://www.nova-baie.com/services",
              "availability": "https://schema.org/InStock",
              "seller": { "@id": "https://www.nova-baie.com/#organization" }
            },
            {
              "@type": "Offer",
              "@id": "https://www.nova-baie.com/services/#acquisition",
              "name": "Site Acquisition",
              "description": "Site complet avec stratégie SEO et acquisition pour structures ambitieuses. UX complète, pages SEO stratégiques, optimisation conversion poussée, conseils stratégie digitale.",
              "price": "3000",
              "priceCurrency": "EUR",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "3000",
                "priceCurrency": "EUR",
                "valueAddedTaxIncluded": false,
                "minPrice": "3000"
              },
              "url": "https://www.nova-baie.com/services",
              "availability": "https://schema.org/InStock",
              "seller": { "@id": "https://www.nova-baie.com/#organization" }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.nova-baie.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Combien coûte la création d'un site web pour un hébergement touristique ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nova Baie propose 3 niveaux : Site Présence à partir de 800€ (2-3 pages), Site Conversion à partir de 1500€ (4-6 pages optimisées), Site Acquisition à partir de 3000€ (stratégie complète). Chaque offre inclut design sur mesure, responsive mobile et SEO de base."
            }
          },
          {
            "@type": "Question",
            "name": "Combien de temps prend la création d'un site web tourisme ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Entre 3 et 6 semaines selon le niveau d'offre et la disponibilité des contenus. Le cadrage initial permet de définir un calendrier précis dès le départ."
            }
          },
          {
            "@type": "Question",
            "name": "Nova Baie travaille-t-il avec des clients hors Baie de Somme ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, Nova Baie travaille avec tous les professionnels du tourisme en France. Le process est entièrement à distance avec des échanges structurés et efficaces."
            }
          },
          {
            "@type": "Question",
            "name": "Est-ce que Nova Baie propose de la maintenance pour les sites créés ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui. Nova Baie propose 3 forfaits maintenance mensuelle : Essentielle (29€/mois), Confort (59€/mois) et Active (99€/mois). Chaque site livré inclut 3 mois de maintenance offerts."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle est la différence entre Nova Baie et une agence web généraliste ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nova Baie est 100% spécialisée dans le tourisme et l'hébergement. Née de Blue Baie Conciergerie, l'agence s'appuie sur plus de 10 ans de pratique directe de la location saisonnière en Baie de Somme — une connaissance concrète des attentes des voyageurs, des propriétaires et des plateformes comme Airbnb et Booking."
            }
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Réalisations Nova Baie",
        "description": "Sites web créés par Nova Baie pour des professionnels du tourisme",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "WebSite",
              "name": "Gîtes en Baie",
              "url": "https://www.gite-baie.com",
              "description": "Site vitrine pour un propriétaire multi-logements en Baie de Somme. 4.9/5 Airbnb, +900 avis voyageurs, 7 hébergements.",
              "creator": { "@id": "https://www.nova-baie.com/#organization" }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "WebSite",
              "name": "Le Refuge de la Marmotte",
              "url": "https://www.ski-saintefoy.com",
              "description": "Site vitrine pour un appartement ski à Sainte-Foy-Tarentaise. 4.82/5 Airbnb.",
              "creator": { "@id": "https://www.nova-baie.com/#organization" }
            }
          }
        ]
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
