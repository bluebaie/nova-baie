export const metadata = {
  title: 'Réalisations — Sites web tourisme créés par Nova Baie',
  description: 'Découvrez les sites web réalisés par Nova Baie : Gîtes en Baie (Baie de Somme, 7 hébergements, 4.9/5) et Le Refuge de la Marmotte (Sainte-Foy-Tarentaise, ski). Sites premium, performants, optimisés conversion.',
  keywords: ['réalisations site web tourisme', 'exemple site web gîte', 'site web hébergement Baie de Somme', 'site web location ski', 'portfolio agence web tourisme'],
  openGraph: {
    title: 'Réalisations Nova Baie — Sites web tourisme premium',
    description: "Gîtes en Baie et Le Refuge de la Marmotte : deux réalisations Nova Baie, deux univers, le même niveau d'exigence.",
    url: 'https://www.nova-baie.com/realisations'
  },
  alternates: { canonical: 'https://www.nova-baie.com/realisations' }
}

import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/shared/project-card";
import { projects } from "@/lib/site-data";

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Des projets sobres, cohérents et pensés pour durer"
        description="Cette page est conçue pour accueillir vos réalisations actuelles et futures avec une structure premium simple à réutiliser."
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}