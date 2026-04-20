import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { aboutValues } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Nova Baie, la branche digitale premium de Blue Baie"
        description="Nova Baie est née d’un constat simple : dans le tourisme, beaucoup d’acteurs ont une vraie qualité de service mais une présence en ligne qui ne reflète pas leur niveau réel."
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr]">
            <div className="card-premium p-8 md:p-10">
              <h2>Une mission claire</h2>
              <p className="mt-5">
                Corriger l’écart entre la qualité réelle d’une offre touristique et sa
                présentation en ligne, avec des sites plus élégants, plus clairs et
                mieux structurés.
              </p>
              <p className="mt-5">
                Nova Baie ne vend pas simplement un site. La marque construit un
                support commercial durable au service de l’image, de la crédibilité et
                de la conversion.
              </p>
            </div>

            <div className="card-premium p-8 md:p-10">
              <h2>ADN de marque</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {aboutValues.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-nova-navy/10 bg-nova-horizon px-4 py-2 text-sm font-medium text-nova-navy"
                  >
                    {value}
                  </span>
                ))}
              </div>
              <p className="mt-6">
                Le ton recherché reste premium, calme, fiable, structuré et humain.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}