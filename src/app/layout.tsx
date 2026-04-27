import type { Metadata, Viewport } from 'next'
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Playfair_Display, Inter } from "next/font/google";
import SchemaOrg from '@/components/seo/schema-org';
import Script from 'next/script';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nova-baie.com'),
  title: {
    default: 'Nova Baie — Sites web premium pour professionnels du tourisme',
    template: '%s — Nova Baie'
  },
  description: 'Nova Baie crée des sites web premium pour les conciergeries, gîtes, hôtels indépendants et locations saisonnières. Design soigné, conversion optimisée, expertise tourisme.',
  keywords: ['site web tourisme', 'création site conciergerie', 'site web gîte', 'agence web tourisme', 'site hébergement', 'site web hôtel indépendant', 'Nova Baie', 'Baie de Somme'],
  authors: [{ name: 'Nova Baie' }],
  creator: 'Nova Baie',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.nova-baie.com',
    siteName: 'Nova Baie',
    title: 'Nova Baie — Sites web premium pour professionnels du tourisme',
    description: 'Sites web élégants et performants pour les conciergeries, gîtes, hébergements et hôtels indépendants. De la Baie de Somme à toute la France.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nova Baie — Sites web premium tourisme',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova Baie — Sites web premium pour professionnels du tourisme',
    description: 'Sites web élégants et performants pour les conciergeries, gîtes, hébergements et hôtels indépendants.',
    images: ['/images/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  alternates: {
    canonical: 'https://www.nova-baie.com',
    languages: { 'fr-FR': 'https://www.nova-baie.com' }
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <SchemaOrg />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} bg-nova-sand text-nova-ink antialiased`}
      >
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
