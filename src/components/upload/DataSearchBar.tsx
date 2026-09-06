"use client";

import { Search, X } from "lucide-react";

interface DataSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function DataSearchBar({
  searchTerm,
  onSearchChange,
}: DataSearchBarProps) {
  return (
    <div className="relative flex items-center">
      <Search
        size={15}
        strokeWidth={1.75}
        className="absolute left-3.5 text-slate-400 pointer-events-none"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Filter by Order ID, Customer, or Product..."
        className="
          w-full rounded-lg border border-white/[0.1] bg-[#0f1118]
          py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-500
          outline-none transition-all duration-150 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20
        "
      />

      {searchTerm && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          title="Clear search filter"
        >
          <X size={14} strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}