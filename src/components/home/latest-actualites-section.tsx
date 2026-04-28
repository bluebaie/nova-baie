import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { actualites } from '@/lib/actualites-data'

const categoryStyles: Record<string, string> = {
  Réalisation: 'bg-nova-blue text-white',
  Lancement: 'bg-nova-navy text-white',
  Coulisse: 'bg-nova-sage text-white',
  Conseil: 'bg-nova-horizon text-nova-navy',
}

export function LatestActualitesSection() {
  const latest = [...actualites]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)

  if (latest.length === 0) return null

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Actualités"
            title="Dernières actualités"
            description="Projets, conseils et vie de Nova Baie"
          />
          <Link
            href="/actualites"
            className="shrink-0 text-sm font-medium text-nova-blue transition-colors hover:text-nova-navy"
          >
            Voir toutes les actualités →
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {latest.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-nova-navy/8 bg-white shadow-[0_4px_20px_rgba(22,58,112,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(22,58,112,0.10)] sm:flex-row"
            >
              {/* Image */}
              <div className="relative h-52 w-full flex-shrink-0 overflow-hidden bg-nova-horizon sm:h-auto sm:w-52 md:w-60">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.titre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 240px"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-nova-horizon to-nova-blue/20" />
                )}
              </div>

              {/* Texte */}
              <div className="flex flex-1 flex-col justify-between gap-3 p-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        categoryStyles[item.categorie] ?? 'bg-nova-horizon text-nova-navy'
                      }`}
                    >
                      {item.categorie}
                    </span>
                    <time className="text-xs text-nova-text/50">{item.date}</time>
                  </div>

                  <h3 className="mt-3 text-base font-semibold leading-7 text-nova-navy">
                    {item.titre}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-7 text-nova-text">
                    {item.resume}
                  </p>
                </div>

                <Link
                  href="/actualites"
                  className="self-start text-sm font-medium text-nova-blue transition-colors hover:text-nova-navy"
                >
                  Lire →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/actualites"
            className="inline-flex items-center justify-center rounded-full border border-nova-navy/15 bg-white px-6 py-3 text-sm font-medium text-nova-navy transition-all duration-200 hover:border-nova-navy/30 hover:shadow-sm"
          >
            Voir toutes les actualités →
          </Link>
        </div>
      </Container>
    </section>
  )
}
