"use client";

import { Search, X } from "lucide-react";

interface DataSearchBarProps {
  searchTerm: string;
  onSearchChange: (
    value: string
  ) => void;
}

export default function DataSearchBar({
  searchTerm,
  onSearchChange,
}: DataSearchBarProps) {
  return (
    <section id="search-section">
      <div
        className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-5
      "
      >
        <div className="relative">
          <Search
            size={20}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              onSearchChange(
                e.target.value
              )
            }
            placeholder="Search Order ID, Customer Name, Product Name..."
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-900/80
              py-4
              pl-12
              pr-12
              text-white
              outline-none
              transition-all
              focus:border-cyan-500
            "
          />

          {searchTerm && (
            <button
              onClick={() =>
                onSearchChange("")
              }
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-white
            "
            >
              <X size={18} />
            </button>
          )}
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Search by Order ID,
          Customer Name or Product
          Name
        </p>
      </div>
    </section>
  );
}