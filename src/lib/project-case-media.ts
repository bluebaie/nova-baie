export type ProjectMediaLocale = 'fr' | 'en';
export type ProjectMediaPlacement = 'public-gallery' | 'hospitality-gallery' | 'operations-evidence';
export type ProjectMediaKind =
  | 'public-interface'
  | 'hospitality-photo'
  | 'operations-dashboard'
  | 'reservation-workflow'
  | 'billing-workflow'
  | 'property-management'
  | 'connected-access'
  | 'tasks-and-journal'
  | 'ai-workflow'
  | 'integration-workflow';
export type ProjectMediaStatus = 'published' | 'privacy-review' | 'awaiting-media' | 'needs-verification';

export type ProjectCaseMedia = {
  id: string;
  projectId: string;
  kind: ProjectMediaKind;
  placement: ProjectMediaPlacement;
  status: ProjectMediaStatus;
  order: number;
  src?: string;
  title: Record<ProjectMediaLocale, string>;
  description: Record<ProjectMediaLocale, string>;
  alt: Record<ProjectMediaLocale, string>;
};

export type PublishedProjectCaseMedia = ProjectCaseMedia & { status: 'published'; src: string };

export function getPublishedCaseMedia(
  media: readonly ProjectCaseMedia[],
  placement: ProjectMediaPlacement,
): PublishedProjectCaseMedia[] {
  return media
    .filter((item): item is PublishedProjectCaseMedia => item.placement === placement && item.status === 'published' && Boolean(item.src))
    .sort((a, b) => a.order - b.order);
}

const publicScreen = (
  id: string,
  order: number,
  file: string,
  title: Record<ProjectMediaLocale, string>,
  description: Record<ProjectMediaLocale, string>,
  alt: Record<ProjectMediaLocale, string>,
): ProjectCaseMedia => ({ id, projectId: 'blue-baie', kind: 'public-interface', placement: 'public-gallery', status: 'published', order, src: `/media/projects/blue-baie/screens/${file}`, title, description, alt });

const hospitalityPhoto = (
  id: string,
  order: number,
  file: string,
  title: Record<ProjectMediaLocale, string>,
  description: Record<ProjectMediaLocale, string>,
  alt: Record<ProjectMediaLocale, string>,
): ProjectCaseMedia => ({ id, projectId: 'blue-baie', kind: 'hospitality-photo', placement: 'hospitality-gallery', status: 'published', order, src: `/media/projects/blue-baie/images/${file}`, title, description, alt });

