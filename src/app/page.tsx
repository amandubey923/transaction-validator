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
import Image from "next/image";

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
        <section id="dashboard" className="mb-4">
  <div className="flex justify-between items-start">
    
    <div>
      <h1 className="
        text-3xl
        md:text-5xl
        font-bold
        bg-gradient-to-r
        from-cyan-400
        via-violet-400
        to-indigo-400
        bg-clip-text
        text-transparent
      ">
        Transaction Validator
      </h1>

      <p className="mt-3 text-slate-400 text-sm md:text-base">
        Upload transaction CSV files, validate records,
        clean data, detect errors and download processed files.
      </p>
    </div>

    <Image
      src="/xeno-logo.png"
      alt="Xeno Logo"
      width={140}
      height={140}
      margin-bottom={4}
      priority
      
    />

  </div>
</section>

        <section id="upload">
          <UploadBox
            loading={loading}
            onFileSelect={uploadCsv}
          />
        </section>

        <FileInfoCard fileInfo={fileInfo} />

        <CleaningStatsCard
          stats={cleaningStats}
        />

        {validationResult && (
          <>
            <section id="stats">
              <StatsCards
                totalRows={
                  validationResult.totalRows
                }
                validRows={
                  validationResult.validRows
                }
                invalidRows={
                  validationResult.invalidRows
                }
                countriesDetected={
                  validationResult.countriesDetected
                }
              />
            </section>

            <ValidationScore
              successRate={
                validationResult.successRate
              }
            />

            <ValidationSummary
              totalRows={
                validationResult.totalRows
              }
              validRows={
                validationResult.validRows
              }
              invalidRows={
                validationResult.invalidRows
              }
              successRate={
                validationResult.successRate
              }
            />

            <div
  id="charts-section"
  className="
    grid
    lg:grid-cols-2
    gap-8
  "
>
  <CountryChart data={records} />
  <PaymentChart data={records} />
</div>

            <ErrorDownloadButton
              errors={
                validationResult.errors
              }
            />

            <ErrorTable
              errors={
                validationResult.errors
              }
            />

            <DownloadButton
              validData={
                validationResult.validData
              }
            />

            <DataPreviewTable
              data={records}
            />

            <RecentUploads
              uploads={uploadHistory}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
}