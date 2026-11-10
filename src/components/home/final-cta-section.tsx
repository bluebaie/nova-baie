import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { HorizonMark } from '@/components/ui/horizon-mark';
import { company } from '@/lib/site-data';

export async function FinalCtaSection() {
  const t = await getTranslations('finalCta');
  return <section className="section-padding"><Container><div className="conversion-layout" data-reveal>
    <div className="conversion-ornament"><HorizonMark /></div>
    <p className="eyebrow">{t('eyebrow')}</p><h2>{t('title')}</h2><p>{t('description')}</p><Button href="/contact" variant="dark">{t('cta')}</Button>
    <p className="conversion-reassurance">{t('reassurance')}</p>
    <p className="conversion-direct"><span>{t('direct')}</span><a href={`mailto:${company.email}`}>{company.email}</a><a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a></p>
  </div></Container></section>;
}
