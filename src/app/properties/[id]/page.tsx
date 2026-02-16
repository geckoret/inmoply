import React from 'react';
import { mockProperties } from '@/lib/mockData';
import MediaGallery from '@/components/property/MediaGallery';
import ContactForm from '@/components/property/ContactForm';
import PropertyMap from '@/components/map/PropertyMap';
import { notFound } from 'next/navigation';
import { Bed, Bath, Square, MapPin, CheckCircle, Share2, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return mockProperties.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumbs / Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/search" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>

        {/* Header (Title & Price) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <MapPin className="w-5 h-5 text-indigo-500" />
              {property.address}, {property.city}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-3xl md:text-4xl font-bold text-indigo-600">
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}
            </span>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="mb-12">
          <MediaGallery
            images={property.images}
            videoUrl={property.video_url}
            virtualTourUrl={property.virtual_tour_url}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex flex-col items-center justify-center text-center">
                <Bed className="w-8 h-8 text-indigo-500 mb-2" />
                <span className="text-2xl font-bold text-gray-900">{property.bedrooms}</span>
                <span className="text-sm text-gray-500 font-medium">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center border-l border-gray-200">
                <Bath className="w-8 h-8 text-indigo-500 mb-2" />
                <span className="text-2xl font-bold text-gray-900">{property.bathrooms}</span>
                <span className="text-sm text-gray-500 font-medium">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center border-l border-gray-200">
                <Square className="w-8 h-8 text-indigo-500 mb-2" />
                <span className="text-2xl font-bold text-gray-900">{property.area}</span>
                <span className="text-sm text-gray-500 font-medium">Square Meters</span>
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {property.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 hover:shadow-sm transition-all">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
              <div className="h-[400px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
                <PropertyMap center={[property.lng, property.lat]} zoom={15} />
              </div>
              <p className="mt-4 text-gray-500 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Exact location provided after booking a visit.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ContactForm property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
