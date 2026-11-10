import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Playfair_Display, Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import SchemaOrg from '@/components/seo/schema-org';
import { MotionScene } from '@/components/ui/motion-scene';
import { CreativeMotion } from '@/components/ui/creative-motion';
import { ConsentManager } from '@/components/consent/consent-manager';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    metadataBase: new URL('https://www.nova-baie.com'),
    title: {
      default: t('metaTitle'),
      template: '%s — Nova Baie',
    },
    description: t('metaDescription'),
    keywords: locale === 'en' ? ['website design', 'tailored web development', 'business platform', 'back office', 'association website', 'sports club website', 'SEO', 'digital studio', 'Nova Baie', 'Bay of Somme', 'France'] : [
      'création de site internet',
      'studio digital',
      'développement sur mesure',
      'plateforme métier',
      'back-office',
      'site association',
      'site club sportif',
      'site hébergement touristique',
      'référencement SEO',
      'Nova Baie',
      'Baie de Somme',
    ],
    applicationName: 'Nova Baie',
    category: 'technology',
    // Indexing is the default; only preview directives are added, so error pages keep a single noindex.
    robots: { googleBot: { 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    // Search Console ownership: set GOOGLE_SITE_VERIFICATION (meta tag token) in the hosting environment.
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
    authors: [{ name: 'Nova Baie' }],
    creator: 'Nova Baie',
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      url: locale === 'en' ? 'https://www.nova-baie.com/en' : 'https://www.nova-baie.com',
      siteName: 'Nova Baie',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Nova Baie' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: ['/opengraph-image'],
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const visual = await getTranslations('visual');

  return (
    <html lang={locale}>
      <head>
        <SchemaOrg locale={locale} />
      </head>
      <body className={`${playfair.variable} ${inter.variable} bg-nova-sand text-nova-ink antialiased`}>
        <NextIntlClientProvider messages={{ nav: messages.nav, header: messages.header, lang: messages.lang, contact: messages.contact, errors: messages.errors, actualites: messages.actualites, visual: messages.visual, consent: messages.consent }}>
          <a href="#main-content" className="skip-link">{visual('skip')}</a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <MotionScene />
          <CreativeMotion />
          {/* Google Tag Manager is loaded by ConsentManager only after opt-in. */}
          <ConsentManager />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
