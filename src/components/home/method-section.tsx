import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { processSteps } from "@/lib/site-data";

export function MethodSection() {
  return (
    <section className="section-padding bg-white">
      <Container>

        {/* Heading + note */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Méthode"
            title="Une méthode simple, claire et bien cadrée"
            description="Le projet avance avec une logique lisible, structurée et rassurante du premier échange à la mise en ligne."
          />
          <p className="shrink-0 text-sm italic text-nova-text lg:mb-1 lg:max-w-[260px] lg:text-right">
            De la première discussion à la mise en ligne : 3 à 6 semaines selon le projet.
          </p>
        </div>

        {/* Cards */}
        <div className="relative mt-12">
          {/* Connecteur desktop */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[52px] hidden h-px bg-gradient-to-r from-transparent via-nova-blue/20 to-transparent xl:block" />

          {/* Wrapper : scroll horizontal mobile, grille desktop */}
          <div className="-mx-4 overflow-x-auto snap-x snap-mandatory pb-4 sm:-mx-6 md:mx-0 md:overflow-visible md:pb-0">
            <div className="flex w-max gap-4 px-4 sm:px-6 md:w-full md:grid md:grid-cols-2 md:px-0 xl:grid-cols-5">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const num = String(index + 1).padStart(2, "0");
                return (
                  <Reveal
                    key={step.title}
                    delay={index * 80}
                    className="w-[260px] flex-none snap-center md:w-auto"
                  >
                    <div className="relative h-full rounded-[1.5rem] border border-nova-navy/6 bg-nova-sand p-6">
                      {/* Barre de progression */}
                      <div className="mb-6 h-[3px] w-full rounded-full bg-nova-horizon" />

                      {/* Numéro */}
                      <span className="absolute right-5 top-4 font-mono text-[11px] tracking-widest text-nova-navy/15">
                        {num}
                      </span>

                      {/* Icône */}
                      <div className="inline-flex rounded-xl bg-white p-2.5 text-nova-navy shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-3 text-base font-semibold text-nova-navy">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-nova-text">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Indicateur scroll mobile */}
          <p className="mt-3 text-center text-xs text-nova-text/40 md:hidden">
            ← Faites défiler →
          </p>
        </div>

      </Container>
    </section>
  );
}
