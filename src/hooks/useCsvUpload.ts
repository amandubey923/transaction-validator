"use client";

import { useState } from "react";
import { executeTransactionPipeline } from "@/lib/pipeline";
import {
  TransactionRecord,
  ValidationResult,
  CleaningStats,
  FileInfo,
  UploadHistory,
} from "@/types/transaction";

export const useCsvUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<TransactionRecord[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [cleaningStats, setCleaningStats] = useState<CleaningStats | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [uploadHistory, setUploadHistory] = useState<UploadHistory[]>([]);

  const uploadCsv = async (selectedFile: File) => {
    try {
      setLoading(true);
      setFile(selectedFile);

      const pipelineResult = await executeTransactionPipeline(selectedFile);

      setRecords(pipelineResult.records);
      setCleaningStats(pipelineResult.cleaningStats);
      setValidationResult(pipelineResult.validationResult);
      setFileInfo(pipelineResult.fileInfo);

      // Local storage upload history
      const historyItem: UploadHistory = {
        fileName: selectedFile.name,
        uploadedAt: pipelineResult.fileInfo.uploadedAt,
      };

      try {
        const existingHistory = JSON.parse(
          localStorage.getItem("uploadHistory") || "[]"
        );
        const updatedHistory = [historyItem, ...existingHistory].slice(0, 10);
        localStorage.setItem("uploadHistory", JSON.stringify(updatedHistory));
        setUploadHistory(updatedHistory);
      } catch {
        // Fallback for private browsing or SSR
        setUploadHistory((prev) => [historyItem, ...prev].slice(0, 10));
      }
    } catch (error) {
      console.error("CSV Processing Pipeline Error:", error);
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