"use client";

import { RotateCcw, ChevronDown, Filter } from "lucide-react";

interface DataFiltersProps {
  countries: string[];
  paymentModes: string[];
  selectedCountry: string;
  selectedPaymentMode: string;
  onCountryChange: (value: string) => void;
  onPaymentModeChange: (value: string) => void;
  onReset: () => void;
}

export default function DataFilters({
  countries,
  paymentModes,
  selectedCountry,
  selectedPaymentMode,
  onCountryChange,
  onPaymentModeChange,
  onReset,
}: DataFiltersProps) {
  const hasActiveFilters = Boolean(selectedCountry || selectedPaymentMode);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Country Selector */}
      <div className="relative flex-1 min-w-[170px]">
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className={`
            w-full appearance-none rounded-xl border bg-[#0f1118]
            px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 font-normal
            outline-none transition-all cursor-pointer pr-9 shadow-xs
            hover:border-white/[0.2] focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20
            ${selectedCountry ? "border-blue-500/50 bg-blue-500/[0.05] text-blue-200" : "border-white/[0.1]"}
          `}
        >
          <option value="">All Countries ({countries.length})</option>
          {countries.map((country) => (
            <option key={country} value={country} className="bg-[#0f1118] text-white">
              {country}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronDown size={15} strokeWidth={1.8} />
        </div>
      </div>

      {/* Payment Mode Selector */}
      <div className="relative flex-1 min-w-[170px]">
        <select
          value={selectedPaymentMode}
          onChange={(e) => onPaymentModeChange(e.target.value)}
          className={`
            w-full appearance-none rounded-xl border bg-[#0f1118]
            px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 font-normal
            outline-none transition-all cursor-pointer pr-9 shadow-xs
            hover:border-white/[0.2] focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20
            ${selectedPaymentMode ? "border-violet-500/50 bg-violet-500/[0.05] text-violet-200" : "border-white/[0.1]"}
          `}
        >
          <option value="">All Payment Modes ({paymentModes.length})</option>
          {paymentModes.map((mode) => (
            <option key={mode} value={mode} className="bg-[#0f1118] text-white">
              {mode}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronDown size={15} strokeWidth={1.8} />
        </div>
      </div>

      {/* Reset Action */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="
            inline-flex items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.04]
            px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2]
            active:scale-[0.98] transition-all cursor-pointer shadow-xs
          "
        >
          <RotateCcw size={14} strokeWidth={1.8} />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}