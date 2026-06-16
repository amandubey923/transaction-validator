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

import {
  Globe,
  MapPinned,
} from "lucide-react";

import { TransactionRecord } from "@/types/transaction";

interface CountryChartProps {
  data: TransactionRecord[];
}

export default function CountryChart({
  data,
}: CountryChartProps) {
  if (!data.length) return null;

  const countryData = Object.entries(
    data.reduce(
      (acc, row) => {
        const country =
          row.country || "Unknown";

        acc[country] =
          (acc[country] || 0) + 1;

        return acc;
      },
      {} as Record<string, number>
    )
  )
    .map(([country, count]) => ({
      country,
      count,
    }))
    .sort(
      (a, b) => b.count - a.count
    );

  const colors = [
    "#06b6d4",
    "#8b5cf6",
    "#3b82f6",
    "#14b8a6",
    "#6366f1",
  ];

  return (
    <section id="country-chart-section">
      <div
        className="
        mt-8
        h-[520px]
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-violet-500
              "
              >
                <Globe
                  size={26}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Country Distribution
                </h2>

                <p className="text-slate-400">
                  Records grouped by
                  country
                </p>
              </div>
            </div>

            <div
              className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              px-4
              py-3
            "
            >
              <MapPinned
                size={18}
                className="text-cyan-400"
              />

              <div>
                <p className="text-white font-bold">
                  {countryData.length}
                </p>

                <p className="text-xs text-slate-400">
                  Countries
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 h-[380px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={countryData}
              layout="vertical"
              margin={{
                top: 10,
                right: 20,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                type="number"
                stroke="#94a3b8"
              />

              <YAxis
                type="category"
                dataKey="country"
                stroke="#94a3b8"
                width={100}
              />

              <Tooltip
                contentStyle={{
                  background:
                    "#020617",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                }}
              />

              <Bar
                dataKey="count"
                radius={[
                  0,
                  10,
                  10,
                  0,
                ]}
              >
                {countryData.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        colors[
                          index %
                            colors.length
                        ]
                      }
                    />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}