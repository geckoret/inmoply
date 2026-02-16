'use client';

import React from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import HeroSearch from '@/components/search/HeroSearch';
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
    <div className="flex flex-col">
      {/* Hero Section with Search */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-magenta-800/40 to-white/10 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury smart homes" 
            className="w-full h-full object-cover scale-105"
          />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-magenta-500 to-orange-500 rounded-full blur-3xl opacity-10 animate-float z-0" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500 to-magenta-400 rounded-full blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white text-sm font-bold shadow-lg mb-8">
              <Sparkles className="w-5 h-5 animate-pulse" />
              Búsqueda Inmobiliaria Premium con IA
            </span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter leading-tight drop-shadow-xl">
              Encuentra tu
              <br />
              <span className="bg-gradient-to-r from-magenta-300 via-purple-300 to-orange-300 bg-clip-text text-transparent">
                hogar ideal
              </span>
            </h1>
          </motion.div>

          {/* Hero Search Component */}
          <HeroSearch />

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-white/80 text-sm font-medium">
              ✨ Búsqueda inteligente • 📍 Propiedades verificadas • ⚡ Resultados al instante
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-magenta-100 text-magenta-600 text-sm font-bold mb-4">
              🏆 Propiedades Destacadas
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Propiedades Verificadas</h2>
            <p className="text-gray-600 text-lg">Selección cuidada de ofertas de vendedores confiables.</p>
          </div>
          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-magenta-600 font-bold hover:text-purple-600 transition-colors cursor-pointer"
          >
            <Link href="/search" className="flex items-center gap-2">
              Ver todas <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

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
