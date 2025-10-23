import React from "react";

interface ArticleTitleProps {
  title: string;
  author: string;
  respondents: number;
  createdAt: string; // ISO string
}

export default function ArticleTitle({
  title,
  author,
  respondents,
  createdAt,
}: ArticleTitleProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="mt-6 mb-8">
      <h1 className="text-4xl font-bold tracking-tight leading-snug">
        {title}
      </h1>

      <div className="flex items-center gap-2 text-gray-600 text-sm mt-3">
        <span>{author}</span>
        <span>•</span>
        <span>{formattedDate}</span>
        {respondents !== undefined && (
          <>
            <span>•</span>
            <span>{respondents} responden</span>
          </>
        )}
      </div>
    </header>
  );
}
