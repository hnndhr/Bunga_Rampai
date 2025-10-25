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
    <section className="max-w-4xl mx-auto px-4 pt-12 md:pt-16">
      <div className="relative">
        {showImage && (
          <div className="md:float-left md:mr-6 mb-4 max-w-3xl">
            <Image
              src={image as string}
              alt="Infografis"
              width={800}
              height={842}
              className="object-contain rounded-lg shadow-md aspect-[2828/4000] max-w-[400px] object-center"
            />
          </div>
        )}

        <div className="leading-relaxed prose prose-xl prose-p:leading-relaxed prose-p:my-6 prose-headings:font-sans prose-headings:font-bold prose-headings:mt-0">
          {showText ? (
            <p className="whitespace-pre-line text-justify">{text}</p>
          ) : (
            <div className="space-y-3">
              <div className="w-4/5 h-5 bg-gray-300/50 animate-pulse rounded" />
              <div className="w-3/5 h-5 bg-gray-300/50 animate-pulse rounded" />
              <div className="w-2/5 h-5 bg-gray-300/50 animate-pulse rounded" />
            </div>
          )}
        </div>

        {/* clearfix untuk menghindari konten berikutnya naik */}
        <div className="clear-both" />
      </div>
    </section>
  );
}
