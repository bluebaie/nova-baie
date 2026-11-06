export type Locale = 'fr' | 'en';
export type ProjectStatus = 'completed' | 'finalizing';
export type ProjectDetailStatus = 'published' | 'draft';

export type ProjectCopy = {
  category: string;
  summary: string;
  description: string;
  tags: string[];
  imageAlt?: string;
  caseStudy?: {
    visualVariant: 'ecosystem' | 'editorial';
    activity: string;
    location: string;
    metaTitle: string;
    metaDescription: string;
    intro: string;
    context: string;
    need: string;
    intervention: string;
    artDirection: string;
    scope: string[];
    outcome?: string;
    blueBaieConnection?: string;
  };
};

export type Project = {
  id: string;
  slug: string;
  status: ProjectStatus;
  detailStatus: ProjectDetailStatus;
  portfolioVisible: boolean;
  homeVisible: boolean;
  homeOrder: number | null;
  portfolioOrder: number;
  title: Record<Locale, string>;
  externalUrl?: string;
  externalUrlCheckedOn?: string;
  image?: string;
  mobileImage?: string;
  gallery: string[];
  video?: string;
  logo?: string;
  categoryId: string;
  expertiseIds: string[];
  technologyIds: string[];
  completedOn?: string;
  copy: Record<Locale, ProjectCopy>;
};

