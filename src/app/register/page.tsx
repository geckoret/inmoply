'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, User, Building2, Mail, Lock, CheckCircle, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'private' | 'agency'>('private');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (activeTab === 'agency') {
        router.push('/dashboard/agency');
      } else {
        router.push('/dashboard/private');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-indigo-100 p-8 md:p-12 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50 rounded-tr-full -ml-16 -mb-16" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Inmoply</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h1>
          <p className="text-gray-500 mb-8">Join the community to start your journey.</p>

          {/* Type Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-2xl mb-8 w-full">
            <button
              onClick={() => setActiveTab('private')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'private'
                  ? 'bg-white text-indigo-600 shadow-md shadow-indigo-100'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              <User className="w-4 h-4" />
              I'm a Buyer/Tenant
            </button>
            <button
              onClick={() => setActiveTab('agency')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'agency'
                  ? 'bg-white text-indigo-600 shadow-md shadow-indigo-100'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              I'm an Agent/Owner
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  placeholder="Create a password"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="mt-1">
                <CheckCircle className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                By creating an account, you agree to our <Link href="#" className="text-indigo-600 underline">Terms of Service</Link> and <Link href="#" className="text-indigo-600 underline">Privacy Policy</Link>.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="animate-pulse">Creating Account...</span>
              ) : (
                <>
                  Get Started <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
