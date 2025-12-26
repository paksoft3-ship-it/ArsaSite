import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import listingsData from '@/data/listings.json';
import { generateMetadata as genMeta, generateListingSchema, generateBreadcrumbSchema } from '@/lib/seo';
import ListingDetailContent from './ListingDetailContent';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return listingsData.listings.map((listing) => ({
    slug: listing.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = listingsData.listings.find((l) => l.slug === params.slug);

  if (!listing) {
    return genMeta({ title: 'İlan Bulunamadı' });
  }

  return genMeta({
    title: `${listing.title} - ${listing.imarDurumu} ${listing.size} m²`,
    description: listing.description,
    url: `/satilik-arsalar/${listing.slug}`,
    keywords: [listing.city, listing.district, listing.imarDurumu, 'satılık arsa'],
    image: listing.mainImage,
  });
}

export default function ListingDetailPage({ params }: Props) {
  const listing = listingsData.listings.find((l) => l.slug === params.slug);

  if (!listing) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Satılık Arsalar', url: '/satilik-arsalar' },
    { name: listing.city, url: `/satilik-arsalar?city=${listing.city}` },
    { name: listing.shortTitle, url: `/satilik-arsalar/${listing.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateListingSchema({
              title: listing.title,
              description: listing.description,
              price: listing.price,
              images: listing.images,
              url: `/satilik-arsalar/${listing.slug}`,
              city: listing.city,
              size: listing.size,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <ListingDetailContent listing={listing} />
    </>
  );
}
