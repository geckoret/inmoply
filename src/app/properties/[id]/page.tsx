'use client';

import React from 'react';
import PriceHistoryChart from '@/components/property/PriceHistoryChart';
import { ShieldCheck, MapPin, Info, TrendingUp, Trees, Volume2 } from 'lucide-react';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Gallery Placeholder */}
          <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1600607687940-477a63bd394c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Property" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-green-600 shadow-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Verified Listing
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">Modern Loft in Poblenou</h1>
            <div className="flex items-center gap-2 text-gray-500 mb-8">
              <MapPin className="w-4 h-4" />
              <span>Carrer de Llull, Barcelona</span>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              Industrial style loft with high ceilings, large windows, and premium finishes. Located in the trendy neighborhood of Poblenou, just minutes from the beach and tech hub.
            </p>
          </div>

          {/* Market Insights Section */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold">Market Insights</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  Price History
                  <Info className="w-4 h-4 text-gray-400" />
                </h3>
                <PriceHistoryChart />
              </div>

              <div className="space-y-8">
                <h3 className="font-semibold text-gray-900 mb-6">Neighborhood Vibe</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Trees className="w-4 h-4 text-emerald-500" />
                        Greenery
                      </span>
                      <span className="text-sm font-bold">High</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Volume2 className="w-4 h-4 text-orange-500" />
                        Noise Level
                      </span>
                      <span className="text-sm font-bold">Moderate</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="text-sm text-indigo-900 leading-relaxed">
                      <span className="font-bold">Pro Tip:</span> This area has seen a <span className="font-bold">12% price increase</span> in the last year due to the new tech park expansion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
            <div className="mb-8">
              <p className="text-gray-500 text-sm mb-1 font-medium">Price</p>
              <h3 className="text-4xl font-black text-gray-900">420.000 €</h3>
            </div>

            <div className="space-y-4 mb-8">
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                Contact Seller
              </button>
              <button className="w-full py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                Schedule Visit
              </button>
            </div>

            <div className="pt-8 border-t border-gray-50 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=1" alt="Avatar" />
              </div>
              <div>
                <p className="font-bold">Amir Shokri</p>
                <p className="text-sm text-gray-500">Private Seller</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
