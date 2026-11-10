import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page-metadata';
import { HeroSection } from '@/components/home/hero-section';
import { CapabilitiesSection } from '@/components/home/capabilities-section';
import { WorkPreviewSection } from '@/components/home/work-preview-section';
import { MethodSection } from '@/components/home/method-section';
import { AudienceSection } from '@/components/home/audience-section';
import { AboutLinkSection } from '@/components/home/about-link-section';
import { FinalCtaSection } from '@/components/home/final-cta-section';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { return pageMetadata((await params).locale, 'home', ''); }

export default async function HomePage({ params }: Props) {
  setRequestLocale((await params).locale);
  return <><HeroSection /><CapabilitiesSection /><WorkPreviewSection /><AudienceSection /><MethodSection /><AboutLinkSection /><FinalCtaSection /></>;
}
