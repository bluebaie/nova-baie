import { CheckCircle, Star, TrendingUp } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'

const cardIcons = [CheckCircle, Star, TrendingUp]

export async function AboutLinkSection() {
  const t = await getTranslations('aboutLink')
  const cards = t.raw('cards') as Array<{ title: string; text: string }>

  return (
    <section className="section-padding relative overflow-hidden bg-nova-navy">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(46,123,198,0.2),transparent_60%)]" />

      <Container>
        <Reveal>
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/80">
                {t('eyebrow')}
              </span>
              <h2 className="mt-5 text-white">{t('title')}</h2>
              <p className="mt-4 leading-8 text-white/75">{t('p1')}</p>
              <p className="mt-4 leading-8 text-white/75">{t('p2')}</p>
              <div className="mt-8">
                <Link
                  href="/a-propos"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-nova-navy transition-all duration-200 hover:bg-white/90"
                >
                  {t('cta')}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {cards.map((card, i) => {
                const Icon = cardIcons[i]
                return (
                  <div key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-white/70" />
                    <h3 className="mt-3 text-base font-semibold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/65">{card.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
