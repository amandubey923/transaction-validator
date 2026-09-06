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

  return (
    <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/40 via-indigo-500/20 to-transparent" />

      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Globe size={15} strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Geographic Distribution</h3>
            <p className="text-[11px] text-slate-400">Transactions grouped by verified origin</p>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
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
                    <div className="rounded-lg border border-white/[0.1] bg-[#121520] p-2.5 shadow-xl text-xs">
                      <p className="font-medium text-white">{item.country}</p>
                      <p className="text-blue-400 font-mono font-semibold mt-0.5">
                        {item.count.toLocaleString()} transactions
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20} fill="#3b82f6" fillOpacity={0.85}>
              {countryData.map((_, index) => (
                <Cell key={index} fill="#3b82f6" fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}