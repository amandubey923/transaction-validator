"use client";

import { Filter, RotateCcw } from "lucide-react";

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
    <section id="filters-section">
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">
              Attribute Faceting & Filters
            </h3>
          </div>

          {hasActiveFilters && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
              Filters Active
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Country Selector */}
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="
                w-full appearance-none rounded-xl border border-white/[0.08] bg-[#080c14]
                px-4 py-3 text-xs sm:text-sm text-slate-200 font-medium
                outline-none transition-colors focus:border-cyan-500/60 cursor-pointer
              "
            >
              <option value="">All Jurisdictions ({countries.length})</option>
              {countries.map((country) => (
                <option key={country} value={country} className="bg-[#0c101a] text-white">
                  {country}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
              ▼
            </div>
          </div>

          {/* Payment Mode Selector */}
          <div className="relative">
            <select
              value={selectedPaymentMode}
              onChange={(e) => onPaymentModeChange(e.target.value)}
              className="
                w-full appearance-none rounded-xl border border-white/[0.08] bg-[#080c14]
                px-4 py-3 text-xs sm:text-sm text-slate-200 font-medium
                outline-none transition-colors focus:border-cyan-500/60 cursor-pointer
              "
            >
              <option value="">All Payment Modes ({paymentModes.length})</option>
              {paymentModes.map((mode) => (
                <option key={mode} value={mode} className="bg-[#0c101a] text-white">
                  {mode}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
              ▼
            </div>
          </div>

          {/* Reset Action */}
          <button
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="
              inline-flex items-center justify-center gap-2 rounded-xl
              border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07]
              px-4 py-3 text-xs sm:text-sm font-semibold font-mono text-slate-300 hover:text-white
              disabled:opacity-40 disabled:hover:bg-white/[0.03] disabled:cursor-not-allowed
              transition-all duration-200 active:scale-[0.98]
            "
          >
            <RotateCcw size={15} />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    </section>
  );
}