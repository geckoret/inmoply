'use client';

import React from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import HeroSearch from '@/components/search/HeroSearch';
import { Property } from '@/types';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

// Mock data remains the same
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
    features: ['Terrace', 'Elevator', 'Air Conditioning'],
    type: 'penthouse'
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
    features: ['Parking', 'Smart Home', 'Large Windows'],
    type: 'loft'
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
    features: ['Garden', 'Pool', 'Garage'],
    type: 'house'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600596542815-e32c8ec23fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Modern home exterior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 text-center mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight shadow-sm">
            Encuentra tu hogar ideal
          </h1>
          <p className="text-xl text-white/90 mb-10 font-medium max-w-2xl mx-auto drop-shadow-md">
            Miles de propiedades en venta y alquiler te están esperando.
          </p>

          {/* Search Component */}
          <HeroSearch />
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-brand-600 font-semibold mb-2">
                <Star className="w-5 h-5 fill-current" />
                <span>Propiedades Destacadas</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Nuevas oportunidades para ti</h2>
            </div>
            <Link
              href="/search"
              className="group flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
            >
              Ver todas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section (Optional but good for "Normal" sites) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">¿Por qué elegir Inmoply?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: 'Variedad de Opciones', desc: 'Desde pequeños estudios hasta grandes mansiones, tenemos lo que buscas.' },
                    { title: 'Transparencia Total', desc: 'Información verificada y detallada de cada propiedad.' },
                    { title: 'Soporte 24/7', desc: 'Nuestro equipo está siempre disponible para ayudarte en tu búsqueda.' }
                ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
