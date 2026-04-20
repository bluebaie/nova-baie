import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroShowcase } from "./hero-showcase";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-32">
      {/* IMAGE BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-nova-baie.jpg"
          alt="Baie"
          className="h-full w-full object-cover"
        />

        {/* Overlay général */}
        <div className="absolute inset-0 bg-nova-navy/52" />

        {/* Dégradé pour renforcer la lisibilité côté texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-nova-navy/70 via-nova-navy/35 to-nova-navy/20" />

        {/* Halo léger côté droite */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(220,231,247,0.14),transparent_28%)]" />
      </div>

      <Container>
        <div className="relative z-10 grid min-h-[76vh] items-center gap-14 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* Colonne gauche */}
          <div className="max-w-3xl text-white">
            <p className="text-sm uppercase tracking-[0.22em] text-white/65">
              Nova Baie
            </p>

            <h1 className="mt-6 max-w-4xl leading-[1.02] text-white">
              Des sites web premium <br />
              pour les professionnels du tourisme
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-white/82">
              Nova Baie conçoit des sites élégants, clairs et performants pour les
              conciergeries, hébergements et acteurs de l’hospitalité qui veulent
              mieux valoriser leur image et convertir davantage.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Parler de votre projet</Button>
              <Button href="/services" variant="secondary">
                Voir les offres
              </Button>
            </div>

            
          </div>

          {/* Colonne droite */}
          <div className="relative">
            <HeroShowcase />
          </div>
        </div>
      </Container>
    </section>
  );
}