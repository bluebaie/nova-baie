import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { targets } from "@/lib/site-data";

export function TargetSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-nova-sand">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,123,198,0.08),transparent_30%)]" />

      <Container>
        <div className="relative z-10 max-w-4xl">
          <SectionHeading
            eyebrow="Cibles"
            title="Des sites pensés pour les professionnels du tourisme qui veulent plus de visibilité"
            description="Nova Baie s’adresse aux acteurs du tourisme qui ne veulent pas seulement un site élégant, mais un outil capable d’améliorer leur image, leur référencement et leur capacité à générer des réservations."
          />
        </div>

        <div className="relative z-10 mt-12 grid gap-6 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {targets.map((target) => (
            <article
              key={target}
              className="group relative overflow-hidden rounded-[1.75rem] border border-nova-navy/8 bg-nova-horizon/40 p-7 shadow-[0_10px_30px_rgba(22,58,112,0.05)] transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-nova-blue/30 hover:shadow-[0_25px_70px_rgba(22,58,112,0.15)]"
            >
              <span className="absolute left-0 top-0 h-full w-[3px] bg-transparent transition-all duration-300 group-hover:bg-nova-blue" />

              <span className="absolute inset-0 bg-nova-horizon/0 transition-all duration-300 group-hover:bg-nova-horizon/30" />

              <span className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(46,123,198,0.15),transparent_60%)]" />

              <div className="relative z-10 flex min-h-[110px] items-center">
                <h3 className="text-lg font-semibold leading-7 text-nova-navy sm:text-[1.35rem]">
                  {target}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}