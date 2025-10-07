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
    <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white py-24 overflow-hidden">
      {/* REVERSE Decorative Blur Elements - posisi dibalik dari Hero */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-900"></div>

      <div className="container mx-auto pl-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* BAGIAN KIRI: Teks */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold">BUNGA RAMPAI</h2>
            <p className="text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              maximus metus id sapien finibus, sed sollicitudin nisi sodales.
              Pellentesque ac diam sit amet lorem volutpat sagittis vitae in
              mauris. Aenean nunc ligula, mattis ut efficitur a, lobortis a dui.
              Etiam tincidunt sit amet velit hendrerit, sed mollis dolor
              lobortis.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Maecenas non rutrum augue. Duis nec iaculis dui, ut ultrices quam.
              Donec consequat ante ante, in venenatis quam imperdiet eget.
              Curatur ac massa in lorem cursus consectetur.
            </p>
          </div>

          {/* BAGIAN KANAN: Gambar Terpotong */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-center gap-3">
              {imagePanels.map((panel, index) => (
                <div
                  key={index}
                  className={clsx(
                    "rounded-lg bg-cover shadow-lg transition-transform duration-300 hover:scale-105",
                    {
                      "h-96 w-1/4": index === 1,
                      "h-72 w-1/5": index !== 1,
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
        </div>
      </div>
    </section>
  );
}