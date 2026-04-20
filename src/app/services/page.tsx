import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { OfferCard } from "@/components/shared/offer-card";
import { offers, options } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Des offres claires, conçues pour des besoins réels"
        description="Nova Baie propose trois niveaux d’accompagnement pour cadrer les attentes, structurer le projet et construire un site à la bonne échelle."
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard key={offer.name} offer={offer} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="card-premium p-8">
              <h2>Options & évolutions</h2>
              <p className="mt-4">
                Le site peut évoluer selon vos objectifs commerciaux, votre contenu et
                votre rythme de développement.
              </p>

              <ul className="mt-6 space-y-3">
                {options.map((option) => (
                  <li key={option} className="text-base text-nova-text">
                    — {option}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-premium p-8">
              <h2>Un process simple et rassurant</h2>
              <p className="mt-4">
                Chaque projet suit une logique claire : cadrage, direction visuelle,
                développement, validation puis mise en ligne.
              </p>
              <p className="mt-4">
                L’objectif est de garder un projet fluide, propre et lisible, sans
                complexité inutile.
              </p>
              <div className="mt-8">
                <Button href="/contact">Discuter du bon format</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}