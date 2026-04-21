import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { reasons } from "@/lib/site-data";

const stats = [
  { value: "1 040", label: "voyageurs accueillis en été 2025" },
  { value: "716", label: "voyageurs accueillis en été 2024" },
  { value: "10 ans", label: "d'expérience en location saisonnière" },
];

export function ReasonsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-white via-nova-sand to-nova-horizon/30">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-16">

          {/* Colonne gauche */}
          <div>
            <SectionHeading
              eyebrow="Pourquoi Nova Baie"
              title="Une approche plus pertinente qu'une agence généraliste"
              description="Nova Baie ne part pas d'une logique purement technique. Le site est pensé comme un outil d'image, de clarté et de conversion."
            />

            <div className="mt-10 border-t border-nova-navy/8">
              {stats.map((stat) => (
                <div key={stat.value} className="border-b border-nova-navy/8 py-5">
                  <span className="text-3xl font-semibold text-nova-navy">
                    {stat.value}
                  </span>
                  <p className="mt-1 text-sm leading-6 text-nova-text">
                    {stat.label}
                  </p>
                </div>
              ))}
              <p className="mt-4 text-xs italic text-nova-text/50">
                Données Blue Baie Conciergerie — saisons estivales 2024 et 2025
              </p>
            </div>
          </div>

          {/* Colonne droite — grille 2×2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              const num = String(index + 1).padStart(2, "0");
              return (
                <Reveal key={reason.title} delay={index * 100}>
                  <div className="rounded-[1.5rem] border border-nova-navy/8 bg-white p-7">
                    <span className="font-mono text-xs tracking-widest text-nova-blue/40">
                      {num}
                    </span>
                    <div className="mt-2 inline-flex rounded-xl bg-gradient-to-br from-nova-horizon to-nova-blue/10 p-3 text-nova-navy">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg">{reason.title}</h3>
                    <p className="mt-3 text-sm leading-7">{reason.description}</p>
                    <div className="mt-5 h-[2px] w-8 rounded-full bg-nova-blue/30" />
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
