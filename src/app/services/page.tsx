import { Fragment } from "react";

export const metadata = {
  title: 'Services & Offres — Création de site web tourisme',
  description: '3 offres de création de site web pour professionnels du tourisme : Présence (800€), Conversion (1500€), Acquisition (3000€). Sites premium pour hébergements, conciergeries et gîtes. Devis gratuit.',
  keywords: ['création site web hébergement', 'site web conciergerie prix', 'tarif site web tourisme', 'offre site web gîte', 'site web location vacances prix'],
  openGraph: {
    title: 'Services Nova Baie — 3 offres de sites web pour le tourisme',
    description: 'Présence, Conversion, Acquisition : 3 niveaux de création de site adaptés à chaque structure touristique. Devis gratuit, réponse sous 24h.',
    url: 'https://www.nova-baie.com/services'
  },
  alternates: { canonical: 'https://www.nova-baie.com/services' }
}
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { OffersSection } from "@/components/home/offers-section";
import { options } from "@/lib/site-data";

const pricingPills = [
  { price: "800 €", label: "Présence — Pour démarrer" },
  { price: "1 500 €", label: "Conversion — L'offre cœur" },
  { price: "3 000 €", label: "Acquisition — Pour croître" },
];

const differentiators = [
  "On connaît le secteur de l'intérieur — pas depuis un bureau d'agence généraliste.",
  "Chaque projet est cadré avant d'être développé. Pas de surprise, pas de dérive.",
  "Un seul niveau de rendu : premium. Pas de template réutilisé.",
];

const maintenancePlans = [
  {
    name: "Essentielle",
    price: "29 €/mois",
    subtitle: "Pour rester à jour en toute tranquillité",
    featured: false,
    features: [
      "Mises à jour techniques mensuelles",
      "Sauvegardes automatiques",
      "1 modification simple par mois",
      "Surveillance disponibilité site",
    ],
  },
  {
    name: "Confort",
    price: "59 €/mois",
    subtitle: "Pour un site qui évolue avec vous",
    featured: true,
    badge: "Le plus souscrit",
    features: [
      "Tout Essentielle inclus",
      "Jusqu'à 3 modifications/mois",
      "Ajout de photos ou textes",
      "Priorité de réponse sous 48h",
      "Rapport trimestriel de performance",
    ],
  },
  {
    name: "Active",
    price: "99 €/mois",
    subtitle: "Pour les structures en développement actif",
    featured: false,
    features: [
      "Tout Confort inclus",
      "Modifications légères illimitées",
      "Suivi SEO mensuel",
      "Priorité de réponse sous 24h",
      "1 conseil stratégique/trimestre",
    ],
  },
];

const paymentSteps = [
  { pct: "40%", label: "À la signature", note: "Avant tout démarrage" },
  { pct: "40%", label: "Validation maquette", note: "Avant le développement" },
  { pct: "20%", label: "Mise en ligne", note: "Livraison finale" },
];

