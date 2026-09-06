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

import { Globe, MapPin } from "lucide-react";
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

  const colors = [
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#10b981",
    "#6366f1",
    "#f59e0b",
  ];

  return (
    <section id="country-chart-section">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Globe size={22} />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Geographic Distribution
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Transaction density grouped by jurisdiction
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] font-mono text-xs text-slate-300">
            <MapPin size={13} className="text-cyan-400" />
            <span className="font-bold text-white">{countryData.length}</span>
            <span className="text-slate-500">Countries</span>
          </div>
        </div>

        {/* Chart View */}
        <div className="p-6 h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={countryData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#151d2f"
                horizontal={true}
                vertical={false}
              />

              <XAxis
                type="number"
                stroke="#64748b"
                tick={{ fill: "#64748b", fontSize: 11, fontFamily: "monospace" }}
                axisLine={{ stroke: "#1e293b" }}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="country"
                stroke="#94a3b8"
                tick={{ fill: "#cbd5e1", fontSize: 12 }}
                width={90}
                axisLine={{ stroke: "#1e293b" }}
                tickLine={false}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-white/[0.1] bg-[#07090e]/95 backdrop-blur-md p-3 shadow-2xl font-mono text-xs">
                        <div className="flex items-center gap-2 text-slate-300 mb-1">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                          <span className="font-semibold text-white">{item.country}</span>
                        </div>
                        <div className="text-cyan-400 font-bold">
                          {item.count.toLocaleString()} Transactions
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar dataKey="count" radius={[0, 8, 8, 0]} maxBarSize={28}>
                {countryData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={colors[index % colors.length]}
                    fillOpacity={0.9}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}