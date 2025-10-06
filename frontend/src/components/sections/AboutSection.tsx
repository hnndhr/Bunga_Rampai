'use client';

import React from 'react';

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center bg-slate-900 py-20"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Us
            </h2>
            <p className="text-gray-300 text-lg">
              Learn more about our mission and vision
            </p>
          </div>

          {/* Placeholder Content - Replace with your actual about content */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-slate-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Our Values
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">1</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Innovation</h4>
                <p className="text-gray-400 text-sm">
                  Driving forward with creative solutions
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">2</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Integrity</h4>
                <p className="text-gray-400 text-sm">
                  Building trust through transparency
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">3</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Excellence</h4>
                <p className="text-gray-400 text-sm">
                  Delivering quality in everything we do
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}