"use client";
import { useState } from "react";
import MembersDirjen from "./MembersDirjen";
import MembersPHT from "./Members-PHT";
import Pagination from "@/components/layout/Pagination";

export default function Members() {
  const [page, setPage] = useState(1);

  // daftar section yang bisa diganti
  const sections = [
    <MembersDirjen key="dirjen" />,
    <MembersPHT key="pht" />,
  ];

  return (
    <section className="relative bg-[#0E1B2B] py-20 min-h-screen transition-all duration-700">
      {/* tampilkan section sesuai halaman */}
      {sections[page - 1]}

      <Pagination
        totalPages={sections.length}
        currentPage={page}
        onPageChange={setPage}
      />
    </section>
  );
}
