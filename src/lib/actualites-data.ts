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
    id: 3,
    date: "3 mai 2026",
    categorie: "Conseil",
    titre: "Être présent sur Airbnb ou Booking ne suffit plus.",
    images: [
      "/images/actualites/post4-1.png",
      "/images/actualites/post4-2.png",
      "/images/actualites/post4-3.png",
      "/images/actualites/post4-4.png",
      "/images/actualites/post4-5.png",
      "/images/actualites/post4-6.png",
    ],
    resume: "Dans le tourisme, la différence ne se joue plus uniquement sur l'offre. Elle se joue sur la perception. En quelques secondes, un voyageur décide de rester — ou de partir.",
    contenuComplet: `Aujourd'hui, être présent sur Airbnb ou Booking ne suffit plus.

Dans le tourisme, la différence ne se joue plus uniquement sur l'offre.
Elle se joue sur la perception.

En quelques secondes, un voyageur décide :
— de rester
— ou de partir

Et dans ce laps de temps très court, ce qu'il voit… ce n'est pas votre logement.
C'est votre image.

Le problème que nous observons chez la majorité des professionnels du tourisme est simple : tout est dispersé.
— plusieurs logements
— plusieurs plateformes
— plusieurs liens
— des avis répartis
— une communication fragmentée

Chaque élément existe… mais rarement comme un ensemble cohérent.

Résultat :
👉 une image floue
👉 une offre difficile à lire
👉 un parcours client peu maîtrisé
👉 une dépendance forte aux plateformes

Chez Nova Baie, nous faisons un choix différent.

Nous concevons des sites web premium pour les professionnels du tourisme partout en France. Avec une logique simple :
👉 centraliser
👉 structurer
👉 valoriser

Un site n'est pas seulement une vitrine. C'est un levier. Il doit :
— clarifier votre offre
— rassurer immédiatement
— guider le visiteur
— et transformer une visite en réservation

👉 Un seul site.
👉 Une seule expérience.
👉 Une image maîtrisée.

Du littoral à la montagne, Nova Baie accompagne les acteurs du tourisme dans la construction d'une présence digitale cohérente, durable et performante.

📩 Si vous développez une activité dans le tourisme ou gérez plusieurs hébergements, nous serions ravis d'échanger.`,
    lien: "https://nova-baie.com",
    labelLien: "nova-baie.com",
    plateformes: ["LinkedIn", "Instagram", "Facebook"],
  },
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