const faqs = [
  {
    q: "Que se passe-t-il si je ne suis pas satisfait du résultat ?",
    a: "La direction créative est validée par vous avant tout développement. Vous voyez l'architecture, le design et le ton avant qu'on code. C'est à cette étape qu'on ajuste — pas après.",
  },
  {
    q: "Combien de temps prend la création du site ?",
    a: "Entre 3 et 6 semaines selon le niveau d'offre et la disponibilité des contenus (textes, photos). Le cadrage initial permet de définir un calendrier précis dès le départ.",
  },
  {
    q: "Est-ce que je garde le contrôle de mon site ?",
    a: "Oui. À la livraison finale, tous les accès vous sont transmis : hébergement, nom de domaine, CMS si applicable. Le site vous appartient entièrement.",
  },
  {
    q: "Puis-je modifier le site moi-même ensuite ?",
    a: "Selon le projet, oui. On peut intégrer un outil de gestion de contenu simple. Sinon, c'est précisément l'objet des forfaits maintenance — pour que vous n'ayez pas à vous en préoccuper.",
  },
  {
    q: "Est-ce que vous travaillez avec des clients hors Baie de Somme ?",
    a: "Oui. Nova Baie travaille avec tous les professionnels du tourisme en France. Le process est entièrement à distance, avec des échanges structurés et efficaces.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-nova-navy pb-12 pt-32 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,123,198,0.2),transparent_50%)]" />

        <Container>
          <div className="relative z-10 grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-xs uppercase tracking-widest text-white/70">
                Services
              </span>
              <h1 className="mt-5 text-white">Des sites qui travaillent pour vous</h1>
              <p className="mt-5 leading-8 text-white/75">
                Nova Baie propose 3 niveaux d&apos;accompagnement selon vos objectifs.
                Chaque offre est pensée pour un type de structure précis — pas un
                catalogue, une réponse adaptée.
              </p>
              <p className="mt-8 text-xs tracking-wide text-white/40">
                Réponse sous 24h · Devis gratuit · Sans engagement
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {pricingPills.map((pill) => (
                <div
                  key={pill.price}
                  className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.08] px-5 py-4"
                >
                  <span className="shrink-0 font-semibold text-white">{pill.price}</span>
                  <span className="text-sm text-white/60">{pill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Offres ── */}
      <OffersSection />

      {/* ── Maintenance ── */}
      <section className="bg-nova-sand py-12 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Maintenance & suivi"
            title="Votre site reste performant dans le temps"
            description="Un site web n'est pas un livrable figé. Les mises à jour techniques, les évolutions de contenu et le suivi SEO font partie d'un accompagnement sérieux."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {maintenancePlans.map((plan) => (
              <div
                key={plan.name}
                className={[
                  "flex flex-col rounded-[1.5rem] p-7",
                  plan.featured
                    ? "bg-nova-navy text-white shadow-[0_20px_60px_rgba(22,58,112,0.25)]"
                    : "border border-nova-navy/8 bg-white",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`text-xs uppercase tracking-widest ${
                      plan.featured ? "text-white/60" : "text-nova-text"
                    }`}
                  >
                    {plan.name}
                  </span>
                  {plan.featured && plan.badge && (
                    <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-medium text-white">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p
                  className={`mt-3 text-3xl font-semibold ${
                    plan.featured ? "text-white" : "text-nova-navy"
                  }`}
                >
                  {plan.price}
                </p>

                <p
                  className={`mt-3 text-sm leading-7 ${
                    plan.featured ? "text-white/80" : "text-nova-text"
                  }`}
                >
                  {plan.subtitle}
                </p>

                <div
                  className={`my-5 h-px ${
                    plan.featured ? "bg-white/15" : "bg-nova-navy/8"
                  }`}
                />

                <ul className="flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                          plan.featured ? "bg-white" : "bg-nova-blue/30"
                        }`}
                      />
                      <span
                        className={`text-sm leading-7 ${
                          plan.featured ? "text-white/85" : "text-nova-text"
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className={`text-sm font-medium transition-colors ${
                      plan.featured
                        ? "text-white/70 hover:text-white"
                        : "text-nova-blue hover:text-nova-navy"
                    }`}
                  >
                    Inclure dans mon projet →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-nova-text/60">
            Les forfaits maintenance peuvent être souscrits à la livraison du site ou à tout
            moment. Sans engagement minimum de durée.
          </p>
        </Container>
      </section>

      {/* ── Options & différenciation ── */}
      <section className="bg-white py-12 md:py-20">
        <Container>

          {/* Bloc paiement sécurisé */}
          <div className="mb-8 rounded-[1.5rem] border border-nova-navy/8 bg-white p-8">
            <h3 className="text-nova-navy">Un cadre clair, sans mauvaise surprise</h3>
            <p className="mt-3 text-sm leading-7 text-nova-text">
              Chaque projet suit un échéancier de paiement structuré qui vous protège autant
              que nous.
            </p>

            <div className="mt-6 flex items-center">
              {paymentSteps.map((step, i) => (
                <Fragment key={step.label}>
                  <div className="flex-1 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-nova-horizon text-sm font-semibold text-nova-navy">
                      {step.pct}
                    </div>
                    <p className="mt-2 text-xs text-nova-text">{step.label}</p>
                    <p className="mt-1 text-[10px] text-nova-text/60">{step.note}</p>
                  </div>
                  {i < paymentSteps.length - 1 && (
                    <div className="h-px w-8 shrink-0 bg-nova-navy/10" />
                  )}
                </Fragment>
              ))}
            </div>

            <p className="mt-6 text-xs italic text-nova-text/60">
              Le site reste hébergé sur nos serveurs jusqu&apos;au paiement du solde final.
              Les accès sont transmis à la livraison complète.
            </p>
          </div>

          {/* Options + différenciateurs */}
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-nova-navy/8 bg-nova-sand p-8">
              <h3 className="text-nova-navy">Options &amp; évolutions</h3>
              <p className="mt-4 text-sm leading-7 text-nova-text">
                Le site peut évoluer selon vos objectifs commerciaux, votre contenu et votre
                rythme de développement.
              </p>

              <ul className="mt-6 space-y-3">
                {options.map((option) => (
                  <li key={option} className="flex items-center gap-3 text-sm text-nova-text">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-nova-blue/20" />
                    {option}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm italic text-nova-text/60">
                Ces options peuvent être intégrées dès le départ ou ajoutées à tout moment.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-nova-navy p-8 text-white">
              <h3 className="text-white">Ce qui nous différencie vraiment</h3>

              <ul className="mt-6 space-y-5">
                {differentiators.map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-nova-blue" />
                    <span className="text-sm leading-7 text-white/80">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-nova-navy transition-all duration-200 hover:bg-white/90"
                >
                  Discuter de votre projet
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-nova-sand py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center">Questions fréquentes</h2>
            <p className="mt-4 text-center text-nova-text">
              Les points que nos clients nous posent systématiquement avant de démarrer.
            </p>

            <div className="mt-10">
              {faqs.map((item) => (
                <div key={item.q} className="border-b border-nova-navy/8 py-5">
                  <p className="text-base font-semibold text-nova-navy">{item.q}</p>
                  <p className="mt-2 text-sm leading-7 text-nova-text">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
