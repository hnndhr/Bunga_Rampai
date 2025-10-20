// components/sections/admin-page/DashboardLayout.tsx
import React from 'react';
import Sidebar from './SidebarNavigation';
import SurveyTable from './SurveyTable';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('images/mission2.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-purple-900/40 to-blue-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen px-7">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-8 flex flex-col">
          {/* Jika tidak ada children, render SurveyTable sebagai default */}
          {children || <SurveyTable />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;