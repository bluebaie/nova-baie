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
