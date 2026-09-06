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
    <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 relative overflow-hidden">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/40 via-cyan-500/20 to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles size={15} strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Automated Data Normalization</h3>
            <p className="text-[11px] text-slate-400">Standardized formatting, trimmed whitespaces, and currency cleansing</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{totalModifications.toLocaleString()} operations executed</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.04] group"
          >
            <span className="text-[11px] font-medium text-slate-400 block truncate group-hover:text-slate-300 transition-colors">
              {item.label}
            </span>
            <span className="text-lg font-semibold text-white font-mono mt-1 block">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}