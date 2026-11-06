import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { HorizonMark } from '@/components/ui/horizon-mark';

export async function HeroSection() {
  const t = await getTranslations('hero');
  const visual = await getTranslations('visual');
  return <section className="hero-stage surface-dark" data-hero>
    <div className="hero-photo"><Image src="/images/hero-nova-baie.jpg" alt={t('imageAlt')} fill priority sizes="(min-width: 1024px) 64vw, 100vw" /></div>
    <div className="hero-shade" /><div className="hero-orbit"><HorizonMark /></div>
    <Container><div className="hero-content">
      <p className="eyebrow">{t('tagline')}</p>
      <h1 className="hero-title">{t.rich('title', { em: chunks => <em>{chunks}</em> })}</h1>
      <p className="hero-description">{t('description')}</p>
      <div className="hero-actions"><Button href="/contact">{t('cta1')}</Button><Button href="/services" variant="secondary">{t('cta2')}</Button></div>
    </div>
    <div className="hero-foot"><span>{visual('disciplines')}</span><a href="#capabilities-title">{visual('explore')}<ArrowDown aria-hidden="true" /></a></div>
    </Container>
  </section>;
}
