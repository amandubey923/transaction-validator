"use client";

import {
  Sparkles,
  Phone,
  Globe,
  CalendarDays,
  Clock3,
  Scissors,
  CheckCircle2,
  Cpu,
} from "lucide-react";

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

  const cards = [
    {
      title: "Records Cleaned",
      value: stats.recordsCleaned,
      desc: "Rows modified before audit",
      icon: Sparkles,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      title: "Phone Standardized",
      value: stats.phoneFixed,
      desc: "Normalized to country spec",
      icon: Phone,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "Country Normalization",
      value: stats.countryFixed,
      desc: "Case & whitespace resolved",
      icon: Globe,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      title: "Dates Corrected",
      value: stats.dateFixed,
      desc: "Parsed into ISO formats",
      icon: CalendarDays,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Times Re-aligned",
      value: stats.timeFixed,
      desc: "HH:mm:ss standard conform",
      icon: Clock3,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
    },
    {
      title: "Fields Trimmed",
      value: stats.trimmedFields,
      desc: "Leading/trailing whitespace",
      icon: Scissors,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
    },
  ];

  return (
    <section id="cleaning-stats-section">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        {/* Violet to cyan gradient line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        {/* Card Header */}
        <div className="p-6 sm:p-8 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <Cpu size={26} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Automated Data Hygiene
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-[10px] font-mono">
                  <CheckCircle2 size={11} />
                  PRE-PASS COMPLETE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Heuristic corrections applied before validation engine execution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] font-mono text-xs text-slate-300">
            <span className="text-slate-500">Auto-Fixes:</span>
            <span className="font-bold text-cyan-400">
              {totalModifications.toLocaleString()} operations
            </span>
          </div>
        </div>

        {/* 6 Metric Tiles */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                    <div className={`p-2 rounded-xl ${item.bg} border ${item.border}`}>
                      <Icon size={18} className={item.color} />
                    </div>
                  </div>

                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                    {item.value.toLocaleString()}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Explanation Footer banner */}
          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 sm:p-5 flex items-start gap-3">
            <Sparkles size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The Validex hygiene engine automatically stripped whitespace, standardized international phone numbers with local prefixes, normalized country titles, and formatted inconsistent timestamp strings to ensure valid records pass downstream audits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}