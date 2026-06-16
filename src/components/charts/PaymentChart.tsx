"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  CreditCard,
} from "lucide-react";

import { TransactionRecord } from "@/types/transaction";

interface PaymentChartProps {
  data: TransactionRecord[];
}

export default function PaymentChart({
  data,
}: PaymentChartProps) {
  if (!data.length) return null;

  const paymentData = Object.entries(
    data.reduce(
      (acc, row) => {
        const mode =
          row.payment_mode ||
          "Unknown";

        acc[mode] =
          (acc[mode] || 0) + 1;

        return acc;
      },
      {} as Record<
        string,
        number
      >
    )
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#06b6d4",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
  ];

  return (
    <section id="payment-chart-section">
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
                from-violet-500
                to-indigo-500
              "
              >
                <CreditCard
                  size={26}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Payment Mode Analysis
                </h2>

                <p className="text-slate-400">
                  Transaction distribution by
                  payment type
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
              <CreditCard
                size={18}
                className="text-violet-400"
              />

              <div>
                <p className="text-white font-bold">
                  {paymentData.length}
                </p>

                <p className="text-xs text-slate-400">
                  Types
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
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
                label={({ value }) =>
                  `${value}`
                }
              >
                {paymentData.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip
                contentStyle={{
                  background:
                    "#020617",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                  color: "#fff",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  color: "#CBD5E1",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}