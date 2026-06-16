import Papa from "papaparse";
import { TransactionRecord } from "@/types/transaction";

export const parseCsvFile = (
  file: File
): Promise<TransactionRecord[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<TransactionRecord>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,

      complete: (results) => {
        resolve(results.data);
      },

      error: (error) => {
        reject(error);
      },
    });
  });
};