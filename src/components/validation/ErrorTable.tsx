"use client";

import { AlertCircle } from "lucide-react";
import { ValidationError } from "@/types/transaction";

interface ErrorTableProps {
  errors: ValidationError[];
}

export default function ErrorTable({ errors }: ErrorTableProps) {
  if (!errors.length) return null;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Validation Error Details</h3>
          <p className="text-xs text-slate-400 mt-0.5">Line-by-line rejection causes for quarantined records</p>
        </div>
        <span className="text-xs text-rose-400 font-mono font-medium">
          {errors.length} failed rows
        </span>
      </div>

      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead className="sticky top-0 bg-[#121520] z-10 border-b border-white/[0.08] text-slate-400 font-medium">
            <tr>
              <th className="px-4 py-3 w-16">Row</th>
              <th className="px-4 py-3 w-36">Order ID</th>
              <th className="px-4 py-3 w-36">Field</th>
              <th className="px-4 py-3">Issue Description</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.04] text-slate-300">
            {errors.map((error, index) => (
              <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-2.5 font-mono text-slate-400">#{error.row}</td>
                <td className="px-4 py-2.5 font-mono text-slate-200">{error.order_id || "—"}</td>
                <td className="px-4 py-2.5 font-mono text-amber-400">{error.field}</td>
                <td className="px-4 py-2.5 text-slate-300">{error.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-white/[0.01] border-t border-white/[0.06] flex items-center gap-2 text-xs text-slate-400">
        <AlertCircle size={14} className="text-amber-400 flex-shrink-0" />
        <span>Update the source CSV to resolve these issues and re-upload to achieve a clean audit.</span>
      </div>
    </div>
  );
}