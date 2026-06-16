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

  return (
    <section id="summary-section">
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
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div>
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
                mb-4
              "
              >
                <ShieldCheck size={15} />
                Validation Completed
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Transaction Validation Report
              </h2>

              <p className="text-slate-400 mt-3">
                Dataset analyzed successfully.
                Phone, date, duplicate and
                integrity validations completed.
              </p>
            </div>

            <div
              className={`
                inline-flex
                items-center
                gap-3
                rounded-2xl
                px-6
                py-4
                text-sm
                font-medium
                w-fit
                ${
                  isSuccess
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }
              `}
            >
              {isSuccess ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertTriangle size={20} />
              )}

              {isSuccess
                ? "No Issues Found"
                : `${invalidRows} Issues Detected`}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4">
          <div className="p-8 border-b xl:border-b-0 xl:border-r border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Database
                size={22}
                className="text-cyan-400"
              />

              <span className="text-slate-400">
                Total Records
              </span>
            </div>

            <h3 className="text-5xl font-bold text-white">
              {totalRows}
            </h3>
          </div>

          <div className="p-8 border-b xl:border-b-0 xl:border-r border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2
                size={22}
                className="text-emerald-400"
              />

              <span className="text-slate-400">
                Valid Records
              </span>
            </div>

            <h3 className="text-5xl font-bold text-emerald-400">
              {validRows}
            </h3>
          </div>

          <div className="p-8 border-b xl:border-b-0 xl:border-r border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle
                size={22}
                className="text-rose-400"
              />

              <span className="text-slate-400">
                Invalid Records
              </span>
            </div>

            <h3 className="text-5xl font-bold text-rose-400">
              {invalidRows}
            </h3>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles
                size={22}
                className="text-violet-400"
              />

              <span className="text-slate-400">
                Success Rate
              </span>
            </div>

            <h3 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {successRate}%
            </h3>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-white/10">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-slate-500 text-xs uppercase">
                Check
              </p>

              <p className="text-white mt-2">
                Phone Validation
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-slate-500 text-xs uppercase">
                Check
              </p>

              <p className="text-white mt-2">
                Date Validation
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-slate-500 text-xs uppercase">
                Check
              </p>

              <p className="text-white mt-2">
                Duplicate Detection
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-slate-500 text-xs uppercase">
                Check
              </p>

              <p className="text-white mt-2">
                Data Integrity
              </p>
            </div>
          </div>

          <div className="mb-3 flex justify-between text-sm">
            <span className="text-slate-400">
              Validation Progress
            </span>

            <span className="text-white">
              {successRate}%
            </span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-white/5">
            <div
              className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              via-violet-500
              to-indigo-500
              transition-all
              duration-1000
            "
              style={{
                width: `${successRate}%`,
              }}
            />
          </div>

          <div className="mt-6 flex items-center gap-2 text-slate-400 text-sm">
            <Globe size={16} />
            Supports international transaction
            datasets and country-specific
            validation rules.
          </div>
        </div>
      </div>
    </section>
  );
}