'use client';

import React, { useState } from 'react';
import { Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
import { Property } from '@/types';

interface ContactFormProps {
  property: Property;
}

export default function ContactForm({ property }: ContactFormProps) {
  const [activeTab, setActiveTab] = useState<'message' | 'schedule'>('message');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-indigo-100 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
        <p className="text-gray-500 mb-6">The {property.seller_type} will contact you shortly.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-indigo-600 font-semibold hover:text-indigo-700 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-indigo-50/50 sticky top-24">
      {/* Seller Info */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=${property.seller_type}&background=random`}
            alt="Seller"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">Contact {property.seller_type}</p>
          <h3 className="font-bold text-gray-900">
            {property.agency_id ? 'Premium Agency' : 'Private Seller'}
          </h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-50 p-1 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('message')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'message'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Mail className="w-4 h-4" />
          Message
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'schedule'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Visit
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            required
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
          />
        </div>
        <div>
          <input
            type="email"
            required
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
          />
        </div>
        <div>
          <input
            type="tel"
            required
            placeholder="Phone Number"
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
          />
        </div>

        {activeTab === 'message' ? (
          <textarea
            required
            rows={4}
            placeholder={`Hi, I'm interested in this property at ${property.address}...`}
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all resize-none"
          />
        ) : (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
            />
            <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
            <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all">
              <option>Morning (9am - 12pm)</option>
              <option>Afternoon (12pm - 4pm)</option>
              <option>Evening (4pm - 8pm)</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {status === 'submitting' ? (
            <span className="animate-pulse">Sending...</span>
          ) : (
            <>
              {activeTab === 'message' ? 'Send Message' : 'Request Visit'}
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400 mb-3">Or call directly</p>
        <a href="tel:+34900123456" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
          <Phone className="w-4 h-4" />
          +34 900 123 456
        </a>
      </div>
    </div>
  );
}
