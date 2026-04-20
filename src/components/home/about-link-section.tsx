import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function AboutLinkSection() {
  return (
    <section className="section-padding bg-nova-horizon">
      <Container>
        <div className="grid gap-8 rounded-[2rem] bg-white px-8 py-12 shadow-soft md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-16">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-nova-text">
              Lien avec Blue Baie
            </p>
            <h2 className="mt-5 max-w-3xl text-balance">
              Une branche premium née d’une connaissance réelle du terrain
            </h2>
          </div>

          <div>
            <p>
              Nova Baie s’inscrit dans l’écosystème Blue Baie. Cette proximité apporte
              une compréhension concrète des attentes des propriétaires, des voyageurs,
              des conciergeries et des hébergeurs.
            </p>
            <p className="mt-4">
              Le résultat : des sites plus crédibles, plus utiles et plus ancrés dans la
              réalité commerciale du secteur.
            </p>
            <div className="mt-8">
              <Button href="/a-propos" variant="secondary">
                Découvrir Nova Baie
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
