"use client";

import React from "react";
import { BarChart3, Users, FileText } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SidebarNavigationProps {
  onNavigate: (view: "Logs" | "admins" | "survey") => void;
  currentView: "Logs" | "admins" | "survey";
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  onNavigate,
  currentView,
}) => {
  const router = useRouter();

  const navItem = (
    view: "Logs" | "admins" | "survey",
    Icon: React.ElementType
  ) => (
    <div
      onClick={() => onNavigate(view)}
      className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer group transition-all backdrop-blur-md border
        ${
          currentView === view
            ? "bg-white/40 border-white/70 shadow-xl"
            : "bg-white/10 border-white/20 hover:bg-white/30"
        }`}
    >
      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
    </div>
  );

  const handleLogout = () => {
    // AKTIFKAN baris ini - Ini adalah bagian penting dari logout
    localStorage.removeItem("admin_token");

    // Redirect ke halaman login-admin
    router.push("/admin");
  };

  return (
    <div className="w-20 flex flex-col items-center py-8 justify-between">
      {/* Logo */}
      <div className="w-24 h-24 flex items-center justify-center cursor-pointer">
        <Image src="/images/rnd_logo.png" alt="rnd logo" width={50} height={50} />
      </div>

      {/* Navigasi */}
      <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/30 shadow-lg p-2 flex flex-col space-y-4">
        {navItem("Logs", BarChart3)}
        {navItem("admins", Users)}
        {navItem("survey", FileText)}
      </div>

      {/* Tombol Logout */}
      <div
        onClick={handleLogout}
        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg hover:bg-red-500/50 transition-all cursor-pointer group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </div>
    </div>
  );
};

export default SidebarNavigation;
