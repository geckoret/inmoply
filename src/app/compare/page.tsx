'use client';

import React from 'react';
import { useComparisonStore } from '@/store/useComparisonStore';
import { Bed, Bath, Square, ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const { items, removeItem, clearItems } = useComparisonStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">No properties to compare</h1>
        <p className="text-gray-500 mb-8">Add up to 3 properties to see them side-by-side.</p>
        <Link href="/search" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold">
          Go to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold">Smart Comparison</h1>
        </div>
        <button 
          onClick={clearItems}
          className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((property) => (
          <div key={property.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="relative aspect-video">
              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => removeItem(property.id)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-xl text-red-500 shadow-sm"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{property.title}</h3>
              <p className="text-2xl font-black text-indigo-600 mb-6">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}
              </p>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500">Bedrooms</span>
                  <div className="flex items-center gap-2 font-semibold">
                    <Bed className="w-4 h-4 text-gray-400" />
                    {property.bedrooms}
                  </div>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500">Bathrooms</span>
                  <div className="flex items-center gap-2 font-semibold">
                    <Bath className="w-4 h-4 text-gray-400" />
                    {property.bathrooms}
                  </div>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500">Area</span>
                  <div className="flex items-center gap-2 font-semibold">
                    <Square className="w-4 h-4 text-gray-400" />
                    {property.area} m²
                  </div>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500">Type</span>
                  <span className="font-semibold capitalize">{property.seller_type}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500">Verified</span>
                  <span className={`font-semibold ${property.is_verified ? 'text-green-600' : 'text-gray-400'}`}>
                    {property.is_verified ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              <Link 
                href={`/properties/${property.id}`}
                className="mt-8 block w-full py-4 text-center bg-gray-50 text-gray-900 rounded-2xl font-bold hover:bg-gray-100 transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
