"use client";

import { History, FileSpreadsheet, Clock3, CheckCircle2 } from "lucide-react";
import { UploadHistory } from "@/types/transaction";

interface RecentUploadsProps {
  uploads: UploadHistory[];
}

export default function RecentUploads({ uploads }: RecentUploadsProps) {
  if (!uploads.length) return null;

  return (
    <section id="recent-uploads-section">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <History size={26} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Session Upload History
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-400 text-xs font-mono">
                  {uploads.length} Files
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Audit trail of previously ingested CSV datasets
              </p>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="p-6 sm:p-8 space-y-3">
          {uploads.map((upload, index) => (
            <div
              key={`${upload.fileName}-${index}`}
              className="
                flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl
                border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1]
                transition-all duration-200 group
              "
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
                  <FileSpreadsheet size={20} />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {upload.fileName}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400">
                    RFC 4180 CSV Dataset
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Clock3 size={13} className="text-slate-500" />
                  <span>{upload.uploadedAt}</span>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-medium">
                  <CheckCircle2 size={11} />
                  PROCESSED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}