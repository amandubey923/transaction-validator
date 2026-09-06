"use client";

import {
  FileSpreadsheet,
  Database,
  Columns3,
  HardDrive,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import { FileInfo } from "@/types/transaction";

interface FileInfoCardProps {
  fileInfo: FileInfo | null;
}

export default function FileInfoCard({ fileInfo }: FileInfoCardProps) {
  if (!fileInfo) return null;

  const stats = [
    {
      title: "Total Records",
      value: fileInfo.totalRows.toLocaleString(),
      icon: Database,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
    {
      title: "Attribute Columns",
      value: fileInfo.totalColumns,
      icon: Columns3,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
    },
    {
      title: "File Payload Size",
      value: fileInfo.fileSize,
      icon: HardDrive,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Ingestion Timestamp",
      value: fileInfo.uploadedAt,
      icon: Clock3,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <section id="file-info-section">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        {/* Top cyan gradient accent */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* Card Header */}
        <div className="p-6 sm:p-8 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <FileSpreadsheet size={26} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Dataset Telemetry
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                  <CheckCircle2 size={11} />
                  PARSED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Physical CSV structure extracted & indexed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] font-mono text-xs text-slate-300 max-w-full sm:max-w-md truncate">
            <span className="text-slate-500 uppercase text-[10px]">Source:</span>
            <span className="font-semibold text-cyan-300 truncate">
              {fileInfo.fileName}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${item.bgColor} border ${item.borderColor}`}>
                    <Icon size={18} className={item.color} />
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    {item.title}
                  </span>
                </div>

                <div className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight break-words">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}