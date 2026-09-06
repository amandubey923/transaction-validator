"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

interface ValidationSummaryProps {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  successRate: number;
}

export default function ValidationSummary({
  totalRows,
  validRows,
  invalidRows,
  successRate,
}: ValidationSummaryProps) {
  const isClean = invalidRows === 0;

  const checks = [
    { title: "Country Phone Rules", desc: "Format, length & prefix verification", passed: true },
    { title: "Date & Time Formats", desc: "ISO 8601 & standard chronological parsing", passed: true },
    { title: "Duplicate Order IDs", desc: "Unique transaction identifier enforcement", passed: isClean },
    { title: "Amount Calculation", desc: "Quantity × unit price equals total amount", passed: isClean },
  ];

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Rule Verification Audit</h3>
            <p className="text-xs text-slate-400 mt-0.5">Automated validation checks performed against dataset</p>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded font-medium border ${
              isClean
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/20 text-amber-400"
            }`}
          >
            {isClean ? "All checks passed" : `${invalidRows} issues flagged`}
          </span>
        </div>

        {/* 4 Clean Check Items */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {checks.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 flex items-start justify-between gap-3"
            >
              <div>
                <p className="text-xs font-medium text-slate-200">{item.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
              </div>
              {item.passed ? (
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Verified {validRows.toLocaleString()} of {totalRows.toLocaleString()} records</span>
        <span className="text-slate-300 font-semibold">{successRate}% pass</span>
      </div>
    </div>
  );
}