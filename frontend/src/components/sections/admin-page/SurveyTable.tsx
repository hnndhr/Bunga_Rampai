// components/sections/admin-page/SurveyTable.tsx
"use client";

import React, { useState, useEffect } from "react";
import AdminPagination from "./Pagination";
import { MontserratText } from "@/components/ui/FontWrappers";

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
  author_username: string | null;
  created_at: string;
  updated_at: string;
}

const SurveyTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/test/connection/?page=${currentPage}`,
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
      <div className="flex justify-between items-center mb-8">
        <div></div>
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
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 pb-4 border-b border-white/20 text-white/90 font-medium text-[13px]">
        <div>No</div>
        <div>Title</div>
        <div>Header Image</div>
        <div>Respondents</div>
        <div>Period</div>
        <div>Method</div>
        <div>Survey Type</div>
        <div>Report</div>
        <div>Author Username</div>
        <div>Created At</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {surveyData.length === 0 ? (
          <div className="text-white/60 text-center py-8">
            No data available
          </div>
        ) : (
          surveyData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 py-4 border-b border-white/10 text-white/80 hover:bg-white/5 transition-all text-sm"
            >
              <div>{(currentPage - 1) * surveyData.length + (index + 1)}</div>


              {/* Title */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.title}
              </div>

              {/* Header image */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.header_image ? (
                  <a
                    href={item.header_image}
                    target="_blank"
                    className="underline"
                  >
                    {item.header_image}
                  </a>
                ) : (
                  "-"
                )}
              </div>

              <div>{item.respondents}</div>
              <div>{item.period}</div>
              <div>{item.method}</div>

              {/* Survey Type */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.survey_type}
              </div>

              {/* Report link */}
              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.report_link ? (
                  <a
                    href={item.report_link}
                    target="_blank"
                    className="underline"
                  >
                    {item.report_link}
                  </a>
                ) : (
                  "-"
                )}
              </div>

              <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {item.author_username ?? "-"}
              </div>

              <div>{new Date(item.created_at).toLocaleDateString()}</div>
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
