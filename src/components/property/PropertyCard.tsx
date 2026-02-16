'use client';

import React from 'react';
import { Bed, Bath, Square, ShieldCheck, Video, Box, Heart, Scale } from 'lucide-react';
import { Property } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useComparisonStore } from '@/store/useComparisonStore';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { addItem, items } = useComparisonStore();
  const isCompared = items.some(item => item.id === property.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(property);
  };

  return (
    <Link href={`/properties/${property.id}`} className="block h-full group">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 h-full flex flex-col"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
          <Image
            src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {property.is_verified && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full text-xs font-bold text-emerald-600 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                Verified
              </motion.span>
            )}
            {property.video_url && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full text-xs font-bold text-blue-600 shadow-sm"
              >
                <Video className="w-4 h-4" />
                Video
              </motion.span>
            )}
            {property.virtual_tour_url && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full text-xs font-bold text-cyan-600 shadow-sm"
              >
                <Box className="w-4 h-4" />
                360°
              </motion.span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCompare}
              className={`p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                isCompared
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg'
                  : 'bg-white/95 text-gray-400 hover:text-blue-500 hover:bg-white'
              }`}
              title={isCompared ? 'Added to compare' : 'Add to compare'}
            >
              <Scale className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/95 backdrop-blur-md text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-md"
            >
              <Heart className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-3xl font-bold text-white drop-shadow-lg tracking-tight">
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Seller Type */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${property.seller_type === 'agency' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {property.seller_type === 'agency' ? '🏢 Agency' : '👤 Private'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-text transition-colors">
            {property.title}
          </h3>
          
          {/* Address */}
          <p className="text-gray-500 text-sm mb-5 line-clamp-1 flex items-center gap-2">
            📍 {property.address}
          </p>
          
          {/* Stats */}
          <div className="mt-auto pt-5 border-t border-gray-100 grid grid-cols-3 gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100 transition-colors cursor-default"
            >
              <span className="text-xs text-gray-500 font-medium mb-1.5">Beds</span>
              <div className="flex items-center gap-1 font-bold text-gray-800">
                <Bed className="w-4 h-4 text-blue-500" />
                {property.bedrooms}
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100 transition-colors cursor-default"
            >
              <span className="text-xs text-gray-500 font-medium mb-1.5">Baths</span>
              <div className="flex items-center gap-1 font-bold text-gray-800">
                <Bath className="w-4 h-4 text-cyan-500" />
                {property.bathrooms}
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100 transition-colors cursor-default"
            >
              <span className="text-xs text-gray-500 font-medium mb-1.5">Area</span>
              <div className="flex items-center gap-1 font-bold text-gray-800">
                <Square className="w-4 h-4 text-blue-400" />
                {property.area}m²
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertyCard;
