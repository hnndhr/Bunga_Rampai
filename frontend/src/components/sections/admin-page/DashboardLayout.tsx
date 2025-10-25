"use client";

import React, { useState } from "react";
import Sidebar from "./SidebarNavigation";
import SurveyTable from "./SurveyTable";
import AdminTable from "./AdminTable";
import SurveyBlocksTable from "./SurveyBlocksTable";
import SurveyLogs from "./LogsTabel";

const DashboardLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "Logs" | "admins" | "survey"
  >("Logs");

  const renderContent = () => {
    switch (currentView) {
      case "admins":
        return <AdminTable />;
      case "survey":
        return <SurveyTable />;
      default:
        return <SurveyLogs />;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('../images/mission2.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-purple-900/40 to-blue-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen px-7">
        {/* Sidebar */}
        <Sidebar onNavigate={setCurrentView} currentView={currentView} />

        {/* Main Content Area */}
        <div className="flex-1 p-8 flex flex-col">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
