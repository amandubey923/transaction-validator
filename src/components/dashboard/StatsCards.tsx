"use client";

import {
  Database,
  CheckCircle2,
  AlertCircle,
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

  const metrics = [
    {
      title: "Total Ingested",
      value: totalRows.toLocaleString(),
      badgeText: "100% Parsed",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      icon: Database,
      iconBox: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      topGradient: "from-blue-500/30 via-blue-500/10 to-transparent",
    },
    {
      title: "Valid Records",
      value: validRows.toLocaleString(),
      badgeText: `${validRate}% Pass`,
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      icon: CheckCircle2,
      iconBox: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      topGradient: "from-emerald-500/30 via-emerald-500/10 to-transparent",
    },
    {
      title: "Invalid Records",
      value: invalidRows.toLocaleString(),
      badgeText: invalidRows > 0 ? `${invalidRate}% Issues` : "Clean",
      badgeColor: invalidRows > 0
        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      icon: AlertCircle,
      iconBox: invalidRows > 0
        ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      topGradient: invalidRows > 0
        ? "from-rose-500/30 via-rose-500/10 to-transparent"
        : "from-emerald-500/30 via-emerald-500/10 to-transparent",
    },
    {
      title: "Countries Detected",
      value: countriesDetected.toLocaleString(),
      badgeText: "Verified",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      icon: Globe,
      iconBox: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
      topGradient: "from-indigo-500/30 via-indigo-500/10 to-transparent",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              relative rounded-xl border border-white/[0.08] bg-[#0f121d] p-5
              flex flex-col justify-between overflow-hidden shadow-sm
              hover:border-white/[0.14] hover:shadow-lg hover:shadow-black/25
              hover:-translate-y-0.5 transition-all duration-200 group
            "
          >
            {/* Subtle top accent line */}
            <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${item.topGradient}`} />

            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-medium">{item.title}</span>
              <div className={`p-2 rounded-lg border ${item.iconBox} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                <Icon size={16} />
              </div>
            </div>

            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                {item.value}
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${item.badgeColor}`}>
                  {item.badgeText}
                </span>
                <span className="text-[11px] text-slate-500 truncate">in current dataset</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}