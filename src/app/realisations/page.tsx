export const metadata = {
  title: 'Réalisations — Sites web tourisme réalisés',
  description: 'Découvrez les sites web réalisés par Nova Baie pour des professionnels du tourisme : gîtes en Baie de Somme, hébergements ski, conciergeries.',
  alternates: { canonical: 'https://www.nova-baie.com/realisations' },
  openGraph: {
    title: 'Réalisations — Nova Baie',
    description: 'Sites web premium réalisés pour des professionnels du tourisme.',
    url: 'https://www.nova-baie.com/realisations',
  },
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