"use client";

import {
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Globe,
} from "lucide-react";

type StatsCardsProps = {
  totalRecords?: number;
  validRecords?: number;
  invalidRecords?: number;
  countries?: number;
};

export default function StatsCards({
  totalRecords = 5000,
  validRecords = 4820,
  invalidRecords = 180,
  countries = 12,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Total Records",
      value: totalRecords.toLocaleString(),
      icon: FileSpreadsheet,
      description: "Uploaded CSV rows",
    },
    {
      title: "Valid Records",
      value: validRecords.toLocaleString(),
      icon: CheckCircle2,
      description: "Ready for processing",
    },
    {
      title: "Invalid Records",
      value: invalidRecords.toLocaleString(),
      icon: AlertTriangle,
      description: "Require correction",
    },
    {
      title: "Countries",
      value: countries.toString(),
      icon: Globe,
      description: "Detected regions",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-indigo-500/40
              hover:bg-white/10
            "
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-white">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-zinc-500">
                  {stat.description}
                </p>
              </div>

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-indigo-600
                  to-purple-600
                  shadow-lg
                "
              >
                <Icon size={28} className="text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}