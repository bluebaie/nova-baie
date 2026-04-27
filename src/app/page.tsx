import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Baie — Sites web premium pour professionnels du tourisme',
  description: 'Nova Baie conçoit des sites web premium pour les conciergeries, gîtes, hébergements touristiques et hôtels indépendants. Design soigné, SEO optimisé, expertise terrain.',
  alternates: { canonical: 'https://www.nova-baie.com' },
  openGraph: {
    title: 'Nova Baie — Sites web premium pour professionnels du tourisme',
    description: 'Sites web élégants et performants pour les acteurs du tourisme. De la Baie de Somme à toute la France.',
    url: 'https://www.nova-baie.com',
  },
}

import { HeroSection } from "@/components/home/hero-section";
import { TargetSection } from "@/components/home/target-section";
import { OffersSection } from "@/components/home/offers-section";
import { ReasonsSection } from "@/components/home/reasons-section";
import { WorkPreviewSection } from "@/components/home/work-preview-section";
import { MethodSection } from "@/components/home/method-section";
import { AboutLinkSection } from "@/components/home/about-link-section";
import { MaintenanceSection } from "@/components/home/maintenance-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TargetSection />
      <OffersSection />
      <ReasonsSection />
      <WorkPreviewSection />
      <MethodSection />
      <AboutLinkSection />
      <MaintenanceSection />
      <FinalCtaSection />
    </>
  );
}