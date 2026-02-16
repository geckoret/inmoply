'use client';

import React from 'react';
import { mockProperties } from '@/lib/mockData';
import PropertyCard from '@/components/property/PropertyCard';
import { Heart, Search, Bell, Home } from 'lucide-react';
import Link from 'next/link';

export default function PrivateDashboard() {
  const favorites = mockProperties.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-500">Welcome back, Alex.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Favorites</p>
            <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-500">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Saved Searches</p>
            <p className="text-2xl font-bold text-gray-900">4</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Alerts</p>
            <p className="text-2xl font-bold text-gray-900">2 New</p>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Saved Properties</h2>
          <Link href="/search" className="text-indigo-600 font-semibold hover:text-indigo-700">
            Find more properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <div key={property.id} className="h-[400px]">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {/* Saved Searches */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Searches</h2>
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="divide-y divide-gray-100">
            {[
              { query: 'Madrid, Centro', filters: '2+ Beds, < €500k', date: '2 days ago' },
              { query: 'Barcelona, Poblenou', filters: 'Loft, 1+ Bath', date: '5 days ago' },
              { query: 'Valencia, Beach', filters: 'Pool, Terrace', date: '1 week ago' },
            ].map((search, i) => (
              <div key={i} className="p-4 hover:bg-gray-50 flex justify-between items-center transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{search.query}</p>
                    <p className="text-xs text-gray-500">{search.filters}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">{search.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
