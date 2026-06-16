"use client";

import {
  Sparkles,
  Phone,
  Globe,
  CalendarDays,
  Clock3,
  Scissors,
} from "lucide-react";

import { CleaningStats } from "@/types/transaction";

interface CleaningStatsCardProps {
  stats: CleaningStats | null;
}

export default function CleaningStatsCard({
  stats,
}: CleaningStatsCardProps) {
  if (!stats) return null;

  const cards = [
    {
      title: "Records Cleaned",
      value: stats.recordsCleaned,
      icon: Sparkles,
      color: "text-cyan-400",
      bg: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "Phone Fixed",
      value: stats.phoneFixed,
      icon: Phone,
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-green-500/20",
    },
    {
      title: "Country Fixed",
      value: stats.countryFixed,
      icon: Globe,
      color: "text-violet-400",
      bg: "from-violet-500/20 to-indigo-500/20",
    },
    {
      title: "Date Fixed",
      value: stats.dateFixed,
      icon: CalendarDays,
      color: "text-amber-400",
      bg: "from-amber-500/20 to-orange-500/20",
    },
    {
      title: "Time Fixed",
      value: stats.timeFixed,
      icon: Clock3,
      color: "text-pink-400",
      bg: "from-pink-500/20 to-rose-500/20",
    },
    {
      title: "Fields Trimmed",
      value: stats.trimmedFields,
      icon: Scissors,
      color: "text-sky-400",
      bg: "from-sky-500/20 to-cyan-500/20",
    },
  ];

  return (
    <section id="cleaning-stats-section">
      <div
        className="
        mt-8
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-gradient-to-br
        from-slate-900
        via-slate-950
        to-slate-900
        backdrop-blur-xl
      "
      >
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-violet-500
              to-indigo-500
            "
            >
              <Sparkles
                size={30}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                AI Data Cleaning Statistics
              </h2>

              <p className="text-slate-400 mt-1">
                Automatic corrections applied
                before validation
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`
                    rounded-3xl
                    border
                    border-white/10
                    bg-gradient-to-br
                    ${item.bg}
                    p-6
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">
                        {item.title}
                      </p>

                      <h3 className="mt-3 text-4xl font-bold text-white">
                        {item.value}
                      </h3>
                    </div>

                    <div
                      className="
                      rounded-2xl
                      bg-white/5
                      p-4
                    "
                    >
                      <Icon
                        size={24}
                        className={item.color}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="
            mt-8
            rounded-3xl
            border
            border-cyan-500/20
            bg-cyan-500/5
            p-6
          "
          >
            <p className="text-slate-300">
              AI cleaning engine normalized
              phone numbers, countries, dates,
              times and removed formatting
              inconsistencies before running
              validation checks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}