export type Actualite = {
  id: number
  date: string
  categorie: 'Réalisation' | 'Lancement' | 'Coulisse' | 'Conseil'
  titre: string
  resume: string
  contenuComplet: string
  images?: string[]
  lien?: string
  labelLien?: string
  plateformes?: string[]
}

export const actualites: Actualite[] = [
  {
    id: 2,
    date: "2 mai 2026",
    categorie: "Conseil",
    titre: "Avoir plusieurs logements ne suffit plus.",
    images: [
      "/images/actualites/post3-1.png",
      "/images/actualites/post3-2.png",
      "/images/actualites/post3-3.png",
      "/images/actualites/post3-4.png",
      "/images/actualites/post3-5.png",
    ],
    resume: "Dans le tourisme, ce qui fait la différence ce n'est pas seulement l'offre. C'est la manière dont elle est présentée. Les voyageurs comparent vite. Très vite.",
    contenuComplet: `Aujourd'hui, dans le tourisme, avoir plusieurs logements ne suffit plus.

Ce qui fait la différence, ce n'est pas seulement l'offre.
C'est la manière dont elle est présentée.

Les voyageurs comparent vite. Très vite.
En quelques secondes, ils décident :
— de rester
— ou de partir ailleurs

Dans ce contexte, beaucoup de propriétaires et d'exploitants font face au même problème : leurs logements sont visibles… mais leur image ne l'est pas.

Dispersés entre Airbnb, Booking et d'autres plateformes, ils existent individuellement, mais rarement comme une marque cohérente.

C'est précisément pour répondre à ce besoin qu'est née Nova Baie.

Nous concevons des sites web premium pour les professionnels du tourisme, pensés pour structurer leur offre, valoriser leur image et surtout convertir leurs visiteurs.

Un exemple concret : gite-baie.com
- 7 hébergements regroupés
- Plus de 900 avis cumulés (Airbnb & Booking)
- Une note moyenne de 4.9/5

Un seul site pour centraliser l'offre, clarifier le message et proposer une expérience fluide.

Un bon site ne doit pas simplement être esthétique. Il doit :
— inspirer confiance immédiatement
— rendre l'offre lisible
— guider le visiteur
— et faciliter la réservation

Nova Baie s'appuie sur une connaissance terrain du marché, issue de plusieurs années d'expérience en conciergerie et location saisonnière.

Chaque projet est pensé avec une logique simple : créer un site à la hauteur de l'offre qu'il représente.

Vous gérez plusieurs logements ou développez une activité dans le tourisme ? Nous serions ravis d'en discuter.`,
    lien: "https://nova-baie.com",
    labelLien: "nova-baie.com",
    plateformes: ["LinkedIn", "Instagram", "Facebook"],
  },
  {
    id: 1,
    date: "28 avril 2026",
    categorie: "Conseil",
    titre: "Nova Baie est née d'un constat terrain.",
    resume: "Dans le secteur du tourisme, l'offre n'a jamais été aussi importante. Gîtes, Airbnb, hébergements indépendants : la concurrence est forte et les voyageurs comparent de plus en plus vite.",
    contenuComplet: `Nova Baie est née d'un constat terrain.

Dans le secteur du tourisme, l'offre n'a jamais été aussi importante. Gîtes, Airbnb, hébergements indépendants : la concurrence est forte et les voyageurs comparent de plus en plus vite.

Dans ce contexte, la présence en ligne devient déterminante. Un site web n'est plus simplement une vitrine. C'est un outil stratégique qui doit :

— inspirer confiance en quelques secondes
— clarifier l'offre
— guider le visiteur
— faciliter la prise de décision

C'est sur cette logique que Nova Baie a été construite. Nous concevons des sites web premium pour les professionnels du tourisme, avec une approche simple : valoriser ce qui existe déjà… et le transformer en levier de conversion.`,
    images: [
      "/images/actualites/post2-1.png",
      "/images/actualites/post2-2.png",
      "/images/actualites/post2-3.png",
      "/images/actualites/post2-4.png",
      "/images/actualites/post2-5.png",
    ],
    lien: "https://nova-baie.com",
    labelLien: "nova-baie.com",
    plateformes: ["LinkedIn", "Instagram", "Facebook"],
  },
]
