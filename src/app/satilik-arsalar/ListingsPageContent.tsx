'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import listingsData from '@/data/listings.json';
import siteConfig from '@/data/site-config.json';
import Icon from '@/components/ui/Icon';
import { formatArea, generateWhatsAppLink } from '@/lib/utils';

// Sample images for demo
const sampleImages = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
];

export default function ListingsPageContent() {
  const [filters, setFilters] = useState({
    city: '',
    district: '',
    imarStatus: 'all', // all, imarli, imarsiz
    minSize: 100,
    maxSize: 5000,
    sort: 'newest',
  });
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredListings = useMemo(() => {
    let result = [...listingsData.listings];

    // Filter by city
    if (filters.city) {
      result = result.filter(
        (l) => l.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Filter by imar status
    if (filters.imarStatus === 'imarli') {
      result = result.filter((l) => l.category !== 'tarla');
    } else if (filters.imarStatus === 'imarsiz') {
      result = result.filter((l) => l.category === 'tarla');
    }

    // Filter by size
    result = result.filter(
      (l) => l.size >= filters.minSize && l.size <= filters.maxSize
    );

    // Sort
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'size-asc':
        result.sort((a, b) => a.size - b.size);
        break;
      case 'size-desc':
        result.sort((a, b) => b.size - a.size);
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [filters]);

  const visibleListings = filteredListings.slice(0, visibleCount);

  const handleFilterChange = (name: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setVisibleCount(6);
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      district: '',
      imarStatus: 'all',
      minSize: 100,
      maxSize: 5000,
      sort: 'newest',
    });
    setVisibleCount(6);
  };

  const getCategoryLabel = (category: string) => {
    const cat = listingsData.categories.find((c) => c.id === category);
    return cat?.label.toUpperCase() || category.toUpperCase();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'konut-imarli':
        return 'bg-dark-charcoal text-white';
      case 'tarla':
        return 'bg-primary text-dark-charcoal';
      case 'villa-imarli':
        return 'bg-primary text-dark-charcoal';
      case 'ticari-imarli':
        return 'bg-rose-500 text-white';
      case 'turizm-imarli':
        return 'bg-amber-500 text-white';
      case 'sanayi-imarli':
        return 'bg-slate-600 text-white';
      default:
        return 'bg-primary text-dark-charcoal';
    }
  };

  const handleWhatsAppClick = (listing: typeof listingsData.listings[0]) => {
    const message = `Merhaba, "${listing.title}" ilanı hakkında bilgi almak istiyorum.`;
    window.open(generateWhatsAppLink(siteConfig.contact.whatsapp, message), '_blank');
  };

  // Get unique cities from listings
  const cities = Array.from(new Set(listingsData.listings.map((l) => l.city)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-6">
            {/* CTA Card */}
            <div className="bg-dark-charcoal rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">
                Arsanızı Satmak mı İstiyorsunuz?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Ücretsiz değerlendirme ile arsanızı hemen nakite çevirin.
              </p>
              <Link
                href="/arsa-sat"
                className="block w-full bg-primary text-dark-charcoal text-center py-3 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors"
              >
                Hemen Teklif Al
              </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-dark-charcoal">Filtreler</h3>
                <button
                  onClick={clearFilters}
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  Temizle
                </button>
              </div>

              {/* City */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-dark-charcoal mb-2">
                  Şehir
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Tüm Şehirler</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-dark-charcoal mb-2">
                  İlçe
                </label>
                <select
                  value={filters.district}
                  onChange={(e) => handleFilterChange('district', e.target.value)}
                  disabled={!filters.city}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:opacity-50"
                >
                  <option value="">Önce Şehir Seçin</option>
                </select>
              </div>

              {/* Imar Status */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-dark-charcoal mb-2">
                  İmar Durumu
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'Hepsi' },
                    { value: 'imarli', label: 'İmarlı' },
                    { value: 'imarsiz', label: 'İmarsız' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('imarStatus', option.value)}
                      className={`flex-1 py-2 px-3 rounded-full text-sm font-medium transition-all ${filters.imarStatus === option.value
                        ? 'bg-primary text-dark-charcoal'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-charcoal mb-2">
                  m² Aralığı
                </label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={filters.maxSize}
                  onChange={(e) => handleFilterChange('maxSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{filters.minSize} m²</span>
                  <span>{filters.maxSize.toLocaleString('tr-TR')} m²</span>
                </div>
              </div>

              {/* Apply Button */}
              <button className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-dark-charcoal transition-all flex items-center justify-center gap-2">
                <Icon name="tune" className="!text-[18px]" />
                Sonuçları Göster
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-dark-charcoal tracking-tight">
                  Satılık Arsalarımız
                </h1>
                <p className="text-secondary-text mt-1">
                  Geleceğinize yatırım yapın. Sizin için seçtiğimiz{' '}
                  <span className="text-primary font-semibold">{filteredListings.length}</span> fırsat.
                </p>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-2">
                <span className="text-sm text-gray-500">Sırala:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="bg-transparent text-sm font-medium text-dark-charcoal outline-none cursor-pointer"
                >
                  <option value="newest">En Yeni</option>
                  <option value="price-asc">Fiyat (Düşük)</option>
                  <option value="price-desc">Fiyat (Yüksek)</option>
                  <option value="size-asc">m² (Küçük)</option>
                  <option value="size-desc">m² (Büyük)</option>
                </select>
              </div>
            </div>

            {/* Listings Grid */}
            {visibleListings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visibleListings.map((listing, index) => (
                    <div
                      key={listing.id}
                      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Full Card Link Overlay */}
                      <Link
                        href={`/satilik-arsalar/${listing.slug}`}
                        className="absolute inset-0 z-10"
                        aria-label={`${listing.title} detaylarını incele`}
                      />

                      {/* Image */}
                      <div className="relative aspect-[4/3]">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${sampleImages[index % sampleImages.length]})`,
                            backgroundColor: '#e5e7eb',
                          }}
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span
                            className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold ${getCategoryColor(
                              listing.category
                            )}`}
                          >
                            {getCategoryLabel(listing.category)}
                          </span>
                        </div>
                        {/* Photo Count */}
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 z-20">
                          <Icon name="photo_camera" className="!text-[14px]" />
                          {listing.photoCount}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-dark-charcoal mb-1 group-hover:text-primary transition-colors">
                          {listing.district} / {listing.neighborhood}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                          <Icon name="location_on" className="!text-[16px] text-primary" />
                          <span>{listing.city}</span>
                        </div>

                        {/* Price */}
                        <div className="text-xl font-extrabold text-primary mb-4">
                          {listing.price.toLocaleString('tr-TR')} ₺
                        </div>

                        {/* Size & Ada/Parsel */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-500 font-medium mb-1">Büyüklük</div>
                            <div className="font-bold text-dark-charcoal">{formatArea(listing.size)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500 font-medium mb-1">Ada / Parsel</div>
                            <div className="font-bold text-dark-charcoal">{listing.adaParsel}</div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-2 mb-5">
                          {listing.highlights.slice(0, 2).map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <Icon name="check_circle" className="!text-[18px] text-primary" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 relative z-20">
                          <Link
                            href={`/satilik-arsalar/${listing.slug}`}
                            className="flex-1 bg-primary text-dark-charcoal text-center py-3 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors relative z-20"
                          >
                            İncele
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // Prevent triggering the card link
                              e.stopPropagation();
                              handleWhatsAppClick(listing);
                            }}
                            className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-400 hover:border-[#25D366] hover:text-[#25D366] transition-all relative z-20 group/wa"
                            aria-label="WhatsApp"
                          >
                            <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                {visibleCount < filteredListings.length && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-gray-200 text-dark-charcoal font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      Daha Fazla Göster
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <Icon name="search_off" className="!text-[64px] text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-dark-charcoal mb-2">
                  İlan Bulunamadı
                </h3>
                <p className="text-secondary-text mb-6">
                  Seçtiğiniz kriterlere uygun ilan bulunamadı.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary px-6 py-3 text-sm"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
