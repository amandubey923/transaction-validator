"use client";

import { AlertCircle } from "lucide-react";
import { ValidationError } from "@/types/transaction";

interface ErrorTableProps {
  errors: ValidationError[];
}

export default function ErrorTable({ errors }: ErrorTableProps) {
  if (!errors.length) return null;

  return (
    <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/40 via-amber-500/20 to-transparent" />

      <div className="p-4 sm:p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertCircle size={15} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Quarantined Error Ledger</h3>
            <p className="text-[11px] text-slate-400">Exact row-level rejection causes identified during validation</p>
          </div>
        </div>
        <span className="text-xs text-rose-400 font-mono font-medium px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
          {errors.length} quarantined rows
        </span>
      </div>

      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead className="sticky top-0 bg-[#121520] z-10 border-b border-white/[0.08] text-slate-400 font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 w-20">Row</th>
              <th className="px-4 py-3 w-40">Order ID</th>
              <th className="px-4 py-3 w-44">Offending Field</th>
              <th className="px-4 py-3">Diagnostic Message</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.04] text-slate-300">
            {errors.map((error, index) => (
              <tr key={index} className="hover:bg-rose-500/[0.03] transition-colors">
                <td className="px-4 py-2.5 font-mono text-slate-400">#{error.row}</td>
                <td className="px-4 py-2.5 font-mono text-slate-200 font-medium">{error.order_id || "—"}</td>
                <td className="px-4 py-2.5">
                  <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[11px]">
                    {error.field}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-slate-300 leading-relaxed">{error.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 bg-white/[0.01] border-t border-white/[0.06] flex items-center gap-2.5 text-xs text-slate-400">
        <AlertCircle size={14} className="text-amber-400 flex-shrink-0" />
        <span>Update values in the original CSV and re-upload to achieve a complete 100% clean validation score.</span>
      </div>
    </div>
  );
}