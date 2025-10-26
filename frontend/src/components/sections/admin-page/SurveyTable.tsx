"use client";

import React, { useState, useEffect, useMemo } from "react";
import AdminPagination from "./Pagination";
import { MontserratText } from "@/components/ui/FontWrappers";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SurveyData {
  id: string;
  slug: string;
  title: string;
  header_image: string | null;
  respondents: number;
  period: string;
  method: string;
  survey_type: string;
  report_link: string | null;
  username: string | null;
  created_at: string;
  updated_at: string;
}

const SurveyTable: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // State untuk sort (kolom & arah)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SurveyData;
    direction: "asc" | "desc";
  }>({
    key: "updated_at",
    direction: "desc", // Default: terbaru ke terlama
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/connect/survey-articles/?page=${currentPage}`,
          { method: "GET" }
        );
        const res = await response.json();

        if (res?.status === "OK" && Array.isArray(res.data)) {
          setSurveyData(res.data);
          setTotalPages(res.totalPages ?? 1);
        } else {
          setSurveyData([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setSurveyData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Fungsi untuk handle klik header (toggle arah sort)
  const handleSort = (key: keyof SurveyData) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // toggle arah sort
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  // Urutkan data di client (tanpa ubah fetch)
  const sortedData = useMemo(() => {
    const sorted = [...surveyData];
    const { key, direction } = sortConfig;

    sorted.sort((a, b) => {
      // Sorting tanggal
      if (key === "created_at" || key === "updated_at") {
        const dateA = new Date(a[key]).getTime();
        const dateB = new Date(b[key]).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      // Sorting string
      const valA = (a[key] ?? "").toString().toLowerCase();
      const valB = (b[key] ?? "").toString().toLowerCase();
      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [surveyData, sortConfig]);

  const renderSortIcon = (key: keyof SurveyData) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="inline w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline w-4 h-4 ml-1" />
    );
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/survey/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus survei ini?")) return;
    try {
      await fetch(`/api/surveys/${id}`, { method: "DELETE" });
      alert("Data berhasil dihapus");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div></div>
        <MontserratText className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          SURVEY MANAGEMENT
        </MontserratText>
        <button
          onClick={() => (window.location.href = "/admin/create-article")}
          className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all shadow-lg"
        >
          Create Survey
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[0.2fr_1fr_0.5fr_0.5fr_0.5fr] gap-4 pb-4 border-b border-white/20 text-white/90 font-medium text-[13px]">
        <div>No</div>

        <div
          onClick={() => handleSort("title")}
          className="cursor-pointer select-none flex items-center"
        >
          Title {renderSortIcon("title")}
        </div>

        <div
          onClick={() => handleSort("updated_at")}
          className="cursor-pointer select-none flex items-center"
        >
          Last Modified {renderSortIcon("updated_at")}
        </div>

        <div
          onClick={() => handleSort("username")}
          className="cursor-pointer select-none flex items-center"
        >
          Username {renderSortIcon("username")}
        </div>

        <div>Action</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {sortedData.length === 0 ? (
          <div className="text-white/60 text-center py-8">
            No data available
          </div>
        ) : (
          sortedData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[0.2fr_1fr_0.5fr_0.5fr_0.5fr] gap-4 py-4 border-b border-white/10 text-white/80 hover:bg-white/5 transition-all text-sm"
            >
              {/* Nomor */}
              <div>{(currentPage - 1) * surveyData.length + (index + 1)}</div>

              {/* Title */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.title}
              </div>

              {/* Last Modified */}
              <div>
                {new Date(
                  item.updated_at || item.created_at
                ).toLocaleDateString()}
              </div>

              {/* Username */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.username ?? "-"}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/30 transition-all"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-red-500/20 border border-red-600/40 text-red-400 hover:bg-red-500/30 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SurveyTable;
