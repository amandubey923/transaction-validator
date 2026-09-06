"use client";

import {
  Download,
  FileCheck,
  Files,
  HardDriveDownload,
} from "lucide-react";

import { TransactionRecord } from "@/types/transaction";
import { downloadCsv, downloadCsvString } from "@/utils/downloadCsv";
import { splitCsvData } from "@/lib/csvSplitter";

interface DownloadButtonProps {
  validData: TransactionRecord[];
}

export default function DownloadButton({ validData }: DownloadButtonProps) {
  const handleCleanDownload = () => {
    downloadCsv(validData, "clean_transactions.csv");
  };

  const handleChunkDownload = () => {
    const chunks = splitCsvData(validData);

    chunks.forEach((chunk, index) => {
      setTimeout(() => {
        downloadCsvString(chunk.csvContent, chunk.fileName);
      }, index * 400);
    });
  };

  if (!validData.length) return null;

  const chunks = splitCsvData(validData);

  return (
    <section id="downloads-section">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <HardDriveDownload size={26} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Export Production Datasets
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                  AUDITED & READY
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Download cleaned records as a consolidated CSV or chunked batch partitions
              </p>
            </div>
          </div>
        </div>

        {/* 2 Export Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Consolidated Clean CSV */}
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-transparent p-6 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <FileCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Consolidated Clean CSV
                    </h3>
                    <p className="text-xs text-slate-400">
                      Single validated transaction dataset
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between font-mono">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase block">
                    Verified Records
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {validData.length.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 px-2 py-1 rounded bg-emerald-950/50 border border-emerald-500/20">
                  Clean & Tested
                </span>
              </div>
            </div>

            <button
              onClick={handleCleanDownload}
              className="
                w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl
                font-semibold text-sm text-white font-mono
                bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600
                hover:from-cyan-400 hover:to-blue-500
                shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)]
                transition-all duration-200 active:scale-[0.98]
              "
            >
              <Download size={18} />
              <span>Download Clean CSV</span>
            </button>
          </div>

          {/* Automated Chunk Partitioning */}
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-950/20 to-transparent p-6 flex flex-col justify-between relative overflow-hidden group hover:border-violet-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                    <Files size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Automated Batch Partitions
                    </h3>
                    <p className="text-xs text-slate-400">
                      Segment large datasets into sequential chunks
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between font-mono">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase block">
                    Partitions Generated
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {chunks.length} Chunks
                  </span>
                </div>
                <span className="text-xs font-mono text-violet-300 px-2 py-1 rounded bg-violet-950/50 border border-violet-500/20">
                  Ready to Extract
                </span>
              </div>
            </div>

            <button
              onClick={handleChunkDownload}
              className="
                w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl
                font-semibold text-sm text-white font-mono
                bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600
                hover:from-violet-500 hover:to-indigo-500
                shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]
                transition-all duration-200 active:scale-[0.98]
              "
            >
              <Download size={18} />
              <span>Download Split Files ({chunks.length})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}