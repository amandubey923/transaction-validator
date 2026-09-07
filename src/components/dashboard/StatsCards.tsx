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
      badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/25",
      icon: Database,
      iconBox: "bg-blue-500/15 border-blue-500/30 text-blue-400 shadow-blue-500/10",
      topGradient: "from-blue-500/50 via-cyan-500/20 to-transparent",
      hoverBorder: "hover:border-blue-500/40",
    },
    {
      title: "Valid Records",
      value: validRows.toLocaleString(),
      badgeText: `${validRate}% Pass`,
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
      icon: CheckCircle2,
      iconBox: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10",
      topGradient: "from-emerald-500/50 via-teal-500/20 to-transparent",
      hoverBorder: "hover:border-emerald-500/40",
    },
    {
      title: "Invalid Records",
      value: invalidRows.toLocaleString(),
      badgeText: invalidRows > 0 ? `${invalidRate}% Issues` : "Clean",
      badgeColor: invalidRows > 0
        ? "bg-rose-500/10 text-rose-300 border-rose-500/25"
        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
      icon: AlertCircle,
      iconBox: invalidRows > 0
        ? "bg-rose-500/15 border-rose-500/30 text-rose-400 shadow-rose-500/10"
        : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10",
      topGradient: invalidRows > 0
        ? "from-rose-500/50 via-amber-500/20 to-transparent"
        : "from-emerald-500/50 via-teal-500/20 to-transparent",
      hoverBorder: invalidRows > 0 ? "hover:border-rose-500/40" : "hover:border-emerald-500/40",
    },
    {
      title: "Countries Detected",
      value: countriesDetected.toLocaleString(),
      badgeText: "Verified",
      badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/25",
      icon: Globe,
      iconBox: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400 shadow-indigo-500/10",
      topGradient: "from-indigo-500/50 via-violet-500/20 to-transparent",
      hoverBorder: "hover:border-indigo-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`
              card-interactive relative rounded-xl border border-white/[0.08] bg-[#0f121d] p-5
              flex flex-col justify-between overflow-hidden shadow-sm
              ${item.hoverBorder} hover:shadow-xl hover:shadow-black/50
              hover:-translate-y-1 transition-all duration-200 group
            `}
          >
            {/* Top accent gradient line */}
            <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${item.topGradient}`} />

            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-medium tracking-wide">{item.title}</span>
              <div className={`p-2 rounded-xl border ${item.iconBox} shadow-sm group-hover:scale-110 transition-all duration-200`}>
                <Icon size={18} strokeWidth={1.8} />
              </div>
            </div>

            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                {item.value}
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border shadow-xs ${item.badgeColor}`}>
                  {item.badgeText}
                </span>
                <span className="text-[11px] text-slate-400 truncate">in current dataset</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}