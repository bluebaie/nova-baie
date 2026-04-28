import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { ActualitesGrid } from '@/components/actualites/actualites-grid'

export const metadata: Metadata = {
  title: 'Actualités — Nova Baie',
  description: 'Suivez les dernières actualités de Nova Baie : nouveaux projets, réalisations et publications.',
  alternates: { canonical: 'https://www.nova-baie.com/actualites' },
  openGraph: {
    title: 'Actualités — Nova Baie',
    description: 'Suivez les dernières actualités de Nova Baie : nouveaux projets, réalisations et publications.',
    url: 'https://www.nova-baie.com/actualites',
  },
}

export default function ActualitesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-nova-navy pb-12 pt-32 md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,123,198,0.2),transparent_50%)]" />
        <Container>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-xs uppercase tracking-widest text-white/70">
              Actualités
            </span>
            <h1 className="mt-5 text-white">Actualités</h1>
            <p className="mt-4 leading-8 text-white/70">
              Projets, réalisations et vie de Nova Baie
            </p>
          </div>
        </Container>
      </section>

      {/* Grille */}
      <section className="bg-nova-sand py-12 md:py-20">
        <Container>
          <ActualitesGrid />
        </Container>
      </section>
    </>
  )
}
