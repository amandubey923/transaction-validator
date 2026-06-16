import Papa from "papaparse";
import { TransactionRecord } from "@/types/transaction";

export interface CsvChunk {
  fileName: string;
  csvContent: string;
}

export const splitCsvData = (
  data: TransactionRecord[],
  chunkSize: number = 50       //for testing purpose        // 1000
): CsvChunk[] => {
  if (!data.length) return [];

  const chunks: CsvChunk[] = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);

    const csvContent = Papa.unparse(chunk);

    chunks.push({
      fileName: `transactions_part_${
        Math.floor(i / chunkSize) + 1
      }.csv`,
      csvContent,
    });
  }

  return chunks;
};