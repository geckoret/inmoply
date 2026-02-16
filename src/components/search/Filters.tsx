'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface FiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

export interface FilterState {
  priceRange: [number, number];
  bedrooms: number | null; // null means 'Any'
  bathrooms: number | null;
  type: string[];
  features: string[];
}

const PROPERTY_TYPES = [
  { id: 'house', label: 'House' },
  { id: 'apartment', label: 'Apartment' },
  { id: 'penthouse', label: 'Penthouse' },
  { id: 'loft', label: 'Loft' },
  { id: 'duplex', label: 'Duplex' },
];

const FEATURES = [
  'Terrace', 'Elevator', 'Air Conditioning', 'Pool', 'Garage', 'Garden', 'Smart Home'
];

export default function Filters({ isOpen, onClose, onApply, initialFilters }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  if (!isOpen) return null;

  const handleTypeToggle = (typeId: string) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(typeId)
        ? prev.type.filter(t => t !== typeId)
        : [...prev.type, typeId]
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b border-gray-100 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Price Range */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Price Range</h3>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                  placeholder="Min"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                  placeholder="Max"
                />
              </div>
            </div>
          </section>

          {/* Property Type */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Property Type</h3>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeToggle(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filters.type.includes(type.id)
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </section>

          {/* Beds & Baths */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Rooms</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-2 block">Bedrooms</label>
                <div className="flex bg-gray-50 p-1 rounded-xl w-fit">
                  {[null, 1, 2, 3, 4].map((num) => (
                    <button
                      key={String(num)}
                      onClick={() => setFilters({ ...filters, bedrooms: num })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.bedrooms === num
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {num === null ? 'Any' : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map((feature) => (
                <label key={feature} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 cursor-pointer transition-all group">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    filters.features.includes(feature)
                      ? 'bg-indigo-600 border-indigo-600'
                      : 'border-gray-300 bg-white group-hover:border-indigo-300'
                  }`}>
                    {filters.features.includes(feature) && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={filters.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                  <span className={`text-sm font-medium transition-colors ${
                    filters.features.includes(feature) ? 'text-indigo-900' : 'text-gray-600'
                  }`}>
                    {feature}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex gap-4">
          <button
            onClick={() => setFilters(initialFilters)}
            className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => onApply(filters)}
            className="flex-[2] px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}
