// frontend/src/components/BlockRenderer.tsx
import React from "react";

type Block = {
  id: string;
  ordering: number;
  block_type?: string;
  content: any;
  caption?: string; // Menambahkan caption untuk gambar
};

// Fungsi untuk membersihkan HTML jika kontennya berupa string HTML
const createMarkup = (htmlContent: string) => {
  // Tambahkan validasi atau sanitasi di sini jika perlu (misal: menggunakan DOMPurify)
  return { __html: htmlContent };
};


export default function BlockRenderer({ block }: { block: Block }) {
  const type = block.block_type || "paragraph";
  const { content, caption } = block;

  switch (type) {
    case "headline":
      return (
        <h2 className="!mt-12 !mb-4 !text-3xl">
          {content}
        </h2>
      );

    case "paragraph":
      // Menggunakan dangerouslySetInnerHTML agar bisa render tag seperti <b>, <i>, <a>
      // Pastikan konten dari API Anda aman!
      return (
        <p dangerouslySetInnerHTML={createMarkup(content)} />
      );

    case "image":
      return (
        // Gambar bisa sedikit lebih lebar dari teks untuk efek visual
        <figure className="!my-8 md:-mx-8"> 
          <img
            src={content}
            alt={caption || ""}
            className="w-full rounded-lg"
          />
          {caption && (
            <figcaption className="text-center text-sm text-zinc-500 mt-2 font-sans">
              {caption}
            </figcaption>
          )}
        </figure>
      );

    case "quote":
      return (
        <blockquote className="!border-l-[3px] !border-zinc-800 !pl-6 !italic !text-xl !my-10">
          {content}
        </blockquote>
      );
      
    case "list": // Menambahkan tipe blok baru: list
      return (
        <ul className="list-disc pl-5 my-6 space-y-2">
          {Array.isArray(content) && content.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={createMarkup(item)} />
          ))}
        </ul>
      );

    default:
      return <p dangerouslySetInnerHTML={createMarkup(content)} />;
  }
}