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
  const stats = [
    {
      title: "Total Records",
      value: totalRows,
      icon: Database,
      gradient:
        "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-400",
    },
    {
      title: "Valid Records",
      value: validRows,
      icon: CheckCircle2,
      gradient:
        "from-emerald-500/20 to-green-500/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "Invalid Records",
      value: invalidRows,
      icon: AlertTriangle,
      gradient:
        "from-rose-500/20 to-red-500/20",
      iconColor: "text-rose-400",
    },
    {
      title: "Countries",
      value: countriesDetected,
      icon: Globe,
      gradient:
        "from-violet-500/20 to-indigo-500/20",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-6
    "
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-br
              ${item.gradient}
              backdrop-blur-xl
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-white/20
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              <div
                className="
                p-4
                rounded-2xl
                bg-white/5
              "
              >
                <Icon
                  size={28}
                  className={item.iconColor}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}