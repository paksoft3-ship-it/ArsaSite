import Link from 'next/link';
import homeContent from '@/data/home-content.json';
import listingsData from '@/data/listings.json';
import Icon from '@/components/ui/Icon';
import ListingCard from '@/components/cards/ListingCard';

export default function FeaturedListings() {
  const { featuredListings } = homeContent;
  const featured = listingsData.listings.filter(listing => listing.isFeatured).slice(0, 4);

  return (
    <section className="section bg-background-light">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="section-title">{featuredListings.title}</h2>
            <p className="section-description">{featuredListings.description}</p>
          </div>
          <Link
            href={featuredListings.viewAllLink.href}
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
          >
            {featuredListings.viewAllLink.label}
            <Icon name="arrow_forward" className="!text-[18px]" />
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* Sell CTA Banner */}
        <div className="mt-12 bg-dark-charcoal rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-map-pattern opacity-20" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {homeContent.sellCta.title}
              </h3>
              <p className="text-gray-300">
                {homeContent.sellCta.description}
              </p>
            </div>
            <Link
              href={homeContent.sellCta.button.href}
              className="btn-primary btn-lg whitespace-nowrap"
            >
              {homeContent.sellCta.button.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
