"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Globe } from "lucide-react";

import { TransactionRecord } from "@/types/transaction";

interface CountryChartProps {
  data: TransactionRecord[];
}

export default function CountryChart({ data }: CountryChartProps) {
  if (!data.length) return null;

  const countryData = Object.entries(
    data.reduce((acc, row) => {
      const country = row.country || "Unknown";
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([country, count]) => ({
      country,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const CHART_COLORS = [
    "#3b82f6", // Electric blue
    "#06b6d4", // Cyan
    "#6366f1", // Indigo
    "#8b5cf6", // Violet
    "#10b981", // Emerald
    "#0ea5e9", // Sky
  ];

  return (
    <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 relative overflow-hidden shadow-sm hover:border-white/[0.16] hover:shadow-xl hover:shadow-black/40 transition-all duration-200">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-cyan-500/25 to-transparent" />

      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-sm shadow-blue-500/10">
            <Globe size={16} strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Geographic Distribution</h3>
            <p className="text-[11px] text-slate-400">Transactions grouped by verified origin</p>
          </div>
        </div>
        <span className="text-xs text-blue-300 font-mono px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25">
          {countryData.length} countries
        </span>
      </div>

      <div className="pt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={countryData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.05)"
              horizontal={true}
              vertical={false}
            />

            <XAxis
              type="number"
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 11, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="country"
              stroke="#94a3b8"
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
              width={85}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-white/[0.12] bg-[#121524] p-3 shadow-2xl text-xs">
                      <p className="font-semibold text-white">{item.country}</p>
                      <p className="text-cyan-400 font-mono font-medium mt-1">
                        {item.count.toLocaleString()} transactions
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={20}>
              {countryData.map((_, index) => (
                <Cell
                  key={index}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  fillOpacity={0.88}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}