'use client';

import React from 'react';
import Link from 'next/link';
import { Search, User, Menu, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-indigo-600">
              <Home className="w-8 h-8" />
              <span>Inmoply</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-gray-600 hover:text-indigo-600 transition-colors">Search</Link>
            <Link href="/properties" className="text-gray-600 hover:text-indigo-600 transition-colors">Market Trends</Link>
            <Link href="/compare" className="text-gray-600 hover:text-indigo-600 transition-colors">Compare</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/login" className="flex items-center space-x-1 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
            <button className="md:hidden p-2 text-gray-400">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
