import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingActionButtons from '@/components/ui/FloatingActionButtons';
import siteConfig from '@/data/site-config.json';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteTitle,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.siteName }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.siteTitle,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    images: [siteConfig.seo.ogImage],
    creator: siteConfig.seo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        {/* Google Fonts - loaded via link tag instead of next/font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Material Symbols */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema()),
          }}
        />

        {/* Google Analytics */}
        {siteConfig.analytics.googleAnalyticsId && siteConfig.analytics.googleAnalyticsId !== 'G-XXXXXXXXXX' && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.analytics.googleAnalyticsId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google Ads */}
        {siteConfig.analytics.googleAdsId && siteConfig.analytics.googleAdsId !== 'AW-XXXXXXXXXX' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                gtag('config', '${siteConfig.analytics.googleAdsId}');
              `,
            }}
          />
        )}
      </head>
      <body className="flex flex-col min-h-screen font-display pb-20 sm:pb-0">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <FloatingActionButtons />
      </body>
    </html>
  );
}
