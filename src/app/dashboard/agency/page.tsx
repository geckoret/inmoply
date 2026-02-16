'use client';

import React from 'react';
import { mockProperties } from '@/lib/mockData';
import { Eye, Users, MousePointer, TrendingUp, MoreVertical, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AgencyDashboard() {
  const listings = mockProperties.filter(p => p.seller_type === 'agency');

  const stats = [
    { name: 'Total Views', value: '12,403', change: '+12%', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Active Leads', value: '48', change: '+24%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Total Clicks', value: '3,205', change: '-2%', icon: MousePointer, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Avg. Price', value: '€450k', change: '+4%', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agency Dashboard</h1>
        <p className="text-gray-500">Welcome back, Premium Real Estate.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Listings */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Active Listings</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Add New Property
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Leads</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {listings.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={property.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-gray-900 line-clamp-1 w-48">{property.title}</div>
                        <div className="text-xs text-gray-400">{property.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                          <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                        +5
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
