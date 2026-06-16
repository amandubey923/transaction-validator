"use client";

import { useState } from "react";

import { parseCsvFile } from "@/lib/parser";
import { validateTransactions } from "@/lib/validator";
import { cleanTransactionData } from "@/lib/dataCleaner";

import {
  TransactionRecord,
  ValidationResult,
  CleaningStats,
  FileInfo,
  UploadHistory,
} from "@/types/transaction";

export const useCsvUpload = () => {
  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [records, setRecords] =
    useState<TransactionRecord[]>([]);

  const [
    validationResult,
    setValidationResult,
  ] = useState<ValidationResult | null>(
    null
  );

  const [
    cleaningStats,
    setCleaningStats,
  ] = useState<CleaningStats | null>(
    null
  );

  const [fileInfo, setFileInfo] =
    useState<FileInfo | null>(null);

  const [
    uploadHistory,
    setUploadHistory,
  ] = useState<UploadHistory[]>([]);

  const uploadCsv = async (
    file: File
  ) => {
    try {
      setLoading(true);

      setFile(file);

      const parsedData =
        await parseCsvFile(file);

      const {
        cleanedData,
        cleaningStats,
      } = cleanTransactionData(
        parsedData
      );

      setRecords(cleanedData);

      setCleaningStats(
        cleaningStats
      );

      const result =
        validateTransactions(
          cleanedData
        );

      setValidationResult(result);

      const info: FileInfo = {
        fileName: file.name,
        fileSize: `${(
          file.size / 1024
        ).toFixed(2)} KB`,
        totalRows:
          cleanedData.length,
        totalColumns:
          cleanedData.length > 0
            ? Object.keys(
                cleanedData[0]
              ).length
            : 0,
        uploadedAt:
          new Date().toLocaleString(),
      };

      setFileInfo(info);

      const historyItem: UploadHistory =
        {
          fileName: file.name,
          uploadedAt:
            new Date().toLocaleString(),
        };

      const existingHistory =
        JSON.parse(
          localStorage.getItem(
            "uploadHistory"
          ) || "[]"
        );

      const updatedHistory = [
        historyItem,
        ...existingHistory,
      ].slice(0, 10);

      localStorage.setItem(
        "uploadHistory",
        JSON.stringify(
          updatedHistory
        )
      );

      setUploadHistory(
        updatedHistory
      );
    } catch (error) {
      console.error(
        "CSV Upload Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);

    setRecords([]);

    setValidationResult(null);

    setCleaningStats(null);

    setFileInfo(null);
  };

  return {
    file,
    loading,
    records,
    validationResult,
    cleaningStats,
    fileInfo,
    uploadHistory,
    uploadCsv,
    resetUpload,
  };
};