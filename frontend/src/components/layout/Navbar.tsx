'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx'; // Import clsx

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // UBAH: Posisi nav dibuat relatif agar bisa menampung kontainer absolut/fixed di dalamnya
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* UBAH: Kontainer ini yang akan berubah bentuk */}
      <div
        className={clsx(
          "container mx-auto transition-all duration-1000",
          {
            // State Normal (di atas)
            "px-6 py-4": !isScrolled,
            // State Shrink (saat scroll)
            "max-w-screen-md rounded-full bg-slate-800/80 backdrop-blur-sm mt-4 px-8 py-2": isScrolled,
          }
        )}
      >
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
            {/* UBAH: Teks nama brand akan hilang saat di-scroll */}
            <span
              className={clsx(
                "text-white text-3xl font-abhaya leading-140 tracking-10 transition-all duration-300",
                {
                  "opacity-0 -translate-x-4 hidden": isScrolled,
                }
              )}
            >
              BUNGA RAMPAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden font-abhaya text-xl leading-140 tracking-10 md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link href="/catalogue" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Catalogue
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
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

        {/* Mobile Menu (disembunyikan saat navbar shrink untuk simplisitas) */}
        {isMenuOpen && !isScrolled && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {/* ... link mobile menu ... */}
          </div>
        )}
      </div>
    </nav>
  );
}