// Keep all display order and publication choices in data, not page markup.
// Technology names are intentionally empty until a verified public scope exists.
export const projects: readonly Project[] = [
  {
    id: 'blue-baie', slug: 'blue-baie-conciergerie', status: 'completed', detailStatus: 'published',
    portfolioVisible: true, homeVisible: true, homeOrder: 1, portfolioOrder: 1,
    title: { fr: 'Blue Baie Conciergerie', en: 'Blue Baie Conciergerie' },
    externalUrl: 'https://www.bluebaie.fr/', externalUrlCheckedOn: '2026-11-06',
    image: '/images/projects/blue-baie-public.webp', mobileImage: '/images/projects/blue-baie-mobile.webp',
    gallery: ['/images/projects/blue-baie-public.webp'], logo: '/images/logo-blue-baie.png', categoryId: 'business-ecosystem',
    expertiseIds: ['web', 'business', 'automation'], technologyIds: [],
    copy: {
      fr: {
        category: 'Site public & écosystème métier', summary: 'Relier la présence publique aux outils qui font fonctionner l’activité.',
        description: 'Un site public et un écosystème métier avancé : réservations, intégrations, automatisations et administration. Les parcours visiteurs et le fonctionnement opérationnel se répondent, sans exposer les données internes.',
        tags: ['Site public', 'Outils métier', 'Automatisation'], imageAlt: 'Page publique de Blue Baie Conciergerie',
        caseStudy: {
          visualVariant: 'ecosystem',
          activity: 'Conciergerie de location saisonnière et accompagnement des propriétaires.',
          location: 'Baie de Somme',
          metaTitle: 'Blue Baie Conciergerie — site et outils métier | Nova Baie',
          metaDescription: 'Étude de cas du site public et des outils métier réalisés par Nova Baie pour Blue Baie Conciergerie en Baie de Somme.',
          intro: 'Une présence publique reliée aux gestes quotidiens d’une conciergerie.',
          context: 'Blue Baie Conciergerie accompagne les propriétaires en Baie de Somme dans la mise en location et le suivi de leurs logements. La vitrine digitale s’inscrit dans un écosystème d’exploitation plus large.',
          need: 'Présenter clairement l’activité et faire coexister les parcours publics avec les besoins métier de réservation, d’intégration et d’administration.',
          intervention: 'Nova Baie a conçu le site public et développé une plateforme métier avec son back-office, des intégrations et des automatisations. Les écrans privés et données opérationnelles ne sont pas publiés.',
          artDirection: 'Le site s’appuie sur l’identité Blue Baie et présente les services, les zones d’intervention et les logements dans un parcours destiné aux propriétaires.',
          scope: ['Site public', 'Plateforme métier', 'Réservations', 'Intégrations et automatisations', 'Back-office'],
          blueBaieConnection: 'Nova Baie est la branche digitale de l’écosystème Blue Baie. Le site public présente également Conciergerie Saint-Jean comme l’entité du groupe implantée au Touquet et sur la Côte d’Opale.'
        }
      },
      en: {
        category: 'Public website & business ecosystem', summary: 'Connecting the public presence with the tools behind daily operations.',
        description: 'A public website and a business ecosystem spanning bookings, integrations, automation and administration. Visitor journeys connect with operational needs without exposing internal data.',
        tags: ['Public website', 'Business tools', 'Automation'], imageAlt: 'Public website of Blue Baie Conciergerie',
        caseStudy: {
          visualVariant: 'ecosystem',
          activity: 'Holiday rental concierge services and support for property owners.',
          location: 'Bay of Somme',
          metaTitle: 'Blue Baie Conciergerie — website and business tools | Nova Baie',
          metaDescription: 'A case study of the public website and business tools built by Nova Baie for Blue Baie Conciergerie in the Bay of Somme.',
          intro: 'A public presence connected to the daily work of a property concierge.',
          context: 'Blue Baie Conciergerie supports property owners around the Bay of Somme with holiday rentals and property operations. Its public website sits within a wider operational ecosystem.',
          need: 'Present the service clearly while connecting public journeys to booking, integration and administration needs.',
          intervention: 'Nova Baie designed the public website and built a business platform with a back office, integrations and automation. Private screens and operational data are not published.',
          artDirection: 'The public website follows the Blue Baie identity and brings services, service areas and properties into a journey for property owners.',
          scope: ['Public website', 'Business platform', 'Bookings', 'Integrations and automation', 'Back office'],
          blueBaieConnection: 'Nova Baie is the digital branch of the Blue Baie ecosystem. The public website also presents Conciergerie Saint-Jean as the group entity based in Le Touquet and on the Opal Coast.'
        }
      }
    }
  },
  {
    id: 'saint-jean', slug: 'conciergerie-saint-jean', status: 'completed', detailStatus: 'published',
    portfolioVisible: true, homeVisible: true, homeOrder: 2, portfolioOrder: 2,
    title: { fr: 'Conciergerie Saint-Jean', en: 'Conciergerie Saint-Jean' },
    externalUrl: 'https://conciergeriesaintjean.fr/', externalUrlCheckedOn: '2026-11-06',
    image: '/images/projects/saint-jean-public.webp', mobileImage: '/images/projects/saint-jean-mobile.webp',
    gallery: ['/images/projects/saint-jean-public.webp'], categoryId: 'business-ecosystem',
    expertiseIds: ['identity', 'web', 'business'], technologyIds: [],
    copy: {
      fr: {
        category: 'Direction artistique & application métier', summary: 'Faire cohabiter une identité premium et un outil métier.',
        description: 'Un site premium terminé, avec une direction artistique soignée et un back-office métier. La présentation publique valorise l’identité de la conciergerie ; les interfaces et données privées restent confidentielles.',
        tags: ['Direction artistique', 'Site public', 'Back-office'], imageAlt: 'Page publique de Conciergerie Saint-Jean',
        caseStudy: {
          visualVariant: 'editorial',
          activity: 'Conciergerie dédiée aux propriétaires et aux séjours sur la Côte d’Opale.',
          location: 'Le Touquet–Paris-Plage · Côte d’Opale',
          metaTitle: 'Conciergerie Saint-Jean — identité et site métier | Nova Baie',
          metaDescription: 'Découvrez le site premium et l’application métier développés par Nova Baie pour Conciergerie Saint-Jean.',
          intro: 'Une identité de conciergerie traduite en expérience publique et outil de travail.',
          context: 'Conciergerie Saint-Jean accompagne les propriétaires au Touquet et sur la Côte d’Opale. Elle est présentée par Blue Baie comme l’entité du groupe dédiée à ce territoire.',
          need: 'Donner à l’activité une présence web distincte et haut de gamme, tout en soutenant son fonctionnement quotidien avec un back-office métier.',
          intervention: 'Nova Baie a réalisé le site public et un back-office avancé. Cette étude montre uniquement des éléments visibles publiquement ; les écrans d’administration restent confidentiels.',
          artDirection: 'Une composition éditoriale, une typographie élégante et les paysages du littoral posent une identité premium, tout en gardant un parcours de contact clair.',
          scope: ['Direction artistique', 'Site public', 'Back-office métier']
        }
      },
      en: {
        category: 'Art direction & business application', summary: 'Bringing a premium identity and a business tool together.',
        description: 'A completed premium website with considered art direction and a business back office. The public experience expresses the concierge identity while private interfaces and data remain confidential.',
        tags: ['Art direction', 'Public website', 'Back office'], imageAlt: 'Public website of Conciergerie Saint-Jean',
        caseStudy: {
          visualVariant: 'editorial',
          activity: 'Concierge services for property owners and stays along the Opal Coast.',
          location: 'Le Touquet–Paris-Plage · Opal Coast',
          metaTitle: 'Conciergerie Saint-Jean — identity and business website | Nova Baie',
          metaDescription: 'Explore the premium website and business application built by Nova Baie for Conciergerie Saint-Jean.',
          intro: 'A concierge identity translated into a public experience and a working tool.',
          context: 'Conciergerie Saint-Jean supports property owners in Le Touquet and along the Opal Coast. Blue Baie presents it as the group entity focused on that area.',
          need: 'Create a distinctive, premium web presence while supporting daily operations with a business back office.',
          intervention: 'Nova Baie delivered the public website and an advanced back office. This case study shows only public material; administration screens remain private.',
          artDirection: 'An editorial composition, elegant typography and coastal photography establish a premium identity with a clear contact journey.',
          scope: ['Art direction', 'Public website', 'Business back office']
        }
      }
    }
  },
  {
    id: 'csc', slug: 'cyclosport-crotellois', status: 'finalizing', detailStatus: 'draft',
    portfolioVisible: true, homeVisible: false, homeOrder: null, portfolioOrder: 3,
    title: { fr: 'CycloSport Crotellois', en: 'CycloSport Crotellois' }, categoryId: 'association',
    expertiseIds: ['web', 'business'], technologyIds: [], gallery: [],
    copy: {
      fr: { category: 'Association sportive & contenus administrables', summary: 'Structurer la vie du club autour des événements et de l’information.', description: 'Un site sportif moderne avec gestion d’événements, d’actualités et de contenus administrables. La plateforme est en cours de finalisation.', tags: ['Association', 'Événements', 'Administration'] },
      en: { category: 'Sports association & manageable content', summary: 'Organising club life around events and information.', description: 'A modern sports website with event, news and content management. The platform is being finalised.', tags: ['Association', 'Events', 'Administration'] }
    }
  },
  {
    id: 'bout-du-monde', slug: 'le-bout-du-monde', status: 'completed', detailStatus: 'draft',
    portfolioVisible: true, homeVisible: false, homeOrder: null, portfolioOrder: 4,
    title: { fr: 'Le Bout du Monde', en: 'Le Bout du Monde' }, externalUrl: 'https://www.le-bout-du-monde.org/',
    externalUrlCheckedOn: '2026-11-06', image: '/images/realisation-le-bout-du-monde.jpg', gallery: ['/images/realisation-le-bout-du-monde.jpg'], video: '/videos/le-bout-du-monde-demo.mp4',
    categoryId: 'hospitality', expertiseIds: ['identity', 'web'], technologyIds: [],
    copy: {
      fr: { category: 'Site touristique', summary: 'Présenter deux gîtes avec une identité cohérente.', description: 'Un site de présentation pour deux gîtes en Baie de Somme, mettant en valeur leur cadre et leur identité.', tags: ['Site web', 'Hébergement', 'Identité'], imageAlt: 'Capture du site Le Bout du Monde, réalisé par Nova Baie' },
      en: { category: 'Tourism website', summary: 'Presenting two cottages with a consistent identity.', description: 'A presentation website for two holiday cottages in the Bay of Somme, highlighting their setting and identity.', tags: ['Website', 'Accommodation', 'Identity'], imageAlt: 'Screenshot of the Le Bout du Monde website by Nova Baie' }
    }
  },
  {
    id: 'gites-en-baie', slug: 'gites-en-baie', status: 'completed', detailStatus: 'draft',
    portfolioVisible: true, homeVisible: true, homeOrder: 3, portfolioOrder: 5,
    title: { fr: 'Gîtes en Baie', en: 'Gîtes en Baie' }, externalUrl: 'https://www.gite-baie.com/',
    externalUrlCheckedOn: '2026-11-06', image: '/images/project-gites-en-baie.jpg', gallery: ['/images/project-gites-en-baie.jpg'], video: '/videos/gites-en-baie-demo.mp4',
    categoryId: 'hospitality', expertiseIds: ['identity', 'web'], technologyIds: [],
    copy: {
      fr: { category: 'Site multi-hébergements', summary: 'Réunir plusieurs hébergements dans un parcours lisible.', description: 'Un site multi-hébergements en Baie de Somme : présentation des logements, informations pratiques et parcours vers la réservation.', tags: ['Multi-hébergements', 'Parcours utilisateur', 'Site web'], imageAlt: 'Capture du site Gîtes en Baie, réalisé par Nova Baie' },
      en: { category: 'Multi-property website', summary: 'Bringing several properties into one clear visitor journey.', description: 'A multi-property website in the Bay of Somme, with accommodation details, practical information and a route to booking.', tags: ['Multi-property', 'User journey', 'Website'], imageAlt: 'Screenshot of the Gîtes en Baie website by Nova Baie' }
    }
  },
  {
    id: 'refuge-marmotte', slug: 'le-refuge-de-la-marmotte', status: 'completed', detailStatus: 'draft',
    portfolioVisible: true, homeVisible: false, homeOrder: null, portfolioOrder: 6,
    title: { fr: 'Le Refuge de la Marmotte', en: 'Le Refuge de la Marmotte' }, externalUrl: 'https://www.ski-saintefoy.com/',
    externalUrlCheckedOn: '2026-11-06', image: '/images/project-ski-saintefoy.jpg', gallery: ['/images/project-ski-saintefoy.jpg'], video: '/videos/sainte-foy-demo.mp4',
    categoryId: 'hospitality', expertiseIds: ['identity', 'web'], technologyIds: [],
    copy: {
      fr: { category: 'Site d’hébergement en montagne', summary: 'Présenter un hébergement et préparer le séjour.', description: 'Un site consacré à un hébergement à Sainte-Foy-Tarentaise : galerie, présentation du confort, localisation et accès à la réservation.', tags: ['Hébergement', 'Galerie', 'Site web'], imageAlt: 'Capture du site Le Refuge de la Marmotte, réalisé par Nova Baie' },
      en: { category: 'Mountain accommodation website', summary: 'Presenting a property and helping visitors plan their stay.', description: 'A website for accommodation in Sainte-Foy-Tarentaise, with a gallery, amenities, location and access to booking.', tags: ['Accommodation', 'Gallery', 'Website'], imageAlt: 'Screenshot of the Le Refuge de la Marmotte website by Nova Baie' }
    }
  }
];

export const featuredProjectIds = projects.filter(project => project.homeVisible).sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0)).map(project => project.id);
export const publishedCaseStudies = projects.filter(project => project.portfolioVisible && project.detailStatus === 'published');
export const getProjectBySlug = (slug: string) => publishedCaseStudies.find(project => project.slug === slug);
export function localizeCaseStudy(locale: string, slug: string) {
  const project = getProjectBySlug(slug);
  if (!project) return undefined;
  const language: Locale = locale === 'en' ? 'en' : 'fr';
  const copy = project.copy[language];
  if (!copy.caseStudy) return undefined;
  return { ...project, title: project.title[language], copy };
}

export function localizeProjects(locale: string) {
  const language: Locale = locale === 'en' ? 'en' : 'fr';
  return projects.filter(project => project.portfolioVisible).sort((a, b) => a.portfolioOrder - b.portfolioOrder).map(project => ({
    ...project,
    title: project.title[language],
    ...project.copy[language]
  }));
}

export type LocalizedProject = ReturnType<typeof localizeProjects>[number];
