"use client";

import { useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import StatsCards from "@/components/dashboard/StatsCards";

import UploadBox from "@/components/upload/UploadBox";
import DataPreviewTable from "@/components/upload/DataPreviewTable";

import ValidationSummary from "@/components/validation/ValidationSummary";
import ErrorTable from "@/components/validation/ErrorTable";
import DownloadButton from "@/components/validation/DownloadButton";

import { useCsvUpload } from "@/hooks/useCsvUpload";

import { downloadCsv } from "@/utils/downloadCsv";
import { splitCSVData } from "@/lib/csvSplitter";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const {
    loading,
    rows,
    validRows,
    invalidRows,
    errors,
    uploadFile,
  } = useCsvUpload();

  const handleFileSelect = async (
    selectedFile: File
  ) => {
    setFile(selectedFile);

    try {
      await uploadFile(selectedFile);
    } catch (error) {
      console.error(error);
      alert("Failed to process CSV");
    }
  };

  const handleDownloadClean = () => {
    if (!validRows.length) {
      alert("No validated data available");
      return;
    }

    downloadCSV(
      validRows,
      "clean-transactions.csv"
    );
  };

  const handleDownloadChunks = () => {
    if (!validRows.length) {
      alert("No validated data available");
      return;
    }

    const chunks = splitCSVData(
      validRows,
      1000
    );

    chunks.forEach(
      (chunk, index) => {
        downloadCSV(
          chunk,
          `transactions-part-${
            index + 1
          }.csv`
        );
      }
    );
  };

  const countriesCount =
    rows.length > 0
      ? new Set(
          rows.map(
            (row) =>
              row.country ||
              row.Country ||
              "Unknown"
          )
        ).size
      : 0;

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            AI Transaction Validator
          </h1>

          <p className="mt-2 text-zinc-400">
            Upload, validate, clean and
            download transaction datasets.
          </p>
        </div>

        {/* Stats */}
        <StatsCards
          totalRecords={rows.length}
          validRecords={validRows.length}
          invalidRecords={
            invalidRows.length
          }
          countries={countriesCount}
        />

        {/* Upload */}
        <UploadBox
          selectedFile={file}
          onFileSelect={
            handleFileSelect
          }
        />

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">
            <p className="text-indigo-300">
              Processing CSV...
            </p>
          </div>
        )}

        {/* Preview */}
        {rows.length > 0 && (
          <DataPreviewTable
            data={rows}
          />
        )}

        {/* Validation Summary */}
        {rows.length > 0 && (
          <ValidationSummary
            totalRows={rows.length}
            validRows={
              validRows.length
            }
            invalidRows={
              invalidRows.length
            }
            countries={
              countriesCount
            }
          />
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <ErrorTable
            errors={errors}
          />
        )}

        {/* Download Buttons */}
        {validRows.length > 0 && (
          <DownloadButton
            onDownloadClean={
              handleDownloadClean
            }
            onDownloadChunks={
              handleDownloadChunks
            }
          />
        )}
      </div>
    </AppLayout>
  );
}