"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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
    <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] p-5">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-semibold text-white">Payment Methods</h3>
          <p className="text-xs text-slate-400 mt-0.5">Volume breakdown by payment type</p>
        </div>
        <span className="text-xs text-slate-400 font-mono">
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