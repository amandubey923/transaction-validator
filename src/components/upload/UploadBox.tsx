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
      {/* Primary Dropzone */}
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
          relative rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center
          transition-all duration-200 group overflow-hidden
          ${
            dragActive
              ? "border-blue-500 bg-blue-500/[0.08] shadow-lg shadow-blue-500/10 scale-[1.005]"
              : "border-white/[0.14] bg-gradient-to-b from-[#121522] to-[#0c0e15] hover:border-blue-500/40 hover:bg-gradient-to-b hover:from-[#15192a] hover:to-[#0e111a] shadow-md shadow-black/30"
          }
        `}
      >
        {/* Subtle decorative top highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="max-w-md mx-auto flex flex-col items-center">
          {/* Polished Upload Icon */}
          <div
            onClick={() => inputRef.current?.click()}
            className="
              mb-4 flex h-14 w-14 items-center justify-center rounded-2xl
              bg-gradient-to-b from-blue-500/15 to-indigo-500/10 border border-blue-500/25
              text-blue-400 shadow-sm shadow-blue-500/10
              cursor-pointer group-hover:scale-105 group-hover:border-blue-500/40 group-hover:text-blue-300
              group-hover:shadow-blue-500/25 transition-all duration-200
            "
          >
            <UploadCloud size={26} />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
            Drop your transaction CSV here
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-sm">
            Drag and drop your dataset to automatically clean, validate phone formats, verify math totals, and partition.
          </p>

          {/* Primary Action CTA */}
          <div className="mt-6">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={loading}
              className="
                inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                text-xs font-semibold text-white
                bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500
                hover:from-blue-500 hover:via-indigo-500 hover:to-blue-400
                shadow-md shadow-blue-600/25 hover:shadow-blue-500/35
                hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                transition-all duration-200
              "
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span>Processing Dataset...</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet size={16} />
                  <span>Select CSV File</span>
                </>
              )}
            </button>
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
            <div className="mt-6 w-full rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-4 py-3 flex items-center justify-between gap-3 text-left shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-white truncate">{selectedFile.name}</p>
                  <p className="text-[11px] text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB • CSV Dataset</p>
                </div>
              </div>
              <button
                onClick={() => inputRef.current?.click()}
                className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline flex-shrink-0 transition-colors"
              >
                Change File
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Clean Collapsible Expected Schema */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0c0e15] overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setSchemaExpanded(!schemaExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs text-slate-300 hover:bg-white/[0.03] transition-colors"
        >
          <div className="flex items-center gap-2">
            <TableProperties size={15} className="text-slate-400" />
            <span className="font-medium">Expected CSV Columns ({SCHEMA_COLUMNS.length})</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{schemaExpanded ? "Hide" : "View schema"}</span>
            {schemaExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </button>

        {schemaExpanded && (
          <div className="border-t border-white/[0.08] px-4 py-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] text-slate-500 text-left">
                  <th className="py-2 px-2 font-medium">Column</th>
                  <th className="py-2 px-2 font-medium">Type</th>
                  <th className="py-2 px-2 font-medium">Example</th>
                  <th className="py-2 px-2 font-medium">Validation Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {SCHEMA_COLUMNS.map((col) => (
                  <tr key={col.name} className="hover:bg-white/[0.02]">
                    <td className="py-2 px-2 font-mono text-blue-400 font-medium">{col.name}</td>
                    <td className="py-2 px-2 text-slate-400">{col.type}</td>
                    <td className="py-2 px-2 font-mono text-slate-300">{col.sample}</td>
                    <td className="py-2 px-2 text-slate-400">{col.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}