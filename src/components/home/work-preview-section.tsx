import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/lib/site-data";
import { ProjectCard } from "@/components/shared/project-card";
import { Button } from "@/components/ui/button";

export function WorkPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          eyebrow="Réalisations"
          title="Des réalisations conçues pour valoriser une image, pas seulement remplir des pages"
          description="Le site doit inspirer confiance dès les premières secondes. Chaque projet Nova Baie est pensé pour mettre en valeur une identité, une offre et un niveau de service."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-10">
          <Button href="/realisations" variant="secondary">
            Voir les réalisations
          </Button>
        </div>
      </Container>
    </section>
  );
}