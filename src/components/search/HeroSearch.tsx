'use client';

import React, { useState } from 'react';
import { Search, MapPin, DollarSign } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

type SearchType = 'buy' | 'rent';
type PropertyType = 'any' | 'house' | 'apartment' | 'penthouse' | 'loft';

const HeroSearch = () => {
  const [searchType, setSearchType] = useState<SearchType>('buy');
  const [propertyType, setPropertyType] = useState<PropertyType>('any');
  const [location, setLocation] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append('type', searchType);
    if (propertyType !== 'any') params.append('property_type', propertyType);
    if (location) params.append('location', location);
    if (priceMin) params.append('price_min', priceMin);
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

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative z-30 w-full max-w-5xl mx-auto"
    >
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-magenta-300/20 to-purple-300/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-300/20 to-pink-300/10 rounded-full blur-3xl" />

      {/* Main Search Card */}
      <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-purple-500/15 border border-white/60 overflow-hidden">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-magenta-400/20 via-purple-400/10 to-orange-400/20 pointer-events-none" />

        {/* Search Type Tabs */}
        <div className="relative flex border-b border-purple-100/40 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
          {[
            { value: 'buy', label: '🏠 Comprar', desc: 'Busca tu propiedad' },
            { value: 'rent', label: '🔑 Alquilar', desc: 'Alquila con comodidad' },
          ].map((option) => (
            <motion.button
              key={option.value}
              onClick={() => setSearchType(option.value as SearchType)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-5 px-6 font-bold text-lg transition-all relative group ${
                searchType === option.value
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {searchType === option.value && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-magenta-500 via-purple-500 to-orange-400"
                  transition={{ type: "spring", damping: 20 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <span>{option.label}</span>
                <span className="text-xs opacity-70 mt-1">{option.desc}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Search Inputs */}
        <div className="relative p-8 bg-gradient-to-b from-white/90 via-purple-50/30 to-pink-50/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Property Type */}
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, y: -2 }}
              className="relative group"
            >
              <label className="block text-xs font-bold text-transparent bg-gradient-to-r from-magenta-600 to-purple-600 bg-clip-text mb-2 uppercase tracking-wider">
                Tipo
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-purple-200/60 focus:border-magenta-500 focus:ring-2 focus:ring-magenta-200/50 bg-white/50 backdrop-blur-sm text-gray-900 font-medium transition-all appearance-none cursor-pointer shadow-lg shadow-purple-100/20 group-hover:shadow-magenta-200/30"
              >
                {propertyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-11 pointer-events-none text-magenta-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, y: -2 }}
              className="md:col-span-2 relative group"
            >
              <label className="block text-xs font-bold text-transparent bg-gradient-to-r from-magenta-600 to-purple-600 bg-clip-text mb-2 uppercase tracking-wider">
                Ubicación
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-magenta-500 pointer-events-none" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Madrid, Barcelona, Valencia..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-purple-200/60 focus:border-magenta-500 focus:ring-2 focus:ring-magenta-200/50 bg-white/50 backdrop-blur-sm text-gray-900 font-medium transition-all shadow-lg shadow-purple-100/20 group-hover:shadow-magenta-200/30 placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            {/* Price Min */}
            <motion.div
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, y: -2 }}
              className="relative group"
            >
              <label className="block text-xs font-bold text-transparent bg-gradient-to-r from-magenta-600 to-purple-600 bg-clip-text mb-2 uppercase tracking-wider">
                Mín
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-4 w-5 h-5 text-magenta-500 pointer-events-none" />
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-purple-200/60 focus:border-magenta-500 focus:ring-2 focus:ring-magenta-200/50 bg-white/50 backdrop-blur-sm text-gray-900 font-medium transition-all shadow-lg shadow-purple-100/20 group-hover:shadow-magenta-200/30 placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            {/* Price Max */}
            <motion.div
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, y: -2 }}
              className="relative group"
            >
              <label className="block text-xs font-bold text-transparent bg-gradient-to-r from-magenta-600 to-purple-600 bg-clip-text mb-2 uppercase tracking-wider">
                Máx
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-4 w-5 h-5 text-magenta-500 pointer-events-none" />
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="5M"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-purple-200/60 focus:border-magenta-500 focus:ring-2 focus:ring-magenta-200/50 bg-white/50 backdrop-blur-sm text-gray-900 font-medium transition-all shadow-lg shadow-purple-100/20 group-hover:shadow-magenta-200/30 placeholder:text-gray-400"
                />
              </div>
            </motion.div>
          </div>

          {/* Search & Advanced Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(217, 70, 239, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-magenta-500 via-purple-500 to-orange-400 text-white font-bold text-lg rounded-2xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-purple-500 to-magenta-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Search className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Buscar Ahora</span>
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/search?advanced=true"
                className="px-8 py-4 border-2 border-magenta-400 text-transparent bg-gradient-to-r from-magenta-600 to-purple-600 bg-clip-text font-bold text-lg rounded-2xl hover:bg-gradient-to-r hover:from-magenta-50 hover:to-purple-50 transition-all inline-flex items-center justify-center w-full sm:w-auto"
              >
                ⚙️ Avanzada
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-purple-100/40"
          >
            {[
              { emoji: '🏠', label: 'Propiedades', value: '12,543' },
              { emoji: '✨', label: 'Destacadas', value: '2,341' },
              { emoji: '⚡', label: 'Nuevas Hoy', value: '342' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08, translateY: -5 }}
                className="text-center p-4 rounded-2xl bg-gradient-to-br from-magenta-50/50 via-purple-50/30 to-orange-50/50 hover:from-magenta-100/50 hover:via-purple-100/30 hover:to-orange-100/50 transition-all border border-purple-100/30 shadow-lg shadow-purple-100/10"
              >
                <div className="text-3xl mb-2 animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>{stat.emoji}</div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-lg font-black bg-gradient-to-r from-magenta-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSearch;
