'use client';

import Link from 'next/link';
import type { Listing } from '@/types';
import listingsData from '@/data/listings.json';
import siteConfig from '@/data/site-config.json';
import Icon from '@/components/ui/Icon';
import { formatPrice, formatArea, generateWhatsAppLink } from '@/lib/utils';

interface Props {
  listing: Listing;
}

// Sample images for demo
const sampleImages = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop',
];

export default function ListingDetailContent({ listing }: Props) {
  const category = listingsData.categories.find((c) => c.id === listing.category);

  const handleWhatsAppClick = () => {
    const message = `Merhaba, "${listing.title}" (İlan No: #${listing.id}) hakkında bilgi almak istiyorum.`;
    window.open(generateWhatsAppLink(siteConfig.contact.whatsapp, message), '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Announcement Bar */}
      <div className="bg-primary/10 py-2 text-sm">
        <div className="container-custom flex items-center justify-between">
          <span className="text-primary font-medium">
            ArsaBorsası - Türkiye'nin Hızlı Arsa Satış Platformu
          </span>
          <Link href="/arsa-sat" className="text-dark-charcoal font-medium hover:text-primary transition-colors flex items-center gap-1">
            Satmak istediğiniz arsa için hemen teklif alın
            <Icon name="arrow_forward" className="!text-[16px]" />
          </Link>
        </div>
      </div>

      <div className="container-custom py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-secondary-text hover:text-primary transition-colors">
            Anasayfa
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/satilik-arsalar" className="text-secondary-text hover:text-primary transition-colors">
            Satılık Arsalarımız
          </Link>
          <span className="text-gray-300">/</span>
          <Link href={`/satilik-arsalar?city=${listing.city}`} className="text-secondary-text hover:text-primary transition-colors">
            {listing.city}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-dark-charcoal font-medium">{listing.district}</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-dark-charcoal tracking-tight mb-2">
          {listing.title}
        </h1>
        <div className="flex items-center gap-1.5 text-primary mb-6">
          <Icon name="location_on" className="!text-[20px]" />
          <span className="font-medium">{listing.neighborhood}, {listing.city}</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-3 gap-3">
              {/* Main Image */}
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${listing.images?.[0] || sampleImages[0]})`, backgroundColor: '#e5e7eb' }}
                />
                {listing.isFeatured && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary text-dark-charcoal px-3 py-1.5 rounded-lg text-xs font-bold">
                      Fırsat İlanı
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail 1 */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${listing.images?.[1] || sampleImages[1]})`, backgroundColor: '#e5e7eb' }}
                />
              </div>

              {/* Thumbnail 2 */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${listing.images?.[2] || sampleImages[2]})`, backgroundColor: '#e5e7eb' }}
                />
              </div>

              {/* Thumbnail 3 with overlay */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer group">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${listing.images?.[3] || sampleImages[3]})`, backgroundColor: '#e5e7eb' }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">+{listing.photoCount - 3} Fotoğraf</span>
                </div>
              </div>
            </div>

            {/* İlan Özellikleri */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-dark-charcoal mb-5">İlan Özellikleri</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-primary text-sm mb-1">
                    <Icon name="straighten" className="!text-[18px]" />
                    <span>Metrekare</span>
                  </div>
                  <div className="text-lg font-bold text-dark-charcoal">{formatArea(listing.size)}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-primary text-sm mb-1">
                    <Icon name="domain" className="!text-[18px]" />
                    <span>İmar Durumu</span>
                  </div>
                  <div className="text-lg font-bold text-dark-charcoal">{listing.imarDurumu}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-primary text-sm mb-1">
                    <Icon name="description" className="!text-[18px]" />
                    <span>Ada / Parsel</span>
                  </div>
                  <div className="text-lg font-bold text-dark-charcoal">{listing.adaParsel}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-primary text-sm mb-1">
                    <Icon name="sell" className="!text-[18px]" />
                    <span>Fiyat</span>
                  </div>
                  <div className="text-lg font-bold text-dark-charcoal">{formatPrice(listing.price)}</div>
                </div>
              </div>
            </div>

            {/* İlan Açıklaması */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-dark-charcoal mb-4">İlan Açıklaması</h2>
              <div className="text-secondary-text leading-relaxed space-y-4 mb-6">
                <p>{listing.description}</p>
                <p>
                  Bölgenin hızla değer kazanan lokasyonlarından birinde yer alan arazimiz, otoban bağlantısına yakınlığı ile
                  şehir merkezine ulaşım kolaylığı sunmaktadır. Etrafında lüks villaların bulunduğu nezih bir mahallede yer
                  almaktadır.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3">
                {listing.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2 text-dark-charcoal">
                    <Icon name="check_circle" className="!text-[20px] text-primary" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Konum Bilgisi */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-dark-charcoal mb-4">Konum Bilgisi</h2>
              <div className="relative rounded-xl overflow-hidden aspect-[2/1] bg-gray-200">
                {/* Map Placeholder */}
                <div className="absolute inset-0 bg-[#e8f4f0]">
                  <div className="absolute inset-0 opacity-50">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ccc" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect fill="url(#grid)" width="100%" height="100%" />
                    </svg>
                  </div>
                  {/* Location Marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Icon name="location_on" className="!text-[20px] text-dark-charcoal" />
                      </div>
                    </div>
                    <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-dark-charcoal">
                      İlan Konumu
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  İLGİLENİYOR MUSUNUZ?
                </span>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="phone_in_talk" className="!text-[20px] text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-dark-charcoal mb-4">
                Bu ilan hakkında detaylı bilgi alın.
              </h3>

              <div className="space-y-3 mb-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full text-white py-3.5 rounded-xl font-bold text-sm hover:brightness-110 transition-colors flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.664-.698c.975.551 1.803.842 2.803.843 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.774-5.771zm3.392 8.244c-1.352.766-1.895 1.391-2.909 1.258-1.577-.206-3.235-1.921-3.951-3.136-.379-.641-.186-1.488.468-2.076.166-.149.37-.215.549-.215.228 0 .395.006.474.019.222.035.348.118.423.298.196.475.642 1.638.691 1.748.061.135.035.298-.078.498-.148.263-.332.391-.482.569-.136.161-.284.281-.132.541.348.598 1.484 1.838 2.378 2.214.281.118.513.067.688-.135.201-.231.523-.695.696-.918.158-.205.356-.166.578-.083.216.082 1.383.652 1.62.77.237.118.395.176.452.275.059.1.059.576-.234 1.391zM12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5l-1.35 4.9 5.09-1.33C8.6 21.6 10.25 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                  WhatsApp ile Yazın
                </button>
                <a
                  href={siteConfig.contact.phoneLink}
                  className="w-full border-2 border-gray-200 text-dark-charcoal py-3.5 rounded-xl font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4.5 h-4.5">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>
                  Hemen Arayın
                </a>
              </div>

              <p className="text-center text-xs text-gray-400">
                İlan No: #{listing.id}
              </p>
            </div>

            {/* Sell CTA Card */}
            <div className="bg-dark-charcoal rounded-2xl p-6">
              <span className="inline-block bg-primary text-dark-charcoal px-2.5 py-1 rounded-md text-xs font-bold mb-3">
                Hızlı Satış
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Arsanızı satmak mı istiyorsunuz?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Değerinde nakit teklifimizle arsanızı günler içinde satın alıyoruz.
              </p>
              <Link
                href="/arsa-sat"
                className="w-full bg-primary text-dark-charcoal py-3 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
              >
                Hemen Teklif Alın
                <Icon name="arrow_forward" className="!text-[18px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
