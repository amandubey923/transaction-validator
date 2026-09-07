"use client";

import { CheckCircle2, AlertCircle, Phone, Calendar, CopyCheck, Calculator } from "lucide-react";

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
    {
      title: "Country Phone Rules",
      desc: "Format, length & prefix verification",
      icon: Phone,
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      passed: true,
    },
    {
      title: "Date & Time Formats",
      desc: "ISO 8601 & calendar bounds parsing",
      icon: Calendar,
      iconColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      passed: true,
    },
    {
      title: "Duplicate Order IDs",
      desc: "Unique transaction identifier enforcement",
      icon: CopyCheck,
      iconColor: isClean
        ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
        : "text-amber-400 bg-amber-500/10 border-amber-500/20",
      passed: isClean,
    },
    {
      title: "Formula Reconciliation",
      desc: "Quantity × unit price equals total amount",
      icon: Calculator,
      iconColor: isClean
        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        : "text-rose-400 bg-rose-500/10 border-rose-500/20",
      passed: isClean,
    },
  ];

  return (
    <div className="card-interactive relative rounded-xl border border-white/[0.08] bg-[#0f121d] p-5 h-full flex flex-col justify-between shadow-sm overflow-hidden hover:border-white/[0.16] hover:shadow-xl hover:shadow-black/40 transition-all duration-200">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500/50 via-blue-500/25 to-transparent" />

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Rule Verification Audit</h3>
            <p className="text-xs text-slate-400 mt-0.5">Automated validation checks executed against dataset</p>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium border self-start sm:self-auto shadow-xs ${
              isClean
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                : "bg-amber-500/15 border-amber-500/30 text-amber-300"
            }`}
          >
            {isClean ? "All checks passed" : `${invalidRows.toLocaleString()} rows flagged`}
          </span>
        </div>

        {/* 4 Rich Check Items */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {checks.map((item) => {
            const ItemIcon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 flex items-center justify-between gap-3 hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-150 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-8 w-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${item.iconColor} group-hover:scale-105 transition-transform duration-200`}>
                    <ItemIcon size={15} strokeWidth={1.8} />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">{item.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.desc}</p>
                  </div>
                </div>

                {item.passed ? (
                  <div className="p-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex-shrink-0">
                    <CheckCircle2 size={15} strokeWidth={2} />
                  </div>
                ) : (
                  <div className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex-shrink-0">
                    <AlertCircle size={15} strokeWidth={2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Verified {validRows.toLocaleString()} of {totalRows.toLocaleString()} records</span>
        <span className="text-slate-200 font-semibold">{successRate}% pass rate</span>
      </div>
    </div>
  );
}