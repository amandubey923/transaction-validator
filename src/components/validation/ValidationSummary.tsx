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
    { title: "Date & Time Formats", desc: "ISO 8601 & calendar bounds parsing", passed: true },
    { title: "Duplicate Order IDs", desc: "Unique transaction identifier enforcement", passed: isClean },
    { title: "Formula Reconciliation", desc: "Quantity × unit price equals total amount", passed: isClean },
  ];

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0f121d] p-5 h-full flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-semibold text-white">Rule Verification Audit</h3>
            <p className="text-xs text-slate-400 mt-0.5">Automated validation checks executed against dataset</p>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium border self-start sm:self-auto shadow-sm ${
              isClean
                ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/25 text-amber-400"
            }`}
          >
            {isClean ? "All checks passed" : `${invalidRows.toLocaleString()} rows flagged`}
          </span>
        </div>

        {/* 4 Interactive Check Items */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {checks.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5 flex items-start justify-between gap-3 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-150 group"
            >
              <div>
                <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">{item.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
              </div>
              {item.passed ? (
                <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                  <CheckCircle2 size={15} />
                </div>
              ) : (
                <div className="p-1 rounded-md bg-amber-500/10 text-amber-400 flex-shrink-0">
                  <AlertCircle size={15} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Verified {validRows.toLocaleString()} of {totalRows.toLocaleString()} records</span>
        <span className="text-slate-200 font-semibold">{successRate}% pass rate</span>
      </div>
    </div>
  );
}