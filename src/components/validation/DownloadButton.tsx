"use client";

import {
  Download,
  FileCheck,
  Files,
  CheckCircle2,
} from "lucide-react";

import { TransactionRecord } from "@/types/transaction";

import {
  downloadCsv,
  downloadCsvString,
} from "@/utils/downloadCsv";

import { splitCsvData } from "@/lib/csvSplitter";

interface DownloadButtonProps {
  validData: TransactionRecord[];
}

export default function DownloadButton({
  validData,
}: DownloadButtonProps) {
  const handleCleanDownload = () => {
    downloadCsv(
      validData,
      "clean_transactions.csv"
    );
  };

  const handleChunkDownload = () => {
    const chunks =
      splitCsvData(validData);

    chunks.forEach((chunk, index) => {
      setTimeout(() => {
        downloadCsvString(
          chunk.csvContent,
          chunk.fileName
        );
      }, index * 400);
    });
  };

  if (!validData.length) return null;

  const chunks =
    splitCsvData(validData);

  return (
    <section id="downloads-section">
      <div
        className="
        mt-8
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-gradient-to-br
        from-slate-900
        via-slate-950
        to-slate-900
        backdrop-blur-xl
      "
      >
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <CheckCircle2
              size={26}
              className="text-emerald-400"
            />

            <div>
              <h2 className="text-2xl font-bold text-white">
                Processed Files Ready
              </h2>

              <p className="text-slate-400 mt-1">
                Your validated transaction
                dataset is ready for download.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 p-8">
          <div
            className="
            rounded-3xl
            border
            border-cyan-500/20
            bg-cyan-500/5
            p-6
          "
          >
            <div className="flex items-center gap-3 mb-4">
              <FileCheck
                size={28}
                className="text-cyan-400"
              />

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Clean CSV File
                </h3>

                <p className="text-slate-400 text-sm">
                  Contains only validated
                  records
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-slate-400 text-sm">
                Valid Records
              </p>

              <h4 className="text-4xl font-bold text-white mt-2">
                {validData.length}
              </h4>
            </div>

            <button
              onClick={handleCleanDownload}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                px-6
                py-4
                text-white
                font-semibold
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-xl
              "
            >
              <Download size={20} />
              Download Clean CSV
            </button>
          </div>

          <div
            className="
            rounded-3xl
            border
            border-violet-500/20
            bg-violet-500/5
            p-6
          "
          >
            <div className="flex items-center gap-3 mb-4">
              <Files
                size={28}
                className="text-violet-400"
              />

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Split CSV Files
                </h3>

                <p className="text-slate-400 text-sm">
                  Automatically chunk large
                  datasets
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-slate-400 text-sm">
                Generated Chunks
              </p>

              <h4 className="text-4xl font-bold text-white mt-2">
                {chunks.length}
              </h4>
            </div>

            <button
              onClick={handleChunkDownload}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-violet-500
                to-indigo-500
                px-6
                py-4
                text-white
                font-semibold
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-xl
              "
            >
              <Download size={20} />
              Download Split Files
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}