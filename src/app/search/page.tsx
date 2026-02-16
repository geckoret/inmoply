'use client';

import React, { useState, useMemo } from 'react';
import PropertyMap from '@/components/map/PropertyMap';
import PropertyCard from '@/components/property/PropertyCard';
import { mockProperties } from '@/lib/mockData';
import { Filter, Search as SearchIcon, SlidersHorizontal, Map as MapIcon, List } from 'lucide-react';
import Filters, { FilterState } from '@/components/search/Filters';

export default function SearchPage() {
  const [activeSegment, setActiveSegment] = useState<'all' | 'private' | 'agency'>('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [showMapMobile, setShowMapMobile] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000000],
    bedrooms: null,
    bathrooms: null,
    type: [],
    features: []
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      // Search Query
      if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !property.city.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Segment (Private/Agency)
      if (activeSegment !== 'all' && property.seller_type !== activeSegment) return false;

      // Price Range
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) return false;

      // Bedrooms
      if (filters.bedrooms !== null && property.bedrooms < filters.bedrooms) return false;

      // Type
      if (filters.type.length > 0 && !filters.type.includes(property.type)) return false;

      // Features
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every(f => property.features.includes(f));
        if (!hasAllFeatures) return false;
      }

      return true;
    });
  }, [activeSegment, filters, searchQuery]);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col overflow-hidden relative">
      <Filters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        initialFilters={filters}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setIsFiltersOpen(false);
        }}
      />

      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex flex-col md:flex-row items-center gap-4 z-20 shadow-sm">
        <div className="relative flex-1 w-full max-w-xl">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by city, neighborhood, or street..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm font-medium placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <div className="flex bg-gray-100 p-1 rounded-xl shrink-0">
            {(['all', 'private', 'agency'] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setActiveSegment(seg)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  activeSegment === seg 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {seg === 'all' ? 'All' : seg === 'private' ? 'Particulares' : 'Agencies'}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(filters.type.length > 0 || filters.bedrooms !== null || filters.features.length > 0) && (
              <span className="w-2 h-2 rounded-full bg-indigo-600 ml-1" />
            )}
          </button>

          <button
            className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold whitespace-nowrap shadow-lg shadow-indigo-200"
            onClick={() => setShowMapMobile(!showMapMobile)}
          >
            {showMapMobile ? <List className="w-4 h-4" /> : <MapIcon className="w-4 h-4" />}
            {showMapMobile ? 'List' : 'Map'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Listings Sidebar */}
        <div className={`w-full md:w-[450px] lg:w-[550px] xl:w-[650px] overflow-y-auto bg-white p-4 md:p-6 scrollbar-hide transition-transform duration-300 absolute md:relative z-10 h-full ${showMapMobile ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-gray-900">
              {filteredProperties.length} Properties found
            </h2>
            <div className="text-sm text-gray-500">
              in {searchQuery || 'Spain'}
            </div>
          </div>
          
          {filteredProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <SearchIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500 max-w-xs">Try adjusting your filters or search terms to find what you're looking for.</p>
              <button
                onClick={() => {
                  setFilters({
                    priceRange: [0, 5000000],
                    bedrooms: null,
                    bathrooms: null,
                    type: [],
                    features: []
                  });
                  setSearchQuery('');
                }}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20 md:pb-0">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>

        {/* Map View */}
        <div className={`absolute inset-0 md:relative flex-1 bg-gray-50 transition-transform duration-300 z-0 ${showMapMobile ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          <PropertyMap />
        </div>
      </div>
    </div>
  );
}
