import type { Metadata } from 'next';
import siteConfig from '@/data/site-config.json';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
}: SEOProps): Metadata {
  const fullTitle = title 
    ? `${title} | ${siteConfig.siteName}` 
    : siteConfig.siteTitle;
  
  const metaDescription = description || siteConfig.siteDescription;
  const metaImage = image || siteConfig.seo.ogImage;
  const metaUrl = url ? `${siteConfig.siteUrl}${url}` : siteConfig.siteUrl;
  const metaKeywords = keywords || siteConfig.seo.keywords;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: siteConfig.siteName,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'tr_TR',
      type: type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.seo.twitterHandle,
    },
    alternates: {
      canonical: metaUrl,
    },
    robots: noIndex 
      ? { index: false, follow: false } 
      : { index: true, follow: true },
  };
}

// Generate JSON-LD structured data for organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/images/logo.png`,
    description: siteConfig.siteDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.full,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: 'TR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phoneFormatted,
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: 'Turkish',
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
    ],
  };
}

// Generate JSON-LD structured data for local business
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/images/logo.png`,
    image: `${siteConfig.siteUrl}/images/office.jpg`,
    description: siteConfig.siteDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.full,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.1082',
      longitude: '29.0267',
    },
    telephone: siteConfig.contact.phoneFormatted,
    email: siteConfig.contact.email,
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '₺₺₺',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
  };
}

// Generate JSON-LD structured data for product (listing)
export function generateListingSchema(listing: {
  title: string;
  description: string;
  price: number;
  images: string[];
  url: string;
  city: string;
  size: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.title,
    description: listing.description,
    image: listing.images,
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.siteUrl}${listing.url}`,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Konum',
        value: listing.city,
      },
      {
        '@type': 'PropertyValue',
        name: 'Alan',
        value: `${listing.size} m²`,
      },
    ],
  };
}

// Generate JSON-LD structured data for blog post
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    url: `${siteConfig.siteUrl}${article.url}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.siteUrl}${article.url}`,
    },
  };
}

// Generate JSON-LD structured data for FAQ page
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate JSON-LD structured data for breadcrumb
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}
