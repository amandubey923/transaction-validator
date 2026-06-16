import Papa from "papaparse";

import { ValidationError } from "@/types/transaction";

export const downloadErrorCsv = (
  errors: ValidationError[]
) => {
  if (!errors.length) return;

  const csvData = errors.map(
    (error) => ({
      row: error.row,
      order_id: error.order_id,
      field: error.field,
      error: error.message,
    })
  );

  const csv =
    Papa.unparse(csvData);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    "validation_errors.csv"
  );

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  URL.revokeObjectURL(url);
};