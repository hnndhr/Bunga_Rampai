'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      </div>

      {/* Decorative Blur Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-gray-300 text-lg mb-6 animate-fade-in">
          Welcome to Bunga Rampai
        </p>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="text-white block mb-2">
            EXPLORING FACTS,
          </span>
          <span className="text-yellow-400 block">
            BUILDING THE FUTURE
          </span>
        </h1>

        {/* Scroll Indicator */}
        <div className="mt-20 animate-bounce">
          <p className="text-gray-300 text-sm mb-4">
            Get to Know Us More
          </p>
          <button 
            onClick={scrollToNext}
            className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mx-auto hover:bg-white/10 transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="text-white" size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}