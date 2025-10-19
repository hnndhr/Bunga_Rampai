"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CardMember from "@/components/ui/CardMembers";

export default function MembersPHT() {
  const members = [
    {
      name: "Fathiya Noor Jannah",
      role: "Menteri Koordinator",
      image: "/images/members/Fath_Bebas.jpg",
      imageBack: "/images/members/Lintang_Bebas.jpg",
      desc: "Dengan tangan kami perkuatkan kejelasan Media Branding, tim kreatif yang memperkuat peran Riset dan Data dalam membangun identitas kementerian.",
    },
    {
      name: "Aidan Muhammad Alfath",
      role: "Wakil Menteri",
      image: "/images/members/Aidan_Bebas.jpg",
      imageBack: "/images/members/Lintang_Bebas.jpg",
      desc: "Dengan tangan kami perkuatkan kejelasan Media Branding, tim kreatif yang memperkuat peran Riset dan Data dalam membangun identitas kementerian.",
    },
    {
      name: "Laili Kharisma Octavia",
      role: "Menteri",
      image: "/images/members/Laili_Bebas.jpg",
      imageBack: "/images/members/Lintang_Bebas.jpg",
      desc: "Dengan tangan kami perkuatkan kejelasan Media Branding, tim kreatif yang memperkuat peran Riset dan Data dalam membangun identitas kementerian.",
    },
    {
      name: "Arya Maulana Putra",
      role: "Sekretaris Menteri",
      image: "/images/members/Arya_Bebas.jpg",
    },
    {
      name: "Erlina Dwi Cahyani",
      role: "Direktur Jenderal",
      image: "/images/members/Erlina_Bebas.jpg",
    },
    {
      name: "Lintang Hikaru",
      role: "Direktur Jenderal",
      image: "/images/members/Lintang_Bebas.jpg",
      imageBack: "/images/members/Lintang_Bebas.jpg",
      desc: "Dengan tangan kami perkuatkan kejelasan Media Branding, tim kreatif yang memperkuat peran Riset dan Data dalam membangun identitas kementerian.",
    },
    {
      name: "Muhammad Syahrul",
      role: "Direktur Jenderal",
      image: "/images/members/Syahrul_Bebas.jpg",
    },
  ];

  return (
    <section className="relative bg-[#0E1B2B] py-20 overflow-hidden">
      {/* === Background Pattern === */}
      <div
        className="absolute inset-0 bg-[linear-gradient(120deg,#1C2940_1px,transparent_1px)] bg-[length:60px_60px] opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* === Baris Pertama: teks - foto - teks === */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center md:text-left mb-16 gap-8">
          {/* Teks kiri */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center eading-tight">
              Petinggi <br /> Kementerian
            </h2>
          </motion.div>

          {/* Foto tengah */}
        <div className="grid grid-cols-1 gap-8 justify-items-center">
            {members[0] && <CardMember key={0} {...members[0]} />}
          </div>

          {/* Teks kanan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white md:text-center right-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-blue-300">
              Riset dan <br /> Data
            </h2>
          </motion.div>
        </div>

        {/* === Baris kedua: 3 foto lainnya === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {members.slice(1).map((member, index) => (
            <CardMember key={index + 1} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
