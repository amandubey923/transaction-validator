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
    {
      label: "Phones Normalized",
      value: stats.phoneFixed,
      dotColor: "bg-cyan-400",
      accentBorder: "group-hover:border-cyan-500/40",
      valueColor: "text-cyan-300",
    },
    {
      label: "Countries Standardized",
      value: stats.countryFixed,
      dotColor: "bg-blue-400",
      accentBorder: "group-hover:border-blue-500/40",
      valueColor: "text-blue-300",
    },
    {
      label: "Dates Parsed",
      value: stats.dateFixed,
      dotColor: "bg-violet-400",
      accentBorder: "group-hover:border-violet-500/40",
      valueColor: "text-violet-300",
    },
    {
      label: "Times Aligned",
      value: stats.timeFixed,
      dotColor: "bg-indigo-400",
      accentBorder: "group-hover:border-indigo-500/40",
      valueColor: "text-indigo-300",
    },
    {
      label: "Whitespace Trimmed",
      value: stats.trimmedFields,
      dotColor: "bg-teal-400",
      accentBorder: "group-hover:border-teal-500/40",
      valueColor: "text-teal-300",
    },
    {
      label: "Records Cleaned",
      value: stats.recordsCleaned,
      dotColor: "bg-emerald-400",
      accentBorder: "group-hover:border-emerald-500/40",
      valueColor: "text-emerald-300",
    },
  ];

  return (
    <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 relative overflow-hidden shadow-sm hover:border-white/[0.16] hover:shadow-xl hover:shadow-black/40 transition-all duration-200">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/50 via-cyan-500/30 to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-500/10">
            <Sparkles size={16} strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Automated Data Normalization</h3>
            <p className="text-[11px] text-slate-400">Standardized formatting, trimmed whitespaces, and currency cleansing</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{totalModifications.toLocaleString()} operations executed</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-all duration-200 hover:bg-white/[0.04] ${item.accentBorder} group`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`h-1.5 w-1.5 rounded-full ${item.dotColor} flex-shrink-0`} />
              <span className="text-[11px] font-medium text-slate-400 block truncate group-hover:text-slate-200 transition-colors">
                {item.label}
              </span>
            </div>
            <span className={`text-lg font-bold font-mono mt-1 block tracking-tight ${item.valueColor}`}>
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}