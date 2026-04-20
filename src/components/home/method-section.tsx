import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/site-data";

export function MethodSection() {
  return (
    <section className="section-padding">
      <Container>
        <SectionHeading
          eyebrow="Méthode"
          title="Une méthode simple, claire et bien cadrée"
          description="Le projet avance avec une logique lisible, structurée et rassurante du premier échange à la mise en ligne."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="card-premium p-6">
                <div className="text-sm uppercase tracking-[0.16em] text-nova-text">
                  Étape {index + 1}
                </div>
                <div className="mt-5 inline-flex rounded-2xl bg-nova-horizon p-3 text-nova-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-7">{step.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
