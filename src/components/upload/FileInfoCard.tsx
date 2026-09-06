"use client";

import { FileSpreadsheet, Clock3, Layers, Hash } from "lucide-react";
import { FileInfo } from "@/types/transaction";

interface FileInfoCardProps {
  fileInfo: FileInfo | null;
}

export default function FileInfoCard({ fileInfo }: FileInfoCardProps) {
  if (!fileInfo) return null;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0f121d] p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: File Info */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/5">
            <FileSpreadsheet size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{fileInfo.fileName}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {fileInfo.fileSize}
            </p>
          </div>
        </div>

        {/* Badges & Ingestion Timestamp */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300">
            <Layers size={13} className="text-blue-400" />
            <span><strong className="text-white font-semibold">{fileInfo.totalRows.toLocaleString()}</strong> rows</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300">
            <Hash size={13} className="text-indigo-400" />
            <span><strong className="text-white font-semibold">{fileInfo.totalColumns}</strong> columns</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-slate-400">
            <Clock3 size={13} className="text-slate-500" />
            <span>{fileInfo.uploadedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}