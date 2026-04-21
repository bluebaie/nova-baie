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