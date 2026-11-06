import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { Container } from '@/components/ui/container';

export async function AboutLinkSection() {
  const t = await getTranslations('aboutLink');
  const visual = await getTranslations('visual');
  return <section className="section-padding surface-dark"><Container><div className="signature-layout">
    <div className="signature-image" data-reveal><Image src="/images/hero-nova-baie.jpg" alt="" fill sizes="(min-width: 768px) 45vw, 100vw" /><span className="signature-caption">{visual('photoCaption')}</span></div>
    <div className="signature-copy" data-reveal><p className="eyebrow">{t('eyebrow')}</p><h2>{t('title')}</h2><p>{t('description')}</p><Link href="/a-propos" className="text-link">{t('cta')}<ArrowUpRight aria-hidden="true" /></Link></div>
  </div></Container></section>;
}
