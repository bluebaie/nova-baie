import { pageMetadata } from '@/lib/page-metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { company } from '@/lib/site-data';
import { Link } from '@/lib/navigation';
import { Breadcrumbs, JsonLd, siteUrl } from '@/components/seo/json-ld';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { return pageMetadata((await params).locale, 'contact', '/contact'); }
export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  return <>
    <Breadcrumbs locale={locale} trail={[{ name: t('eyebrow'), path: '/contact' }]} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: t('metaTitle'), url: siteUrl(locale, '/contact'), about: { '@id': 'https://www.nova-baie.com/#organization' } }} />
    <PageHero eyebrow={t('eyebrow')} title={t('title')} description={t('description')} actions={false} />
    <section className="contact-atelier section-padding"><Container><div className="contact-layout">
      <div className="contact-panel"><h2>{t('form.title')}</h2><p className="contact-panel-intro">{t('form.subtitle')}</p><ContactForm /><Link href="/mentions-legales#confidentialite" className="contact-privacy">{t('info.privacy')}</Link></div>
      <aside className="contact-aside"><p className="eyebrow">Nova Baie</p><h2>{t('info.title')}</h2>
        <a href={`mailto:${company.email}`} className="contact-detail"><Mail aria-hidden="true" /><span>{company.email}</span></a>
        <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="contact-detail"><Phone aria-hidden="true" /><span>{company.phone}</span></a>
        <div className="contact-detail"><MapPin aria-hidden="true" /><span>{t('info.location')}</span></div>
        <div className="contact-next"><h3>{t('info.nextSteps')}</h3><ol>{['step1','step2','step3'].map((id, index) => <li key={id}><span aria-hidden="true">0{index + 1}</span>{t(`info.${id}`)}</li>)}</ol></div>
        <p className="contact-reassurance">{t('info.reassurance')}</p>
      </aside>
    </div></Container></section>
  </>;
}
