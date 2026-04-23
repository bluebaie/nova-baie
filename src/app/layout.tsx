import type { Metadata } from 'next'
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
    default: 'Nova Baie — Création de sites web premium pour professionnels du tourisme',
    template: '%s | Nova Baie'
  },
  description: 'Nova Baie crée des sites web élégants, performants et optimisés SEO pour les hébergements touristiques, conciergeries, gîtes et hôtels indépendants. Spécialiste Baie de Somme, France entière. Design premium, conversion, référencement local.',
  keywords: [
    'création site web tourisme',
    'site web hébergement touristique',
    'site web conciergerie',
    'site web gîte',
    'site web hôtel indépendant',
    'agence web tourisme France',
    'site web location saisonnière',
    'SEO tourisme',
    'site web Baie de Somme',
    'Nova Baie',
    'Blue Baie Conciergerie',
    'site web premium tourisme',
    'création site web location vacances',
    'agence web hébergement'
  ],
  authors: [{ name: 'Nova Baie', url: 'https://www.nova-baie.com' }],
  creator: 'Nova Baie',
  publisher: 'Nova Baie',
  category: 'Agence web tourisme',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.nova-baie.com',
    siteName: 'Nova Baie',
    title: 'Nova Baie — Sites web premium pour professionnels du tourisme',
    description: 'Spécialiste de la création de sites web pour hébergements, conciergeries et acteurs du tourisme. Design premium, SEO optimisé, conversion maximisée.',
    images: [
      {
        url: 'https://www.nova-baie.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nova Baie - Création de sites web premium pour professionnels du tourisme',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova Baie — Sites web premium pour professionnels du tourisme',
    description: 'Design premium, SEO et conversion pour hébergements et conciergeries touristiques. Baie de Somme & France entière.',
    images: ['https://www.nova-baie.com/images/og-image.jpg']
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico'
  }
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
