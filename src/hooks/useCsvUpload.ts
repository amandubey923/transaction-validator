"use client";

import { useState } from "react";

import { parseCSV } from "@/lib/parser";
import { validateTransactions } from "@/lib/validator";

export function useCsvUpload() {
  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState<
    Record<string, string>[]
  >([]);

  const [validRows, setValidRows] = useState<
    Record<string, string>[]
  >([]);

  const [invalidRows, setInvalidRows] = useState<
    Record<string, string>[]
  >([]);

  const [errors, setErrors] = useState<any[]>([]);

  async function uploadFile(file: File) {
    try {
      setLoading(true);

      const parsedRows =
        await parseCSV(file);

      const validationResult =
        validateTransactions(parsedRows);

      setRows(parsedRows);

      setValidRows(
        validationResult.validRows
      );

      setInvalidRows(
        validationResult.invalidRows
      );

      setErrors(
        validationResult.errors
      );

      return validationResult;
    } catch (error) {
      console.error(error);

      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,

    rows,

    validRows,

    invalidRows,

    errors,

    uploadFile,
  };
}