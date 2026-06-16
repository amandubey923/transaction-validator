"use client";

import { AlertTriangle, Download } from "lucide-react";

import { ValidationError } from "@/types/transaction";

import { downloadErrorCsv } from "@/utils/downloadErrorCsv";

interface ErrorDownloadButtonProps {
  errors: ValidationError[];
}

export default function ErrorDownloadButton({
  errors,
}: ErrorDownloadButtonProps) {
  if (!errors.length) return null;

  const handleDownload = () => {
    downloadErrorCsv(errors);
  };

  return (
    <section id="error-download-section">
      <div
        className="
        mt-8
        overflow-hidden
        rounded-[32px]
        border
        border-red-500/20
        bg-gradient-to-br
        from-slate-900
        via-slate-950
        to-slate-900
      "
      >
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-red-500/10
              "
              >
                <AlertTriangle
                  size={28}
                  className="text-red-400"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Export Validation Errors
                </h2>

                <p className="text-slate-400 mt-1">
                  Download detailed validation
                  issues as CSV report.
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-red-500
              to-rose-500
              px-8
              py-4
              text-white
              font-semibold
              transition-all
              duration-300
              hover:scale-105
            "
            >
              <Download size={18} />
              Download Error CSV
            </button>
          </div>

          <div
            className="
            mt-6
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/5
            p-5
          "
          >
            <p className="text-slate-300">
              Found{" "}
              <span className="font-bold text-red-400">
                {errors.length}
              </span>{" "}
              validation issues. Export the
              report and share it with the
              data team for corrections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}