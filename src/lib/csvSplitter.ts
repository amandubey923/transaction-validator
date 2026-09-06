import Papa from "papaparse";
import { TransactionRecord } from "@/types/transaction";

export interface CsvChunk {
  fileName: string;
  csvContent: string;
  rowCount: number;
  partNumber: number;
  totalParts: number;
}

export const DEFAULT_CHUNK_SIZE = 5000;

/**
 * Splits a transaction dataset into partitioned CSV chunks for batch processing.
 * Each chunk includes complete headers and properly escaped rows.
 */
export const splitCsvData = (
  data: TransactionRecord[],
  chunkSize: number = DEFAULT_CHUNK_SIZE
): CsvChunk[] => {
  if (!data || data.length === 0) return [];

  const effectiveChunkSize = Math.max(1, chunkSize);
  const totalParts = Math.ceil(data.length / effectiveChunkSize);
  const chunks: CsvChunk[] = [];

  for (let i = 0; i < data.length; i += effectiveChunkSize) {
    const chunkData = data.slice(i, i + effectiveChunkSize);
    const partNumber = Math.floor(i / effectiveChunkSize) + 1;
    const csvContent = Papa.unparse(chunkData);

    chunks.push({
      fileName: `transactions_part_${partNumber}.csv`,
      csvContent,
      rowCount: chunkData.length,
      partNumber,
      totalParts,
    });
  }

  return chunks;
};