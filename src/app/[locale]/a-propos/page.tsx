import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/ui/page-hero';
import { Container } from '@/components/ui/container';
import { company } from '@/lib/site-data';
import { pageMetadata } from '@/lib/page-metadata';
import { Breadcrumbs } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { return pageMetadata((await params).locale, 'about', '/a-propos'); }
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const common = await getTranslations('common');
  return <>
    <Breadcrumbs locale={locale} trail={[{ name: t('eyebrow'), path: '/a-propos' }]} />
    <PageHero eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
    <section className="section-padding"><Container><div className="max-w-3xl space-y-10">
      {['history', 'sectors', 'practice', 'region'].map(id => <div key={id}><h2 className="text-2xl">{t(`${id}Title`)}</h2><p className="mt-4">{t(`${id}Description`)}</p></div>)}
      <div className="flex flex-wrap gap-4"><Button href="/realisations" variant="dark">{common('seeRealisations')}</Button><Button href="/contact" variant="dark">{common('talkProject')}</Button></div>
      <a href={company.partnerUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-medium text-nova-blue">{t('partnerCta')} →</a>
    </div></Container></section>
  </>;
}
