"use client";

import {
  Database,
  CheckCircle2,
  AlertTriangle,
  Globe,
} from "lucide-react";

interface StatsCardsProps {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  countriesDetected: number;
}

export default function StatsCards({
  totalRows,
  validRows,
  invalidRows,
  countriesDetected,
}: StatsCardsProps) {
  const validRate = totalRows > 0 ? ((validRows / totalRows) * 100).toFixed(1) : "0.0";
  const invalidRate = totalRows > 0 ? ((invalidRows / totalRows) * 100).toFixed(1) : "0.0";

  const stats = [
    {
      title: "Total Records Ingested",
      value: totalRows.toLocaleString(),
      subtext: "100% dataset coverage",
      icon: Database,
      accentColor: "from-cyan-500 to-blue-500",
      iconColor: "text-cyan-400",
      bgGlow: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      badge: "DATASET",
      badgeColor: "text-cyan-300 bg-cyan-950/60 border-cyan-500/30",
    },
    {
      title: "Valid Verified Records",
      value: validRows.toLocaleString(),
      subtext: `${validRate}% integrity pass rate`,
      icon: CheckCircle2,
      accentColor: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-400",
      bgGlow: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      badge: `${validRate}%`,
      badgeColor: "text-emerald-300 bg-emerald-950/60 border-emerald-500/30",
    },
    {
      title: "Failed / Invalid Records",
      value: invalidRows.toLocaleString(),
      subtext: `${invalidRate}% requires manual fix`,
      icon: AlertTriangle,
      accentColor: "from-rose-500 to-red-500",
      iconColor: "text-rose-400",
      bgGlow: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
      badge: invalidRows > 0 ? "ACTION NEEDED" : "CLEAN",
      badgeColor:
        invalidRows > 0
          ? "text-rose-300 bg-rose-950/60 border-rose-500/30"
          : "text-emerald-300 bg-emerald-950/60 border-emerald-500/30",
    },
    {
      title: "Distinct Jurisdictions",
      value: countriesDetected.toLocaleString(),
      subtext: "Validated international origins",
      icon: Globe,
      accentColor: "from-violet-500 to-indigo-500",
      iconColor: "text-violet-400",
      bgGlow: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      badge: "GLOBAL",
      badgeColor: "text-violet-300 bg-violet-950/60 border-violet-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              relative overflow-hidden rounded-3xl border border-white/[0.08]
              bg-[#0c101a]/90 backdrop-blur-xl p-6
              transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15]
              shadow-lg group
            "
          >
            {/* Top gradient highlight bar */}
            <div
              className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${item.accentColor} opacity-70 group-hover:opacity-100 transition-opacity`}
            />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {item.title}
              </span>

              <div
                className={`p-2.5 rounded-2xl ${item.bgGlow} border ${item.borderColor}`}
              >
                <Icon size={20} className={item.iconColor} />
              </div>
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {item.value}
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs">
              <span className="text-slate-400 truncate max-w-[150px]">
                {item.subtext}
              </span>

              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded-md border font-semibold ${item.badgeColor}`}
              >
                {item.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}