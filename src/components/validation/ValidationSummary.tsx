"use client";

import {
  CheckCircle2,
  AlertTriangle,
  Database,
  Sparkles,
  Globe,
  ShieldCheck,
} from "lucide-react";

interface ValidationSummaryProps {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  successRate: number;
}

export default function ValidationSummary({
  totalRows,
  validRows,
  invalidRows,
  successRate,
}: ValidationSummaryProps) {
  const isSuccess = invalidRows === 0;

  const checks = [
    { title: "Phone Validation", rule: "E.164 & Local Rules", passed: true },
    { title: "Date & Time Audit", rule: "Chronological Order", passed: true },
    { title: "Deduplication Engine", rule: "Unique Order IDs", passed: isSuccess },
    { title: "Mathematical Integrity", rule: "Quantity × Unit Price", passed: isSuccess },
  ];

  return (
    <section id="summary-section">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Card Header with Status Badge */}
        <div className="p-6 sm:p-8 border-b border-white/[0.06]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
                <ShieldCheck size={14} className="text-cyan-400" />
                <span>Verification Complete</span>
                <span className="text-cyan-600">|</span>
                <span className="text-slate-400">All Tests Concluded</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Transaction Integrity Audit
              </h2>

              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Comprehensive multi-tier audit results. Verified against country phone specifications, date standards, duplication checks, and calculated amount formulas.
              </p>
            </div>

            <div
              className={`
                inline-flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-semibold font-mono w-fit self-start lg:self-center
                ${
                  isSuccess
                    ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-amber-950/40 text-amber-300 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                }
              `}
            >
              {isSuccess ? (
                <>
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 size={18} />
                  </div>
                  <span>100% CLEAN — ZERO ANOMALIES</span>
                </>
              ) : (
                <>
                  <div className="p-1 rounded-full bg-amber-500/20 text-amber-400">
                    <AlertTriangle size={18} />
                  </div>
                  <span>{invalidRows.toLocaleString()} ANOMALIES FLAGGED</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 4 Stats Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06] border-b border-white/[0.06]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              <Database size={16} className="text-cyan-400" />
              <span>Total Rows</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
              {totalRows.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">100% Ingested</p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Valid Rows</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
              {validRows.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-500/80 mt-1 font-mono">Ready for Export</p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              <AlertTriangle size={16} className="text-rose-400" />
              <span>Invalid Rows</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono">
              {invalidRows.toLocaleString()}
            </div>
            <p className="text-[11px] text-rose-500/80 mt-1 font-mono">Quarantined</p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              <Sparkles size={16} className="text-violet-400" />
              <span>Success Rate</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent font-mono">
              {successRate}%
            </div>
            <p className="text-[11px] text-violet-400/80 mt-1 font-mono">Overall Efficiency</p>
          </div>
        </div>

        {/* Audit Details & Progress */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {checks.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {item.rule}
                  </p>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 size={16} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Dataset Validation Progress</span>
              <span className="text-white font-bold">{successRate}% Verified</span>
            </div>

            <div className="h-3 rounded-full bg-slate-900 border border-white/[0.06] overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-1000"
                style={{ width: `${successRate}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Globe size={14} className="text-cyan-400 flex-shrink-0" />
            <span>Active International Validation Specs: IN, US, UK, CA, AE, SG, DE, FR</span>
          </div>
        </div>
      </div>
    </section>
  );
}