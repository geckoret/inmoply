'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, Heart, Settings, LogOut, MessageSquare, Home } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAgency = pathname.includes('/agency');

  const navigation = isAgency
    ? [
        { name: 'Overview', href: '/dashboard/agency', icon: LayoutDashboard },
        { name: 'My Listings', href: '/dashboard/agency/listings', icon: Building2 },
        { name: 'Leads & Messages', href: '/dashboard/agency/leads', icon: MessageSquare },
        { name: 'Settings', href: '/dashboard/agency/settings', icon: Settings },
      ]
    : [
        { name: 'My Home', href: '/dashboard/private', icon: LayoutDashboard },
        { name: 'Favorites', href: '/dashboard/private/favorites', icon: Heart },
        { name: 'Messages', href: '/dashboard/private/messages', icon: MessageSquare },
        { name: 'Settings', href: '/dashboard/private/settings', icon: Settings },
      ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col fixed inset-y-0 pt-20">
        <div className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            <Home className="w-5 h-5 text-gray-400" />
            Back to Home
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-all mt-1">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-24 pb-24">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
