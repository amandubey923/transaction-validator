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
        {/* Clean, Direct Page Header */}
        <section id="dashboard">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Transaction Data Validation & Processing
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            Upload financial transaction CSV files to clean inconsistent formatting, validate country-specific phone rules, verify mathematical totals, detect duplicates, and export verified records.
          </p>
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