'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { PropertyMapProps } from './PropertyMap';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-3xl" />
});

const PropertyMapWrapper: React.FC<PropertyMapProps> = (props) => {
  return <PropertyMap {...props} />;
};

export default PropertyMapWrapper;
