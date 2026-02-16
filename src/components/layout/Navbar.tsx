'use client';

import React from 'react';
import Link from 'next/link';
import { Search, User, Menu, Home, Heart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Inmoply
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/search">Buy</NavLink>
            <NavLink href="/search?type=rent">Rent</NavLink>
            <NavLink href="/compare">Compare</NavLink>
            <NavLink href="/properties">Market Trends</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2.5 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/dashboard/private" className="p-2.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all">
              <Heart className="w-5 h-5" />
            </Link>

            <div className="hidden md:flex items-center space-x-3 ml-2 pl-2 border-l border-gray-200">
              <Link href="/login" className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all">
                Log in
              </Link>
              <Link href="/register" className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all flex items-center gap-2">
                <User className="w-4 h-4" />
                Sign up
              </Link>
            </div>

            <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors relative group py-2"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 rounded-full group-hover:w-full transition-all duration-300 ease-out" />
  </Link>
);

export default Navbar;
