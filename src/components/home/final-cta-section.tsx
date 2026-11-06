import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { HorizonMark } from '@/components/ui/horizon-mark';

export async function FinalCtaSection() {
  const t = await getTranslations('finalCta');
  return <section className="section-padding"><Container><div className="conversion-layout" data-reveal>
    <div className="conversion-ornament"><HorizonMark /></div>
    <p className="eyebrow">{t('eyebrow')}</p><h2>{t('title')}</h2><p>{t('description')}</p><Button href="/contact" variant="dark">{t('cta')}</Button>
  </div></Container></section>;
}
