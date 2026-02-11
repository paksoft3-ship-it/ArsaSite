'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Listing } from '@/types';
import listingsData from '@/data/listings.json';
import siteConfig from '@/data/site-config.json';
import Icon from '@/components/ui/Icon';
import { formatArea, generateWhatsAppLink, formatPriceShort } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const category = listingsData.categories.find((c) => c.id === listing.category);

  const getCategoryColor = (catId: string) => {
    switch (catId) {
      case 'konut-imarli': return 'bg-primary text-dark-charcoal';
      case 'tarla': return 'bg-primary text-dark-charcoal';
      case 'villa-imarli': return 'bg-primary text-dark-charcoal';
      case 'ticari-imarli': return 'bg-rose-500 text-white';
      case 'turizm-imarli': return 'bg-amber-500 text-white';
      case 'sanayi-imarli': return 'bg-slate-600 text-white';
      default: return 'bg-primary text-dark-charcoal';
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    const message = `Merhaba, "${listing.title}" ilanı hakkında bilgi almak istiyorum.`;
    window.open(generateWhatsAppLink(siteConfig.contact.whatsapp, message), '_blank');
  };

  // Determine image source (use dummy if not present)
  const imageSrc = listing.mainImage || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link href={`/satilik-arsalar/${listing.slug}`} className="block relative aspect-[4/3] overflow-hidden group">
        <Image
          src={imageSrc}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold ${getCategoryColor(listing.category)}`}>
            {category?.label.toUpperCase() || listing.category.toUpperCase()}
          </span>
        </div>

        {/* Photo Count */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2.5 py-1 rounded-lg text-xs flex items-center gap-1">
          <Icon name="photo_camera" className="!text-[14px]" />
          {listing.photoCount}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <Link href={`/satilik-arsalar/${listing.slug}`}>
          <h3 className="text-lg font-bold text-dark-charcoal mb-1 hover:text-primary transition-colors line-clamp-1">
            {listing.district} / {listing.neighborhood}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <Icon name="location_on" className="!text-[16px] text-primary" />
          <span>{listing.city}</span>
        </div>

        {/* Price */}
        <div className="text-2xl font-extrabold text-primary mb-4">
          {formatPriceShort(listing.price)}
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
        <div className="space-y-2 mb-5 flex-1">
          {listing.highlights.slice(0, 2).map((highlight, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="check_circle" className="!text-[18px] text-primary" />
              <span className="line-clamp-1">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <Link
            href={`/satilik-arsalar/${listing.slug}`}
            className="flex-1 bg-primary text-dark-charcoal text-center py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            İncele
          </Link>
          <button
            onClick={handleWhatsAppClick}
            className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-all"
            aria-label="WhatsApp"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
