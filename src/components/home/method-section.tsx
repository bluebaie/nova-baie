import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { MessageCircle, Search, Globe, House, ShieldCheck } from 'lucide-react'

const stepIcons = [MessageCircle, Search, Globe, House, ShieldCheck]

export async function MethodSection() {
  const t = await getTranslations('method')
  const steps = t.raw('steps') as Array<{ title: string; description: string }>

  return (
    <section className="section-padding bg-nova-navy">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-[11px] uppercase tracking-widest text-white/70">
              {t('eyebrow')}
            </span>
            <h2 className="mt-5 text-white">{t('title')}</h2>
            <p className="mt-5 text-white/65">{t('description')}</p>
          </div>
          <p className="shrink-0 text-sm italic text-white/40 lg:mb-1 lg:max-w-[260px] lg:text-right">
            {t('duration')}
          </p>
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[52px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent xl:block" />
          <div className="-mx-4 overflow-x-auto snap-x snap-mandatory pb-4 sm:-mx-6 md:mx-0 md:overflow-visible md:pb-0">
            <div className="flex w-max gap-4 px-4 sm:px-6 md:w-full md:grid md:grid-cols-2 md:px-0 xl:grid-cols-5">
              {steps.map((step, index) => {
                const Icon = stepIcons[index]
                const num = String(index + 1).padStart(2, '0')
                return (
                  <Reveal key={step.title} delay={index * 80} className="w-[260px] flex-none snap-center md:w-auto">
                    <div className="relative h-full rounded-[1.5rem] border border-white/12 bg-white/[0.06] p-6">
                      <div className="mb-6 h-[3px] w-full rounded-full bg-nova-blue/50" />
                      <span className="absolute right-5 top-4 font-mono text-[11px] tracking-widest text-white/15">{num}</span>
                      <div className="inline-flex rounded-xl bg-white/10 p-2.5 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/65">{step.description}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-white/40 md:hidden">{t('scrollHint')}</p>
        </div>
      </Container>
    </section>
  )
}
