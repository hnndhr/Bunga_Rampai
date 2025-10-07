'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
// Import Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

// Komponen baru khusus untuk menganimasikan judul
const AnimatedTitle = ({ isScrolled }: { isScrolled: boolean }) => {
  const text = "BUNGA RAMPAI";
  
  // Varian untuk kontainer (pembungkus semua huruf)
  const containerVariants = {
    visible: { 
      transition: { 
        staggerChildren: 0.04, // Jeda antar animasi setiap huruf (muncul)
      } 
    },
    hidden: { 
      transition: { 
        staggerChildren: 0.02, // Jeda antar animasi setiap huruf (hilang)
        staggerDirection: -1,  // Menghilang dari huruf terakhir
      } 
    },
  };

  // Varian untuk setiap huruf
  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <motion.div
      className="text-white text-3xl font-abhaya leading-140 tracking-10 inline-flex overflow-hidden"
      variants={containerVariants}
      initial="visible"
      animate={isScrolled ? "hidden" : "visible"}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};


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
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={clsx(
          "container mx-auto transition-all duration-1000",
          {
            "px-6 py-4": !isScrolled,
            "max-w-screen-md rounded-full bg-slate-800/80 backdrop-blur-sm mt-4 px-8 py-2": isScrolled,
          }
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center -translate-y-1">
              <Image
                src="/images/rnd_logo.png"
                alt="rnd logo"
                width={40}
                height={40}
              />
            </div>
            
            {/* Menggunakan komponen animasi yang baru */}
            <AnimatedTitle isScrolled={isScrolled} />
          </Link>

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

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && !isScrolled && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {/* ... link mobile menu ... */}
          </div>
        )}
      </div>
    </nav>
  );
}