import { parseCsvFile } from "./parser";
import { cleanTransactionData } from "./dataCleaner";
import { validateTransactions } from "./validator";
import { splitCsvData, CsvChunk, DEFAULT_CHUNK_SIZE } from "./csvSplitter";
import {
  TransactionRecord,
  ValidationResult,
  CleaningStats,
  FileInfo,
} from "@/types/transaction";

export interface PipelineExecutionResult {
  fileInfo: FileInfo;
  records: TransactionRecord[];
  cleaningStats: CleaningStats;
  validationResult: ValidationResult;
  chunks: CsvChunk[];
}

/**
 * Executes the complete transaction processing pipeline:
 * INPUT (File) -> PARSE (CSV) -> CLEAN (Automated Hygiene) -> VALIDATE (Rules Engine) -> RESULT (Data & Chunks)
 */
export async function executeTransactionPipeline(
  file: File,
  chunkSize: number = DEFAULT_CHUNK_SIZE
): Promise<PipelineExecutionResult> {
  // Step 1: PARSE
  const parsedRecords = await parseCsvFile(file);

  // Step 2: CLEAN
  const { cleanedData, cleaningStats } = cleanTransactionData(parsedRecords);

  // Step 3: VALIDATE
  const validationResult = validateTransactions(cleanedData);

  // Step 4: PARTITION / CHUNK
  const chunks = splitCsvData(validationResult.validData, chunkSize);

  // Step 5: FILE TELEMETRY
  const fileInfo: FileInfo = {
    fileName: file.name,
    fileSize: `${(file.size / 1024).toFixed(2)} KB`,
    totalRows: cleanedData.length,
    totalColumns: cleanedData.length > 0 ? Object.keys(cleanedData[0]).length : 0,
    uploadedAt: new Date().toLocaleString(),
  };

  return {
    fileInfo,
    records: cleanedData,
    cleaningStats,
    validationResult,
    chunks,
  };
}

