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
      <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400">
              <History size={16} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Recent Uploads</h3>
              <p className="text-xs text-slate-400">Files processed in this session</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {uploads.length} {uploads.length === 1 ? "file" : "files"}
          </span>
        </div>

        {/* History List */}
        <div className="space-y-2">
          {uploads.map((upload, index) => (
            <div
              key={`${upload.fileName}-${index}`}
              className="flex items-center justify-between p-3 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileSpreadsheet size={16} className="text-slate-400 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-200 truncate">
                  {upload.fileName}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[11px] font-mono text-slate-500">
                  {upload.uploadedAt}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10">
                  <CheckCircle2 size={10} />
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