// The dashboard image supplied by the owner contains identifiable guest/owner names and booking details.
// Keep its review state in the editorial model, but never publish its source path or render it publicly.
export const blueBaieCaseMedia: readonly ProjectCaseMedia[] = [
  publicScreen('bb-home-desktop', 1, 'home-desktop.png', { fr: 'Accueil', en: 'Homepage' }, { fr: 'La page d’accueil présente le territoire, les logements et les parcours proposés.', en: 'The homepage introduces the area, properties and available journeys.' }, { fr: 'Capture de la page d’accueil Blue Baie sur ordinateur', en: 'Desktop capture of the Blue Baie homepage' }),
  publicScreen('bb-home-mobile', 2, 'home-mobile1.jpg', { fr: 'Expérience mobile', en: 'Mobile experience' }, { fr: 'La composition du site public adaptée à un écran mobile.', en: 'The public website composition adapted to a mobile screen.' }, { fr: 'Capture mobile de la page d’accueil Blue Baie', en: 'Mobile capture of the Blue Baie homepage' }),
  publicScreen('bb-services', 3, 'services.png', { fr: 'Services', en: 'Services' }, { fr: 'La page qui détaille les services présentés publiquement.', en: 'The page outlining the services presented publicly.' }, { fr: 'Page publique des services Blue Baie', en: 'Blue Baie public services page' }),
  publicScreen('bb-properties', 4, 'logements.png', { fr: 'Catalogue de logements', en: 'Property catalogue' }, { fr: 'Un parcours de découverte des logements proposés.', en: 'A journey for discovering available properties.' }, { fr: 'Catalogue public de logements Blue Baie', en: 'Blue Baie public property catalogue' }),
  publicScreen('bb-property-detail', 5, 'logement-detail.png', { fr: 'Fiche logement', en: 'Property detail' }, { fr: 'Une page de présentation détaillée d’un logement.', en: 'A detailed presentation page for a property.' }, { fr: 'Page publique de détail d’un logement', en: 'Public property detail page' }),
  publicScreen('bb-territory', 6, 'secteurs.png', { fr: 'Territoire', en: 'Service area' }, { fr: 'La présentation des secteurs desservis par Blue Baie.', en: 'A presentation of the areas served by Blue Baie.' }, { fr: 'Page publique des secteurs Blue Baie', en: 'Blue Baie public service areas page' }),
  publicScreen('bb-contact', 7, 'contact.png', { fr: 'Prendre contact', en: 'Get in touch' }, { fr: 'Le parcours de contact visible sur le site public.', en: 'The contact journey available on the public website.' }, { fr: 'Page publique de contact Blue Baie', en: 'Blue Baie public contact page' }),
  publicScreen('bb-mobile-journey', 8, 'mobile2.jpg', { fr: 'Parcours mobile', en: 'Mobile journey' }, { fr: 'Une seconde vue mobile du site public.', en: 'A second mobile view of the public website.' }, { fr: 'Autre capture mobile du site Blue Baie', en: 'Another mobile capture of the Blue Baie website' }),
  hospitalityPhoto('bb-interior', 1, 'h3.jpg', { fr: 'Un intérieur accueillant', en: 'A welcoming interior' }, { fr: 'Une pièce de vie mise en valeur dans la présentation des logements.', en: 'A living space highlighted in the property presentation.' }, { fr: 'Pièce de vie lumineuse dans un logement de vacances', en: 'Bright living area in a holiday home' }),
  hospitalityPhoto('bb-garden', 2, 'h4.jpg', { fr: 'Un lieu pour ralentir', en: 'A place to unwind' }, { fr: 'Une vue extérieure parmi les visuels de séjour.', en: 'An outdoor view among the stay imagery.' }, { fr: 'Jardin et bain nordique d’un logement de vacances', en: 'Garden and hot tub at a holiday home' }),
  hospitalityPhoto('bb-kitchen', 3, 'h10.jpg', { fr: 'Les détails du séjour', en: 'Details that make a stay' }, { fr: 'Un aperçu de l’aménagement d’un logement.', en: 'A view of a property interior.' }, { fr: 'Cuisine contemporaine aux accents bleus', en: 'Contemporary kitchen with blue accents' }),
  hospitalityPhoto('bb-home-exterior', 4, 'h13.jpg', { fr: 'Les logements dans leur cadre', en: 'Homes in their setting' }, { fr: 'Une maison présentée dans son environnement.', en: 'A home shown in its setting.' }, { fr: 'Façade d’un logement de vacances', en: 'Exterior of a holiday home' }),
  hospitalityPhoto('bb-bay-evening', 5, 'h16.jpg', { fr: 'La baie en fin de journée', en: 'The Bay at the end of the day' }, { fr: 'Un paysage de la baie au coucher du soleil.', en: 'A Bay of Somme landscape at sunset.' }, { fr: 'Bateaux au coucher du soleil dans la baie', en: 'Boats at sunset on the Bay of Somme' }),
  {
    id: 'bb-operations-dashboard-review', projectId: 'blue-baie', kind: 'operations-dashboard', placement: 'operations-evidence', status: 'privacy-review', order: 1,
    title: { fr: 'Tableau de bord opérationnel', en: 'Operations dashboard' },
    description: { fr: 'Une capture fournie montre un planning hebdomadaire et des panneaux d’arrivées et de départs. Des données nominatives y sont visibles ; une version expurgée doit être validée avant publication.', en: 'An owner-supplied capture shows a weekly schedule and arrivals/departures panels. It contains identifiable names; a redacted version must be approved before publication.' },
    alt: { fr: 'Capture interne en attente de revue de confidentialité', en: 'Internal screenshot awaiting privacy review' },
  },
  {
    id: 'bb-reservations-review', projectId: 'blue-baie', kind: 'reservation-workflow', placement: 'operations-evidence', status: 'privacy-review', order: 2,
    title: { fr: 'Planning et réservations', en: 'Schedule and reservations' },
    description: { fr: 'La capture mentionne des réservations synchronisées et des arrivées/départs. Les noms, logements et données de réservation doivent être masqués dans un dérivé approuvé.', en: 'The capture references synchronised reservations and arrivals/departures. Names, properties and booking details must be masked in an approved derivative.' },
    alt: { fr: 'Capture de planning interne en attente de masquage des données', en: 'Internal schedule capture awaiting data redaction' },
  },
  {
    id: 'bb-billing-media', projectId: 'blue-baie', kind: 'billing-workflow', placement: 'operations-evidence', status: 'awaiting-media', order: 3,
    title: { fr: 'Facturation', en: 'Billing' }, description: { fr: 'Une rubrique Facturation apparaît dans la navigation fournie ; aucune capture de détail ni fonction précise n’est validée.', en: 'A Billing section appears in the supplied navigation; no detailed screen or specific function has been verified.' }, alt: { fr: 'Média de facturation à fournir et valider', en: 'Billing media to be supplied and verified' },
  },
  {
    id: 'bb-property-admin-media', projectId: 'blue-baie', kind: 'property-management', placement: 'operations-evidence', status: 'awaiting-media', order: 4,
    title: { fr: 'Gestion des logements', en: 'Property management' }, description: { fr: 'Les fiches publiques sont disponibles ; une vue interne de gestion reste à fournir séparément.', en: 'Public property pages are available; an internal management view must be supplied separately.' }, alt: { fr: 'Média interne de gestion des logements à fournir', en: 'Internal property management media to be supplied' },
  },
  {
    id: 'bb-connected-access-media', projectId: 'blue-baie', kind: 'connected-access', placement: 'operations-evidence', status: 'privacy-review', order: 5,
    title: { fr: 'Accès connectés', en: 'Connected access' }, description: { fr: 'Aucun média d’accès n’est publié ; tout contenu futur nécessite une revue des informations de sécurité et d’exploitation.', en: 'No access-control media is published; any future asset requires a security and operations review.' }, alt: { fr: 'Média d’accès connecté en attente de revue de sécurité', en: 'Connected access media awaiting security review' },
  },
  {
    id: 'bb-tasks-media', projectId: 'blue-baie', kind: 'tasks-and-journal', placement: 'operations-evidence', status: 'awaiting-media', order: 6,
    title: { fr: 'Tâches et journal', en: 'Tasks and journal' }, description: { fr: 'La navigation fournie montre une rubrique Tâches & journal ; aucun écran détaillé n’est disponible.', en: 'The supplied navigation shows a Tasks & journal section; no detailed screen is available.' }, alt: { fr: 'Capture des tâches et du journal à fournir', en: 'Tasks and journal capture to be supplied' },
  },
  {
    id: 'bb-ai-media', projectId: 'blue-baie', kind: 'ai-workflow', placement: 'operations-evidence', status: 'needs-verification', order: 7,
    title: { fr: 'Intelligence artificielle', en: 'Artificial intelligence' }, description: { fr: 'Aucune fonction IA propre à Blue Baie n’est établie par les sources ou médias examinés ; ne pas publier de représentation avant validation.', en: 'No Blue Baie-specific AI function is established by the sources or media reviewed; do not publish a representation before verification.' }, alt: { fr: 'Fonction IA à vérifier avant toute publication', en: 'AI feature to verify before publication' },
  },
  {
    id: 'bb-integrations-media', projectId: 'blue-baie', kind: 'integration-workflow', placement: 'operations-evidence', status: 'needs-verification', order: 8,
    title: { fr: 'Intégrations et automatisations', en: 'Integrations and automation' }, description: { fr: 'Le périmètre du projet inclut des intégrations et automatisations ; fournisseurs, flux et règles détaillés restent à documenter avant toute visualisation technique.', en: 'The project scope includes integrations and automation; providers, data flows and detailed rules must be documented before a technical visualisation.' }, alt: { fr: 'Schéma d’intégrations à documenter avant publication', en: 'Integration diagram to be documented before publication' },
  },
];
