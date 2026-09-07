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
      <div className="space-y-8">
        {/* Hero Section */}
        <section id="dashboard" className="pt-2 relative">
          {/* Subtle ambient accent glow behind hero */}
          <div className="absolute -top-10 left-1/4 w-96 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute -top-6 right-1/3 w-80 h-28 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="pb-7 border-b border-white/[0.08] relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-cyan-500/15 border border-blue-500/30 text-blue-300 text-xs font-medium mb-3.5 shadow-sm shadow-blue-500/5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Automated Validation & Partitioning Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Transaction Data{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                Validation & Processing
              </span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Ingest international transaction CSVs to audit country-specific phone rules, parse calendar dates, enforce order integrity, verify total formulas, and auto-partition clean records.
            </p>
          </div>
        </section>

        {/* Primary Action: Upload Dropzone as Hero */}
        <section id="upload">
          <UploadBox loading={loading} onFileSelect={uploadCsv} />
        </section>

        {/* File Structure & Parsing Summary */}
        <FileInfoCard fileInfo={fileInfo} />

        {/* Validation Results & Analytics */}
        {validationResult && (
          <div className="space-y-8 pt-2">
            {/* Primary KPI Metrics */}
            <section id="stats">
              <StatsCards
                totalRows={validationResult.totalRows}
                validRows={validationResult.validRows}
                invalidRows={validationResult.invalidRows}
                countriesDetected={validationResult.countriesDetected}
              />
            </section>

            {/* Quality Score & Rules Verification */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-1">
                <ValidationScore successRate={validationResult.successRate} />
              </div>
              <div className="lg:col-span-2">
                <ValidationSummary
                  totalRows={validationResult.totalRows}
                  validRows={validationResult.validRows}
                  invalidRows={validationResult.invalidRows}
                  successRate={validationResult.successRate}
                />
              </div>
            </div>

            {/* Automated Data Cleaning Summary */}
            <CleaningStatsCard stats={cleaningStats} />

            {/* Analytics Charts */}
            <div id="country-chart-section" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CountryChart data={records} />
              <PaymentChart data={records} />
            </div>

            {/* Exports & Downloads */}
            <div id="downloads-section" className="space-y-4">
              <DownloadButton validData={validationResult.validData} />
              <ErrorDownloadButton errors={validationResult.errors} />
            </div>

            {/* Error Audit Table */}
            <ErrorTable errors={validationResult.errors} />

            {/* Interactive Data Preview */}
            <DataPreviewTable data={records} />

            {/* Session Upload History */}
            <RecentUploads uploads={uploadHistory} />
          </div>
        )}
      </div>
    </AppLayout>
  );
}