'use client';

import React from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import { Property } from '@/types';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  },
  {
    id: '3',
    title: 'Family House with Garden',
    description: 'Quiet family home in a residential area.',
    price: 1200,
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    address: 'Avenida de la Ilustración, Valencia',
    city: 'Valencia',
    lat: 39.469907,
    lng: -0.376288,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    is_verified: false,
    seller_type: 'private',
    created_at: new Date().toISOString(),
    features: ['Garden', 'Pool', 'Garage']
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white z-10" />
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto text-center px-4">
          <MotionDivWrapper>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Property Search
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              The Next-Gen Way to <span className="text-indigo-400">Find Home.</span>
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Skip the clutter. Experience a premium, transparent, and intelligent real estate platform designed for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
                Start Searching
              </Link>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                List Property
              </button>
            </div>
          </MotionDivWrapper>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Listings</h2>
            <p className="text-gray-500">Hand-picked properties from verified sellers.</p>
          </div>
          <Link href="/search" className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MotionDivWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
