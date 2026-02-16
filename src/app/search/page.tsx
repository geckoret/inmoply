'use client';

import React, { useState } from 'react';
import PropertyMap from '@/components/map/PropertyMap';
import PropertyCard from '@/components/property/PropertyCard';
import { Property } from '@/types';
import { Filter, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Penthouse with Panoramic Views',
    description: 'Beautiful penthouse in the heart of the city.',
    price: 850000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    address: 'Calle Serrano, Madrid',
    city: 'Madrid',
    lat: 40.416775,
    lng: -3.703790,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    is_verified: true,
    seller_type: 'agency',
    created_at: new Date().toISOString(),
    features: ['Terrace', 'Elevator', 'Air Conditioning']
  },
  {
    id: '2',
    title: 'Modern Loft in Poblenou',
    description: 'Industrial style loft with high ceilings.',
    price: 420000,
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    address: 'Carrer de Llull, Barcelona',
    city: 'Barcelona',
    lat: 41.385063,
    lng: 2.173404,
    images: ['https://images.unsplash.com/photo-1600607687940-477a63bd394c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    is_verified: true,
    seller_type: 'private',
    created_at: new Date().toISOString(),
    features: ['Parking', 'Smart Home', 'Large Windows']
  }
];

export default function SearchPage() {
  const [activeSegment, setActiveSegment] = useState<'all' | 'private' | 'agency'>('all');

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full max-w-xl">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by city, neighborhood, or street..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {(['all', 'private', 'agency'] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setActiveSegment(seg)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  activeSegment === seg 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {seg === 'all' ? 'All' : seg === 'private' ? 'Particulares' : 'Agencies'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" />
            Sort
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Listings Sidebar */}
        <div className="w-full md:w-[450px] lg:w-[550px] xl:w-[650px] overflow-y-auto bg-white p-6 scrollbar-hide">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-gray-900">
              {mockProperties.length} Properties found
            </h2>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {mockProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Map View */}
        <div className="hidden md:block flex-1 bg-gray-50 p-4">
          <PropertyMap />
        </div>
      </div>
    </div>
  );
}
