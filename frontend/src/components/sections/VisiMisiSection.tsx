import React from 'react';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export default function VisionMission() {
  return (
    <div className={`${cormorant.className} min-h-screen bg-white px-8 md:px-16 lg:px-24 py-16`}>
      {/* Header Section */}
      <div className="mb-3">
        <h1 className="text-gray-500 text-2xl md:text-3xl italic font-semibold">
          Driven by Research
        </h1>
      </div>

      {/* Vision Section */}
      <div className="mb-20">
        {/* Vision Title - Large */}
        <h2 className="text-8xl text-end md:text-9xl lg:text-[12rem] font-bold text-gray-200 leading-none">
          Vision
        </h2>
        
        {/* Vision Content - Text Left, Image Right */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="max-w-xl ml-auto text-right">
            <p className="text-lg md:text-xl font-normal text-gray-800 leading-relaxed text-end">
              Responsivitas riset dan data serta optimalisasi media dan branding.
            </p>
          </div>
          <div className="lg:w-1/2 ">
            <div className="w-full h-60 aspect-[6/3] overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Vision - Eye close-up"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div>
        {/* Mission Content - Text Right, Image Left */}
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <div className="lg:w-1/2">
            <div className="w-full h-60 aspect-[6/3] overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Mission - Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg md:text-xl font-normal text-gray-800 leading-relaxed">
              Menjadi mitra strategis dalam pelayanan informasi dan komunikasi dengan stakeholder kampus demi optimalisasi kesejahteraan.
            </p>
          </div>
        </div>
        
        {/* Mission Title - Large, Below Image */}
        <h2 className="text-8xl text-start md:text-9xl lg:text-[12rem] font-bold text-gray-200 leading-none">
          Mission
        </h2>
      </div>
    </div>
  );
}