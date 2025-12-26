import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = genMeta({
  title: 'İletişim',
  description: 'ArsaAl ile iletişime geçin. Arsanızı satmak veya sorularınızı sormak için bize ulaşın. Hızlı ve profesyonel destek.',
  url: '/iletisim',
});

export default function ContactPage() {
  return <ContactPageContent />;
}
