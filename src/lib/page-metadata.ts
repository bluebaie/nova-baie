import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { localeAlternates } from './seo';

export async function pageMetadata(locale: string, namespace: string, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t('metaTitle');
  const description = t('metaDescription');
  const alternates = localeAlternates(locale, path);
  return {
    title: { absolute: title.includes('Nova Baie') ? title : `${title} — Nova Baie` },
    description, alternates,
    openGraph: {
      type: 'website', siteName: 'Nova Baie', title, description, url: alternates.canonical,
      locale: locale === 'en' ? 'en_GB' : 'fr_FR',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Nova Baie' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  };
}
