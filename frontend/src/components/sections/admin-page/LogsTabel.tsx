"use client";

import React, { useState, useEffect } from "react";
import AdminPagination from "./Pagination";
import { MontserratText } from "@/components/ui/FontWrappers";

interface SurveyData {
  id: string;
  title: string;
  author_username: string | null;
  created_at: string;
  updated_at: string | null;
}

function getActionLabel(item: SurveyData) {
  if (item.updated_at && item.updated_at !== item.created_at) return "Edited";
  return "Created";
}

const LogsTabel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/connect/survey-articles/?page=${currentPage}`,
          {
            method: "GET",
          }
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
      {/* Header Section */}
      <div className="flex justify-center items-center mb-8">
        <MontserratText className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          SURVEY LOGS
        </MontserratText>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-4 pb-4 border-b border-white/20 text-white/90 font-medium text-[13px] text-center">
        <div>Date</div>
        <div>Survey</div>
        <div>Username</div>
        <div>Action</div>
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
              className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-4 py-4 border-b border-white/10 text-white/80 hover:bg-white/5 transition-all text-sm"
            >
              {/* Date */}
              <div>
                {new Date(item.updated_at || item.created_at).toLocaleDateString()}
              </div>

              {/* Title */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.title}
              </div>

              {/* Username */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.author_username ?? "-"}
              </div>

              {/* Action */}
              <div>{getActionLabel(item)}</div>
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

export default LogsTabel;
