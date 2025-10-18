"use client";

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
      name: "Lintang Hikaru",
      role: "Direktur Jenderal",
      image: "/images/members/Lintang_Bebas.jpg",
      imageBack: "/images/members/Lintang_Bebas.jpg",
      desc: "Dengan tangan kami perkuatkan kejelasan Media Branding, tim kreatif yang memperkuat peran Riset dan Data dalam membangun identitas kementerian.",
    },
  ];

  return (
    <section className="relative bg-[#0E1B2B] py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-[linear-gradient(120deg,#1C2940_1px,transparent_1px)] bg-[length:60px_60px] opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Petinggi Kementerian <br />
            <span className="text-blue-300">Riset dan Data</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {members.map((member, index) => (
            <CardMember key={index} {...member} />
          ))}
        </div>

      </div>
    </section>
  );
}
