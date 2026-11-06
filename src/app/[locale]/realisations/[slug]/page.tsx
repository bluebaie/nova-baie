import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { localizeCaseStudy, projects, publishedCaseStudies } from '@/lib/projects';
import { localeAlternates } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return publishedCaseStudies.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = localizeCaseStudy(locale, slug);
  if (!project?.copy.caseStudy) return { robots: { index: false, follow: false } };
  const path = `/realisations/${project.slug}`;
  const canonical = localeAlternates(locale, path);
  return {
    title: { absolute: project.copy.caseStudy.metaTitle },
    description: project.copy.caseStudy.metaDescription,
    alternates: canonical,
    openGraph: {
      type: 'article', siteName: 'Nova Baie', title: project.copy.caseStudy.metaTitle,
      description: project.copy.caseStudy.metaDescription, url: canonical.canonical,
      locale: locale === 'en' ? 'en_GB' : 'fr_FR',
      images: project.image ? [{ url: project.image, alt: project.copy.imageAlt ?? project.title }] : []
    },
    twitter: { card: 'summary_large_image', title: project.copy.caseStudy.metaTitle, description: project.copy.caseStudy.metaDescription, images: project.image ? [project.image] : [] },
  };
}

export default async function ProjectCasePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = localizeCaseStudy(locale, slug);
  const t = await getTranslations('visual');
  const c = await getTranslations('common');
  if (!project?.copy.caseStudy || project.detailStatus !== 'published') notFound();
  const detail = project.copy.caseStudy;
  const siblings = projects.filter(item => item.detailStatus === 'published' && item.id !== project.id);
  const graph = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title,
    description: detail.metaDescription, inLanguage: locale === 'en' ? 'en-GB' : 'fr-FR',
    image: project.image ? `https://www.nova-baie.com${project.image}` : undefined,
    creator: { '@type': 'Organization', name: 'Nova Baie', url: 'https://www.nova-baie.com' },
    url: `https://www.nova-baie.com${locale === 'en' ? '/en' : ''}/realisations/${project.slug}`
  };
  return <>
    <article className={`case-study case-study--${project.id}`}>
      <header className="case-hero surface-dark" data-case-hero>
        <Container>
          <Link href="/realisations" className="case-back"><ArrowLeft aria-hidden="true" />{t('backToWork')}</Link>
          <div className="case-hero-copy"><p className="eyebrow">{t('caseStudy')} / {project.copy.category}</p>
            {project.logo && <Image className="case-client-logo" src={project.logo} alt={`${project.title} logo`} width={128} height={128} />}
            <h1>{project.title}</h1><p className="case-lead">{detail.intro}</p>
            <div className="case-hero-actions">{project.externalUrl && <a className="button button-primary" href={project.externalUrl} target="_blank" rel="noopener noreferrer">{c('openWebsite')}<ArrowUpRight aria-hidden="true" /></a>}
              <span className="case-status"><i />{c(project.status)}</span></div>
          </div>
          {project.image && <div className="case-hero-art" data-c2-art><Image src={project.image} alt={project.copy.imageAlt ?? project.title} fill priority sizes="(min-width: 1024px) 75vw, 100vw" /><svg viewBox="0 0 600 400" aria-hidden="true"><path d="M0 330C135 80 282 385 600 55" /></svg></div>}
          <span className="case-hero-index" aria-hidden="true">N<span>/</span>B</span>
        </Container>
      </header>

      <section className="case-intro section-padding"><Container>
        <p className="eyebrow">01 / {t('context')}</p><div className="case-intro-grid"><h2>{detail.context}</h2><div><h3>{t('need')}</h3><p>{detail.need}</p></div></div>
      </Container></section>

      <section className="case-response surface-dark section-padding"><Container>
        <div className="case-response-heading"><p className="eyebrow">02 / {t('approach')}</p><h2>{detail.intervention}</h2></div>
        <div className="case-response-bottom"><div><span className="case-caption">{t('artDirection')}</span><p>{detail.artDirection}</p></div>
          <div className="case-scope"><span className="case-caption">{t('scope')}</span><ul>{detail.scope.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul></div></div>
      </Container></section>

      <section className="case-gallery section-padding"><Container>
        <div className="case-gallery-heading"><p className="eyebrow">03 / {t('projectArtwork')}</p><h2>{project.title}</h2></div>
        <div className="case-gallery-stage">
          {project.image && <div className="case-gallery-main"><Image src={project.image} alt={project.copy.imageAlt ?? project.title} fill sizes="(min-width: 1024px) 80vw, 100vw" /></div>}
          {project.mobileImage && <div className="case-gallery-mobile"><Image src={project.mobileImage} alt="" fill sizes="(min-width: 1024px) 18vw, 34vw" /></div>}
          <span className="case-gallery-note">{project.copy.category} / {project.status === 'completed' ? c('completed') : c('finalizing')}</span>
        </div>
        {detail.outcome && <div className="case-outcome"><span className="case-caption">{t('projectOutcome')}</span><p>{detail.outcome}</p></div>}
      </Container></section>

      {detail.blueBaieConnection && <section className="case-ecosystem surface-dark section-padding"><Container>
        <div className="ecosystem-layout"><div><p className="eyebrow">{t('ecosystem')}</p><h2>{detail.blueBaieConnection}</h2></div>
          <a href="https://www.bluebaie.fr/" target="_blank" rel="noopener noreferrer" className="ecosystem-link"><span>Blue Baie Conciergerie</span><span>Baie de Somme / Côte d’Opale</span><ArrowUpRight aria-hidden="true" /></a></div>
      </Container></section>}
    </article>
    <section className="case-next section-padding"><Container><div className="case-next-heading"><p className="eyebrow">{t('nextProject')}</p><h2>{locale === 'en' ? 'Another horizon.' : 'Un autre horizon.'}</h2></div>
      <div className="case-next-links">{siblings.map((item, index) => <Link key={item.id} href={`/realisations/${item.slug}`}><span>0{index + 1}</span><span>{item.title[locale === 'en' ? 'en' : 'fr']}</span><ArrowRight aria-hidden="true" /></Link>)}</div>
      <div className="case-contact"><p>{locale === 'en' ? 'Have a project with its own horizon?' : 'Un projet avec son propre horizon ?'}</p><Button href="/contact">{c('talkProject')}</Button></div>
    </Container></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
  </>;
}
