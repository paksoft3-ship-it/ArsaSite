'use client';

import { useState } from 'react';
import { ListingCategory } from '@/types';
import listingsData from '@/data/listings.json';
import citiesData from '@/data/cities.json';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface ListingsFilterProps {
  categories: ListingCategory[];
}

export default function ListingsFilter({ categories }: ListingsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    priceMin: '',
    priceMax: '',
    sizeMin: '',
    sizeMax: '',
    sort: 'newest',
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      priceMin: '',
      priceMax: '',
      sizeMin: '',
      sizeMax: '',
      sort: 'newest',
    });
    setActiveCategory('all');
  };

  const getCategoryColor = (color: string, isActive: boolean) => {
    if (!isActive) return 'bg-gray-100 text-gray-600 hover:bg-gray-200';

    const colors: Record<string, string> = {
      emerald: 'bg-primary/10 text-primary-dark ring-2 ring-primary/20', // Mapped to primary
      cyan: 'bg-accent/10 text-accent-dark ring-2 ring-accent/20',
      amber: 'bg-amber-100 text-amber-700 ring-2 ring-amber-500',
      blue: 'bg-blue-100 text-blue-700 ring-2 ring-blue-500',
      purple: 'bg-purple-100 text-purple-700 ring-2 ring-purple-500',
      rose: 'bg-rose-100 text-rose-700 ring-2 ring-rose-500',
      slate: 'bg-slate-100 text-slate-700 ring-2 ring-slate-500',
    };
    return colors[color] || colors.emerald;
  };

  return (
    <section className="sticky top-16 sm:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-custom py-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeCategory === 'all'
                ? 'bg-primary text-dark-charcoal ring-2 ring-primary'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all',
                getCategoryColor(category.color, activeCategory === category.id)
              )}
            >
              {category.label}
            </button>
          ))}

          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              'flex-shrink-0 ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
              isFilterOpen
                ? 'bg-dark-charcoal text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            <Icon name="tune" className="!text-[18px]" />
            Filtrele
          </button>
        </div>

        {/* Expanded Filters */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            isFilterOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          <div className="bg-background-light rounded-2xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* City */}
              <div>
                <label className="text-xs font-bold text-secondary-text mb-1 block">
                  Şehir
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="select text-sm py-2"
                >
                  <option value="">Tüm Şehirler</option>
                  {citiesData.popularCities.map((slug) => {
                    const city = citiesData.cities.find((c) => c.slug === slug);
                    return city ? (
                      <option key={city.id} value={city.slug}>
                        {city.name}
                      </option>
                    ) : null;
                  })}
                  <option disabled>──────────</option>
                  {citiesData.cities.map((city) => (
                    <option key={city.id} value={city.slug}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-xs font-bold text-secondary-text mb-1 block">
                  Fiyat Aralığı
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min ₺"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    className="input text-sm py-2 flex-1"
                  />
                  <input
                    type="number"
                    placeholder="Max ₺"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    className="input text-sm py-2 flex-1"
                  />
                </div>
              </div>

              {/* Size Range */}
              <div>
                <label className="text-xs font-bold text-secondary-text mb-1 block">
                  Metrekare
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min m²"
                    value={filters.sizeMin}
                    onChange={(e) => handleFilterChange('sizeMin', e.target.value)}
                    className="input text-sm py-2 flex-1"
                  />
                  <input
                    type="number"
                    placeholder="Max m²"
                    value={filters.sizeMax}
                    onChange={(e) => handleFilterChange('sizeMax', e.target.value)}
                    className="input text-sm py-2 flex-1"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-xs font-bold text-secondary-text mb-1 block">
                  Sıralama
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="select text-sm py-2"
                >
                  {listingsData.filters.sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="text-sm text-secondary-text hover:text-dark-charcoal transition-colors"
              >
                <Icon name="clear" className="!text-[16px] mr-1" />
                Filtreleri Temizle
              </button>
              <button className="btn-primary btn-sm">
                <Icon name="search" className="!text-[18px] mr-1" />
                Uygula
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
