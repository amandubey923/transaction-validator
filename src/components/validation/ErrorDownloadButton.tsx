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
    <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
          <AlertCircle size={18} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">
            {errors.length.toLocaleString()} validation {errors.length === 1 ? "issue" : "issues"} detected
          </h4>
          <p className="text-xs text-slate-400">
            Export a dedicated CSV report of failed rows, offending fields, and error causes for auditing.
          </p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-rose-200 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-colors flex-shrink-0"
      >
        <Download size={14} />
        <span>Download Error CSV</span>
      </button>
    </div>
  );
}