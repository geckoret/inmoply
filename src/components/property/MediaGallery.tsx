'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Video, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaGalleryProps {
  images: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
}

type MediaType = 'photos' | 'video' | '360';

export default function MediaGallery({ images, videoUrl, virtualTourUrl }: MediaGalleryProps) {
  const [activeTab, setActiveTab] = useState<MediaType>('photos');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Viewport */}
      <div className="relative aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-sm group">
        {activeTab === 'photos' && (
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Property image ${currentImageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        )}

        {activeTab === 'video' && videoUrl && (
          <iframe
            src={videoUrl.replace('watch?v=', 'embed/')} // Simple YouTube transform
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {activeTab === '360' && virtualTourUrl && (
          <iframe
            src={virtualTourUrl}
            className="w-full h-full"
            allowFullScreen
          />
        )}
      </div>

      {/* Tabs / Thumbnails */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveTab('photos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'photos'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Photos ({images.length})
        </button>

        {videoUrl && (
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'video'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Video className="w-4 h-4" />
            Video Tour
          </button>
        )}

        {virtualTourUrl && (
          <button
            onClick={() => setActiveTab('360')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === '360'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Box className="w-4 h-4" />
            360° View
          </button>
        )}
      </div>
    </div>
  );
}
