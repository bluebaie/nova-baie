import { CheckCircle, Star, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const cards = [
  {
    icon: CheckCircle,
    title: "Connaissance terrain réelle",
    text: "Propriétaires, voyageurs, plateformes : plus de 10 ans de pratique directe de la location saisonnière en Baie de Somme.",
  },
  {
    icon: Star,
    title: "Exigence qualité sur chaque projet",
    text: "Un seul niveau de rendu : premium. Pas de template, pas de compromis sur l'image.",
  },
  {
    icon: TrendingUp,
    title: "Des sites pensés pour convertir",
    text: "Chaque décision de design sert un objectif commercial clair.",
  },
];

export function AboutLinkSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-nova-navy">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(46,123,198,0.2),transparent_60%)]" />

      <Container>
        <Reveal>
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">

            {/* Colonne gauche */}
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/80">
                Blue Baie Conciergerie
              </span>

              <h2 className="mt-5 text-white">
                10 ans de location saisonnière, une exigence premium
              </h2>

              <p className="mt-4 leading-8 text-white/75">
                Derrière Nova Baie, il y a 10 ans de pratique directe de la location
                saisonnière — des propriétés gérées, des voyageurs accueillis, des
                plateformes maîtrisées. Blue Baie Conciergerie a été créée en 2023 pour
                structurer cette activité. Nova Baie en est la branche digitale.
              </p>

              <p className="mt-4 leading-8 text-white/75">
                Cette expérience du terrain n&apos;est pas un argument marketing. C&apos;est
                ce qui nous permet de construire des sites qui parlent juste : aux voyageurs
                comme aux propriétaires, avec une compréhension réelle des enjeux de
                visibilité, de confiance et de réservation.
              </p>

              <div className="mt-8">
                <a
                  href="https://bluebaie.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-nova-navy transition-all duration-200 hover:bg-white/90"
                >
                  Découvrir Nova Baie
                </a>
              </div>
            </div>

            {/* Colonne droite — cards de réassurance */}
            <div className="flex flex-col gap-4">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm"
                  >
                    <Icon className="h-5 w-5 text-white/70" />
                    <h3 className="mt-3 text-base font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-white/65">{card.text}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </Reveal>
      </Container>
    </section>
  );
}
