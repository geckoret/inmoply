'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface PropertyMapProps {
  center?: [number, number];
  zoom?: number;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  center = [-3.703790, 40.416775], // Default Madrid
  zoom = 12 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map.current) return;

    map.current.flyTo({
      center: center,
      zoom: zoom,
      essential: true,
    });
  }, [center, zoom]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner border border-gray-100">
      <div ref={mapContainer} className="absolute inset-0" />
      {!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm z-10 text-center p-6">
          <p className="text-gray-500 font-medium">
            Please add your <span className="text-indigo-600 font-bold">NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</span> to .env.local to view the interactive map.
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
