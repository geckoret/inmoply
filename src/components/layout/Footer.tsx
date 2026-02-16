'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & About */}
          <div>
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-indigo-600 mb-4">
              <Home className="w-8 h-8" />
              <span>Inmoply</span>
            </Link>
            <p className="text-gray-500 mb-6 leading-relaxed">
              We&apos;re reimagining real estate with a focus on transparency, technology, and human connection. Find your perfect place with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Discover</h3>
            <ul className="space-y-4">
              <li><Link href="/search" className="text-gray-500 hover:text-indigo-600 transition-colors">Search Properties</Link></li>
              <li><Link href="/properties" className="text-gray-500 hover:text-indigo-600 transition-colors">Featured Listings</Link></li>
              <li><Link href="/map" className="text-gray-500 hover:text-indigo-600 transition-colors">Map Search</Link></li>
              <li><Link href="/compare" className="text-gray-500 hover:text-indigo-600 transition-colors">Compare Homes</Link></li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/dashboard/agency" className="text-gray-500 hover:text-indigo-600 transition-colors">For Agencies</Link></li>
              <li><Link href="/dashboard/private" className="text-gray-500 hover:text-indigo-600 transition-colors">For Owners</Link></li>
              <li><Link href="/pricing" className="text-gray-500 hover:text-indigo-600 transition-colors">Pricing</Link></li>
              <li><Link href="/support" className="text-gray-500 hover:text-indigo-600 transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-500">
                <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span>Calle Gran Vía 28,<br />28013 Madrid, Spain</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Phone className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>+34 912 345 678</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>hello@inmoply.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Inmoply. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-gray-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
