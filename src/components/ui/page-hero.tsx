import Link from "next/link";
import { Container } from "./container";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden bg-nova-navy pb-16 pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,123,198,0.15),transparent_50%)]" />

      <Container>
        <div className="relative z-10 max-w-4xl">
          <span className="inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-xs uppercase tracking-widest text-white/70">
            {eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl text-balance text-white">{title}</h1>
          <p className="mt-6 max-w-3xl leading-8 text-white/75">{description}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-nova-navy transition-all duration-200 hover:bg-white/90"
            >
              Parler de votre projet
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:border-white hover:text-white"
            >
              Voir les offres
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
