import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="section-padding">
      <Container>
        <div className="rounded-[2rem] bg-nova-navy px-8 py-14 text-white md:px-14 md:py-20">
          <p className="text-sm uppercase tracking-[0.16em] text-white/70">
            Contact
          </p>
          <h2 className="mt-5 max-w-3xl text-white">
            Construisons un site plus juste, plus premium et plus efficace
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Que vous lanciez une activité, que vous souhaitiez monter en gamme ou
            refondre une présence existante, Nova Baie peut vous aider à transformer
            votre image en ligne.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" variant="secondary" className="border-white text-white hover:border-white hover:text-white">
              Demander un projet
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}