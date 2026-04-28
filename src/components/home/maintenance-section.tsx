import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/navigation'
import { Container } from '@/components/ui/container'

export async function MaintenanceSection() {
  const t = await getTranslations('maintenance')

  return (
    <section className="border-t border-nova-blue/15 bg-nova-horizon py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-nova-horizon px-4 py-1.5 text-xs uppercase tracking-widest text-nova-navy">
            {t('eyebrow')}
          </span>
          <h2 className="mt-5 text-nova-navy">{t('title')}</h2>
          <p className="mt-4 text-sm leading-8 text-nova-text">{t('description')}</p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-nova-navy px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
