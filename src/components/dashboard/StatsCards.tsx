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
      title: "Total Records",
      value: totalRows.toLocaleString(),
      description: "100% parsed records",
      icon: Database,
    },
    {
      title: "Valid Records",
      value: validRows.toLocaleString(),
      description: `${validRate}% pass rate`,
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
    },
    {
      title: "Invalid Records",
      value: invalidRows.toLocaleString(),
      description: invalidRows > 0 ? `${invalidRate}% require correction` : "Zero errors flagged",
      icon: AlertCircle,
      iconColor: invalidRows > 0 ? "text-rose-400" : "text-emerald-400",
    },
    {
      title: "Countries Detected",
      value: countriesDetected.toLocaleString(),
      description: "Validated regions",
      icon: Globe,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>{item.title}</span>
              <Icon size={16} className={item.iconColor || "text-slate-400"} />
            </div>

            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-semibold text-white font-mono tracking-tight">
                {item.value}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}