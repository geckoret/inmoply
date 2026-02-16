import React from 'react';
import { Sparkles, Users, Globe, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6">
            Our Mission
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            We&apos;re changing how you <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">find a home.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Inmoply was born from a simple idea: Real estate should be transparent, human, and enjoyable. No more clutter, no more stress.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Properties Sold', value: '12k+', icon: Award },
            { label: 'Happy Families', value: '8,500', icon: Users },
            { label: 'Cities Covered', value: '45', icon: Globe },
            { label: 'AI Matches', value: '1M+', icon: Sparkles },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-600">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="prose prose-lg mx-auto text-gray-600">
          <p>
            Traditional real estate platforms are crowded with ads, duplicates, and outdated listings. We knew there had to be a better way.
          </p>
          <p>
            We built Inmoply with a &quot;user-first&quot; philosophy. Every feature, from our AI search to our 360° virtual tours, is designed to give you clarity and confidence.
          </p>
          <p>
            Whether you&apos;re looking for a cozy studio or a sprawling villa, we&apos;re here to guide you every step of the way. Welcome to the future of real estate.
          </p>
        </div>
      </section>
    </div>
  );
}
