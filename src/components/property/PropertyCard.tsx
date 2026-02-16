'use client';

import React from 'react';
import { Bed, Bath, Square, ShieldCheck, Building2, User, ArrowRightLeft } from 'lucide-react';
import { Property } from '@/types';
import { motion } from 'framer-motion';
import { useComparisonStore } from '@/store/useComparisonStore';
import Link from 'next/link';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { items, addItem, removeItem } = useComparisonStore();
  const isComparing = items.some(item => item.id === property.id);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isComparing) {
      removeItem(property.id);
    } else {
      addItem(property);
    }
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {property.is_verified && (
              <span className="flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-green-600 shadow-sm w-fit">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
            <span className={`flex items-center gap-1 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow-sm w-fit ${
              property.seller_type === 'private' 
                ? 'bg-emerald-500/90 text-white' 
                : 'bg-blue-500/90 text-white'
            }`}>
              {property.seller_type === 'private' ? <User className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
              {property.seller_type === 'private' ? 'Particular' : 'Agency'}
            </span>
          </div>

          <button 
            onClick={toggleCompare}
            className={`absolute top-4 right-4 p-2 rounded-xl transition-all duration-300 ${
              isComparing 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white/80 backdrop-blur text-gray-600 hover:bg-white'
            } shadow-sm z-10`}
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-4">
            <p className="text-2xl font-bold text-white drop-shadow-md">
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}
            </p>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">{property.title}</h3>
          <p className="text-gray-500 text-sm mb-4 truncate">{property.address}</p>
          
          <div className="flex items-center justify-between py-3 border-t border-gray-50 text-gray-600">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium">{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium">{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium">{property.area} m²</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertyCard;
