"use client";

import { AlertTriangle, XCircle, ShieldAlert } from "lucide-react";
import { ValidationError } from "@/types/transaction";

interface ErrorTableProps {
  errors: ValidationError[];
}

export default function ErrorTable({ errors }: ErrorTableProps) {
  if (!errors.length) return null;

  return (
    <section id="errors-section">
      <div className="rounded-3xl border border-rose-500/20 bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />

        {/* Card Header */}
        <div className="p-6 sm:p-8 border-b border-rose-500/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/25 text-rose-400">
              <ShieldAlert size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Validation Error Log
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-mono">
                  {errors.length} Detected
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Inspect quarantined records with exact row indices and offending attributes
              </p>
            </div>
          </div>
        </div>

        {/* Dense Enterprise Table */}
        <div className="overflow-x-auto max-h-[600px] border-b border-white/[0.06]">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="sticky top-0 bg-[#080c14] z-10 border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Row</th>
                <th className="px-5 py-3.5 font-semibold">Order Identifier</th>
                <th className="px-5 py-3.5 font-semibold">Failed Attribute</th>
                <th className="px-5 py-3.5 font-semibold">Rejection Cause</th>
                <th className="px-5 py-3.5 font-semibold text-right">Audit Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.04]">
              {errors.map((error, index) => (
                <tr
                  key={index}
                  className="hover:bg-rose-500/[0.03] transition-colors font-sans"
                >
                  <td className="px-5 py-3.5 font-mono text-cyan-300 font-medium">
                    #{error.row}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2 py-0.5 rounded font-mono text-xs bg-white/[0.04] border border-white/[0.08] text-slate-200">
                      {error.order_id || "N/A"}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-md font-mono text-[11px] font-medium bg-amber-500/10 border border-amber-500/20 text-amber-300">
                      {error.field}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-slate-300 text-xs leading-relaxed max-w-md">
                    {error.message}
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-400">
                      <XCircle size={12} />
                      FAILED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer guidance */}
        <div className="p-4 sm:p-5 bg-white/[0.01] flex items-center gap-2.5 text-xs text-slate-400">
          <AlertTriangle size={15} className="text-amber-400 flex-shrink-0" />
          <span>
            Correct the above records in your source spreadsheet and re-upload to achieve a 100% Quality Score.
          </span>
        </div>
      </div>
    </section>
  );
}