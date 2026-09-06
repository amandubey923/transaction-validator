"use client";

import { FileSpreadsheet, Clock3 } from "lucide-react";
import { FileInfo } from "@/types/transaction";

interface FileInfoCardProps {
  fileInfo: FileInfo | null;
}

export default function FileInfoCard({ fileInfo }: FileInfoCardProps) {
  if (!fileInfo) return null;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: File Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
            <FileSpreadsheet size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{fileInfo.fileName}</h3>
            <p className="text-xs text-slate-400 font-mono">
              {fileInfo.fileSize} • {fileInfo.totalRows.toLocaleString()} rows • {fileInfo.totalColumns} columns
            </p>
          </div>
        </div>

        {/* Right: Ingestion Timestamp */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono self-start sm:self-center">
          <Clock3 size={14} className="text-slate-500" />
          <span>Ingested at {fileInfo.uploadedAt}</span>
        </div>
      </div>
    </div>
  );
}