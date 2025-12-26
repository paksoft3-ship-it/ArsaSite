import type { Metadata } from 'next';
import { generateMetadata as genMeta, generateFAQSchema } from '@/lib/seo';
import faqData from '@/data/faq.json';
import FAQPageContent from './FAQPageContent';

export const metadata: Metadata = genMeta({
  title: 'Sıkça Sorulan Sorular',
  description: 'Arsa satışı, ödeme, yasal süreçler ve daha fazlası hakkında en çok sorulan sorular ve cevapları.',
  url: '/sss',
});

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqData.questions)),
        }}
      />
      <FAQPageContent />
    </>
  );
}
