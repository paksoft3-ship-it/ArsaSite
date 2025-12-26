import { MetadataRoute } from 'next';
import siteConfig from '@/data/site-config.json';
import listingsData from '@/data/listings.json';
import blogData from '@/data/blog.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;

  // Static pages
  const staticPages = [
    '',
    '/arsa-sat',
    '/satilik-arsalar',
    '/hakkimizda',
    '/nasil-calisir',
    '/iletisim',
    '/sss',
    '/blog',
    '/kvkk',
    '/gizlilik-politikasi',
    '/cerez-politikasi',
    '/kullanim-kosullari',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : route === '/arsa-sat' ? 0.9 : 0.8,
  }));

  // Listing pages
  const listingPages = listingsData.listings.map((listing) => ({
    url: `${baseUrl}/satilik-arsalar/${listing.slug}`,
    lastModified: new Date(listing.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPages = blogData.posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Blog category pages
  const categoryPages = blogData.categories.map((cat) => ({
    url: `${baseUrl}/blog/kategori/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...listingPages, ...blogPages, ...categoryPages];
}
