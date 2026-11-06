import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PenTool, Globe2, PanelsTopLeft, Workflow, Sparkles, Search, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { Container } from '@/components/ui/container';
import { FinalCtaSection } from '@/components/home/final-cta-section';
import { expertiseIds } from '@/lib/expertises';
import { Link } from '@/lib/navigation';
import { pageMetadata } from '@/lib/page-metadata';

const icons = { identity: PenTool, web: Globe2, business: PanelsTopLeft, automation: Workflow, ai: Sparkles, seo: Search, maintenance: ShieldCheck };
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { return pageMetadata((await params).locale, 'services', '/services'); }
export default async function ServicesPage({ params }: Props) {
  setRequestLocale((await params).locale);
  const t = await getTranslations('services');
  const expertise = await getTranslations('expertises');
  const common = await getTranslations('common');
  return <>
    <PageHero eyebrow={t('eyebrow')} title={t('title')} description={t('description')} expertisesLink={false} />
    <section className="expertise-atelier section-padding"><Container><div className="expertise-layout">
      <nav className="expertise-index" aria-label={t('eyebrow')}>{expertiseIds.map((id, index) => <a key={id} href={`#${id}`}><span aria-hidden="true">0{index + 1}</span>{expertise(`${id}.title`)}</a>)}</nav>
      <div className="expertise-script">{expertiseIds.map((id, index) => { const Icon = icons[id]; return <article key={id} id={id} data-index={`0${index + 1}`} className="expertise-row" data-reveal>
        <div className="expertise-row-top"><Icon className="expertise-icon" aria-hidden="true" /><h2>{expertise(`${id}.title`)}</h2></div>
        <p className="expertise-problem">{expertise(`${id}.problem`)}</p><p>{expertise(`${id}.benefit`)}</p>
        <Link href="/contact" className="text-link">{common('talkProject')}<ArrowUpRight aria-hidden="true" /></Link>
      </article>; })}
      <div className="expertise-approach" data-reveal><h2>{t('approachTitle')}</h2><p>{t('approachDescription')}</p></div></div>
    </div></Container></section><FinalCtaSection />
  </>;
}
