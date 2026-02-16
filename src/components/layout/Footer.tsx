'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div>
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-white mb-6">
              <div className="bg-brand-600 p-1.5 rounded-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span>Inmoply</span>
            </Link>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Transformamos el sector inmobiliario con tecnología, transparencia y conexión humana. Encuentra tu hogar perfecto con nosotros.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-slate-800 rounded-full hover:bg-brand-600 hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Descubre</h3>
            <ul className="space-y-3">
              {[
                { label: 'Buscar Propiedades', href: '/search' },
                { label: 'Destacados', href: '/properties' },
                { label: 'Mapa Interactivo', href: '/map' },
                { label: 'Comparar Hogares', href: '/compare' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Servicios</h3>
            <ul className="space-y-3">
              {[
                { label: 'Para Agencias', href: '/dashboard/agency' },
                { label: 'Para Propietarios', href: '/dashboard/private' },
                { label: 'Precios', href: '/pricing' },
                { label: 'Centro de Ayuda', href: '/support' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-500 mt-1 shrink-0" />
                <span className="text-sm">Calle Gran Vía 28, 28013 Madrid, Spain</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <span className="text-sm">+34 912 345 678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <span className="text-sm">hello@inmoply.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Inmoply. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
