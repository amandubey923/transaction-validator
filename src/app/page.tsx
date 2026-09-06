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
        <section id="dashboard" className="pt-1">
          <div className="pb-6 border-b border-white/[0.08]">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>Automated Validation & Partitioning</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Transaction Data{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Validation & Processing
              </span>
            </h1>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
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