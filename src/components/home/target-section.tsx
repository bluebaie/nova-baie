import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

export async function TargetSection() {
  const t = await getTranslations('target')
  const items = t.raw('items') as string[]

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-nova-sand">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,123,198,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(143,175,168,0.12),transparent_40%)]" />

      <Container>
        <div className="relative z-10 max-w-4xl">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
          />
        </div>

        <div className="relative z-10 mt-12 grid gap-6 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((target) => (
            <article
              key={target}
              className="group relative overflow-hidden rounded-[1.75rem] border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.55)] p-7 shadow-[0_8px_32px_rgba(22,58,112,0.08)] backdrop-blur-[12px] transition-all duration-300 hover:-translate-y-2 hover:bg-[rgba(255,255,255,0.85)] hover:shadow-[0_16px_48px_rgba(22,58,112,0.14)]"
            >
              <span className="absolute bottom-0 left-0 h-0 w-[3px] origin-bottom bg-nova-blue transition-all duration-[400ms] group-hover:h-full" />
              <span className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(46,123,198,0.08),transparent_60%)]" />
              <div className="relative z-10 flex min-h-[110px] items-center">
                <h3 className="text-lg font-semibold leading-7 text-nova-navy sm:text-[1.35rem]">{target}</h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
