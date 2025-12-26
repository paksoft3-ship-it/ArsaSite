import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo';
import siteConfig from '@/data/site-config.json';
import Icon from '@/components/ui/Icon';

export const metadata: Metadata = genMeta({
  title: 'Nasıl Çalışır?',
  description: '4 adımda arsanızı nakite çevirin. Bilgi verin, değerlendirme alın, teklif alın, ödeme alın. Hızlı ve güvenli süreç.',
  url: '/nasil-calisir',
});

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-dark-charcoal py-16 sm:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            4 Adımda Arsa Satış<br />
            <span className="text-primary">Süreci</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Bürokrasiyle uğraşmadan, şeffaf ve güvenilir bir şekilde arsanızı en hızlı yoldan nakite çevirin.
          </p>
        </div>
      </section>

      {/* Step 1-2: Başlangıç */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-custom">
          <div className="mb-8">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">BAŞLANGIÇ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-dark-charcoal tracking-tight mt-1">
              Süreç Nasıl Başlıyor?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 relative">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="edit_note" className="!text-[24px] text-primary" />
                </div>
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  <Icon name="schedule" className="!text-[14px]" />
                  5 Dakika
                </span>
              </div>
              <h3 className="text-xl font-bold text-dark-charcoal mb-3">Bilgileri Alıyoruz</h3>
              <p className="text-secondary-text leading-relaxed">
                Ada/Parsel ve iletişim bilgilerinizi basit formumuzu doldurarak bize iletin. Ekstra evrak veya prosedür gerekmez.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 relative">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="query_stats" className="!text-[24px] text-primary" />
                </div>
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  <Icon name="schedule" className="!text-[14px]" />
                  Aynı Gün
                </span>
              </div>
              <h3 className="text-xl font-bold text-dark-charcoal mb-3">Ön Değerlendirme</h3>
              <p className="text-secondary-text leading-relaxed">
                Uzman ekibimiz arsanızın konumunu, imar durumunu ve güncel piyasa değerini detaylıca analiz eder.
              </p>
              {/* Step Number */}
              <span className="absolute bottom-6 right-8 text-8xl font-black text-gray-200/60">1</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-dark-charcoal py-12 sm:py-16 relative">
        <div className="container-custom text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            Merak ettiniz mi? Arsanızın değerini şimdi<br className="hidden sm:block" /> öğrenin.
          </h2>
          <p className="text-gray-400 mb-8">
            Ücretsiz ve bağlayıcılığı olmayan ön değerlendirme raporunuzu hemen talep edin.
          </p>
          <Link
            href="/arsa-sat"
            className="inline-flex items-center gap-2 bg-primary text-dark-charcoal px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors"
          >
            Ücretsiz Değerleme Başlat
          </Link>
        </div>
        {/* Floating Chat Icon */}
        <div className="absolute right-6 top-6 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
          <Icon name="chat_bubble" className="!text-[24px] text-dark-charcoal" />
        </div>
      </section>

      {/* Step 3-4: Sonuç */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-custom">
          <div className="mb-8">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">SONUÇ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-dark-charcoal tracking-tight mt-1">
              Teklif ve Sonuç
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 3 */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 relative">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="request_quote" className="!text-[24px] text-primary" />
                </div>
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  <Icon name="schedule" className="!text-[14px]" />
                  24 Saat İçinde
                </span>
              </div>
              <h3 className="text-xl font-bold text-dark-charcoal mb-3">Teklif Sunumu</h3>
              <p className="text-secondary-text leading-relaxed">
                Size piyasa koşullarına uygun en adil nakit teklifimizi sunarız. Teklifi değerlendirmek tamamen sizin kararınızdır.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 relative">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="assured_workload" className="!text-[24px] text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">
                    <Icon name="verified" className="!text-[12px]" />
                    GÜVENLİ
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    <Icon name="schedule" className="!text-[14px]" />
                    2-3 İş Günü
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark-charcoal mb-3">Tapu & Ödeme</h3>
              <p className="text-secondary-text leading-relaxed">
                Anlaşılan tutarı tapu devri sırasında anında hesabınıza göndeririz. Tüm tapu masrafları tarafımızca karşılanır.
              </p>
              {/* Step Number */}
              <span className="absolute bottom-6 right-8 text-8xl font-black text-gray-200/60">4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-black text-dark-charcoal tracking-tight mb-3">
              Hazır mısınız?
            </h2>
            <p className="text-secondary-text mb-8">
              Arsanızın gerçek değerini öğrenmek ve hızlı bir satış süreci başlatmak için ilk adımı atın.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/arsa-sat"
                className="inline-flex items-center gap-2 bg-primary text-dark-charcoal px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors"
              >
                Teklif Al
                <Icon name="arrow_forward" className="!text-[18px]" />
              </Link>
              <a
                href={siteConfig.contact.phoneLink}
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-dark-charcoal px-6 py-3.5 rounded-xl font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Icon name="phone" className="!text-[18px]" />
                Bizi Arayın
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
