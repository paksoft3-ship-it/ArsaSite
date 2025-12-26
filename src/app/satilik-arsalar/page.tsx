import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import ListingsPageContent from './ListingsPageContent';

export const metadata: Metadata = genMeta({
  title: 'Satılık Arsalar',
  description: 'Türkiye genelinde satılık arsalar. Konut imarlı, villa imarlı, tarla ve ticari arsalar. Filtreleyerek size en uygun arsayı bulun.',
  url: '/satilik-arsalar',
  keywords: ['satılık arsa', 'arsa ilanları', 'konut imarlı arsa', 'villa imarlı arsa', 'tarla'],
});

export default function ListingsPage() {
  return <ListingsPageContent />;
}
