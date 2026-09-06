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
    <section id="search-section">
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl p-4 sm:p-5 shadow-lg">
        <div className="relative flex items-center">
          <Search
            size={18}
            className="absolute left-4 text-cyan-400 pointer-events-none"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter records by Order ID, Customer Name, or Product Title..."
            className="
              w-full rounded-xl border border-white/[0.08] bg-[#080c14]/90
              py-3.5 pl-11 pr-24 text-sm text-white placeholder-slate-500
              outline-none transition-all duration-200
              focus:border-cyan-500/60 focus:bg-[#090e1a] focus:ring-2 focus:ring-cyan-500/20
            "
          />

          <div className="absolute right-3.5 flex items-center gap-2">
            {searchTerm ? (
              <button
                onClick={() => onSearchChange("")}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear search filter"
              >
                <X size={16} />
              </button>
            ) : (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded font-mono text-[10px] text-slate-500 bg-white/[0.05] border border-white/[0.08]">
                QUICK SEARCH
              </span>
            )}
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 font-mono px-1">
          <span>Real-time indexing across all dataset attributes</span>
          {searchTerm && (
            <span className="text-cyan-400">
              Active search: &ldquo;{searchTerm}&rdquo;
            </span>
          )}
        </div>
      </div>
    </section>
  );
}