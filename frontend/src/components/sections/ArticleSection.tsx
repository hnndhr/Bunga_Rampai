"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FileText,
  Calendar,
  Hand,
  Handshake,
  Users,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BlockRenderer from "./BlocksRenderer";
import InfographicIntro from "./InfographicIntro";

type Block = {
  id: string;
  ordering: number;
  block_type?: string;
  content: any;
  caption?: string;
};

type Article = {
  id: string;
  slug: string;
  title: string;
  header_image?: string | null;
  blocks: Block[];
  respondents?: number;
  period?: string;
  method?: string;
  survey_type?: string;
  report_link?: string;
  infographic_link?: string;
};

export default function ArticleSection({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/articles/${encodeURIComponent(slug)}`
        );
        if (!response.ok) throw new Error("Gagal memuat artikel");

        const data: Article = await response.json();
        setArticle(data);
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

  if (loading)
    return <div className="text-center py-20">Memuat artikel...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!article)
    return <div className="text-center py-20">Artikel tidak ditemukan.</div>;

  return (
    <main className="font-serif bg-white text-zinc-800">
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] bg-gray-900 overflow-hidden">
        {/* Background Image */}
        {article.header_image && (
          <Image
            src={article.header_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/55" />

        {/* Back Button */}
        <div className="absolute top-12 left-4 md:left-8 lg:left-20 z-30">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
        </div>

        {/* Title Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 md:px-32 text-center">
          <h1 className="max-w-4xl text-xl md:text-3xl lg:text-5xl font-abhaya text-white font-medium leading-tight tracking-wide">
            {article.title}
          </h1>

          <hr className="w-full md:w-full border-t border-white mt-10" />
        </div>

        {/* Info Badges */}
        <div className="absolute bottom-6 left-8 md:left-32 flex flex-wrap items-center gap-2 md:gap-3 z-20">
          {article.respondents && (
            <InfoBadge
              icon={<Users />}
              text={`${article.respondents.toLocaleString()} Responden`}
            />
          )}
          {article.period && (
            <InfoBadge icon={<Calendar />} text={article.period} />
          )}
          {article.method && (
            <InfoBadge icon={<Hand />} text={article.method} />
          )}
          {article.survey_type && (
            <InfoBadge
              icon={<Handshake />}
              text={`Survei ${article.survey_type}`}
            />
          )}
          {article.report_link && (
            <a
              href={
                article.report_link?.startsWith("http")
                  ? article.report_link
                  : `https://${article.report_link}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <InfoBadge icon={<FileText />} text="Laporan Survei" clickable />
            </a>
          )}
        </div>
      </section>

      {/* ===== INFOGRAPHIC ===== */}
      {(() => {
        const infographicBlock = article.blocks?.find(
          (b) => b.block_type === "infographic_desc"
        );
        return (
          (article.infographic_link || infographicBlock) && (
            <InfographicIntro
              image={article.infographic_link}
              text={infographicBlock?.content}
            />
          )
        );
      })()}

      {/* ===== ARTICLE BODY ===== */}
      <article className="max-w-4xl mx-auto px-4 pb-12 md:pb-16">
        <section className="prose prose-xl prose-p:leading-relaxed prose-p:my-6 prose-headings:font-sans prose-headings:font-bold text-justify">
          {article.blocks
            ?.filter((b)=> b.block_type !== "infographic_desc")
            .sort((a, b) => a.ordering - b.ordering)
            .map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
        </section>
      </article>
    </main>
  );
}

/* ===== COMPONENT: Info Badge ===== */
function InfoBadge({
  icon,
  text,
  clickable = false,
}: {
  icon: React.ReactNode;
  text: string;
  clickable?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2 rounded-3xl
                  bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-md border border-white/20
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_4px_10px_rgba(0,0,0,0.25)]
                  overflow-hidden transition-all duration-300 ${
                    clickable
                      ? "hover:from-white/25 hover:to-white/10 cursor-pointer"
                      : ""
                  }`}
    >
      <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-60 rotate-12" />
      <span className="text-white relative z-10 flex items-center gap-1.5 text-xs md:text-sm font-montserrat font-medium whitespace-nowrap">
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-4 h-4 md:w-5 md:h-5 text-white",
        })}
        {text}
      </span>
    </div>
  );
}
