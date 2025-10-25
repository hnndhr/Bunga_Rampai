"use client";

import { motion } from "framer-motion";
import CardMember from "@/components/ui/CardMembers";
import { MontserratText } from "@/components/ui/FontWrappers";

export default function MembersKanal() {
  const members = [
    {
      name: "Kanal Informasi",
      role: "Kedirjenan Kementerian",
      image: "/images/members/Kanal_Utama.jpg",
      imageBack: "/images/members/Kanal_Second.jpg",
      desc: ""
    },
    {
      name: "Muhammad Syahrul",
      role: "Direktur Jenderal",
      image: "/images/members/Syahrul_Bebas.jpg",
      imageBack: "/images/members/Syahrul_Kedirjenan.jpg",
      desc: "Saya Direktur Jenderal Kanal Informasi Kementerian Riset & Data BEM UNS. Saya bertanggung jawab penuh atas progres dan efektivitas penyebaran informasi kampus. Di bawah kepemimpinan saya, Kedirjenan ini berfokus menjadi penghubung vital untuk publikasi barang hilang dan mengelola platform terpercaya jual-beli barang bekas layak pakai guna mendukung efisiensi, kesadaran, dan keberlanjutan ekosistem kampus.",
    },
    {
      name: "Kanal Informasi",
      role: "Kedirjenan Kementerian",
      image: "/images/members/Kanal_Second.jpg",
      imageBack: "/images/members/Kanal_Utama.jpg",
      desc: ""
    },
    {
      name: "Amelia Yulian Sari",
      role: "Staff",
      image: "/images/members/Amel_Bebas.jpg",
      imageBack: "/images/members/Amel_Kedirjenan.jpg",
      desc: "RnD tuh bener bener kaya keluarga yang bisa jadi tempat recharge energy aku ketika aku capek capeknya kuliah. Di sini aku bener bener ngerasa diapresiasi walaupun hal sekecil apapun itu. Aku kan anak kanal, dirjenku king syahrull. Dari kanal aku bener bener belajar banyak bgt, terkait desain, kedisiplinan, tanggung jawab, dan masih banyak lagi. Temen temen hebat di kanal jugaa bikin suasana kekeluargaan kanal jadi erat banget."
    },
    {
      name: "Saskya Aliya Azizah",
      role: "Staff",
      image: "/images/members/Saskya_Bebas.jpg",
      imageBack: "/images/members/Saskya_Kedirjenan.jpg",
      desc: "Bagiku, RnD jadi bagian berkesan di awal kuliah. Sobat rndolan baik, supportif, dan seru. Aku belajar menghadapi perbedaan kepribadian dan kesibukan tiap orang. Makrab kemarin juga memorable banget, penuh tawa dan bikin aku lebih mudah bersosialisasi. Walau kaku kalau diajak bikin tiktok, sejak jadi PJ Barkas aku jadi lebih fast respon loh hehe."
    },
    {
      name: "Shaesa Rindini Nabiila",
      role: "Staff",
      image: "/images/members/Shaesa_Bebas.jpg",
      imageBack: "/images/members/Shaesa_Kedirjenan.jpg",
      desc: "Wishing you all the happiness in the world. Hope you find what you are looking for and hope you live with no regrets. I guess everything happens for a reason and you have to live with that. Live, love, laugh and never regret. Some memories never leave"
    },
    {
      name: "Thori Prayoga",
      role: "Staff",
      image: "/images/members/Thori_Bebas.jpg",
      imageBack: "/images/members/Thori_Kedirjenan.jpg",
      desc: ""
    },
  ];

  return (
    <section className="relative py-12 overflow-hidden">
      {/* === Background Pattern === */}
      <div
        className="absolute inset-0 bg-[linear-gradient(120deg,#1C2940_1px,transparent_1px)] bg-[length:60px_60px] opacity-30"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-6 lg:px-16">
        {/* === JUDUL ATAS === */}
        <MontserratText>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-center font-extrabold text-3xl md:text-5xl mb-16 tracking-wide"
          >
            KEDIRJENAN KANAL INFORMASI
          </motion.h2>
        </MontserratText>

        {/* === BARIS STAF === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {members.slice(0, 7).map((member, index) => (
            <CardMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
