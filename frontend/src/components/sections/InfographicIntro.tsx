"use client";

import Image from "next/image";

interface Props {
  image?: string | null;
  text?: string | null;
}

export default function InfographicIntro({ image, text }: Props) {
  const showImage = Boolean(image);
  const showText = Boolean(text);

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      {/* MOBILE = 1 kolom, DESKTOP = 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* TOP (mobile) or LEFT (desktop): IMAGE */}
        <div className="w-full h-full flex items-center justify-center order-1">
          {showImage ? (
            <Image
              src={image as string}
              alt="Infografis"
              width={500}
              height={500}
              className="object-contain rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-48 md:h-60 bg-gray-300/50 animate-pulse rounded-lg" />
          )}
        </div>

        {/* BOTTOM (mobile) or RIGHT (desktop): TEXT */}
        <div className="w-full text-base leading-relaxed order-2">
          {showText ? (
            <p className="whitespace-pre-line">{text}</p>
          ) : (
            <div className="space-y-3">
              <div className="w-4/5 h-5 bg-gray-300/50 animate-pulse rounded" />
              <div className="w-3/5 h-5 bg-gray-300/50 animate-pulse rounded" />
              <div className="w-2/5 h-5 bg-gray-300/50 animate-pulse rounded" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
