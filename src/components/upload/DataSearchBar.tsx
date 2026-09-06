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
        size={16}
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
          outline-none transition-colors focus:border-blue-500
        "
      />

      {searchTerm && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute right-3 p-1 rounded text-slate-400 hover:text-white transition-colors"
          title="Clear search filter"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}