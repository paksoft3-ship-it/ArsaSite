import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import ArsaSatPageContent from './ArsaSatPageContent';

export const metadata: Metadata = genMeta({
  title: 'Arsa Sat - Hemen Teklif Al',
  description: 'Arsanızı hızlıca satın! Ücretsiz değerlendirme, aynı gün teklif, güvenli ödeme. Türkiye genelinde arsa alım hizmeti.',
  url: '/arsa-sat',
  keywords: ['arsa sat', 'arsa satmak istiyorum', 'arsa değerleme', 'arsa teklif', 'hızlı arsa satış'],
});

export default function ArsaSatPage() {
  return <ArsaSatPageContent />;
}
