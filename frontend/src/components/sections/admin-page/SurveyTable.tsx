// components/sections/admin-page/SurveyTable.tsx
"use client";

import React, { useState, useEffect } from "react";
import AdminPagination from "./Pagination";
import { MontserratText } from "@/components/ui/FontWrappers";

interface SurveyData {
  id: number;
  date: string;
  username: string;
  survey: string;
  action: string;
}

const SurveyTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const totalPages = 5;

  // Fetch data dari database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Ganti dengan endpoint API Anda
        const response = await fetch(`/api/surveys?page=${currentPage}`);
        const data = await response.json();
        setSurveyData(data.surveys);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback ke data dummy jika error
        setSurveyData([
          {
            id: 1,
            date: "22 Juli 2025",
            username: "Hmdhr",
            survey: "Survei Awal Bam UNS",
            action: "Post",
          },
          {
            id: 2,
            date: "22 Juli 2025",
            username: "Hmdhr",
            survey: "Survei Aspirasi dan ...",
            action: "Delete",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Re-fetch ketika halaman berubah

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
      {/* Header Section with Title and Create Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
        </div>
        <MontserratText className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          SURVEY MANAGEMENT
        </MontserratText>
        <button
          onClick={() => (window.location.href = "/admin/create-survey")}
          className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all shadow-lg"
        >
          Create Survey
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 pb-4 border-b border-white/20 text-white/90 font-medium text-sm">
        <div className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors">
          <span>Date</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors">
          <span>Username</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors">
          <span>Survey</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors">
          <span>Action</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {surveyData.length === 0 ? (
          <div className="text-white/60 text-center py-8">
            No data available
          </div>
        ) : (
          surveyData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 gap-4 py-4 border-b border-white/10 text-white/80 hover:bg-white/5 transition-all"
            >
              <div>{item.date}</div>
              <div>{item.username}</div>
              <div>{item.survey}</div>
              <div>
                {item.action === "Post" ? (
                  <span className="px-4 py-1.5 bg-blue-500/80 rounded-full text-sm text-white inline-block">
                    {item.action}
                  </span>
                ) : (
                  <span className="px-4 py-1.5 bg-red-500/80 rounded-full text-sm text-white inline-block">
                    {item.action}
                  </span>
                )}
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
