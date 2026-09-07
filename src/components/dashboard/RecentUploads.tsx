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
      <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 relative overflow-hidden shadow-sm hover:border-white/[0.16] hover:shadow-xl hover:shadow-black/40 transition-all duration-200">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-cyan-500/25 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-sm shadow-blue-500/10">
              <History size={16} strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">Recent Datasets</h3>
              <p className="text-[11px] text-slate-400">Files processed in this active session</p>
            </div>
          </div>
          <span className="text-xs font-mono text-blue-300 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25">
            {uploads.length} {uploads.length === 1 ? "file" : "files"}
          </span>
        </div>

        {/* History List */}
        <div className="space-y-2">
          {uploads.map((upload, index) => (
            <div
              key={`${upload.fileName}-${index}`}
              className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-150 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <FileSpreadsheet size={16} strokeWidth={1.8} />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                  {upload.fileName}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[11px] font-mono text-slate-400">
                  {upload.uploadedAt}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-emerald-300 bg-emerald-500/15 border border-emerald-500/30">
                  <CheckCircle2 size={11} strokeWidth={2} />
                  Processed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}