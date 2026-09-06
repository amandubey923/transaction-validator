"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
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
  { name: "order_id", type: "STRING", sample: "ORD001", note: "Unique Transaction ID" },
  { name: "product_id", type: "STRING", sample: "PRD001", note: "SKU Identifier" },
  { name: "product_name", type: "STRING", sample: "Laptop", note: "Item Description" },
  { name: "phone", type: "PHONE", sample: "9876543210", note: "Country-formatted" },
  { name: "country", type: "STRING", sample: "India", note: "Validation locale" },
  { name: "transaction_date", type: "DATE", sample: "2025-06-01", note: "ISO or standard format" },
  { name: "transaction_time", type: "TIME", sample: "10:30:00", note: "HH:mm:ss" },
  { name: "payment_mode", type: "STRING", sample: "Card", note: "Card, UPI, Cash, etc." },
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
    <section id="upload-section">
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
          relative overflow-hidden rounded-3xl border transition-all duration-300
          ${
            dragActive
              ? "border-cyan-400 bg-cyan-950/20 shadow-[0_0_30px_rgba(6,182,212,0.25)] scale-[1.005]"
              : "border-white/[0.1] bg-gradient-to-b from-[#0e1424] via-[#0b101c] to-[#070a12] shadow-2xl"
          }
        `}
      >
        {/* Subtle grid background & top accent line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Ambient glow patches */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 right-10 w-80 h-80 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-14">
          <div className="max-w-4xl mx-auto text-center">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-sm">
              <Sparkles size={14} className="text-cyan-400 animate-pulse" />
              <span>VALIDEX Intelligent Validation Engine</span>
              <span className="text-cyan-700">|</span>
              <span className="text-slate-400">High-Throughput Ingestion</span>
            </div>

            {/* Futuristic Dropzone Icon */}
            <div
              onClick={() => inputRef.current?.click()}
              className="
                mx-auto mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl sm:rounded-3xl
                bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-indigo-500/20
                border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.2)]
                cursor-pointer group hover:scale-105 hover:border-cyan-400/60 transition-all duration-300
              "
            >
              <UploadCloud
                size={38}
                className="text-cyan-300 group-hover:text-white transition-colors duration-200"
              />
            </div>

            {/* Header Text */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Upload Transaction Dataset
            </h2>

            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Drag and drop your transaction CSV here or click to browse. Automatically cleans formatting, validates phone & date records, performs mathematical checks, and detects duplicate IDs.
            </p>

            {/* Capability Badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {[
                "E.164 Phone Logic",
                "ISO Date & Time",
                "Duplicate Detection",
                "Country Rule Engine",
                "Automated Cleaning",
                "Large CSV Splitter",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Primary Action Button */}
            <div className="mt-8">
              <button
                onClick={() => inputRef.current?.click()}
                disabled={loading}
                className="
                  group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl
                  font-semibold text-sm sm:text-base text-white
                  bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600
                  hover:from-cyan-400 hover:via-sky-400 hover:to-violet-500
                  shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 active:scale-[0.98]
                "
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-white" />
                    <span>Processing & Validating CSV...</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet size={18} />
                    <span>Select Transaction CSV File</span>
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

            {/* Selected File Feedback Banner */}
            {selectedFile && (
              <div className="mt-6 mx-auto max-w-lg rounded-2xl border border-emerald-500/30 bg-emerald-950/30 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 size={20} />
                    </div>
                    <div className="text-left truncate">
                      <p className="text-sm font-semibold text-white truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-emerald-400/90 font-mono">
                        {(selectedFile.size / 1024).toFixed(2)} KB • File Loaded & Verified
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => inputRef.current?.click()}
                    className="text-xs text-slate-400 hover:text-white underline underline-offset-2 flex-shrink-0"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}

            {/* Expected CSV Schema Inspector - Collapsible & Polished */}
            <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#090d16]/90 overflow-hidden text-left">
              <button
                type="button"
                onClick={() => setSchemaExpanded(!schemaExpanded)}
                className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <TableProperties size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      Expected CSV Schema Specification
                      <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20">
                        {SCHEMA_COLUMNS.length} Columns
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Ensure your dataset header contains these required attributes
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{schemaExpanded ? "Hide Schema" : "Inspect Schema"}</span>
                  {schemaExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {schemaExpanded && (
                <div className="border-t border-white/[0.08] p-4 sm:p-6 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider">
                        <th className="text-left py-2.5 px-3">Column Name</th>
                        <th className="text-left py-2.5 px-3">Type</th>
                        <th className="text-left py-2.5 px-3">Example Value</th>
                        <th className="text-left py-2.5 px-3">Validation Constraint</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] text-slate-300">
                      {SCHEMA_COLUMNS.map((col) => (
                        <tr key={col.name} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 px-3 font-mono text-cyan-300 font-medium">
                            {col.name}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-400 border border-white/[0.06]">
                              {col.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-300">
                            {col.sample}
                          </td>
                          <td className="py-2.5 px-3 text-slate-400">
                            {col.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <p className="mt-6 text-xs text-slate-500 font-mono">
              Supported file types: Standard CSV (RFC 4180 compliant) • UTF-8 Encoding Recommended
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}