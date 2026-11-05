import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/ui/page-hero';
import { Container } from '@/components/ui/container';
import { FinalCtaSection } from '@/components/home/final-cta-section';
import { expertiseIds } from '@/lib/expertises';
import { pageMetadata } from '@/lib/page-metadata';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { return pageMetadata((await params).locale, 'services', '/services'); }
export default async function ServicesPage({ params }: Props) {
  setRequestLocale((await params).locale);
  const t = await getTranslations('services');
  const expertise = await getTranslations('expertises');
  return <>
    <PageHero eyebrow={t('eyebrow')} title={t('title')} description={t('description')} expertisesLink={false} />
    <section className="section-padding bg-white"><Container>
      <div className="grid gap-6 md:grid-cols-2">
        {expertiseIds.map(id => <article id={id} key={id} className="card-premium p-6 md:p-8">
          <h2 className="text-xl md:text-2xl">{expertise(`${id}.title`)}</h2>
          <p className="mt-4 text-sm font-medium leading-7 text-nova-navy">{expertise(`${id}.problem`)}</p>
          <p className="mt-3 text-sm leading-7">{expertise(`${id}.benefit`)}</p>
        </article>)}
      </div>
      <div className="mt-10 max-w-3xl"><h2 className="text-2xl">{t('approachTitle')}</h2><p className="mt-4">{t('approachDescription')}</p></div>
    </Container></section>
    <FinalCtaSection />
  </>;
}
