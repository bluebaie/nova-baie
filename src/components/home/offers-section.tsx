import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const offers = [
  {
    name: "Présence",
    price: "À partir de 800 €",
    shortLabel: "Visibilité & crédibilité",
    benefit:
      "Pour exister avec une image qui inspire confiance dès la première visite.",
    description:
      "Une base professionnelle pour présenter votre activité, inspirer confiance et permettre une première prise de contact.",
    idealFor: "Gîtes, locations saisonnières, propriétaires indépendants",
    features: [
      "Page d’accueil premium",
      "2 à 3 pages essentielles",
      "Design sur mesure",
      "Responsive mobile",
      "Formulaire de contact",
    ],
    cta: "Démarrer simplement",
    featured: false,
    mobileOrder: "order-2",
  },
  {
    name: "Conversion",
    price: "À partir de 1 500 €",
    shortLabel: "L’offre la plus choisie",
    benefit:
      "Pour transformer votre site en outil commercial qui génère de vraies demandes.",
    description:
      "Un site structuré pour rassurer, clarifier votre offre et transformer davantage de visiteurs en prospects.",
    idealFor: "Conciergeries, hébergements premium, hôtels indépendants",
    features: [
      "UX structurée",
      "4 à 6 pages",
      "Design premium complet",
      "Optimisation conversion",
      "SEO local + structure",
    ],
    cta: "Créer mon site",
    featured: true,
    badge: "Le plus choisi",
    note: "Le meilleur choix pour la majorité des projets.",
    mobileOrder: "order-1",
  },
  {
    name: "Acquisition",
    price: "À partir de 3 000 €",
    shortLabel: "Croissance & trafic",
    benefit:
      "Pour faire de votre site un levier de croissance et de visibilité long terme.",
    description:
      "Un site pensé comme un outil business plus ambitieux, avec une logique de trafic, de référencement et de développement.",
    idealFor: "Structures multi-logements, conciergeries en développement",
    features: [
      "UX complète + stratégie",
      "Structure avancée",
      "Pages SEO stratégiques",
      "Optimisation conversion poussée",
      "Conseils stratégie digitale",
    ],
    cta: "Parler de mon projet",
    featured: false,
    mobileOrder: "order-3",
  },
];

const comparisonRows = [
  {
    label: "Objectif",
    values: [
      "Exister proprement",
      "Mieux convertir",
      "Attirer + convertir",
    ],
  },
  {
    label: "Pages",
    values: ["2 à 3 pages", "4 à 6 pages", "Structure avancée"],
  },
  {
    label: "Design",
    values: ["Design simple premium", "Design premium complet", "Design sur mesure avancé"],
  },
  {
    label: "UX",
    values: ["Basique", "Structurée", "Stratégique complète"],
  },
  {
    label: "SEO",
    values: ["SEO local de base", "SEO optimisé", "SEO stratégique avancé"],
  },
  {
    label: "Conversion",
    values: ["—", "Optimisation conversion", "Optimisation avancée"],
  },
  {
    label: "Acquisition",
    values: ["—", "—", "Stratégie acquisition + contenu"],
  },
];

