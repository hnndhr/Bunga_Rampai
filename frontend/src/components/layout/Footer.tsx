'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';

export default function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTripleClick = () => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    console.log(`Click ${newCount}/3`);

    // Triple click detected
    if (newCount === 3) {
      console.log('✅ Triple click detected! Showing admin link...');
      setShowAdminLink(true);
      setClickCount(0);

      // Hide link after 10 seconds
      setTimeout(() => {
        setShowAdminLink(false);
        console.log('⏰ Admin link hidden');
      }, 10000);
    } else {
      // Reset counter if no click within 1 second
      timeoutRef.current = setTimeout(() => {
        console.log('⏱️ Timeout - Reset counter');
        setClickCount(0);
      }, 1000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        {/* Footer Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Bunga Rampai</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Exploring facts and building the future through knowledge and innovation.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="text-sm text-gray-400 space-y-2">
              <p>Email: info@bungarampai.com</p>
              <p>Phone: +62 123 4567 890</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center space-y-4">
            {/* Copyright with Triple Click */}
            <div className="flex items-center space-x-2">
              <p 
                onClick={handleTripleClick}
                className="text-sm text-gray-400 hover:text-gray-300 cursor-pointer select-none transition-colors"
                title="Triple click for admin access"
              >
                © {new Date().getFullYear()} Bunga Rampai. All rights reserved.
              </p>
              
              {/* Click Indicator */}
              {clickCount > 0 && !showAdminLink && (
                <div className="flex gap-1 animate-fade-in">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i <= clickCount 
                          ? 'bg-yellow-400 scale-110' 
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Admin Link (appears after triple click) */}
            {showAdminLink && (
              <Link 
                href="/login"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg animate-fade-in-up"
              >
                <LockKeyhole className="w-4 h-4 mr-2" />
                <span className="font-semibold">Admin Portal</span>
                <span className="ml-2 text-xs opacity-75">(10s)</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}