"use client";

import {
  Filter,
  RotateCcw,
} from "lucide-react";

interface DataFiltersProps {
  countries: string[];
  paymentModes: string[];

  selectedCountry: string;
  selectedPaymentMode: string;

  onCountryChange: (
    value: string
  ) => void;

  onPaymentModeChange: (
    value: string
  ) => void;

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
  return (
    <section id="filters-section">
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
        <div className="flex items-center gap-2 mb-5">
          <Filter
            size={18}
            className="text-cyan-400"
          />

          <h3 className="text-white font-semibold">
            Data Filters
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={selectedCountry}
            onChange={(e) =>
              onCountryChange(
                e.target.value
              )
            }
            className="
              rounded-2xl
              border
              border-white/10
              bg-slate-900
              px-4
              py-4
              text-white
              outline-none
              focus:border-cyan-500
            "
          >
            <option value="">
              All Countries
            </option>

            {countries.map(
              (country) => (
                <option
                  key={country}
                  value={country}
                >
                  {country}
                </option>
              )
            )}
          </select>

          <select
            value={selectedPaymentMode}
            onChange={(e) =>
              onPaymentModeChange(
                e.target.value
              )
            }
            className="
              rounded-2xl
              border
              border-white/10
              bg-slate-900
              px-4
              py-4
              text-white
              outline-none
              focus:border-cyan-500
            "
          >
            <option value="">
              All Payment Modes
            </option>

            {paymentModes.map(
              (mode) => (
                <option
                  key={mode}
                  value={mode}
                >
                  {mode}
                </option>
              )
            )}
          </select>

          <button
            onClick={onReset}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-rose-500
              to-orange-500
              px-4
              py-4
              text-white
              font-semibold
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >
            <RotateCcw size={18} />
            Reset Filters
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Filter records by Country and
          Payment Mode.
        </p>
      </div>
    </section>
  );
}