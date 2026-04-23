export const metadata = {
  title: 'À propos — Nova Baie & Blue Baie Conciergerie',
  description: "Nova Baie est la branche web de Blue Baie Conciergerie, spécialiste de l'hébergement touristique en Baie de Somme depuis 2023. Une agence web née du terrain, pas d'un bureau.",
  keywords: ['Nova Baie agence web', 'Blue Baie Conciergerie', 'agence web tourisme Baie de Somme', 'spécialiste site web hébergement', 'création site web conciergerie'],
  openGraph: {
    title: 'À propos — Nova Baie, branche web de Blue Baie Conciergerie',
    description: "Une agence web née d'une pratique concrète du tourisme et de la location courte durée en Baie de Somme.",
    url: 'https://www.nova-baie.com/a-propos'
  },
  alternates: { canonical: 'https://www.nova-baie.com/a-propos' }
}

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { aboutValues } from "@/lib/site-data";

const timeline = [
  {
    label: "Depuis 2016",
    desc: "Location saisonnière directe en Baie de Somme",
  },
  {
    label: "2023",
    desc: "Création de Blue Baie Conciergerie",
  },
  {
    label: "2026",
    desc: "Lancement de Nova Baie, branche web premium",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Nova Baie, la branche web de Blue Baie Conciergerie"
        description="Née d'une pratique concrète du tourisme et de la location courte durée, Nova Baie construit des sites qui parlent le même langage que vos clients."
      />

      {/* ── Histoire ── */}
      <section className="bg-white py-12 md:py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">

            {/* Card gauche — histoire */}
            <div className="rounded-[1.5rem] border border-nova-navy/8 bg-nova-sand p-8">
              <span className="inline-flex rounded-full bg-nova-horizon px-4 py-1.5 text-xs uppercase tracking-widest text-nova-navy">
                Notre histoire
              </span>
              <h3 className="mt-5 text-nova-navy">
                Une agence née du terrain, pas d&apos;un bureau
              </h3>
              <p className="mt-4 text-sm leading-8 text-nova-text">
                Nova Baie est l&apos;objet digital de Blue Baie Conciergerie — même entreprise,
                même exigence, focalisée sur un enjeu précis : donner aux professionnels du
                tourisme une présence en ligne à la hauteur de leur offre réelle.
              </p>
              <p className="mt-4 text-sm leading-8 text-nova-text">
                Blue Baie Conciergerie est née en 2023 d&apos;une pratique de plus de 7 ans
                de location saisonnière directe en Baie de Somme. Nova Baie a été lancée en
                2026 pour répondre à un besoin concret : donner aux professionnels du tourisme
                une présence digitale à la hauteur de leur offre.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                {timeline.map((point) => (
                  <div key={point.label} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-nova-blue" />
                    <p className="text-sm leading-7 text-nova-text">
                      <span className="font-medium text-nova-navy">{point.label}</span>
                      {" — "}
                      {point.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card droite — Blue Baie partenaire */}
            <div className="rounded-[1.5rem] bg-nova-navy p-8 text-white">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/70">
                Blue Baie Conciergerie
              </span>
              <h3 className="mt-5 text-white">Notre partenaire terrain</h3>

              <div className="flex items-center gap-3 mt-4">
                <Image
                  src="/images/logo-blue-baie.png"
                  alt="Logo Blue Baie Conciergerie"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="text-white font-semibold">Blue Baie Conciergerie</span>
              </div>

              <p className="mt-4 text-sm leading-8 text-white/75">
                Blue Baie Conciergerie gère des hébergements touristiques haut de gamme en
                Baie de Somme : accueil voyageurs, gestion plateformes, entretien et suivi
                propriétaires.
              </p>

              <div className="mt-6">
                <a
                  href="https://bluebaie.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-nova-navy transition-all duration-200 hover:bg-white/90"
                >
                  Découvrir Blue Baie Conciergerie
                </a>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Mission & valeurs ── */}
      <section className="bg-nova-sand py-12 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr]">

            <div className="rounded-[1.5rem] border border-nova-navy/8 bg-white p-8 md:p-10">
              <h2>Une mission claire</h2>
              <p className="mt-5 text-sm leading-8 text-nova-text">
                Corriger l&apos;écart entre la qualité réelle d&apos;une offre touristique et sa
                présentation en ligne, avec des sites plus élégants, plus clairs et
                mieux structurés.
              </p>
              <p className="mt-5 text-sm leading-8 text-nova-text">
                Nova Baie ne vend pas simplement un site. La marque construit un
                support commercial durable au service de l&apos;image, de la crédibilité et
                de la conversion.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-nova-navy/8 bg-white p-8 md:p-10">
              <h2>ADN de marque</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {aboutValues.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-nova-navy/10 bg-nova-horizon px-4 py-2 text-sm font-medium text-nova-navy"
                  >
                    {value}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-8 text-nova-text">
                Le ton recherché reste premium, calme, fiable, structuré et humain.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Partenaire Blue Baie ── */}
      <section className="bg-nova-navy py-10 md:py-16">
        <Container>
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm uppercase tracking-widest text-white/60">
              En partenariat avec
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-blue-baie.png"
                alt="Logo Blue Baie Conciergerie"
                width={56}
                height={56}
                className="rounded-full"
              />
              <span className="text-white font-semibold text-lg">Blue Baie Conciergerie</span>
            </div>
            <Link
              href="https://bluebaie.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              bluebaie.fr →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
