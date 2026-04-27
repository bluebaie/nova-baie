import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const offers = [
  {
    name: "Présence",
    intention:
      "Pour exister avec une image professionnelle et inspirer confiance dès la première visite.",
    featured: false,
  },
  {
    name: "Conversion",
    intention:
      "Pour transformer votre site en outil commercial qui génère de vraies demandes.",
    featured: true,
  },
  {
    name: "Acquisition",
    intention:
      "Pour faire de votre site un levier de croissance et d'acquisition long terme.",
    featured: false,
  },
];

export function OffersSection() {
  return (
    <section className="relative overflow-hidden bg-nova-horizon py-12 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(46,123,198,0.06),transparent_30%)]" />

      <Container>
        <div className="max-w-4xl">
          <SectionHeading
            eyebrow="Offres"
            title="Un site adapté à votre niveau d'ambition"
            description="3 niveaux d'accompagnement selon vos objectifs : être visible, mieux convertir ou développer votre activité."
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.name}
              className={[
                "group relative flex flex-col rounded-[2rem] border p-7 transition-all duration-300",
                offer.featured
                  ? "border-transparent bg-gradient-to-br from-nova-navy via-[#1E4B8F] to-nova-blue text-white shadow-[0_30px_80px_rgba(46,123,198,0.35),inset_0_0_0_1px_rgba(255,255,255,0.1)] lg:-translate-y-2 lg:scale-[1.02]"
                  : "border-nova-navy/10 bg-white text-nova-navy shadow-[0_8px_24px_rgba(22,58,112,0.04)] hover:-translate-y-1 hover:border-nova-blue/30 hover:shadow-[0_20px_60px_rgba(22,58,112,0.14)]",
              ].join(" ")}
            >
              {!offer.featured && (
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nova-blue/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              )}

              {offer.featured && (
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.15),transparent_60%)]" />
              )}

              <div className="relative z-10 flex flex-1 flex-col">
                <p
                  className={`text-[11px] uppercase tracking-[0.22em] ${
                    offer.featured ? "text-white/70" : "text-nova-text/60"
                  }`}
                >
                  {offer.name}
                </p>

                <p
                  className={`mt-6 flex-1 text-base font-medium leading-8 ${
                    offer.featured ? "text-white" : "text-nova-navy"
                  }`}
                >
                  {offer.intention}
                </p>

                <div className="mt-8">
                  <a
                    href="/contact"
                    className={[
                      "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-300",
                      offer.featured
                        ? "bg-white text-nova-navy shadow-sm hover:bg-white/92"
                        : "bg-nova-navy text-white hover:opacity-90",
                    ].join(" ")}
                  >
                    Demander un devis
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
