"use client";

import { AlertCircle, Download } from "lucide-react";
import { ValidationError } from "@/types/transaction";
import { downloadErrorCsv } from "@/utils/downloadErrorCsv";

interface ErrorDownloadButtonProps {
  errors: ValidationError[];
}

export default function ErrorDownloadButton({ errors }: ErrorDownloadButtonProps) {
  if (!errors.length) return null;

  const handleDownload = () => {
    downloadErrorCsv(errors);
  };

  return (
    <div className="card-interactive rounded-xl border border-rose-500/20 bg-gradient-to-r from-rose-500/[0.05] via-[#0f1118] to-transparent p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
          <AlertCircle size={18} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>{errors.length.toLocaleString()} validation {errors.length === 1 ? "issue" : "issues"} quarantined</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
              Audit Required
            </span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Export an error ledger documenting failed row numbers, offending columns, and exact rejection reasons.
          </p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-rose-200 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/40 active:scale-[0.98] transition-all cursor-pointer flex-shrink-0 shadow-sm"
      >
        <Download size={14} />
        <span>Export Error Ledger CSV</span>
      </button>
    </div>
  );
}