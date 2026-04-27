import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos offres — Création de site web tourisme',
  description: "3 niveaux d'accompagnement pour créer votre site web tourisme : Présence, Conversion, Acquisition. Un format adapté à chaque structure, de la conciergerie au gîte.",
  alternates: { canonical: 'https://www.nova-baie.com/services' },
  openGraph: {
    title: 'Nos offres — Nova Baie',
    description: "3 niveaux d'accompagnement pour créer votre site web tourisme. Devis gratuit sous 24h.",
    url: 'https://www.nova-baie.com/services',
  },
}

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";

const serviceOffers = [
  {
    name: "Présence",
    forWho: "Gîtes, locations saisonnières, petites structures",
    change: "Une image professionnelle pour inspirer confiance et recevoir des demandes.",
    featured: false,
  },
  {
    name: "Conversion",
    forWho: "Conciergeries, hébergements premium, hôtels indépendants",
    change: "Un site structuré pour convaincre et générer davantage de prospects.",
    featured: true,
  },
  {
    name: "Acquisition",
    forWho: "Multi-logements, conciergeries en développement",
    change: "Un outil business complet pour attirer du trafic et convertir.",
    featured: false,
  },
];

const differentiators = [
  "Connaissance terrain réelle du tourisme",
  "Un seul niveau de rendu : premium",
  "Un process cadré, sans surprise",
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-nova-navy pb-12 pt-32 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,123,198,0.2),transparent_50%)]" />

        <Container>
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-xs uppercase tracking-widest text-white/70">
              Services
            </span>
            <h1 className="mt-5 text-white">Un accompagnement adapté à votre projet</h1>
            <p className="mt-5 leading-8 text-white/75">
              Nova Baie propose 3 niveaux selon vos objectifs et votre type de structure.
              On définit ensemble le format le plus pertinent.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Offres ── */}
      <section className="bg-white py-12 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {serviceOffers.map((offer) => (
              <article
                key={offer.name}
                className={[
                  "group relative flex flex-col rounded-[2rem] border p-7 transition-all duration-300",
                  offer.featured
                    ? "border-transparent bg-gradient-to-br from-nova-navy via-[#1E4B8F] to-nova-blue text-white shadow-[0_30px_80px_rgba(46,123,198,0.35),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                    : "border-nova-navy/10 bg-white shadow-[0_8px_24px_rgba(22,58,112,0.04)] hover:-translate-y-1 hover:border-nova-blue/30 hover:shadow-[0_20px_60px_rgba(22,58,112,0.14)]",
                ].join(" ")}
              >
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
                    className={`mt-5 text-xs font-medium ${
                      offer.featured ? "text-white/55" : "text-nova-text/55"
                    }`}
                  >
                    Pour qui
                  </p>
                  <p
                    className={`mt-1 text-sm leading-7 ${
                      offer.featured ? "text-white/90" : "text-nova-text"
                    }`}
                  >
                    {offer.forWho}
                  </p>

                  <p
                    className={`mt-5 text-xs font-medium ${
                      offer.featured ? "text-white/55" : "text-nova-text/55"
                    }`}
                  >
                    Ce que ça change
                  </p>
                  <p
                    className={`mt-1 flex-1 text-sm font-medium leading-7 ${
                      offer.featured ? "text-white" : "text-nova-navy"
                    }`}
                  >
                    {offer.change}
                  </p>

                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className={[
                        "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-300",
                        offer.featured
                          ? "bg-white text-nova-navy shadow-sm hover:bg-white/92"
                          : "bg-nova-navy text-white hover:opacity-90",
                      ].join(" ")}
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Différenciation ── */}
      <section className="bg-nova-sand py-12 md:py-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex rounded-full bg-nova-horizon px-4 py-1.5 text-xs uppercase tracking-widest text-nova-navy">
                Notre approche
              </span>
              <h2 className="mt-5 text-nova-navy">Ce qui nous différencie vraiment</h2>
              <p className="mt-4 text-sm leading-8 text-nova-text">
                Nova Baie est né du terrain — pas d&apos;un bureau d&apos;agence généraliste.
              </p>
            </div>

            <ul className="space-y-5">
              {differentiators.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-nova-blue" />
                  <span className="text-sm leading-7 text-nova-navy">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-nova-navy py-12 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Vous avez un projet&nbsp;? On en parle.</h2>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium text-nova-navy transition-all duration-200 hover:bg-white/90"
              >
                Demander un devis
              </Link>
            </div>
            <p className="mt-5 text-xs text-white/50">
              Réponse sous 24h · Devis gratuit · Sans engagement
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
