"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  loading?: boolean;
}

export default function UploadBox({
  onFileSelect,
  loading,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const handleFile = (file: File) => {
    if (!file) return;

    if (
      file.type !== "text/csv" &&
      !file.name.endsWith(".csv")
    ) {
      alert("Please upload a CSV file");
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <section id="upload-section">
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() =>
          setDragActive(false)
        }
        onDragOver={(e) =>
          e.preventDefault()
        }
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);

          const file =
            e.dataTransfer.files?.[0];

          if (file) handleFile(file);
        }}
        className={`
          relative
          overflow-hidden
          rounded-[32px]
          border
          ${
            dragActive
              ? "border-cyan-400"
              : "border-white/10"
          }
          bg-gradient-to-br
          from-slate-900
          via-slate-950
          to-slate-900
          backdrop-blur-xl
          transition-all
          duration-300
        `}
      >
        <div
          className="
          absolute
          top-0
          left-0
          w-full
          h-full
          opacity-20
          pointer-events-none
        "
        >
          <div
            className="
            absolute
            top-0
            left-0
            w-72
            h-72
            bg-cyan-500
            blur-[140px]
          "
          />

          <div
            className="
            absolute
            bottom-0
            right-0
            w-72
            h-72
            bg-violet-500
            blur-[140px]
          "
          />
        </div>

        <div className="relative z-10 p-8 md:p-14">
          <div className="max-w-5xl mx-auto text-center">
            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-500/20
              bg-cyan-500/10
              px-4
              py-2
              text-cyan-300
              text-sm
              mb-6
            "
            >
              <Sparkles size={14} />
              Xeno Powered Validation Engine
            </div>

            <div
              className="
              mx-auto
              mb-8
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-3xl
              bg-gradient-to-r
              from-cyan-500
              via-violet-500
              to-indigo-500
              shadow-2xl
            "
            >
              <UploadCloud
                size={42}
                className="text-white"
              />
            </div>

            <h2
              className="
              text-3xl
              md:text-5xl
              font-bold
              text-white
            "
            >
              Upload Transaction Dataset
            </h2>

            <p
              className="
              mt-4
              text-slate-400
              max-w-3xl
              mx-auto
              text-lg
            "
            >
              Validate international
              transaction records, detect
              errors, clean data, generate
              downloadable reports and split
              large CSV files automatically.
            </p>

            <div
              className="
              mt-8
              flex
              flex-wrap
              justify-center
              gap-3
            "
            >
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                Phone Validation
              </span>

              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                Date Validation
              </span>

              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                Duplicate Detection
              </span>

              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                Country Rules
              </span>

              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                CSV Cleaning
              </span>

              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                Auto Splitting
              </span>
            </div>

            <button
              onClick={() =>
                inputRef.current?.click()
              }
              disabled={loading}
              className="
                mt-10
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                via-violet-500
                to-indigo-500
                px-10
                py-5
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-2xl
              "
            >
              {loading
                ? "Processing CSV..."
                : "Choose CSV File"}
            </button>

            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (file)
                  handleFile(file);
              }}
            />

            {selectedFile && (
              <div
                className="
                mt-8
                mx-auto
                max-w-xl
                rounded-2xl
                border
                border-emerald-500/20
                bg-emerald-500/10
                p-5
              "
              >
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle2
                    size={22}
                    className="text-emerald-400"
                  />

                  <FileText
                    size={20}
                    className="text-emerald-300"
                  />

                  <span className="text-white font-medium break-all">
                    {selectedFile.name}
                  </span>
                </div>

                <p className="text-sm text-emerald-300 mt-2">
                  Dataset uploaded and ready
                  for validation
                </p>

                <p className="text-xs text-slate-300 mt-2">
                  {(
                    selectedFile.size / 1024
                  ).toFixed(2)}{" "}
                  KB
                </p>
              </div>
            )}

            <div
              className="
              mt-10
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              p-6
              text-left
            "
            >
              <h3 className="text-white font-semibold mb-4">
                Expected CSV Columns
              </h3>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="text-left py-3">
                        Column
                      </th>

                      <th className="text-left py-3">
                        Example
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-slate-300">
                    <tr>
                      <td className="py-2">
                        order_id
                      </td>
                      <td>ORD001</td>
                    </tr>

                    <tr>
                      <td className="py-2">
                        product_id
                      </td>
                      <td>PRD001</td>
                    </tr>

                    <tr>
                      <td className="py-2">
                        product_name
                      </td>
                      <td>Laptop</td>
                    </tr>

                    <tr>
                      <td className="py-2">
                        phone
                      </td>
                      <td>9876543210</td>
                    </tr>

                    <tr>
                      <td className="py-2">
                        country
                      </td>
                      <td>India</td>
                    </tr>

                    <tr>
                      <td className="py-2">
                        transaction_date
                      </td>
                      <td>2025-06-01</td>
                    </tr>

                    <tr>
                      <td className="py-2">
                        transaction_time
                      </td>
                      <td>10:30:00</td>
                    </tr>

                    <tr>
                      <td className="py-2">
                        payment_mode
                      </td>
                      <td>Card</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-8 text-slate-500 text-sm">
              Supports transaction datasets
              with Order, Product, Payment,
              Phone, Country, Date and Time
              information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}