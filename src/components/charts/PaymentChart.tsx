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
    "#3b82f6",
    "#10b981",
    "#6366f1",
    "#f59e0b",
    "#ec4899",
    "#64748b",
  ];

  return (
    <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/40 via-pink-500/20 to-transparent" />

      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <CreditCard size={15} strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Payment Methods</h3>
            <p className="text-[11px] text-slate-400">Volume breakdown by payment channel</p>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
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
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              stroke="#0f1118"
              strokeWidth={2}
            >
              {paymentData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.85}
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
                    <div className="rounded-lg border border-white/[0.1] bg-[#121520] p-2.5 shadow-xl text-xs">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-blue-400 font-mono font-semibold mt-0.5">
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
                <span className="text-xs text-slate-400 px-1">
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