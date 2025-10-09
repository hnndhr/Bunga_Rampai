"use client";

import clsx from "clsx";

export default function CatalogueSection() {
  const imagePanels = [
    { style: { backgroundPosition: "0% 50%" }, offset: false },
    { style: { backgroundPosition: "50% 50%" }, offset: true },
    { style: { backgroundPosition: "100% 50%" }, offset: false },
  ];

  return (
    // REVERSE: gradient dari emerald-900 ke slate-900 (kebalikan dari Hero)
    <section className="relative min-h-screen flex items-center justify-center text-white py-24 overflow-hidden">
      {/* REVERSE Decorative Blur Elements - posisi dibalik dari Hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-slate-800 to-gray-900"></div>

      <div className="container mx-auto pr-32 pl-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* BAGIAN KANAN: Gambar Terpotong */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-center gap-3">
              {imagePanels.map((panel, index) => (
                <div
                  key={index}
                  className={clsx(
                    "rounded-lg bg-cover shadow-lg transition-transform duration-300 hover:scale-105",
                    {
                      "h-[420px] w-[180px]": index === 1,
                      "h-[320px] w-[155px]": index !== 1,
                    }
                  )}
                  style={{
                    backgroundImage: "url('/images/flower-image.jpg')",
                    ...panel.style,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* BAGIAN KIRI: Teks */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold">Kementerian Riset dan Data</h2>
            <p className="text-gray-300 leading-relaxed">
              Kementerian Riset dan Data merupakan kementerian yang mengelola dan 
              mengembangkan database BEM UNS melalui riset dan survei yang dilakukan 
              secara mandiri maupun kolaboratif. Selain mendukung kebutuhan data 
              internal organisasi, kementerian ini juga bertanggung jawab dalam 
              memberikan informasi yang relevan untuk pengawalan isu strategis dan 
              insidental. Di era digital, kementerian ini berperan sebagai pusat 
              edukasi dan publikasi data, menyajikan informasi yang akurat dan 
              bermanfaat bagi mahasiswa UNS. Dengan pendekatan yang responsif dan 
              inovatif, kementerian ini berkomitmen untuk mengoptimalkan pengelolaan 
              data sebagai landasan strategis dalam berbagai aktivitas organisasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
