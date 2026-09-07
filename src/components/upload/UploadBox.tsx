"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  Loader2,
  TableProperties,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  loading?: boolean;
}

const SCHEMA_COLUMNS = [
  { name: "order_id", type: "string", sample: "ORD001", note: "Unique transaction identifier" },
  { name: "product_id", type: "string", sample: "PRD001", note: "Product / SKU reference" },
  { name: "product_name", type: "string", sample: "Laptop", note: "Product title" },
  { name: "quantity", type: "number", sample: "2", note: "Units ordered" },
  { name: "unit_price", type: "number", sample: "500", note: "Price per unit" },
  { name: "total_amount", type: "number", sample: "1000", note: "Expected to match qty × unit price" },
  { name: "customer_name", type: "string", sample: "Alice", note: "Customer name" },
  { name: "phone", type: "string", sample: "9876543210", note: "Validated against country format" },
  { name: "country", type: "string", sample: "India", note: "Country code or name" },
  { name: "transaction_date", type: "date", sample: "2025-06-01", note: "ISO or standard date format" },
  { name: "transaction_time", type: "time", sample: "10:30:00", note: "HH:mm:ss standard time" },
  { name: "payment_mode", type: "string", sample: "Card", note: "Card, UPI, Cash, Wire, etc." },
  { name: "currency", type: "string", sample: "INR", note: "3-letter currency code" },
];

export default function UploadBox({ onFileSelect, loading }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [schemaExpanded, setSchemaExpanded] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Please upload a CSV file");
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className="space-y-4">
      {/* Primary Dropzone with Gradient Border */}
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`
          p-[1.5px] rounded-2xl transition-all duration-300
          ${
            dragActive
              ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-2xl shadow-blue-500/20 scale-[1.008]"
              : "bg-gradient-to-b from-blue-500/30 via-indigo-500/15 to-violet-500/25 hover:from-blue-500/45 hover:via-indigo-500/25 hover:to-violet-500/35 shadow-xl shadow-black/40"
          }
        `}
      >
        <div
          className={`
            relative rounded-[15px] border border-dashed p-8 sm:p-12 text-center
            transition-all duration-200 group overflow-hidden cursor-pointer
            ${
              dragActive
                ? "border-blue-400 bg-blue-950/40"
                : "border-white/[0.14] bg-gradient-to-b from-[#111528] via-[#0d101e] to-[#090b12] hover:border-blue-400/40 hover:bg-gradient-to-b hover:from-[#131932] hover:via-[#0e1224] hover:to-[#0a0d15]"
            }
          `}
        >
          {/* Subtle decorative top highlight */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500/40 via-cyan-400/40 to-violet-500/40" />
          
          {/* Soft inner radial ambient lighting */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-md mx-auto flex flex-col items-center relative z-10">
            {/* Polished Upload Icon Container */}
            <div
              onClick={() => inputRef.current?.click()}
              className="
                mb-4 flex h-16 w-16 items-center justify-center rounded-2xl
                bg-gradient-to-b from-blue-500/25 via-indigo-600/20 to-violet-600/15
                border border-blue-400/40 text-blue-300 shadow-lg shadow-blue-500/20
                group-hover:scale-105 group-hover:border-cyan-400/60 group-hover:text-cyan-200
                group-hover:shadow-cyan-500/30 transition-all duration-200
              "
            >
              <UploadCloud size={28} strokeWidth={1.8} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-[11px] font-medium text-blue-300 mb-2">
              <span>Ready for Processing</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Drop your transaction CSV here
            </h2>

            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Drag and drop your dataset to automatically validate phone numbers, verify date formats, check math formulas, and partition clean rows.
            </p>

            {/* Primary Action CTA */}
            <div className="mt-6">
              <button
                onClick={() => inputRef.current?.click()}
                disabled={loading}
                className="
                  btn-primary inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl
                  text-xs sm:text-sm font-semibold text-white cursor-pointer shadow-lg
                "
              >
                {loading ? (
                  <>
                    <Loader2 size={16} strokeWidth={2} className="animate-spin text-white" />
                    <span>Processing Dataset...</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet size={16} strokeWidth={1.8} />
                    <span>Select CSV File</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <span className="h-1 w-1 rounded-full bg-blue-400" />
                Standard CSV
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <span className="h-1 w-1 rounded-full bg-cyan-400" />
                UTF-8 Encoded
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <span className="h-1 w-1 rounded-full bg-indigo-400" />
                Up to 100,000+ rows
              </span>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            {/* Selected File Feedback */}
            {selectedFile && (
              <div className="mt-6 w-full rounded-xl border border-emerald-500/40 bg-emerald-950/25 px-4 py-3 flex items-center justify-between gap-3 text-left shadow-md shadow-emerald-500/5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <CheckCircle2 size={16} strokeWidth={2} />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-white truncate">{selectedFile.name}</p>
                    <p className="text-[11px] text-emerald-300/80 font-mono">{(selectedFile.size / 1024).toFixed(1)} KB • Ready for validation</p>
                  </div>
                </div>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline flex-shrink-0 transition-colors"
                >
                  Change File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clean Collapsible Expected Schema */}
      <div className="card-interactive rounded-xl border border-white/[0.08] bg-[#0c0e17] overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setSchemaExpanded(!schemaExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs text-slate-300 hover:bg-white/[0.03] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <TableProperties size={15} strokeWidth={1.75} className="text-indigo-400" />
            <span className="font-semibold text-white">Expected CSV Columns ({SCHEMA_COLUMNS.length})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <span>{schemaExpanded ? "Hide columns" : "View expected schema"}</span>
            {schemaExpanded ? <ChevronUp size={14} strokeWidth={1.75} /> : <ChevronDown size={14} strokeWidth={1.75} />}
          </div>
        </button>

        {schemaExpanded && (
          <div className="border-t border-white/[0.08] px-4 py-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] text-slate-400 text-left">
                  <th className="py-2.5 px-3 font-semibold text-slate-300">Column</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-300">Type</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-300">Example</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-300">Validation Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {SCHEMA_COLUMNS.map((col) => {
                  let typeBadge = "bg-blue-500/10 border-blue-500/20 text-blue-400";
                  if (col.type === "number") typeBadge = "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
                  if (col.type === "date" || col.type === "time") typeBadge = "bg-violet-500/10 border-violet-500/20 text-violet-400";

                  return (
                    <tr key={col.name} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-2.5 px-3 font-mono text-blue-400 font-semibold">{col.name}</td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${typeBadge}`}>
                          {col.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-200">{col.sample}</td>
                      <td className="py-2.5 px-3 text-slate-300">{col.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}