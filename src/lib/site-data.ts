import {
  Globe,
  Hotel,
  House,
  Landmark,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Waves,
  Workflow
} from "lucide-react";

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" }
];

export const targets = [
  "Conciergeries",
  "Gîtes et maisons de vacances",
  "Locations saisonnières premium",
  "Hébergements insolites",
  "Hôtels",
  "Campings et domaines touristiques"
];

export const offers = [
  {
    name: "Site Essentiel",
    price: "À partir de 800 €",
    description:
      "Une base premium, claire et rassurante pour les petites structures qui veulent être visibles et crédibles.",
    idealFor: "Gîtes, maisons de vacances, petites structures",
    features: [
      "Page d’accueil premium",
      "2 à 3 pages essentielles",
      "Design sur mesure",
      "Responsive mobile",
      "Formulaire de contact",
      "SEO local de base",
      "Intégration photos + contenus",
      "Mise en ligne"
    ],
    cta: "Choisir Essentiel",
    highlighted: false
  },
  {
    name: "Site Signature",
    price: "À partir de 1 500 €",
    description:
      "L’offre cœur pour une image haut de gamme et une structure pensée pour convaincre.",
    idealFor: "Conciergeries, hébergements premium, hôtels indépendants",
    features: [
      "UX structurée",
      "4 à 6 pages",
      "Design premium complet",
      "Optimisation conversion",
      "SEO local + structure",
      "Intégration photos professionnelles",
      "Textes optimisés de base",
      "Optimisation mobile avancée"
    ],
    cta: "Choisir Signature",
    highlighted: true
  },
  {
    name: "Site Performance",
    price: "À partir de 3 000 €",
    description:
      "Un véritable outil commercial digital pour les structures ambitieuses.",
    idealFor: "Multi-logements, conciergeries structurées, projets ambitieux",
    features: [
      "UX complète + stratégie",
      "Structure avancée",
      "Pages SEO stratégiques",
      "Rédaction optimisée",
      "Optimisation conversion poussée",
      "Design sur mesure avancé",
      "Conseils stratégie digitale",
      "Blog / landing pages possibles"
    ],
    cta: "Choisir Performance",
    highlighted: false
  }
];

export const options = [
  "Maintenance mensuelle",
  "Ajout de pages",
  "SEO avancé",
  "Rédaction complète",
  "Intégration catalogue logements",
  "Refonte visuelle partielle"
];

export const reasons = [
  {
    title: "Une vraie spécialisation tourisme",
    description:
      "Nova Baie s’adresse aux professionnels de l’hébergement, de l’hospitalité et des services touristiques.",
    icon: Hotel
  },
  {
    title: "Une image plus haut de gamme",
    description:
      "Le site ne doit pas seulement exister. Il doit rassurer, valoriser et mieux présenter l’offre.",
    icon: Sparkles
  },
  {
    title: "Une structure pensée pour convertir",
    description:
      "Navigation claire, hiérarchie forte, contenus utiles et parcours orienté prise de contact.",
    icon: Workflow
  },
  {
    title: "Une approche ancrée dans le réel",
    description:
      "Le lien avec Blue Baie apporte une compréhension concrète du terrain, des attentes clients et des enjeux d’image.",
    icon: Waves
  }
];

export const processSteps = [
  {
    title: "Prise de contact",
    description: "Premier échange pour comprendre la structure, l’objectif et le niveau d’ambition.",
    icon: MessageCircle
  },
  {
    title: "Qualification & cadrage",
    description: "Choix de l’offre adaptée, définition du périmètre et validation du projet.",
    icon: Search
  },
  {
    title: "Direction visuelle",
    description: "Architecture, hiérarchie, positionnement visuel et intentions de conversion.",
    icon: Globe
  },
  {
    title: "Développement",
    description: "Création du site, intégration des contenus et ajustements finaux.",
    icon: House
  },
  {
    title: "Validation & mise en ligne",
    description: "Tests, derniers réglages, mise en ligne et transmission propre.",
    icon: ShieldCheck
  }
];

export const projects = [
  {
    title: "Maison de vacances premium",
    category: "Hébergement",
    description:
      "Refonte de la présence en ligne pour valoriser un bien haut de gamme et clarifier l’expérience proposée.",
    image: "/images/project-1.jpg",
    tags: ["Image", "Clarté", "Conversion"]
  },
  {
    title: "Conciergerie locale",
    category: "Conciergerie",
    description:
      "Structuration d’une offre de service, hiérarchisation des contenus et amélioration de la crédibilité commerciale.",
    image: "/images/project-2.jpg",
    tags: ["Offre", "Parcours", "Confiance"]
  },
  {
    title: "Domaine touristique",
    category: "Tourisme",
    description:
      "Base évolutive conçue pour accueillir plusieurs pages, des contenus saisonniers et une logique de croissance.",
    image: "/images/project-3.jpg",
    tags: ["Évolutif", "SEO", "Positionnement"]
  }
];

export const aboutValues = [
  "Qualité",
  "Clarté",
  "Exigence",
  "Cohérence",
  "Élégance",
  "Connaissance terrain"
];

export const company = {
  name: "Nova Baie",
  descriptor: "Création de sites web premium pour les professionnels du tourisme",
  email: "contact@novabaie.fr",
  phone: "+33 0 0 00 00 00",
  baseLocation: "Baie de Somme",
  footerText:
    "Nova Baie conçoit des sites web premium pour les professionnels du tourisme qui souhaitent mieux valoriser leur image et leur offre."
};

export const metaTexts = {
  homeTitle: "Nova Baie - Sites web premium pour le tourisme",
  homeDescription:
    "Nova Baie conçoit des sites web premium pour les conciergeries, hébergements et professionnels du tourisme."
};