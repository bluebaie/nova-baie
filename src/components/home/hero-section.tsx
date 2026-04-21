import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroShowcase } from "./hero-showcase";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-32">
      {/* IMAGE BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-nova-baie.jpg"
          alt="Sites web premium pour professionnels du tourisme - Nova Baie"
          fill
          priority
          sizes="100vw"
          className="object-cover"
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
            <p className="animate-fade-up text-sm uppercase tracking-[0.22em] text-white/65">
              Nova Baie
            </p>

            <h1 className="mt-6 max-w-4xl animate-fade-up [animation-delay:150ms] leading-[1.02] text-white">
              Des sites web premium <br />
              pour les professionnels du tourisme
            </h1>

            <p className="mt-8 max-w-2xl animate-fade-up [animation-delay:300ms] text-lg leading-9 text-white/82">
              Nova Baie conçoit des sites web premium pour les conciergeries, hébergements touristiques,
              locations saisonnières et acteurs de l’hospitalité — de la Baie de Somme à toute la France —
              qui veulent mieux valoriser leur image et convertir davantage.
            </p>

            <div className="mt-10 flex flex-col gap-3 animate-fade-up [animation-delay:450ms] sm:flex-row sm:flex-wrap sm:gap-4">
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

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  );
}