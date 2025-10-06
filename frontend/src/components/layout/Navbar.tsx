'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // <-- DITAMBAHKAN

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center -translate-y-1">
              <Image
                src="/images/rnd_logo.png"
                alt="rnd logo"
                width={40}
                height={40}
              />
            </div>
            <span className="text-white text-3xl font-abhaya leading-140 tracking-10">
              BUNGA RAMPAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden font-abhaya text-xl leading-140 tracking-10 md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/catalogue" 
              className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
            >
              Catalogue
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
            >
              About Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link 
              href="/" 
              className="block text-white hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/catalogue" 
              className="block text-gray-300 hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Catalogue
            </Link>
            <Link 
              href="/about" 
              className="block text-gray-300 hover:text-yellow-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}