export function OffersSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(46,123,198,0.06),transparent_30%)]" />

      <Container>
        <div className="max-w-4xl">
          <SectionHeading
            eyebrow="Offres"
            title="Un site adapté à votre niveau d’ambition"
            description="3 niveaux d’accompagnement selon vos objectifs : être visible, mieux convertir ou développer votre activité."
          />
        </div>

        <div className="mt-6 max-w-3xl">
          <p className="text-sm leading-7 text-nova-text">
            Pensé pour les structures qui veulent un site crédible, élégant et réellement utile commercialement.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.name}
              className={[
                offer.mobileOrder,
                "lg:order-none",
                "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 sm:p-7 transition-all duration-300",
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

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={`text-[11px] uppercase tracking-[0.22em] ${
                        offer.featured ? "text-white/80" : "text-nova-text/60"
                      }`}
                    >
                      {offer.name}
                    </p>

                    <p
                      className={`mt-3 text-sm ${
                        offer.featured ? "text-white/85" : "text-nova-text"
                      }`}
                    >
                      {offer.shortLabel}
                    </p>
                  </div>

                  {offer.featured && (
                    <div className="relative inline-flex overflow-hidden rounded-full border border-white/20 bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent [animation:shimmer_2.5s_ease-in-out_infinite]" />
                      {offer.badge}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3
                    className={`text-3xl font-semibold leading-tight ${
                      offer.featured ? "text-white" : "text-nova-navy"
                    }`}
                  >
                    {offer.price}
                  </h3>
                </div>

                <p
                  className={`mt-5 text-base font-medium leading-8 ${
                    offer.featured ? "text-white" : "text-nova-navy"
                  }`}
                >
                  {offer.benefit}
                </p>

                <p
                  className={`mt-4 text-sm leading-7 ${
                    offer.featured ? "text-white/90" : "text-nova-text"
                  }`}
                >
                  {offer.description}
                </p>

                <div
                  className={`mt-6 rounded-[1.5rem] border p-5 ${
                    offer.featured
                      ? "border-white/18 bg-white/10"
                      : "border-nova-navy/8 bg-nova-sand/55"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      offer.featured ? "text-white/80" : "text-nova-text/80"
                    }`}
                  >
                    Idéal pour
                  </p>

                  <p
                    className={`mt-2 text-sm leading-7 ${
                      offer.featured ? "text-white" : "text-nova-navy"
                    }`}
                  >
                    {offer.idealFor}
                  </p>
                </div>

                <ul className="mt-7 space-y-3">
                  {offer.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 text-sm leading-7 ${
                        offer.featured ? "text-white" : "text-nova-text"
                      }`}
                    >
                      <span
                        className={`mt-[11px] inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                          offer.featured ? "bg-white" : "bg-nova-blue"
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <a
                    href="/contact"
                    className={[
                      "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-300",
                      offer.featured
                        ? "bg-white text-nova-navy shadow-sm hover:bg-white/92"
                        : "bg-nova-navy text-white hover:opacity-90",
                    ].join(" ")}
                  >
                    {offer.cta}
                  </a>

                  {offer.featured && (
                    <p className="mt-3 text-center text-xs text-white/75">
                      {offer.note}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-nova-navy">
              Comparer les niveaux d’accompagnement
            </h3>
            <p className="hidden text-sm text-nova-text md:block">
              En un coup d’œil
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-nova-navy/10 bg-white shadow-[0_8px_24px_rgba(22,58,112,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-nova-sand/70">
                  <tr>
                    <th className="p-4 text-left font-medium text-nova-text">
                      Fonctionnalités
                    </th>
                    <th className="p-4 text-center font-medium text-nova-navy">
                      Présence
                    </th>
                    <th className="rounded-t-lg border-t-2 border-nova-blue bg-nova-horizon/55 p-4 text-center font-semibold text-nova-navy">
                      Conversion
                    </th>
                    <th className="p-4 text-center font-medium text-nova-navy">
                      Acquisition
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, rowIndex) => (
                    <tr
                      key={row.label}
                      className={`border-t border-nova-navy/8 transition-colors duration-200 hover:bg-nova-horizon/25 ${
                        rowIndex % 2 === 0 ? "bg-white" : "bg-nova-sand/20"
                      }`}
                    >
                      <td className="p-4 font-medium text-nova-navy">
                        {row.label}
                      </td>

                      <td className="p-4 text-center text-nova-text">
                        {row.values[0]}
                      </td>

                      <td className="bg-nova-horizon/35 p-4 text-center font-medium text-nova-navy">
                        {row.values[1]}
                      </td>

                      <td className="p-4 text-center text-nova-text">
                        {row.values[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}