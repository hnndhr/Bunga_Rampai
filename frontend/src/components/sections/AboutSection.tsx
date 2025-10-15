"use client";

export default function CatalogueSection() {
  return (
    // Background gradasi tetap elegan dan lembut
    <section className="relative min-h-screen flex items-center justify-center text-white py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900"></div>

      <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-10">
        {/* Flex arah dibalik di mobile biar teks dulu */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
          {/* BAGIAN KIRI: Gambar Landscape */}
          <div className="lg:w-1/2 w-full">
            <div className="w-full h-[220px] md:h-[320px] lg:h-[420px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/1.jpg"
                alt="Member Kementerian Riset dan Data"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* BAGIAN KANAN: Teks */}
          <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight ">
              KEMENTERIAN <br></br>RISET DAN DATA
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Kementerian Riset dan Data merupakan kementerian yang mengelola dan
              mengembangkan database BEM UNS melalui riset dan survei yang dilakukan
              secara mandiri maupun kolaboratif. Selain mendukung kebutuhan data internal
              organisasi, kementerian ini juga bertanggung jawab dalam memberikan
              informasi yang relevan untuk pengawalan isu strategis dan insidental.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              Di era digital, kementerian ini berperan sebagai pusat edukasi dan publikasi
              data, menyajikan informasi yang akurat dan bermanfaat bagi mahasiswa UNS.
              Dengan pendekatan yang responsif dan inovatif, kementerian ini berkomitmen
              untuk mengoptimalkan pengelolaan data sebagai landasan strategis dalam
              berbagai aktivitas organisasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
