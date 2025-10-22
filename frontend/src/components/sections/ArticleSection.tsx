// frontend/src/components/ArticleSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import BlockRenderer from "./BlocksRenderer"; // Kita akan gunakan komponen terpisah

// Tipe data tetap sama
type Block = {
  id: string;
  ordering: number;
  block_type?: string;
  content: any;
  // Saran: Tambahkan caption untuk gambar
  caption?: string; 
};

type Article = {
  id: string;
  slug: string;
  title: string;
  header_image?: string | null;
  // Saran: Tambahkan informasi penulis untuk tampilan seperti Medium
  author?: {
    name: string;
    avatar_url?: string;
  };
  published_date?: string;
  read_time_minutes?: number;
  blocks: Block[];
};

export default function ArticleSection({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    // Menggunakan async/await untuk fetching data yang lebih bersih
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/articles/${encodeURIComponent(slug)}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Gagal memuat artikel");
        }
        const data: Article = await response.json();
        
        // Mensimulasikan data author jika tidak ada dari API
        const articleWithDefaults = {
            ...data,
            author: data.author || { name: "Tim Redaksi", avatar_url: "https://i.pravatar.cc/40" },
            published_date: data.published_date || "22 Oktober 2025",
            read_time_minutes: data.read_time_minutes || 5,
        };

        setArticle(articleWithDefaults);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Terjadi kesalahan");
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Memuat artikel...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!article) return <div className="text-center py-20">Artikel tidak ditemukan.</div>;

  return (
    <main className="font-serif bg-white text-zinc-800 py-12 md:py-16">
      <article className="max-w-3xl mx-auto px-4">
        {/* Judul Utama */}
        <h1 className="font-sans text-3xl md:text-5xl font-bold !leading-tight tracking-tight mb-4">
          {article.title}
        </h1>

        {/* Informasi Penulis & Meta - Khas Medium */}
        <div className="flex items-center space-x-4 my-8">
          <img
            src={article.author?.avatar_url}
            alt={article.author?.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="text-sm">
            <p className="font-sans font-semibold">{article.author?.name}</p>
            <p className="text-zinc-500 font-sans">
              <span>{article.published_date}</span>
              <span className="mx-1.5">·</span>
              <span>{article.read_time_minutes} menit baca</span>
            </p>
          </div>
        </div>

        {/* Gambar Header */}
        {article.header_image && (
          <img
            src={article.header_image}
            alt={article.title}
            className="w-full h-auto object-cover rounded-lg my-8"
          />
        )}

        {/* Konten Artikel */}
        <section className="prose prose-xl prose-p:leading-relaxed prose-p:my-6 prose-headings:font-sans prose-headings:font-bold">
          {article.blocks
            ?.sort((a, b) => a.ordering - b.ordering) // Selalu urutkan block
            .map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
        </section>
      </article>
    </main>
  );
}