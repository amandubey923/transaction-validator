"use client";

import AppLayout from "@/components/layout/AppLayout";

import UploadBox from "@/components/upload/UploadBox";
import FileInfoCard from "@/components/upload/FileInfoCard";
import DataPreviewTable from "@/components/upload/DataPreviewTable";

import StatsCards from "@/components/dashboard/StatsCards";
import CleaningStatsCard from "@/components/dashboard/CleaningStatsCard";
import ValidationScore from "@/components/dashboard/ValidationScore";
import RecentUploads from "@/components/dashboard/RecentUploads";

import ValidationSummary from "@/components/validation/ValidationSummary";
import ErrorTable from "@/components/validation/ErrorTable";
import DownloadButton from "@/components/validation/DownloadButton";
import ErrorDownloadButton from "@/components/validation/ErrorDownloadButton";

import CountryChart from "@/components/charts/CountryChart";
import PaymentChart from "@/components/charts/PaymentChart";

import { useCsvUpload } from "@/hooks/useCsvUpload";
import ValidexLogo from "@/components/common/ValidexLogo";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Split,
  Globe2,
} from "lucide-react";

export default function HomePage() {
  const {
    loading,
    records,
    validationResult,
    cleaningStats,
    fileInfo,
    uploadHistory,
    uploadCsv,
  } = useCsvUpload();

  return (
    <AppLayout>
      <div className="space-y-10">
        {/* Hero & Platform Identity Section */}
        <section id="dashboard" className="pt-2">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-white/[0.07]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium mb-4">
                <Sparkles size={13} className="text-cyan-400" />
                <span>VALIDEX Financial Intelligence Engine</span>
                <span className="text-slate-500">•</span>
                <span className="text-violet-300">Multi-Jurisdiction v2.4</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Transaction Data{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                  Validation & Processing
                </span>
              </h1>

              <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
                Enterprise validation platform for multi-currency transactions. Ingest datasets,
                validate country-specific phone rules (e.g. Singapore 8 digits, India 10 digits),
                audit date/time formats, detect duplicate order IDs, perform mathematical consistency checks,
                and auto-split large files for download.
              </p>

              {/* Core Feature Badges */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs text-slate-300 font-mono">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 transition-colors">
                  <Globe2 size={13} className="text-cyan-400" />
                  45+ Country Phone Rules
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/30 transition-colors">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  ISO Date & Format Audits
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/30 transition-colors">
                  <Zap size={13} className="text-violet-400" />
                  Automated Data Hygiene
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-sky-500/30 transition-colors">
                  <Split size={13} className="text-sky-400" />
                  Large CSV Auto-Chunking
                </span>
              </div>
            </div>

            {/* Validex Hero Logo Lockup */}
            <div className="relative group self-start lg:self-center">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-indigo-500/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center p-6 rounded-3xl bg-[#0d1322]/90 border border-white/[0.1] shadow-2xl backdrop-blur-md">
                <ValidexLogo size="lg" showSubtitle={true} />
              </div>
            </div>
          </div>

          {/* 5-Step Platform Workflow Bar */}
          <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-x-auto">
            <div className="flex items-center justify-between min-w-[700px] text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-300">
                <div className="h-6 w-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold">1</div>
                <span>Upload CSV</span>
              </div>
              <ArrowRight size={14} className="text-slate-600" />

              <div className="flex items-center gap-2 text-slate-400">
                <div className="h-6 w-6 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-bold text-slate-300">2</div>
                <span>Auto-Clean</span>
              </div>
              <ArrowRight size={14} className="text-slate-600" />

              <div className="flex items-center gap-2 text-slate-400">
                <div className="h-6 w-6 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-bold text-slate-300">3</div>
                <span>Multi-Rule Validation</span>
              </div>
              <ArrowRight size={14} className="text-slate-600" />

              <div className="flex items-center gap-2 text-slate-400">
                <div className="h-6 w-6 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-bold text-slate-300">4</div>
                <span>Review & Analytics</span>
              </div>
              <ArrowRight size={14} className="text-slate-600" />

              <div className="flex items-center gap-2 text-slate-400">
                <div className="h-6 w-6 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-bold text-slate-300">5</div>
                <span>Export & Split</span>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Dropzone Section */}
        <section id="upload">
          <UploadBox loading={loading} onFileSelect={uploadCsv} />
        </section>

        {/* File Telemetry Information */}
        <FileInfoCard fileInfo={fileInfo} />

        {/* Automated Data Cleaning Statistics */}
        <CleaningStatsCard stats={cleaningStats} />

        {/* Validation Results & Analytics */}
        {validationResult && (
          <>
            <section id="stats">
              <StatsCards
                totalRows={validationResult.totalRows}
                validRows={validationResult.validRows}
                invalidRows={validationResult.invalidRows}
                countriesDetected={validationResult.countriesDetected}
              />
            </section>

            <ValidationScore successRate={validationResult.successRate} />

            <ValidationSummary
              totalRows={validationResult.totalRows}
              validRows={validationResult.validRows}
              invalidRows={validationResult.invalidRows}
              successRate={validationResult.successRate}
            />

            <div id="charts-section" className="grid lg:grid-cols-2 gap-8">
              <CountryChart data={records} />
              <PaymentChart data={records} />
            </div>

            <ErrorDownloadButton errors={validationResult.errors} />

            <ErrorTable errors={validationResult.errors} />

            <DownloadButton validData={validationResult.validData} />

            <DataPreviewTable data={records} />

            <RecentUploads uploads={uploadHistory} />
          </>
        )}
      </div>
    </AppLayout>
  );
}