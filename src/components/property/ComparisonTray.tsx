'use client';

import React from 'react';
import { useComparisonStore } from '@/store/useComparisonStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRightLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

const ComparisonTray = () => {
  const { items, removeItem, clearItems } = useComparisonStore();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-4 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-hide">
          {items.map((property) => (
            <div key={property.id} className="relative flex-shrink-0 group">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-16 h-16 rounded-xl object-cover border border-gray-100"
              />
              <button 
                onClick={() => removeItem(property.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {items.length < 3 && (
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
              <span className="text-xs font-bold">{3 - items.length} left</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={clearItems}
            className="p-3 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <Link 
            href="/compare"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 whitespace-nowrap"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Compare Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ComparisonTray;
