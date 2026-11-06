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
    <div className="hero-photo" data-depth="photo"><Image src="/images/hero-nova-baie.jpg" alt={t('imageAlt')} fill priority sizes="(min-width: 1024px) 64vw, 100vw" /></div>
    <div className="hero-shade" />
    <div className="hero-water-light" data-depth="light" aria-hidden="true" />
    <div className="hero-orbit" data-depth="orbit"><HorizonMark /></div>
    <svg className="hero-contours" viewBox="0 0 900 680" fill="none" aria-hidden="true"><path data-draw d="M-40 470C153 247 294 535 452 336S697 139 949 237"/><path data-draw d="M-35 526C167 301 318 590 474 394S704 201 949 296"/><path data-draw d="M-28 584C183 356 335 645 496 455S714 266 956 354"/><path d="M616 53v84m-14-42h28"/><circle cx="616" cy="95" r="36" /></svg>
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
