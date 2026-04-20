import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { reasons } from "@/lib/site-data";

export function ReasonsSection() {
  return (
    <section className="section-padding">
      <Container>
        <SectionHeading
          eyebrow="Pourquoi Nova Baie"
          title="Une approche plus pertinente qu’une agence généraliste"
          description="Nova Baie ne part pas d’une logique purement technique. Le site est pensé comme un outil d’image, de clarté et de conversion."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="card-premium p-8">
                <div className="mb-5 inline-flex rounded-2xl bg-nova-horizon p-3 text-nova-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <h3>{reason.title}</h3>
                <p className="mt-4">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}