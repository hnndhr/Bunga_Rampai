// app/components/FilterBar.tsx

import { Search, ChevronDown } from 'lucide-react';

export default function FilterBar() {
  const glassEffectClasses = "flex items-center bg-slate-800/60 backdrop-blur-md rounded-full shadow-[inset_0_1px_1px_var(--border-highlight),inset_0_-1px_1px_var(--border-shadow)] transition-colors duration-300";

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full mb-10">
      {/* Search Bar */}
      <div className={`${glassEffectClasses} flex-grow py-2.5 px-5`}>
        <Search className="text-[var(--text-color)] mr-3" size={20} />
        <input 
          type="text" 
          placeholder="Search..."
          className="w-full bg-transparent border-none focus:ring-0 text-[var(--text-color-hover)] placeholder:text-[var(--text-color)]"
        />
      </div>

      <div className="flex gap-4 w-full md:w-auto">
        {/* Tombol Sort By */}
        <div className={`${glassEffectClasses} hover:bg-slate-700/70 cursor-pointer`}>
          <button className="flex items-center justify-between w-full py-2.5 px-6 text-[var(--text-color)] hover:text-[var(--text-color-hover)] transition-colors">
            <span>Sort By</span>
            <ChevronDown className="ml-2" size={20} />
          </button>
        </div>

        {/* Tombol Filter */}
        <div className={`${glassEffectClasses} hover:bg-slate-700/70 cursor-pointer`}>
          <button className="flex items-center justify-between w-full py-2.5 px-6 text-[var(--text-color)] hover:text-[var(--text-color-hover)] transition-colors">
            <span>Filter</span>
            <ChevronDown className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}