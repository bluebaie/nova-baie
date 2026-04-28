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
  { label: "Actualités", href: "/actualites" },
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
    title: "Échange initial",
    description: "On discute de votre structure, vos objectifs et vos attentes. Aucun engagement.",
    icon: MessageCircle
  },
  {
    title: "Cadrage & offre",
    description: "On définit le périmètre exact, le niveau d’offre adapté et on valide ensemble.",
    icon: Search
  },
  {
    title: "Direction créative",
    description: "Architecture, identité visuelle, ton et logique de conversion. Vous validez avant qu’on code.",
    icon: Globe
  },
  {
    title: "Développement",
    description: "Intégration des contenus, des photos, optimisation mobile et SEO technique.",
    icon: House
  },
  {
    title: "Mise en ligne",
    description: "Tests complets, transmission des accès et suivi post-lancement inclus.",
    icon: ShieldCheck
  }
];

export const projects = [
  {
    title: "Gîtes en Baie",
    category: "Propriétaire multi-logements • Baie de Somme",
    description:
      "Site vitrine pour un propriétaire gérant plusieurs gîtes en Baie de Somme. Catalogue complet des logements, intégration des avis Airbnb & Booking, système de réservation et pages découverte de la région.",
    image: "/images/project-gites-en-baie.jpg",
    imageAlt: "Site web Gîtes en Baie - Réalisation Nova Baie - Multi-hébergements Baie de Somme",
    url: "https://www.gite-baie.com/",
    tags: ["Multi-logements", "Réservation", "SEO local"],
    stats: "4.9/5 Airbnb · +900 avis · 7 hébergements",
    previewBg: "#1B3A2D"
  },
  {
    title: "Le Refuge de la Marmotte",
    category: "Hébergement ski • Sainte-Foy-Tarentaise",
    description:
      "Site vitrine pour un appartement ski 4 personnes au pied des pistes. Galerie immersive, présentation du confort, localisation et réservation directe.",
    image: "/images/project-ski-saintefoy.jpg",
    imageAlt: "Site web Le Refuge de la Marmotte - Réalisation Nova Baie - Location ski Sainte-Foy-Tarentaise",
    url: "https://www.ski-saintefoy.com/",
    tags: ["Hébergement", "Montagne", "Réservation directe", "Galerie"],
    stats: "4.82/5 Airbnb · 8.6/10 Booking",
    previewBg: "#0F1923"
  },
  {
    title: "Le Bout du Monde",
    category: "Gîtes • Baie de Somme",
    description:
      "Deux gîtes d'exception nichés entre terre et mer au cœur de la Baie de Somme. Construction écologique en ossature bois, isolation chanvre et terre, enduits argile. Gîte 1 (4 voyageurs) noté 4.92/5 sur 131 avis Airbnb.",
    image: "/images/realisation-le-bout-du-monde.jpg",
    imageAlt: "Site web Le Bout du Monde - Réalisation Nova Baie - Gîtes éco-construction Baie de Somme",
    url: "https://www.le-bout-du-monde.org",
    tags: ["Éco-construction", "Multi-logements", "Baie de Somme"],
    stats: "4.92/5 Airbnb · 131 avis · 2 gîtes indépendants",
    previewBg: "#2C1810"
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
  email: "contact.novabaie@gmail.com",
  phone: "+33 7 63 54 67 27",
  baseLocation: "Baie de Somme",
  footerText:
    "Nova Baie conçoit des sites web premium pour les professionnels du tourisme qui souhaitent mieux valoriser leur image et leur offre."
};

export const metaTexts = {
  homeTitle: "Nova Baie - Sites web premium pour le tourisme",
  homeDescription:
    "Nova Baie conçoit des sites web premium pour les conciergeries, hébergements et professionnels du tourisme."
};