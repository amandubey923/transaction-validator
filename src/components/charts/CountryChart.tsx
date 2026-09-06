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
    <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] p-5">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-semibold text-white">Geographic Distribution</h3>
          <p className="text-xs text-slate-400 mt-0.5">Transactions by country of origin</p>
        </div>
        <span className="text-xs text-slate-400 font-mono">
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