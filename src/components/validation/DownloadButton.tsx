"use client";

import { Download, FileCheck, Split } from "lucide-react";
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
    <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 relative overflow-hidden shadow-sm hover:border-white/[0.16] hover:shadow-xl hover:shadow-black/40 transition-all duration-200">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/50 via-teal-500/25 to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">Export Validated Records</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Download verified records as a single consolidated dataset or partitioned batches
          </p>
        </div>
        <span className="text-xs text-emerald-300 font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 self-start sm:self-auto shadow-xs">
          {validData.length.toLocaleString()} clean records
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Consolidated CSV */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 flex flex-col justify-between hover:border-emerald-500/30 hover:bg-white/[0.03] transition-all duration-200 group">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-white font-medium text-sm">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-500/10 group-hover:scale-105 transition-transform duration-200">
                  <FileCheck size={15} strokeWidth={1.8} />
                </div>
                <span className="font-semibold">Full Dataset CSV</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                Consolidated
              </span>
            </div>
            <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
              Single file containing all {validData.length.toLocaleString()} verified and formatted transaction records.
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/[0.06]">
            <button
              onClick={handleCleanDownload}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white cursor-pointer shadow-md"
            >
              <Download size={14} strokeWidth={1.8} />
              <span>Download Clean CSV</span>
            </button>
          </div>
        </div>

        {/* Chunked Partitions */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 flex flex-col justify-between hover:border-blue-500/30 hover:bg-white/[0.03] transition-all duration-200 group">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-white font-medium text-sm">
                <div className="h-7 w-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-sm shadow-blue-500/10 group-hover:scale-105 transition-transform duration-200">
                  <Split size={15} strokeWidth={1.8} />
                </div>
                <span className="font-semibold">Split Partitions</span>
              </div>
              <span className="text-[10px] font-mono text-blue-300 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                5,000 rows/file
              </span>
            </div>
            <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
              Partitioned into {chunks.length} manageable CSV batches for high-speed downstream pipeline processing.
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/[0.06]">
            <button
              onClick={handleChunkDownload}
              className="btn-secondary w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 cursor-pointer"
            >
              <Download size={14} strokeWidth={1.8} />
              <span>Download {chunks.length} Partition Files</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}