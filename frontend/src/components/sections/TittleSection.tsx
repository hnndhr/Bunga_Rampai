"use client";

import Image from "next/image";
import {
  FileText,
  Calendar,
  Hand,
  Handshake,
  Users,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "../layout/Footer";

export default function Title() {
  const router = useRouter(); 

  return (
    <div className="min-h-screen bg-white">
      {/* ======= HERO SECTION ======= */}
      <section className="relative w-full h-[300px] md:h-[350px] lg:h-[350px] bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://api.builder.io/api/v1/image/assets/TEMP/fbaf1c7177c899b5ca2a67397e5d0f8fb179973a?width=3840"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Back Button */}
        <div className="absolute top-12 left-4 md:left-8 lg:left-20 z-30">
          <button
            onClick={() => router.back()} 
            aria-label="Go back"
            className="flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
        </div>

        {/* Title Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 md:px-32 text-center">
          <h1 className="max-w-4xl text-xl md:text-3xl lg:text-5xl font-abhaya text-white font-medium leading-tight tracking-wide">
            Survei Minat dan Preferensi Mahasiswa <br className="hidden md:block" />
            Terhadap Kegiatan Seminar
          </h1>

          <hr className="w-full md:w-full border-t-1 border-white mt-14" />
        </div>

        {/* ======= INFO BADGES ======= */}
        <div className="absolute bottom-6 left-8 md:left-32 flex flex-wrap items-center gap-2 md:gap-3 z-20">
          {[
            {
              icon: <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />,
              text: "3577 Responden",
            },
            {
              icon: <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />,
              text: "26 Juni - 15 Agustus 2025",
            },
            {
              icon: <Hand className="w-4 h-4 md:w-5 md:h-5 text-white" />,
              text: "Voluntary Sampling",
            },
            {
              icon: <Handshake className="w-4 h-4 md:w-5 md:h-5 text-white" />,
              text: "Survei Kolaborasi",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2 rounded-3xl
                         bg-gradient-to-br from-white/5 to-white/5
                         backdrop-blur-md border border-white/20
                         shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_4px_10px_rgba(0,0,0,0.25)]
                         overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-60 rotate-12" />
              {item.icon}
              <span className="text-white font-montserrat text-xs md:text-sm font-normal whitespace-nowrap relative z-10">
                {item.text}
              </span>
            </div>
          ))}

          <button
            className="relative flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2 rounded-3xl
                       bg-gradient-to-br from-white/5 to-white/5
                       backdrop-blur-md border border-white/20
                       shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_4px_10px_rgba(0,0,0,0.25)]
                       hover:from-white/25 hover:to-white/10 transition-all duration-300
                       overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-60 rotate-12" />
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-white relative z-10" />
            <span className="text-white font-montserrat text-xs md:text-sm font-medium whitespace-nowrap relative z-10">
              Laporan Survei
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
