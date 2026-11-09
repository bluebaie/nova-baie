import { RefugeMarmotteCase } from '@/components/shared/refuge-marmotte-case';
import { CyclosportCase } from '@/components/shared/cyclosport-case';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { CaseStudyMedia } from '@/components/shared/case-study-media';
import { CaseStudyScope } from '@/components/shared/case-study-scope';
import { SaintJeanCase } from '@/components/shared/saint-jean-case';
import { BlueBaieCase } from '@/components/shared/blue-baie-case';
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
  const shareImage = project.id === 'csc' ? '/media/projects/csc/optimized/og-cyclosport-crotellois.jpg' : project.id === 'saint-jean' ? '/media/projects/conciergerie-saint-jean/brand/og-saint-jean.jpg' : project.id === 'blue-baie' ? '/media/projects/blue-baie/images/og/blue-baie-og.jpg' : project.image;
  return {
    title: { absolute: project.copy.caseStudy.metaTitle },
    description: project.copy.caseStudy.metaDescription,
    alternates: canonical,
    openGraph: {
      type: 'article', siteName: 'Nova Baie', title: project.copy.caseStudy.metaTitle,
      description: project.copy.caseStudy.metaDescription, url: canonical.canonical,
      locale: locale === 'en' ? 'en_GB' : 'fr_FR',
      images: shareImage ? [{ url: shareImage, alt: project.copy.imageAlt ?? project.title }] : []
    },
    twitter: { card: 'summary_large_image', title: project.copy.caseStudy.metaTitle, description: project.copy.caseStudy.metaDescription, images: shareImage ? [shareImage] : [] },
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
  const isEcosystem = detail.visualVariant === 'ecosystem';
  const siblings = projects.filter(item => item.detailStatus === 'published' && item.id !== project.id);
  const graph = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title,
    description: detail.metaDescription, inLanguage: locale === 'en' ? 'en-GB' : 'fr-FR',
    image: project.image ? `https://www.nova-baie.com${project.image}` : undefined,
    creator: { '@type': 'Organization', name: 'Nova Baie', url: 'https://www.nova-baie.com' },
    url: `https://www.nova-baie.com${locale === 'en' ? '/en' : ''}/realisations/${project.slug}`
  };
  if (project.id === 'csc') {
    const home = `https://www.nova-baie.com${locale === 'en' ? '/en' : ''}`;
    const { '@context': _context, ...work } = graph;
    void _context;
    const cscGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        { ...work, image: 'https://www.nova-baie.com/media/projects/csc/optimized/og-cyclosport-crotellois.jpg', keywords: detail.scope.join(', '),
          about: { '@type': 'SportsOrganization', name: 'CycloSport Crotellois', sport: locale === 'en' ? 'Cycling' : 'Cyclisme', url: project.externalUrl, address: { '@type': 'PostalAddress', addressLocality: 'Le Crotoy', addressRegion: 'Hauts-de-France', addressCountry: 'FR' } } },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: locale === 'en' ? 'Home' : 'Accueil', item: home },
          { '@type': 'ListItem', position: 2, name: locale === 'en' ? 'Projects' : 'Réalisations', item: `${home}/realisations` },
          { '@type': 'ListItem', position: 3, name: project.title, item: graph.url }
        ] }
      ]
    };
    return <>
      <CyclosportCase locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cscGraph).replace(/</g, '\\u003c') }} />
    </>;
  }
  if (project.id === 'refuge-marmotte') return <>
    <RefugeMarmotteCase locale={locale} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
  </>;
  if (project.id === 'saint-jean') return <>
    <SaintJeanCase locale={locale} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
  </>;
  if (project.id === 'blue-baie') return <>
    <BlueBaieCase locale={locale} media={project.caseMedia ?? []} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
  </>;
  return <>
    <article className={`case-study case-study--${project.id}`} data-case-style={detail.visualVariant}>
      <header className={`case-hero case-hero--${detail.visualVariant} surface-dark`} data-case-hero>
        <Container>
          <Link href="/realisations" className="case-back"><ArrowLeft aria-hidden="true" />{t('backToWork')}</Link>
          <div className="case-hero-layout">
            <div className="case-hero-copy">
              <p className="eyebrow">{t('caseStudy')} / {project.copy.category}</p>
              {project.logo && <Image className="case-client-logo" src={project.logo} alt={`${project.title} logo`} width={108} height={108} priority />}
              <p className="case-location">{detail.location}</p>
              <h1>{project.title}</h1>
              <p className="case-activity">{detail.activity}</p>
              <p className="case-lead">{detail.intro}</p>
              <div className="case-hero-actions">
                {project.externalUrl && <a className="button button-primary" href={project.externalUrl} target="_blank" rel="noopener noreferrer" data-case-visit>{c('openWebsite')}<ArrowUpRight aria-hidden="true" /></a>}
                <span className="case-status"><i />{c(project.status)}</span>
              </div>
            </div>
            {project.image && <figure className="case-hero-art" data-c2-art>
              <div className="case-hero-image"><Image src={project.image} alt={project.copy.imageAlt ?? project.title} fill priority sizes="(min-width: 1024px) 56vw, 100vw" /></div>
              {project.mobileImage && <div className="case-hero-mobile"><Image src={project.mobileImage} alt="" fill sizes="(min-width: 1024px) 15vw, 27vw" /></div>}
              <svg viewBox="0 0 800 520" preserveAspectRatio="none" fill="none" aria-hidden="true"><path data-draw d="M12 454C191 263 291 481 429 276S630 93 789 148" /></svg>
              <figcaption>{project.copy.category} / {detail.location}</figcaption>
            </figure>}
          </div>
        </Container>
      </header>

      <section className="case-intro section-padding"><Container>
        <p className="eyebrow">01 / {t('context')}</p>
        <div className="case-intro-grid"><h2>{detail.context}</h2><div><h3>{t('need')}</h3><p>{detail.need}</p></div></div>
      </Container></section>

      <section className={`case-response case-response--${detail.visualVariant} surface-dark section-padding`}><Container>
        <div className="case-response-heading"><p className="eyebrow">02 / {t('approach')}</p><h2>{detail.intervention}</h2></div>
        <div className="case-response-bottom">
          <div><span className="case-caption">{t('artDirection')}</span><p>{detail.artDirection}</p></div>
          <div className="case-scope"><span className="case-caption">{t('scope')}</span><ul>{detail.scope.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul></div>
        </div>
      </Container></section>

      {isEcosystem
        ? <section className="case-scope-section section-padding"><Container><CaseStudyScope items={detail.scope} title={t('scopeDiagram')} caption={t('scopeDiagramNote')} /></Container></section>
        : <section className="case-editorial-section section-padding"><Container>
          <div className="case-editorial-plate"><div><p className="eyebrow">03 / {t('artDirection')}</p><h2>{t('coastalDirection')}</h2></div><p>{detail.artDirection}</p>
            <svg viewBox="0 0 600 230" fill="none" aria-hidden="true"><path data-draw d="M5 194C113 58 215 222 319 113S477 31 596 65" /></svg>
          </div>
        </Container></section>}

      {project.image && <section className="case-gallery section-padding"><Container>
        <div className="case-gallery-heading"><p className="eyebrow">{isEcosystem ? '03' : '04'} / {t('projectArtwork')}</p><h2>{t('interfaceStudy')}</h2></div>
        <CaseStudyMedia image={project.image} mobileImage={project.mobileImage} title={project.title} desktopLabel={t('desktopView')} mobileLabel={t('mobileView')} alt={project.copy.imageAlt ?? project.title} />
      </Container></section>}

      {detail.blueBaieConnection && <section className="case-ecosystem surface-dark section-padding"><Container>
        <div className="ecosystem-layout"><div><p className="eyebrow">{t('ecosystem')}</p><h2>{detail.blueBaieConnection}</h2></div>
          <div className="ecosystem-links">
            <a href="https://www.bluebaie.fr/" target="_blank" rel="noopener noreferrer" className="ecosystem-link"><span>Blue Baie Conciergerie</span><span>{locale === 'en' ? 'Bay of Somme' : 'Baie de Somme'}</span><ArrowUpRight aria-hidden="true" /></a>
            <a href="https://conciergeriesaintjean.fr/" target="_blank" rel="noopener noreferrer" className="ecosystem-link"><span>Conciergerie Saint-Jean</span><span>{locale === 'en' ? 'Le Touquet · Opal Coast' : 'Le Touquet · Côte d’Opale'}</span><ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </Container></section>}
    </article>
    <section className="case-next section-padding"><Container><div className="case-next-heading"><p className="eyebrow">{t('nextProject')}</p><h2>{locale === 'en' ? 'Another horizon.' : 'Un autre horizon.'}</h2></div>
      <div className="case-next-links">{siblings.map(item => <Link key={item.id} href={`/realisations/${item.slug}`}><span aria-hidden="true">↗</span><span>{item.title[locale === 'en' ? 'en' : 'fr']}</span><ArrowRight aria-hidden="true" /></Link>)}</div>
      <div className="case-contact"><p>{locale === 'en' ? 'Have a project with its own horizon?' : 'Un projet avec son propre horizon ?'}</p><Button href="/contact">{c('talkProject')}</Button></div>
    </Container></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
  </>;
}
