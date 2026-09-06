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
    <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] p-5">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-semibold text-white">Export Validated Data</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Download verified records as a single consolidated file or split into smaller chunks
          </p>
        </div>
        <span className="text-xs text-emerald-400 font-mono">
          {validData.length.toLocaleString()} clean records
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Consolidated CSV */}
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <FileCheck size={16} className="text-emerald-400" />
              <span>Full Dataset CSV</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Single file containing all {validData.length.toLocaleString()} verified transaction records.
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={handleCleanDownload}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              <Download size={14} />
              <span>Download Clean CSV</span>
            </button>
          </div>
        </div>

        {/* Chunked Partitions */}
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Split size={16} className="text-blue-400" />
              <span>Split Partitions</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Partitioned into {chunks.length} files (max 5,000 rows each) for batch processing.
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={handleChunkDownload}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-200 border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
            >
              <Download size={14} />
              <span>Download {chunks.length} Files</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}