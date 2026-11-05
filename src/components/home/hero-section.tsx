import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export async function HeroSection() {
  const t = await getTranslations('hero');
  return <section className="relative overflow-hidden bg-nova-navy pb-16 pt-36 md:pb-24 md:pt-44">
    <Image src="/images/hero-nova-baie.jpg" alt={t('imageAlt')} fill priority sizes="100vw" className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-nova-navy/90 via-nova-navy/75 to-nova-navy/40" />
    <Container><div className="relative z-10 max-w-4xl">
      <p className="text-sm uppercase tracking-[0.15em] text-white/90">{t('tagline')}</p>
      <h1 className="mt-6 text-white">{t('title')}</h1>
      <p className="mt-6 max-w-2xl leading-8 text-white/90">{t('description')}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href="/contact" variant="light">{t('cta1')}</Button>
        <Button href="/services" variant="secondary">{t('cta2')}</Button>
      </div>
    </div></Container>
  </section>;
}
