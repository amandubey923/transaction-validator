"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CreditCard } from "lucide-react";

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
    "#3b82f6", // Electric blue
    "#06b6d4", // Cyan
    "#8b5cf6", // Violet
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ec4899", // Pink
  ];

  return (
    <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 relative overflow-hidden shadow-sm hover:border-white/[0.16] hover:shadow-xl hover:shadow-black/40 transition-all duration-200">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500/50 via-indigo-500/25 to-transparent" />

      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-sm shadow-violet-500/10">
            <CreditCard size={16} strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Payment Methods</h3>
            <p className="text-[11px] text-slate-400">Volume breakdown by payment channel</p>
          </div>
        </div>
        <span className="text-xs text-violet-300 font-mono px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25">
          {paymentData.length} channels
        </span>
      </div>

      <div className="pt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={paymentData}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              stroke="#0f1118"
              strokeWidth={2}
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
                    <div className="rounded-xl border border-white/[0.12] bg-[#121524] p-3 shadow-2xl text-xs">
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-violet-300 font-mono font-medium mt-1">
                        {val.toLocaleString()} transactions ({percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={32}
              formatter={(value) => (
                <span className="text-xs text-slate-300 px-1 font-medium">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}