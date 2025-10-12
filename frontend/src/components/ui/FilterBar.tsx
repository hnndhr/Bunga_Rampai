"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function FilterBar() {
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Sort By");
  const [activeFilter, setActiveFilter] = useState("Filter");

  const glassEffectClasses =
    "bg-black/50 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/20 rounded-2xl";

  const toggleSort = () => {
    setSortOpen((prev) => {
      if (!prev) setFilterOpen(false);
      return !prev;
    });
  };

  const toggleFilter = () => {
    setFilterOpen((prev) => {
      if (!prev) setSortOpen(false);
      return !prev;
    }); 
  };

  const sortOptions = ["Default", "A - Z", "Z - A", "Latest", "Oldest"];
  const filterOptions = ["All", "Mandiri", "Kolaborasi"];

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full mb-10 relative">
      {/* Search Bar */}
      <div
        className={`flex items-center flex-grow py-2.5 px-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]`}
      >
        <Search className="text-gray-300 mr-3" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent border-none focus:ring-0 text-gray-200 placeholder:text-gray-400"
        />
      </div>

      <div className="flex gap-4 w-full md:w-auto">
        {/* Sort By */}
        <div className="relative">
          <button
            onClick={toggleSort}
            className={`flex items-center justify-between w-40 py-2.5 px-6 rounded-full border border-white/20 text-gray-200 hover:bg-white/20 transition-all duration-200 backdrop-blur-xl ${
              activeSort !== "Sort By" ? "bg-white/20 text-white font-semibold" : "bg-white/10"
            }`}
          >
            <span>{activeSort}</span>
            <ChevronDown
              size={18}
              className={`ml-2 transition-transform duration-200 ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {sortOpen && (
            <div
              className={`${glassEffectClasses} absolute mt-2 w-40 p-3 flex flex-col items-start text-gray-200 text-sm z-50`}
            >
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setActiveSort(opt === "Default" ? "Sort By" : opt);
                    setSortOpen(false);
                  }}

                  className={`w-full text-center px-3 py-2 mb-1 rounded-xl transition ${
                    activeSort === opt
                      ? "bg-white/30 text-white font-semibold"
                      : "hover:bg-white/20"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            onClick={toggleFilter}
            className={`flex items-center w-40 justify-between py-2.5 px-6 rounded-full border border-white/20 text-gray-200 hover:bg-white/20 transition-all duration-200 backdrop-blur-xl ${
              activeFilter !== "Filter" ? "bg-white/20 text-white font-semibold" : "bg-white/10"
            }`}
          >
            <span>{activeFilter}</span>
            <ChevronDown
              size={18}
              className={`ml-2 transition-transform duration-200 ${
                filterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {filterOpen && (
            <div
              className={`${glassEffectClasses} absolute right-0 mt-2 w-40 p-3 flex flex-col items-start text-gray-200 text-sm z-50`}
            >
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setActiveFilter(opt === "All" ? "Filter" : opt);
                    setFilterOpen(false);
                  }}
                  className={`w-full text-center px-3 py-2 mb-1 rounded-xl transition ${
                    activeFilter === opt
                      ? "bg-white/30 text-white font-semibold"
                      : "hover:bg-white/20"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
