"use client";

import { ShieldAlert, FileDown } from "lucide-react";
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
    <section id="error-download-section">
      <div className="rounded-3xl border border-rose-500/20 bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.15)] flex-shrink-0">
                <ShieldAlert size={26} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Export Validation Anomalies
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-mono font-semibold">
                    {errors.length.toLocaleString()} Issues
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Generate a dedicated CSV audit file containing row indices, offending fields, and rejection causes.
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="
                inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl
                font-semibold text-sm text-white font-mono
                bg-gradient-to-r from-rose-600 via-rose-500 to-red-600
                hover:from-rose-500 hover:to-red-500
                shadow-[0_0_25px_rgba(244,63,94,0.3)] hover:shadow-[0_0_35px_rgba(244,63,94,0.5)]
                transition-all duration-200 active:scale-[0.98] flex-shrink-0
              "
            >
              <FileDown size={18} />
              <span>Download Error CSV Report</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}