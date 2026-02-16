'use client';

import React from 'react';
import { Bed, Bath, Square, ShieldCheck, Video, Box, Heart, Scale } from 'lucide-react';
import { Property } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useComparisonStore } from '@/store/useComparisonStore';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { addItem, items } = useComparisonStore();
  const isCompared = items.some(item => item.id === property.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    addItem(property);
  };

  return (
    <Link href={`/properties/${property.id}`} className="block h-full group">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={property.images[0]}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {property.is_verified && (
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-emerald-600 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
            {property.video_url && (
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                <Video className="w-3.5 h-3.5" />
                Video
              </span>
            )}
            {property.virtual_tour_url && (
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-violet-600 shadow-sm">
                <Box className="w-3.5 h-3.5" />
                360°
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={handleCompare}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
                isCompared
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-white/90 text-gray-400 hover:text-indigo-600 hover:bg-white'
              }`}
              title={isCompared ? "Added to compare" : "Add to compare"}
            >
              <Scale className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-2xl font-bold tracking-tight">
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}
            </p>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-block w-2 h-2 rounded-full ${property.seller_type === 'agency' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {property.seller_type}
            </span>
          </div>

          <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-1">{property.address}</p>
          
          <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 group-hover:bg-indigo-50 transition-colors">
              <span className="text-xs text-gray-400 font-medium mb-1">Beds</span>
              <div className="flex items-center gap-1 font-bold text-gray-700">
                <Bed className="w-4 h-4 text-indigo-500" />
                {property.bedrooms}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 group-hover:bg-indigo-50 transition-colors">
              <span className="text-xs text-gray-400 font-medium mb-1">Baths</span>
              <div className="flex items-center gap-1 font-bold text-gray-700">
                <Bath className="w-4 h-4 text-indigo-500" />
                {property.bathrooms}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 group-hover:bg-indigo-50 transition-colors">
              <span className="text-xs text-gray-400 font-medium mb-1">Area</span>
              <div className="flex items-center gap-1 font-bold text-gray-700">
                <Square className="w-4 h-4 text-indigo-500" />
                {property.area}m²
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertyCard;
