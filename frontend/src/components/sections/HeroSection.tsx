"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToNext = () => {
    const start = window.pageYOffset;
    const target = window.innerHeight;
    const duration = 800; // ms
    const startTime = performance.now();

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, start + (target - start) * easeInOutQuad(progress));

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    // UBAH: Arah flex menjadi kolom (vertikal)
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900"></div>

      {/* Decorative Blur Elements */}
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      {/* Kontainer Konten Utama */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col flex-grow">
        {/* === BAGIAN TENGAH: Teks Utama === */}
        {/* Dibuat agar tumbuh (flex-grow) dan menengahkan isinya sendiri */}
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-gray-300 text-lg mb-6 animate-fade-in">
            Welcome to Bunga Rampai
          </p>

          {/* UBAH: Margin bawah yang besar dihapus */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white block mb-2">EXPLORING FACTS,</span>
            <span className="text-yellow-400 block">BUILDING THE FUTURE</span>
          </h1>
        </div>

        {/* === BAGIAN BAWAH: Tombol Scroll === */}
        {/* Diberi padding bawah agar tidak terlalu mepet */}
        <div className="pb-12">
          <div className="animate-bounce">
            <p className="text-gray-300 text-sm mb-4">Get to Know Us More</p>
            <button
              onClick={scrollToNext}
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mx-auto hover:bg-white/10 transition-colors duration-700"
              aria-label="Scroll down"
            >
              <ChevronDown className="text-white" size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
