'use client';

import React from 'react';

export default function CatalogueSection() {
  return (
    <section 
      id="catalogue" 
      className="min-h-screen flex items-center justify-center bg-slate-800 py-20"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Catalogue
          </h2>
          <p className="text-gray-300 text-lg mb-12">
            Discover our collection of resources and materials
          </p>

          {/* Placeholder Content - Replace with your actual catalogue */}
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-slate-900 p-6 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div className="w-full h-48 bg-slate-600 rounded-lg mb-4" />
                <h3 className="text-white font-semibold text-xl mb-2">
                  Item {item}
                </h3>
                <p className="text-gray-400 text-sm">
                  Description for catalogue item {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}