'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Heart, Menu, Home, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-brand-600 p-1.5 rounded-lg transition-transform group-hover:scale-105">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">
                Inmoply
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/search">Buy</NavLink>
            <NavLink href="/search?type=rent">Rent</NavLink>
            <NavLink href="/compare">Compare</NavLink>
            <NavLink href="/properties">Trends</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
             <button className="p-2 rounded-full text-slate-500 hover:bg-slate-50 hover:text-brand-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link href="/dashboard/private" className="p-2 rounded-full text-slate-500 hover:bg-slate-50 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
            </Link>

            <div className="hidden md:flex items-center gap-3 ml-2 pl-2 border-l border-slate-200">
              <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-brand-600 px-3 py-2 transition-colors">
                Log in
              </Link>
              <Link href="/register" className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 shadow-sm hover:shadow-md transition-all">
                Sign up
              </Link>
            </div>

            <button className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
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
    className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300" />
  </Link>
);

export default Navbar;
