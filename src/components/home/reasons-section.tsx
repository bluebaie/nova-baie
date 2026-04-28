import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Hotel, Sparkles, Workflow, Waves } from 'lucide-react'

const reasonIcons = [Hotel, Sparkles, Workflow, Waves]

export async function ReasonsSection() {
  const t = await getTranslations('reasons')
  const stats = t.raw('stats') as Array<{ value: string; label: string }>
  const items = t.raw('items') as Array<{ title: string; description: string }>

  return (
    <section className="section-padding bg-gradient-to-br from-white via-nova-sand to-nova-horizon/30">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              description={t('description')}
            />

            <div className="mt-10 border-t border-nova-navy/8">
              {stats.map((stat) => (
                <div key={stat.value} className="border-b border-nova-navy/8 py-5">
                  <span className="text-3xl font-semibold text-nova-navy">{stat.value}</span>
                  <p className="mt-1 text-sm leading-6 text-nova-text">{stat.label}</p>
                </div>
              ))}
              <p className="mt-4 text-xs italic text-nova-text/50">{t('statsNote')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((item, index) => {
              const Icon = reasonIcons[index]
              const num = String(index + 1).padStart(2, '0')
              return (
                <Reveal key={item.title} delay={index * 100}>
                  <div className="rounded-[1.5rem] border border-nova-navy/8 bg-white p-7">
                    <span className="font-mono text-xs tracking-widest text-nova-blue/40">{num}</span>
                    <div className="mt-2 inline-flex rounded-xl bg-gradient-to-br from-nova-horizon to-nova-blue/10 p-3 text-nova-navy">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7">{item.description}</p>
                    <div className="mt-5 h-[2px] w-8 rounded-full bg-nova-blue/30" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
