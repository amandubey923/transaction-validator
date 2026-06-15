"use client";

import {
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Globe,
} from "lucide-react";

type ValidationSummaryProps = {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  countries: number;
};

export default function ValidationSummary({
  totalRows,
  validRows,
  invalidRows,
  countries,
}: ValidationSummaryProps) {
  const successRate =
    totalRows > 0
      ? ((validRows / totalRows) * 100).toFixed(1)
      : "0";

  const cards = [
    {
      title: "Total Rows",
      value: totalRows,
      icon: FileSpreadsheet,
    },
    {
      title: "Valid Rows",
      value: validRows,
      icon: CheckCircle2,
    },
    {
      title: "Invalid Rows",
      value: invalidRows,
      icon: AlertTriangle,
    },
    {
      title: "Countries",
      value: countries,
      icon: Globe,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
              rounded-3xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              p-6
              "
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-zinc-400 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/5
        p-6
        "
      >
        <div className="flex justify-between mb-3">
          <span>Validation Success Rate</span>

          <span className="font-semibold text-green-400">
            {successRate}%
          </span>
        </div>

        <div className="h-4 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${successRate}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}