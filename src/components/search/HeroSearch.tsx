'use client';

import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Home } from 'lucide-react';
import Link from 'next/link';

type SearchType = 'buy' | 'rent';
type PropertyType = 'any' | 'house' | 'apartment' | 'penthouse' | 'loft';

const HeroSearch = () => {
  const [searchType, setSearchType] = useState<SearchType>('buy');
  const [propertyType, setPropertyType] = useState<PropertyType>('any');
  const [location, setLocation] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append('type', searchType);
    if (propertyType !== 'any') params.append('property_type', propertyType);
    if (location) params.append('location', location);
    if (priceMax) params.append('price_max', priceMax);
    
    window.location.href = `/search?${params.toString()}`;
  };

  const propertyTypeOptions = [
    { value: 'any', label: 'Cualquier tipo' },
    { value: 'apartment', label: 'Apartamento' },
    { value: 'house', label: 'Casa' },
    { value: 'penthouse', label: 'Ático' },
    { value: 'loft', label: 'Loft' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <div className="bg-white/90 backdrop-blur p-1 rounded-full shadow-lg inline-flex">
          {[
            { value: 'buy', label: 'Comprar' },
            { value: 'rent', label: 'Alquilar' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSearchType(option.value as SearchType)}
              className={`px-8 py-2.5 rounded-full font-semibold transition-all ${
                searchType === option.value
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Search Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Location */}
          <div className="md:col-span-4 relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Ubicación
            </label>
            <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Madrid, Barcelona..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                />
            </div>
          </div>

          {/* Type */}
          <div className="md:col-span-3 relative">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Tipo
            </label>
            <div className="relative">
                <Home className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full pl-10 pr-8 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all appearance-none cursor-pointer font-medium text-slate-900 bg-white"
                >
                    {propertyTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>
            </div>
          </div>

          {/* Price Range (Simplified for UI, maybe just one input or two small ones) */}
          <div className="md:col-span-3 relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Precio Max
            </label>
            <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                 <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    placeholder="No límite"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
                />
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2 flex items-end">
            <button
              onClick={handleSearch}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Buscar</span>
            </button>
          </div>
        </div>

        {/* Advanced Link */}
        <div className="mt-4 flex justify-end">
            <Link href="/search?advanced=true" className="text-sm font-medium text-brand-600 hover:text-brand-800 underline">
                Búsqueda avanzada
            </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
