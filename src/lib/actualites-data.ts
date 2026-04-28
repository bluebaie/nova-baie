export type Actualite = {
  id: number
  date: string
  categorie: 'Réalisation' | 'Lancement' | 'Coulisse' | 'Conseil'
  titre: string
  resume: string
  contenuComplet: string
  lien?: string
  labelLien?: string
  plateformes?: string[]
}

export const actualites: Actualite[] = [
  {
    id: 2,
    date: "28 avril 2026",
    categorie: "Lancement",
    titre: "À venir",
    resume: "À venir",
    contenuComplet: "À venir",
  },
  {
    id: 1,
    date: "28 avril 2026",
    categorie: "Réalisation",
    titre: "À venir",
    resume: "À venir",
    contenuComplet: "À venir",
  },
]
