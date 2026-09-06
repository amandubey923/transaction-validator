"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { CreditCard, Wallet } from "lucide-react";
import { TransactionRecord } from "@/types/transaction";

interface PaymentChartProps {
  data: TransactionRecord[];
}

export default function PaymentChart({ data }: PaymentChartProps) {
  if (!data.length) return null;

  const paymentData = Object.entries(
    data.reduce((acc, row) => {
      const mode = row.payment_mode || "Unknown";
      acc[mode] = (acc[mode] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const totalTransactions = paymentData.reduce((acc, item) => acc + item.value, 0);

  const COLORS = [
    "#06b6d4",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#3b82f6",
    "#ec4899",
  ];

  return (
    <section id="payment-chart-section">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <CreditCard size={22} />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Payment Channel Breakdown
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Volume segmentation by transaction instrument
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] font-mono text-xs text-slate-300">
            <Wallet size={13} className="text-violet-400" />
            <span className="font-bold text-white">{paymentData.length}</span>
            <span className="text-slate-500">Methods</span>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="p-6 h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
                stroke="#0c101a"
                strokeWidth={3}
              >
                {paymentData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    fillOpacity={0.9}
                  />
                ))}
              </Pie>

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0];
                    const val = Number(item.value || 0);
                    const percentage = totalTransactions > 0 ? ((val / totalTransactions) * 100).toFixed(1) : "0";

                    return (
                      <div className="rounded-xl border border-white/[0.1] bg-[#07090e]/95 backdrop-blur-md p-3 shadow-2xl font-mono text-xs">
                        <div className="flex items-center gap-2 text-slate-300 mb-1">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.payload?.fill || "#06b6d4" }}
                          />
                          <span className="font-semibold text-white">{item.name}</span>
                        </div>
                        <div className="text-cyan-400 font-bold">
                          {val.toLocaleString()} ({percentage}%)
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-xs font-mono text-slate-300 px-1">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}