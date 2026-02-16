'use client';

import React from 'react';
import { Bed, Bath, Square, Heart, Video, Box } from 'lucide-react';
import { Property } from '@/types';
import Link from 'next/link';
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
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
          <img 
            src={property.images[0]}
            alt={property.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {property.is_verified && (
              <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                Verificado
              </span>
            )}
             {property.video_url && (
              <span className="bg-slate-900/70 backdrop-blur text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                <Video className="w-3 h-3" /> Video
              </span>
            )}
          </div>

          {/* Favorite Button */}
           <button
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-400 hover:text-red-500 transition-colors shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                // Add to favorites logic
              }}
            >
              <Heart className="w-5 h-5" />
            </button>

           {/* Price Tag (Bottom Left of Image) */}
           <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full p-4 pt-12">
              <p className="text-2xl font-bold text-white">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}
              </p>
           </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Title & Address */}
          <div className="mb-4">
             <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1 group-hover:text-brand-600 transition-colors">
                {property.title}
            </h3>
            <p className="text-slate-500 text-sm line-clamp-1">
                {property.address}
            </p>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-slate-600 text-sm mb-4">
             <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{property.bedrooms}</span> <span className="text-slate-400 font-normal">habs</span>
             </div>
             <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{property.bathrooms}</span> <span className="text-slate-400 font-normal">baños</span>
             </div>
             <div className="flex items-center gap-1.5">
                <Square className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{property.area}</span> <span className="text-slate-400 font-normal">m²</span>
             </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className={`text-xs font-bold px-2 py-1 rounded ${property.seller_type === 'agency' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                {property.seller_type === 'agency' ? 'AGENCIA' : 'PARTICULAR'}
            </span>

            <button
                onClick={handleCompare}
                className={`text-sm font-medium transition-colors ${
                    isCompared ? 'text-brand-600' : 'text-slate-400 hover:text-brand-600'
                }`}
            >
                {isCompared ? 'Comparando' : 'Comparar'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
