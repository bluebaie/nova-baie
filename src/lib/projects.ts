import { blueBaieCaseMedia, getPublishedCaseMedia, type ProjectCaseMedia } from './project-case-media';

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
  /** Flagship project: displayed as a full-width feature at the top of the home selection. */
  flagship?: boolean;
  homeVisible: boolean;
  homeOrder: number | null;
  portfolioOrder: number;
  title: Record<Locale, string>;
  externalUrl?: string;
  externalUrlCheckedOn?: string;
  image?: string;
  mobileImage?: string;
  gallery: string[];
  caseMedia?: readonly ProjectCaseMedia[];
  video?: string;
  videoPoster?: string;
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
    // Flagship case study. The official domain is the permanent link; its DNS
    // and HTTPS are checked during Nova Baie's global pre-publication review,
    // so no verification date is recorded here until that check succeeds.
    id: 'csc', slug: 'cyclosport-crotellois', status: 'completed', detailStatus: 'published', flagship: true,
    portfolioVisible: true, homeVisible: true, homeOrder: 1, portfolioOrder: 1,
    title: { fr: 'CycloSport Crotellois', en: 'CycloSport Crotellois' },
    externalUrl: 'https://www.cyclosportcrotellois.fr/',
    // Card visual: graphic composition of the club website and back office (scripts/lot-final-csc-card.mjs).
    image: '/media/projects/csc/optimized/card-csc.webp',
    gallery: [
      '/media/projects/csc/optimized/home-hero.webp',
      '/media/projects/csc/optimized/home-practices.webp',
      '/media/projects/csc/optimized/club-terrains.webp',
      '/media/projects/csc/optimized/hors-bitume.webp',
      '/media/projects/csc/optimized/actualites.webp',
      '/media/projects/csc/optimized/contact.webp'
    ],
    logo: '/media/projects/csc/identite-csc/logo-maillot-csc.webp', categoryId: 'association',
    expertiseIds: ['identity', 'web', 'business'], technologyIds: [],
    copy: {
      fr: {
        category: 'Plateforme associative · site public · back-office', summary: 'Un écosystème digital pour un club cycliste en Baie de Somme.',
        description: 'Direction artistique, site public et back-office sur mesure pour le club cycliste du Crotoy : actualités, événements, inscriptions, partenaires, médias, messages, rôles et permissions.',
        tags: ['Plateforme associative', 'Back-office sur mesure', 'Next.js · Supabase'], imageAlt: 'Composition du projet CycloSport Crotellois : pages Actualités et Contact du site du club et module Actualités du back-office, sur l’identité noir et orange',
        caseStudy: {
          visualVariant: 'ecosystem',
          activity: 'Club cycliste : route, gravel, VTT, cyclo-cross et beach race.',
          location: 'Le Crotoy · Baie de Somme',
          metaTitle: 'Site et plateforme pour club cycliste en Baie de Somme | Nova Baie',
          metaDescription: 'Étude de cas CycloSport Crotellois : site internet d’un club cycliste au Crotoy et back-office sur mesure (Next.js, Supabase) pour actualités, événements et inscriptions.',
          intro: 'Une identité en mouvement, un site public et un moteur métier pour la vie du club.',
          context: 'Le CycloSport Crotellois est un club cycliste du Crotoy, en Baie de Somme. Ses membres roulent sur route et hors bitume : gravel, VTT, cyclo-cross et beach race.',
          need: 'Réunir dans un même environnement la communication du club, ses contenus et ses fonctions associatives, et permettre au bureau de les gérer lui-même.',
          intervention: 'Nova Baie a conçu la direction artistique web, développé le site public et un back-office sur mesure : actualités, nouveaux membres, événements, inscriptions, partenaires, médias, messages, utilisateurs, rôles et journal d’activité.',
          artDirection: 'Noir, orange et typographie condensée prolongent le maillot du club. Le concept « Baie en mouvement » relie la photographie sportive, les tracés graphiques et le territoire.',
          scope: ['Direction artistique web', 'Site public', 'Back-office sur mesure', 'Événements et inscriptions', 'Rôles et permissions']
        }
      },
      en: {
        category: 'Club platform · public website · back office', summary: 'A digital ecosystem for a cycling club in the Bay of Somme.',
        description: 'Web art direction, a public website and a bespoke back office for the Le Crotoy cycling club: news, events, registrations, partners, media, messages, roles and permissions.',
        tags: ['Club platform', 'Bespoke back office', 'Next.js · Supabase'], imageAlt: 'CycloSport Crotellois project composition: the club website News and Contact pages and the back-office News module, in the black and orange identity',
        caseStudy: {
          visualVariant: 'ecosystem',
          activity: 'Cycling club: road, gravel, mountain biking, cyclo-cross and beach racing.',
          location: 'Le Crotoy · Bay of Somme',
          metaTitle: 'Cycling club website and platform in the Bay of Somme | Nova Baie',
          metaDescription: 'CycloSport Crotellois case study: a cycling club website in Le Crotoy and a bespoke back office (Next.js, Supabase) for news, events and registrations.',
          intro: 'An identity in motion, a public website and a business engine for club life.',
          context: 'CycloSport Crotellois is a cycling club based in Le Crotoy, in the Bay of Somme. Its members ride on the road and off it: gravel, mountain biking, cyclo-cross and beach racing.',
          need: 'Bring the club’s communication, content and association tools into one environment, and let the committee manage them independently.',
          intervention: 'Nova Baie designed the web art direction and built the public website and a bespoke back office: news, new members, events, registrations, partners, media, messages, users, roles and an activity log.',
          artDirection: 'Black, orange and condensed typography extend the club jersey. The “Baie en mouvement” concept connects sports photography, graphic routes and the local landscape.',
          scope: ['Web art direction', 'Public website', 'Bespoke back office', 'Events and registrations', 'Roles and permissions']
        }
      }
    }
  },
  {
    id: 'blue-baie', slug: 'blue-baie-conciergerie', status: 'completed', detailStatus: 'published',
    portfolioVisible: true, homeVisible: true, homeOrder: 2, portfolioOrder: 2,
    title: { fr: 'Blue Baie Conciergerie', en: 'Blue Baie Conciergerie' },
    externalUrl: 'https://www.bluebaie.fr/', externalUrlCheckedOn: '2026-11-06',
    image: '/media/projects/blue-baie/screens/home-desktop.png', mobileImage: '/media/projects/blue-baie/screens/derived/home-mobile-clean.webp',
    gallery: getPublishedCaseMedia(blueBaieCaseMedia, 'public-gallery').map(item => item.src), caseMedia: blueBaieCaseMedia,
    logo: '/media/projects/blue-baie/images/logo/logo-bluebaie.png', categoryId: 'business-ecosystem',
    expertiseIds: ['web', 'business', 'automation'], technologyIds: [],
    copy: {
      fr: {
        category: 'Plateforme métier · site public · automatisations', summary: 'Un site public prolongé par une plateforme métier et des automatisations.',
        description: 'Au-delà du site public, le projet comprend une application métier, un espace d’administration, un planning opérationnel et un périmètre d’intégrations et d’automatisations. Les détails privés et les connexions internes ne sont pas exposés.',
        tags: ['Site public', 'Outils métier', 'Automatisation'], imageAlt: 'Page publique de Blue Baie Conciergerie',
        caseStudy: {
          visualVariant: 'ecosystem',
          activity: 'Conciergerie de location saisonnière et accompagnement des propriétaires.',
          location: 'Baie de Somme',
          metaTitle: 'Site web et plateforme de conciergerie en Baie de Somme | Nova Baie',
          metaDescription: 'Étude de cas Blue Baie : conception du site public et développement d’un écosystème digital pour une conciergerie en Baie de Somme.',
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
        category: 'Business platform · public website · automation', summary: 'A public website extended by business tools and automation.',
        description: 'Beyond the public website, the project includes a business application, an administration area, operational scheduling and a scope covering integrations and automation. Private details and internal connections are not exposed.',
        tags: ['Public website', 'Business tools', 'Automation'], imageAlt: 'Public website of Blue Baie Conciergerie',
        caseStudy: {
          visualVariant: 'ecosystem',
          activity: 'Holiday rental concierge services and support for property owners.',
          location: 'Bay of Somme',
          metaTitle: 'Concierge website and digital platform in the Bay of Somme | Nova Baie',
          metaDescription: 'Blue Baie case study: public website design and a digital ecosystem developed for a concierge business in the Bay of Somme.',
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
    portfolioVisible: true, homeVisible: true, homeOrder: 3, portfolioOrder: 3,
    title: { fr: 'Conciergerie Saint-Jean', en: 'Conciergerie Saint-Jean' },
    externalUrl: 'https://conciergeriesaintjean.fr/', externalUrlCheckedOn: '2026-11-06',
    image: '/media/projects/conciergerie-saint-jean/screens/home-desktop.jpg', mobileImage: '/media/projects/conciergerie-saint-jean/screens/home-mobile1.jpg',
    gallery: [
      '/media/projects/conciergerie-saint-jean/screens/home-desktop.jpg',
      '/media/projects/conciergerie-saint-jean/screens/services.jpg',
      '/media/projects/conciergerie-saint-jean/screens/owners.jpg',
      '/media/projects/conciergerie-saint-jean/screens/logement.jpg',
      '/media/projects/conciergerie-saint-jean/screens/contact.jpg',
      '/media/projects/conciergerie-saint-jean/screens/detail-design.jpg'
    ], video: '/media/projects/conciergerie-saint-jean/presentation-silent.mp4', videoPoster: '/media/projects/conciergerie-saint-jean/poster.jpg',
    logo: '/media/projects/conciergerie-saint-jean/brand/logo-conciergerie-saint-jean-champagne.png', categoryId: 'business-ecosystem',
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
          metaTitle: 'Site internet de conciergerie sur la Côte d’Opale | Nova Baie',
          metaDescription: 'Étude de cas : direction artistique, site internet responsive et back-office métier conçus par Nova Baie pour Conciergerie Saint-Jean.',
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
          metaTitle: 'Concierge website on the Opal Coast | Nova Baie',
          metaDescription: 'Case study: digital art direction, responsive website and business back office created by Nova Baie for Conciergerie Saint-Jean.',
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
    id: 'bout-du-monde', slug: 'le-bout-du-monde', status: 'completed', detailStatus: 'published',
    portfolioVisible: true, homeVisible: false, homeOrder: null, portfolioOrder: 4,
    title: { fr: 'Le Bout du Monde', en: 'Le Bout du Monde' }, externalUrl: 'https://www.le-bout-du-monde.org/',
    externalUrlCheckedOn: '2026-11-06', image: '/media/projects/le-bout-du-monde/realisation-le-bout-du-monde.jpg', gallery: ['/media/projects/le-bout-du-monde/realisation-le-bout-du-monde.jpg', '/media/projects/le-bout-du-monde/preview-le-bout-du-monde.jpg', '/media/projects/le-bout-du-monde/CAPTURE.png'],
    categoryId: 'hospitality', expertiseIds: ['identity', 'web'], technologyIds: [],
    copy: {
      fr: {
        category: 'Site vitrine · gîtes & séjour nature', summary: 'Deux hébergements, une même invitation à ralentir.',
        description: 'Direction artistique et création d’un site vitrine pour deux gîtes en Baie de Somme, avec une expérience de découverte pensée autour du lieu, des matières et de l’atmosphère.', tags: ['Site web', 'Hébergement', 'Direction artistique'], imageAlt: 'Capture authentique de la page d’accueil du site Le Bout du Monde',
        caseStudy: {
          visualVariant: 'editorial', activity: 'Deux gîtes présentés dans un univers de séjour nature en Baie de Somme.', location: 'Saint-Quentin-en-Tourmont · Baie de Somme',
          metaTitle: 'Création de site internet pour gîtes en Baie de Somme | Nova Baie',
          metaDescription: 'Étude de cas Le Bout du Monde : direction artistique et création d’un site vitrine pour deux gîtes en Baie de Somme.',
          intro: 'Un site de séjour qui laisse le lieu donner le premier ton.',
          context: 'Le site présente deux hébergements aux atmosphères distinctes, dans un cadre de nature, de bois et de lumière. La découverte commence par l’ambiance, puis se précise au fil des pages consacrées à chaque gîte.',
          need: 'Faire ressentir le caractère des lieux en ligne, donner des repères simples et accompagner la découverte des hébergements sans rompre la sensation d’évasion.',
          intervention: 'Nova Baie a conçu et développé le site vitrine, sa direction artistique digitale et la mise en scène des contenus dédiés aux deux gîtes.',
          artDirection: 'Une composition éditoriale aux tons naturels associe images immersives, typographie élégante et repères sobres. Le site prolonge l’atmosphère du lieu sans la couvrir.',
          scope: ['Direction artistique digitale', 'Conception et développement du site', 'Présentation des deux gîtes', 'Parcours de découverte responsive']
        }
      },
      en: {
        category: 'Hospitality website · nature stays', summary: 'Two stays, one invitation to slow down.',
        description: 'Art direction and a presentation website for two cottages in the Bay of Somme, shaped around the place, its materials and its atmosphere.', tags: ['Website', 'Accommodation', 'Art direction'], imageAlt: 'Authentic capture of the Le Bout du Monde homepage',
        caseStudy: {
          visualVariant: 'editorial', activity: 'Two holiday cottages presented within a nature-led stay in the Bay of Somme.', location: 'Saint-Quentin-en-Tourmont · Bay of Somme',
          metaTitle: 'Website design for cottages in the Bay of Somme | Nova Baie',
          metaDescription: 'Le Bout du Monde case study: digital art direction and a presentation website for two cottages in the Bay of Somme.',
          intro: 'A stay website that lets the place set the tone.',
          context: 'The website presents two stays with distinct atmospheres, surrounded by nature, wood and light. Discovery begins with the mood, then unfolds through pages dedicated to each cottage.',
          need: 'Bring the character of the place into its digital presence, offer clear points of reference and make it easy to discover each stay without losing the feeling of escape.',
          intervention: 'Nova Baie designed and developed the presentation website, its digital art direction and the visual storytelling for both cottages.',
          artDirection: 'An editorial composition in natural tones brings together immersive imagery, elegant typography and quiet signposts. The website extends the atmosphere of the place without overwhelming it.',
          scope: ['Digital art direction', 'Website design and development', 'Presentation of both cottages', 'Responsive discovery journey']
        }
      }
    }
  },
  {
    id: 'gites-en-baie', slug: 'gites-en-baie', status: 'completed', detailStatus: 'published',
    portfolioVisible: true, homeVisible: true, homeOrder: 4, portfolioOrder: 5,
    title: { fr: 'Gîtes en Baie', en: 'Gîtes en Baie' }, externalUrl: 'https://www.gite-baie.com/',
    externalUrlCheckedOn: '2026-11-06', image: '/media/projects/gite-en-baie/optimized/home-desktop.webp', gallery: [
      '/media/projects/gite-en-baie/optimized/home-desktop.webp',
      '/media/projects/gite-en-baie/optimized/accommodations.webp',
      '/media/projects/gite-en-baie/optimized/destinations.webp'
    ],
    categoryId: 'hospitality', expertiseIds: ['identity', 'web'], technologyIds: [],
    copy: {
      fr: {
        category: 'Site multi-hébergements', summary: 'Réunir plusieurs hébergements dans un parcours lisible.', description: 'Un site multi-hébergements en Baie de Somme : présentation des logements, informations pratiques et parcours vers la réservation.', tags: ['Multi-hébergements', 'Parcours utilisateur', 'Site web'], imageAlt: 'Page d’accueil de Gîtes en Baie sur une photographie panoramique de la baie',
        caseStudy: {
          visualVariant: 'editorial', activity: 'Une sélection de gîtes et d’hébergements pour découvrir la Baie de Somme.', location: 'Baie de Somme',
          metaTitle: 'Création de site internet pour gîtes en Baie de Somme | Nova Baie', metaDescription: 'Étude de cas Gîtes en Baie : conception d’un site vitrine multi-hébergements, de ses parcours éditoriaux et de son expérience de découverte.',
          intro: 'Un même territoire, plusieurs façons de séjourner.', context: 'Gîtes en Baie rassemble sur un site unique des hébergements aux situations et aux ambiances variées. La baie en est le fil commun : elle donne au visiteur un premier repère avant qu’il explore les logements et les lieux.',
          need: 'Rendre une offre multi-hébergements facile à parcourir, tout en laissant chaque adresse exprimer son caractère et en reliant les séjours à leur territoire.',
          intervention: 'Nova Baie a conçu et développé le site vitrine, organisé la présentation des hébergements et construit un parcours de découverte entre les logements, les informations pratiques et les contenus consacrés à la baie.',
          artDirection: 'Le paysage ouvre la narration. Une interface sombre et lumineuse met les photographies au premier plan, tandis que des repères éditoriaux structurent la découverte sans la réduire à un catalogue.',
          scope: ['Direction artistique digitale', 'Conception et développement du site', 'Présentation multi-hébergements', 'Parcours de découverte et contenus territoriaux']
        }
      },
      en: {
        category: 'Multi-property website', summary: 'Bringing several properties into one clear visitor journey.', description: 'A multi-property website in the Bay of Somme, with accommodation details, practical information and a route to booking.', tags: ['Multi-property', 'User journey', 'Website'], imageAlt: 'Gîtes en Baie homepage over a panoramic Bay of Somme photograph',
        caseStudy: {
          visualVariant: 'editorial', activity: 'A selection of cottages and stays for discovering the Bay of Somme.', location: 'Bay of Somme',
          metaTitle: 'Website design for cottages in the Bay of Somme | Nova Baie', metaDescription: 'Gîtes en Baie case study: a multi-property presentation website, editorial journeys and a considered discovery experience.',
          intro: 'One landscape, several ways to stay.', context: 'Gîtes en Baie brings together accommodation with different settings and atmospheres on one website. The bay connects them, offering visitors a first point of reference before they explore each property and its surroundings.',
          need: 'Make a multi-property offer easy to browse while giving each address its own character and connecting each stay to the wider landscape.',
          intervention: 'Nova Baie designed and developed the presentation website, organised the property content and shaped a discovery journey between stays, practical information and editorial content about the bay.',
          artDirection: 'The landscape opens the story. A dark, luminous interface places photography first, while editorial signposts guide discovery without making it feel like a catalogue.',
          scope: ['Digital art direction', 'Website design and development', 'Multi-property presentation', 'Discovery journey and local content']
        }
      }
    }
  },  {
    id: 'refuge-marmotte', slug: 'le-refuge-de-la-marmotte', status: 'completed', detailStatus: 'published',
    portfolioVisible: true, homeVisible: false, homeOrder: null, portfolioOrder: 6,
    title: { fr: 'Le Refuge de la Marmotte', en: 'Le Refuge de la Marmotte' }, externalUrl: 'https://www.ski-saintefoy.com/',
    externalUrlCheckedOn: '2026-11-09', image: '/media/projects/le-refuge-de-la-marmotte/optimized/home.webp', gallery: ['/media/projects/le-refuge-de-la-marmotte/optimized/home.webp', '/media/projects/le-refuge-de-la-marmotte/optimized/gallery.webp', '/media/projects/le-refuge-de-la-marmotte/optimized/contact.webp'],
    categoryId: 'hospitality', expertiseIds: ['identity', 'web'], technologyIds: [],
    copy: {
      fr: { category: 'Site sur mesure · hébergement alpin', summary: 'De l’immensité des Alpes à l’intimité d’un refuge.', description: 'Direction artistique et création d’un site internet pour un appartement duplex à Sainte-Foy-Tarentaise : photographies, informations de séjour et parcours vers la réservation.', tags: ['Direction artistique', 'Hébergement', 'Site sur mesure'], imageAlt: 'Capture authentique de l’accueil du site Le Refuge de la Marmotte', caseStudy: {
        visualVariant: 'editorial', activity: 'Appartement duplex pour quatre voyageurs.', location: 'Sainte-Foy-Tarentaise · Alpes françaises',
        metaTitle: 'Site internet d’hébergement à Sainte-Foy-Tarentaise | Nova Baie', metaDescription: 'Le Refuge de la Marmotte : création de site internet, web design et direction artistique pour un appartement à Sainte-Foy-Tarentaise. Étude de cas Nova Baie.',
        intro: 'De l’immensité des Alpes à l’intimité d’un refuge.', context: 'Un appartement duplex pour quatre voyageurs à Sainte-Foy-Tarentaise.', need: 'Faire découvrir l’appartement et rendre les informations de séjour accessibles.', intervention: 'Conception et développement du site, direction artistique digitale et organisation du parcours visiteur.', artDirection: 'Photographies de montagne, intérieurs boisés, contrastes noirs et blancs et panneaux clairs arrondis.', scope: ['Direction artistique', 'Création de site internet sur mesure', 'Conception éditoriale', 'Parcours de découverte, contact et réservation externe']
      } },
      en: { category: 'Bespoke website · alpine accommodation', summary: 'From the vastness of the Alps to the intimacy of a refuge.', description: 'Art direction and a bespoke website for a duplex apartment in Sainte-Foy-Tarentaise, with photography, stay information and a route to booking.', tags: ['Art direction', 'Accommodation', 'Bespoke website'], imageAlt: 'Authentic homepage capture of Le Refuge de la Marmotte', caseStudy: {
        visualVariant: 'editorial', activity: 'Duplex apartment for four guests.', location: 'Sainte-Foy-Tarentaise · French Alps',
        metaTitle: 'Accommodation website in Sainte-Foy-Tarentaise | Nova Baie', metaDescription: 'Le Refuge de la Marmotte: bespoke website design, development and art direction for an apartment in Sainte-Foy-Tarentaise. A Nova Baie case study.',
        intro: 'From the vastness of the Alps to the intimacy of a refuge.', context: 'A duplex apartment for four guests in Sainte-Foy-Tarentaise.', need: 'Introduce the apartment and make stay information easy to find.', intervention: 'Website design and development, digital art direction and visitor journey design.', artDirection: 'Mountain photography, wood interiors, black-and-white contrasts and light rounded panels.', scope: ['Art direction', 'Bespoke website development', 'Editorial design', 'Discovery, contact and external booking journey']
      } }
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
