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
    <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/40 via-blue-500/20 to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-semibold text-white">Export Validated Records</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Download verified records as a single consolidated dataset or partitioned batches
          </p>
        </div>
        <span className="text-xs text-emerald-400 font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto">
          {validData.length.toLocaleString()} clean records
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Consolidated CSV */}
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 flex flex-col justify-between hover:border-white/[0.14] transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <div className="h-6 w-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FileCheck size={14} />
                </div>
                <span>Full Dataset CSV</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04]">
                Consolidated
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Single file containing all {validData.length.toLocaleString()} verified and formatted transaction records.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.04]">
            <button
              onClick={handleCleanDownload}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-white shadow-sm cursor-pointer"
            >
              <Download size={14} />
              <span>Download Clean CSV</span>
            </button>
          </div>
        </div>

        {/* Chunked Partitions */}
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 flex flex-col justify-between hover:border-white/[0.14] transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <div className="h-6 w-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Split size={14} />
                </div>
                <span>Split Partitions</span>
              </div>
              <span className="text-[10px] font-mono text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                5,000 rows/file
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Partitioned into {chunks.length} manageable CSV batches for high-speed downstream pipeline processing.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.04]">
            <button
              onClick={handleChunkDownload}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-200 border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.2] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Download {chunks.length} Partition Files</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}