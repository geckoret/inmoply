'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Home, Building } from 'lucide-react';

export default function MarketTrendsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          Real Estate Market Trends
        </h1>
        <p className="text-gray-500 text-lg">
          Stay ahead of the market with our latest insights and data analysis for the Spanish real estate sector.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <TrendCard
          title="Average Price"
          value="€3,450/m²"
          trend="+5.2%"
          positive={true}
          icon={<DollarSign className="w-6 h-6 text-indigo-600" />}
        />
        <TrendCard
          title="Properties Sold"
          value="1,240"
          trend="+12.5%"
          positive={true}
          icon={<Home className="w-6 h-6 text-violet-600" />}
        />
        <TrendCard
          title="Days on Market"
          value="45 Days"
          trend="-3.4%"
          positive={true}
          icon={<Building className="w-6 h-6 text-emerald-600" />}
        />
        <TrendCard
          title="New Listings"
          value="356"
          trend="-1.2%"
          positive={false}
          icon={<TrendingUp className="w-6 h-6 text-rose-600" />}
        />
      </div>

      <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Detailed Neighborhood Analysis</h2>
          <p className="text-indigo-200 mb-8 max-w-xl">
            Explore price trends, demographics, and lifestyle data for every neighborhood in major Spanish cities.
          </p>
          <button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors">
            Explore Neighborhoods
          </button>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
}

const TrendCard = ({ title, value, trend, positive, icon }: { title: string, value: string, trend: string, positive: boolean, icon: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-gray-50 rounded-xl">
        {icon}
      </div>
      <span className={`text-sm font-bold px-2 py-1 rounded-lg ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </motion.div>
);
