import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/home/hero-section';
import { TargetSection } from '@/components/home/target-section';
import { OffersSection } from '@/components/home/offers-section';
import { ReasonsSection } from '@/components/home/reasons-section';
import { WorkPreviewSection } from '@/components/home/work-preview-section';
import { LatestActualitesSection } from '@/components/home/latest-actualites-section';
import { MethodSection } from '@/components/home/method-section';
import { AboutLinkSection } from '@/components/home/about-link-section';
import { MaintenanceSection } from '@/components/home/maintenance-section';
import { FinalCtaSection } from '@/components/home/final-cta-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: locale === 'fr' ? 'https://www.nova-baie.com' : 'https://www.nova-baie.com/en' },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: locale === 'fr' ? 'https://www.nova-baie.com' : 'https://www.nova-baie.com/en',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Above fold — rendered immediately */}
      <HeroSection />
      <TargetSection />

      {/* Below fold — streamed progressively */}
      <Suspense fallback={<div className="h-64 animate-pulse bg-nova-sand" />}>
        <OffersSection />
      </Suspense>
      <Suspense fallback={<div className="h-64 animate-pulse bg-white" />}>
        <ReasonsSection />
      </Suspense>
      <Suspense fallback={<div className="h-64 animate-pulse bg-nova-sand" />}>
        <WorkPreviewSection />
      </Suspense>
      <Suspense fallback={<div className="h-48 animate-pulse bg-white" />}>
        <LatestActualitesSection />
      </Suspense>
      <Suspense fallback={<div className="h-48 animate-pulse bg-nova-sand" />}>
        <MethodSection />
      </Suspense>
      <Suspense fallback={null}>
        <AboutLinkSection />
      </Suspense>
      <Suspense fallback={null}>
        <MaintenanceSection />
      </Suspense>
      <Suspense fallback={null}>
        <FinalCtaSection />
      </Suspense>
    </>
  );
}
