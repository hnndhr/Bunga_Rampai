"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Pagination from "../../layout/Pagination";

//About Us -> Member

export default function MembersPHT() {
  const members = [
    {
      name: "Fathiya Noor Jannah",
      role: "Menteri Koordinator",
      image: "/images/members/Fath_Bebas.jpg",
    },
    {
      name: "Aidan Muhammad Alfath",
      role: "Wakil Menteri",
      image: "/images/members/Aidan_Bebas.jpg",
    },
    {
      name: "Laili Kharisma Octavia",
      role: "Menteri",
      image: "/images/members/Laili_Bebas.jpg",
    },
    {
      name: "Lintang Hikaru",
      role: "Direktur Jenderal",
      image: "/images/members/Lintang_Bebas.jpg",
      desc: "Dengan tangan kami perkuatkan kejelasan Media Branding, tim kreatif yang memperkuat peran Riset dan Data dalam membangun identitas kementerian.",
    },
  ];

  return (
    <section className="relative bg-[#0E1B2B] py-20 overflow-hidden">
      {/* === Background Pattern (garis diagonal) === */}
      <div
        className="absolute inset-0 bg-[linear-gradient(120deg,#1C2940_1px,transparent_1px)] bg-[length:60px_60px] opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* === Title Section === */}
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Petinggi Kementerian <br />
            <span className="text-blue-300">Riset dan Data</span>
          </h2>
        </div>

        {/* === Grid Cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-lg group"
            >
              {/* Foto Member */}
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay Hitam Transparan */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90" />

              {/* Informasi di bawah */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-gray-300 italic">as {member.role}</p>
                {member.desc && (
                  <p className="text-xs mt-2 text-gray-400 leading-snug">
                    {member.desc}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
