"use client";

import { RotateCcw } from "lucide-react";

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
      <div className="relative flex-1 min-w-[160px]">
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="
            w-full appearance-none rounded-lg border border-white/[0.1] bg-[#0f1118]
            px-3 py-2 text-xs sm:text-sm text-slate-200 font-normal
            outline-none transition-colors focus:border-blue-500 cursor-pointer
          "
        >
          <option value="">All Countries ({countries.length})</option>
          {countries.map((country) => (
            <option key={country} value={country} className="bg-[#0f1118] text-white">
              {country}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">
          ▼
        </div>
      </div>

      {/* Payment Mode Selector */}
      <div className="relative flex-1 min-w-[160px]">
        <select
          value={selectedPaymentMode}
          onChange={(e) => onPaymentModeChange(e.target.value)}
          className="
            w-full appearance-none rounded-lg border border-white/[0.1] bg-[#0f1118]
            px-3 py-2 text-xs sm:text-sm text-slate-200 font-normal
            outline-none transition-colors focus:border-blue-500 cursor-pointer
          "
        >
          <option value="">All Payment Modes ({paymentModes.length})</option>
          {paymentModes.map((mode) => (
            <option key={mode} value={mode} className="bg-[#0f1118] text-white">
              {mode}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">
          ▼
        </div>
      </div>

      {/* Reset Action */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="
            inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04]
            px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.08]
            transition-colors
          "
        >
          <RotateCcw size={13} />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}