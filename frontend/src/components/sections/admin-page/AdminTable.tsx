"use client";

import React, { useState, useEffect } from "react";
import AdminPagination from "./Pagination";
import { MontserratText } from "@/components/ui/FontWrappers";
import CreateAdminModal from "./CreateAdminModal";

interface SurveyData {
  id: string;
  name: string;
  username: string;
  password: string;
  role: "master" | "admin";
}

const AdminTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // ✅ Toast state
  const [toastVisible, setToastVisible] = useState(false);

  // ✅ Fetch Data reusable
  const fetchData = async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/connect/admins/?page=${page}`,
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

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ✅ Show toast (reusable)
  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500); // auto hide
  };

  if (loading) {
    return (
      <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 flex flex-col">

      {/* ✅ Toast */}
      {toastVisible && (
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-white text-sm animate-slide-in">
          ✅ Admin created successfully
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div></div>
        <MontserratText className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          ADMIN MANAGEMENT
        </MontserratText>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Create Admin
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] gap-4 pb-4 border-b border-white/20 text-white/90 font-medium text-[13px]">
        <div>No</div>
        <div>Nama</div>
        <div>Username</div>
        <div>Password</div>
        <div>Role</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {surveyData.length === 0 ? (
          <div className="text-white/60 text-center py-8">No data available</div>
        ) : (
          surveyData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] gap-4 py-4 border-b border-white/10 text-white/80 hover:bg-white/5 transition-all text-sm"
            >
              <div>{(currentPage - 1) * surveyData.length + (index + 1)}</div>
              <div className="truncate">{item.name}</div>
              <div className="truncate">{item.username}</div>
              <div className="truncate">{item.password}</div>
              <div>{item.role}</div>
            </div>
          ))
        )}
      </div>

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          fetchData(1); // reload page 1
          showToast();
        }}
      />
    </div>
  );
};

export default AdminTable;
