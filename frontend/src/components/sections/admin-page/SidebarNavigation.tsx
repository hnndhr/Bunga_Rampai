// components/SidebarNavigationtsx
import React from "react";
import { Menu, Users, FileText, BarChart3 } from "lucide-react";
import Image from 'next/image';


const SidebarNavigation: React.FC = () => {
  return (
    <div className="w-20 flex flex-col items-center py-8 justify-between">
      {/* Logo - Top */}
      <div className="w-24 h-24 bg-transparent flex items-center justify-center cursor-pointer">
        <Image
          src="/images/rnd_logo.png"
          alt="rnd logo"
          width={50}
          height={50}
        />
      </div>

      {/* Navigation Bar - Center (Wrapped in pill/oval shape) */}
      <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/30 shadow-lg p-2 flex flex-col space-y-4">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer group">
          <BarChart3 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </div>
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer group">
          <Users className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </div>
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer group">
          <FileText className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Logout - Bottom */}
      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg hover:bg-red-500/50 transition-all cursor-pointer group">
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
