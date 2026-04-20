import { Container } from "./container";
import { Button } from "./button";
import { Badge } from "./badge";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="section-padding pt-32">
      <Container>
        <div className="rounded-[2rem] border border-nova-navy/10 bg-white px-8 py-14 shadow-soft md:px-14 md:py-20">
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-6 max-w-4xl text-balance">{title}</h1>
          <p className="mt-6 max-w-3xl">{description}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">Parler de votre projet</Button>
            <Button href="/services" variant="secondary">
              Voir les offres
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}