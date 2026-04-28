import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Playfair_Display, Inter } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import SchemaOrg from '@/components/seo/schema-org';
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
    keywords: [
      'site web tourisme',
      'création site conciergerie',
      'site web gîte',
      'agence web tourisme',
      'site hébergement',
      'Nova Baie',
      'Baie de Somme',
    ],
    authors: [{ name: 'Nova Baie' }],
    creator: 'Nova Baie',
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      url: 'https://www.nova-baie.com',
      siteName: 'Nova Baie',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Nova Baie' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: ['/images/og-image.jpg'],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://www.nova-baie.com',
      languages: {
        'fr': 'https://www.nova-baie.com',
        'en': 'https://www.nova-baie.com/en',
      },
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

  return (
    <html lang={locale}>
      <head>
        <SchemaOrg />
      </head>
      <body className={`${playfair.variable} ${inter.variable} bg-nova-sand text-nova-ink antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MV4VJGBB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MV4VJGBB');`,
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
