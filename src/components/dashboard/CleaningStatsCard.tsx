"use client";

import { Sparkles } from "lucide-react";
import { CleaningStats } from "@/types/transaction";

interface CleaningStatsCardProps {
  stats: CleaningStats | null;
}

export default function CleaningStatsCard({ stats }: CleaningStatsCardProps) {
  if (!stats) return null;

  const totalModifications =
    stats.phoneFixed +
    stats.countryFixed +
    stats.dateFixed +
    stats.timeFixed +
    stats.trimmedFields;

  const items = [
    { label: "Phones Normalized", value: stats.phoneFixed },
    { label: "Countries Standardized", value: stats.countryFixed },
    { label: "Dates Parsed", value: stats.dateFixed },
    { label: "Times Aligned", value: stats.timeFixed },
    { label: "Whitespace Trimmed", value: stats.trimmedFields },
    { label: "Records Cleaned", value: stats.recordsCleaned },
  ];

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-white">Automated Data Cleaning</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {totalModifications.toLocaleString()} operations executed
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center sm:text-left"
          >
            <span className="text-xs text-slate-400 block truncate">{item.label}</span>
            <span className="text-lg font-semibold text-white font-mono mt-1 block">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}