export type Locale = 'fr' | 'en';
type ProjectCopy = { category: string; summary: string; description: string; tags: string[]; imageAlt?: string };
export type Project = {
  id: string;
  title: string;
  status: 'completed' | 'finalizing';
  url?: string;
  image?: string;
  video?: string;
  copy: Record<Locale, ProjectCopy>;
};

// Public URLs checked by HTTP GET on 2026-11-05. Scope for recent projects supplied by the owner.
// Missing screenshots/URLs are deliberately omitted; never use private admin captures.
export const projects: readonly Project[] = [
  {
    id: 'blue-baie', title: 'Blue Baie Conciergerie', status: 'completed', url: 'https://www.bluebaie.fr/',
    copy: {
      fr: { category: 'Site public & écosystème métier', summary: 'Relier la présentation de l’activité aux outils qui la font fonctionner.', description: 'Un site public et un écosystème métier avancé : réservations, intégrations, automatisations et administration. Le projet associe parcours visiteurs et fonctionnement opérationnel, sans exposer les données internes.', tags: ['Plateforme métier', 'Intégrations', 'Automatisation'] },
      en: { category: 'Public website & business ecosystem', summary: 'Connecting the public-facing business with the tools behind its operations.', description: 'A public website and an advanced business ecosystem spanning bookings, integrations, automation and administration. The project connects visitor journeys with day-to-day operations without exposing internal data.', tags: ['Business platform', 'Integrations', 'Automation'] },
    },
  },
  {
    id: 'saint-jean', title: 'Conciergerie Saint-Jean', status: 'completed', url: 'https://conciergeriesaintjean.fr/',
    copy: {
      fr: { category: 'Direction artistique & application métier', summary: 'Faire cohabiter une identité haut de gamme et un back-office métier.', description: 'Un site premium terminé, avec une direction artistique haut de gamme et un back-office métier. La présentation publique valorise l’identité de la conciergerie ; les interfaces et données privées restent confidentielles.', tags: ['Direction artistique', 'Site premium', 'Back-office'] },
      en: { category: 'Art direction & business application', summary: 'Bringing a premium identity and a business back office together.', description: 'A completed premium website combining refined art direction with a business back office. The public experience expresses the concierge brand while private interfaces and data remain confidential.', tags: ['Art direction', 'Premium website', 'Back office'] },
    },
  },
  {
    id: 'csc', title: 'CycloSport Crotellois', status: 'finalizing',
    copy: {
      fr: { category: 'Association sportive & contenus administrables', summary: 'Structurer la vie du club autour des événements et de l’information.', description: 'Un site sportif moderne avec gestion d’événements, d’actualités et de contenus administrables. Une plateforme en cours de finalisation pour organiser l’information du club et sa vie associative.', tags: ['Association', 'Événements', 'Administration'] },
      en: { category: 'Sports association & manageable content', summary: 'Organising club life around events and information.', description: 'A modern sports website with event, news and content management. A platform being finalised to organise club information and support its community.', tags: ['Association', 'Events', 'Administration'] },
    },
  },
  {
    id: 'bout-du-monde', title: 'Le Bout du Monde', status: 'completed', url: 'https://www.le-bout-du-monde.org/',
    image: '/images/realisation-le-bout-du-monde.jpg', video: '/videos/le-bout-du-monde-demo.mp4',
    copy: {
      fr: { category: 'Site touristique', summary: 'Donner à deux gîtes une présentation cohérente et personnelle.', description: 'Un site de présentation pour deux gîtes en Baie de Somme, mettant en valeur leur cadre et leur identité. Une réalisation touristique au sein d’un portfolio désormais ouvert à plusieurs secteurs.', tags: ['Site web', 'Hébergement', 'Identité'], imageAlt: 'Capture du site Le Bout du Monde, réalisé par Nova Baie' },
      en: { category: 'Tourism website', summary: 'Giving two holiday cottages a consistent, distinctive presentation.', description: 'A presentation website for two holiday cottages in the Bay of Somme, highlighting their setting and identity. A tourism project within a portfolio now spanning several sectors.', tags: ['Website', 'Accommodation', 'Identity'], imageAlt: 'Screenshot of the Le Bout du Monde website by Nova Baie' },
    },
  },
  {
    id: 'gites-en-baie', title: 'Gîtes en Baie', status: 'completed', url: 'https://www.gite-baie.com/',
    image: '/images/project-gites-en-baie.jpg', video: '/videos/gites-en-baie-demo.mp4',
    copy: {
      fr: { category: 'Site multi-hébergements', summary: 'Réunir plusieurs hébergements dans un parcours lisible.', description: 'Un site multi-hébergements en Baie de Somme : présentation des logements, informations pratiques et parcours vers la réservation. L’ensemble rassemble l’offre sous une même identité.', tags: ['Multi-hébergements', 'Parcours utilisateur', 'Site web'], imageAlt: 'Capture du site multi-hébergements Gîtes en Baie, réalisé par Nova Baie' },
      en: { category: 'Multi-property website', summary: 'Bringing several properties into one clear visitor journey.', description: 'A multi-property website in the Bay of Somme, with accommodation details, practical information and a route to booking. It brings the properties together under one identity.', tags: ['Multi-property', 'User journey', 'Website'], imageAlt: 'Screenshot of the Gîtes en Baie multi-property website by Nova Baie' },
    },
  },
  {
    id: 'refuge-marmotte', title: 'Le Refuge de la Marmotte', status: 'completed', url: 'https://www.ski-saintefoy.com/',
    image: '/images/project-ski-saintefoy.jpg', video: '/videos/sainte-foy-demo.mp4',
    copy: {
      fr: { category: 'Site d’hébergement en montagne', summary: 'Présenter un hébergement et aider le visiteur à préparer son séjour.', description: 'Un site consacré à un hébergement à Sainte-Foy-Tarentaise : galerie, présentation du confort, localisation et accès à la réservation. Les contenus accompagnent la découverte du lieu.', tags: ['Hébergement', 'Galerie', 'Site web'], imageAlt: 'Capture du site Le Refuge de la Marmotte, réalisé par Nova Baie' },
      en: { category: 'Mountain accommodation website', summary: 'Presenting a property and helping visitors plan their stay.', description: 'A website for accommodation in Sainte-Foy-Tarentaise, with a gallery, amenities, location and access to booking. The content helps visitors discover the property.', tags: ['Accommodation', 'Gallery', 'Website'], imageAlt: 'Screenshot of the Le Refuge de la Marmotte website by Nova Baie' },
    },
  },
];

export function localizeProjects(locale: string) {
  const language: Locale = locale === 'en' ? 'en' : 'fr';
  return projects.map(({ copy, ...project }) => ({ ...project, ...copy[language] }));
}
export type LocalizedProject = ReturnType<typeof localizeProjects>[number];
export const featuredProjectIds = ['blue-baie', 'saint-jean', 'gites-en-baie'] as const;
