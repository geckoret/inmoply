'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-blue-100 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-text">Inmoply</span>
            </Link>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Transformamos el sector inmobiliario con tecnología, transparencia y conexión humana. Encuentra tu hogar perfecto con nosotros.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <motion.a 
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white rounded-full text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all shadow-md"
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-900 mb-8 text-lg">Descubre</h3>
            <ul className="space-y-4">
              {[
                { label: 'Buscar Propiedades', href: '/search' },
                { label: 'Destacados', href: '/properties' },
                { label: 'Mapa Interactivo', href: '/map' },
                { label: 'Comparar Hogares', href: '/compare' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link href={href} className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group">
                      <span>{label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* For Professionals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-900 mb-8 text-lg">Servicios</h3>
            <ul className="space-y-4">
              {[
                { label: 'Para Agencias', href: '/dashboard/agency' },
                { label: 'Para Propietarios', href: '/dashboard/private' },
                { label: 'Precios', href: '/pricing' },
                { label: 'Centro de Ayuda', href: '/support' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link href={href} className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group">
                      <span>{label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-900 mb-8 text-lg">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer">
                <div className="p-2.5 bg-blue-100 rounded-full mt-0.5">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Oficina Madrid</p>
                  <p>Calle Gran Vía 28,<br/>28013 Madrid, Spain</p>
                </div>
              </li>
              <li className="flex items-center space-x-4 text-gray-600 hover:text-blue-500 transition-colors">
                <div className="p-2.5 bg-blue-100 rounded-full">
                  <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                </div>
                <span>+34 912 345 678</span>
              </li>
              <li className="flex items-center space-x-4 text-gray-600 hover:text-blue-500 transition-colors">
                <div className="p-2.5 bg-blue-100 rounded-full">
                  <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                </div>
                <span>hello@inmoply.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500"
          >
            © {new Date().getFullYear()} Inmoply. Todos los derechos reservados.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex space-x-8 text-sm text-gray-500"
          >
            {[
              { label: 'Privacidad', href: '/privacy' },
              { label: 'Términos', href: '/terms' },
              { label: 'Cookies', href: '/cookies' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="hover:text-blue-500 transition-colors">
                {label}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
