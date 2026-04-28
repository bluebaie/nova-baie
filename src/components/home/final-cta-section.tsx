import { ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'

export async function FinalCtaSection() {
  const t = await getTranslations('finalCta')
  const tags = t.raw('tags') as string[]

  return (
    <section className="section-padding">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-nova-navy px-8 py-14 text-white md:px-14 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,123,198,0.3),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(143,175,168,0.15),transparent_50%)]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E\")",
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 mb-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.08] p-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 shrink-0 text-nova-blue" />
                <div>
                  <p className="text-base font-semibold text-white">{t('maintenanceTitle')}</p>
                  <p className="mt-0.5 text-sm text-white/60">{t('maintenanceSubtitle')}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {tags.map((label) => (
                  <span key={label} className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5 text-xs text-white/70">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <p className="mb-6 text-sm tracking-wide text-white/50">{t('metrics')}</p>
              <p className="text-sm uppercase tracking-[0.16em] text-white/70">{t('eyebrow')}</p>
              <h2 className="mt-5 max-w-3xl text-white">{t('title')}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{t('description')}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-all duration-200 hover:border-white hover:bg-white/10"
                >
                  {t('cta1')}
                </Link>
                <Link
                  href="/realisations"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:border-white hover:text-white"
                >
                  {t('cta2')}
                </Link>
              </div>
              <p className="mt-6 text-xs tracking-wide text-white/40">{t('reassurance')}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
