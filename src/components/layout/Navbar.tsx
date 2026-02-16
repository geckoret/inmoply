'use client';

import React from 'react';
import Link from 'next/link';
import { Search, User, Menu, Home, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass shadow-lg shadow-blue-500/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all"
              >
                <Home className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-text">
                Inmoply
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/search">🏠 Buy</NavLink>
            <NavLink href="/search?type=rent">🔑 Rent</NavLink>
            <NavLink href="/compare">⚖️ Compare</NavLink>
            <NavLink href="/properties">📊 Trends</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full text-gray-600 hover:text-blue-500 hover:bg-blue-50/80 transition-all"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/dashboard/private" className="p-2.5 rounded-full text-gray-600 hover:text-red-500 hover:bg-red-50/80 transition-all">
                <Heart className="w-5 h-5" />
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-2 ml-2 pl-2 border-l border-gray-200/50">
              <NavLink href="/login">Log in</NavLink>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Sign up
                </Link>
              </motion.div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-gray-600 hover:bg-blue-50/80 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-sm font-semibold text-gray-600 hover:text-blue-500 transition-colors relative group py-2 px-3"
  >
    {children}
    <span className="absolute bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:w-full transition-all duration-300 ease-out" />
  </Link>
);

export default Navbar;
