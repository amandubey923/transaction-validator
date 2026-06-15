import { validatePhone } from "./phoneValidator";
import { validateDate } from "./dateValidator";

export type ValidationError = {
  row: number;
  orderId: string;
  field: string;
  error: string;
};

export type ValidationResult = {
  validRows: Record<string, string>[];
  invalidRows: Record<string, string>[];
  errors: ValidationError[];
};

export function validateTransactions(
  rows: Record<string, string>[]
): ValidationResult {
  const validRows: Record<string, string>[] = [];

  const invalidRows: Record<string, string>[] = [];

  const errors: ValidationError[] = [];

  const seenOrderIds = new Set<string>();

  rows.forEach((row, index) => {
    let isValid = true;

    const rowNumber = index + 2;

    const orderId = row.orderId || "";

    const phone = row.phone || "";

    const country = row.country || "";

    const orderDate = row.orderDate || "";

    /* ------------------------
       Required Fields
    ------------------------- */

    if (!orderId) {
      errors.push({
        row: rowNumber,
        orderId: "-",
        field: "orderId",
        error: "Order ID missing",
      });

      isValid = false;
    }

    if (!phone) {
      errors.push({
        row: rowNumber,
        orderId,
        field: "phone",
        error: "Phone missing",
      });

      isValid = false;
    }

    if (!country) {
      errors.push({
        row: rowNumber,
        orderId,
        field: "country",
        error: "Country missing",
      });

      isValid = false;
    }

    /* ------------------------
       Duplicate Order ID
    ------------------------- */

    if (orderId) {
      if (seenOrderIds.has(orderId)) {
        errors.push({
          row: rowNumber,
          orderId,
          field: "orderId",
          error: "Duplicate Order ID",
        });

        isValid = false;
      }

      seenOrderIds.add(orderId);
    }

    /* ------------------------
       Phone Validation
    ------------------------- */

    if (
      phone &&
      country &&
      !validatePhone(phone, country)
    ) {
      errors.push({
        row: rowNumber,
        orderId,
        field: "phone",
        error: "Invalid phone number",
      });

      isValid = false;
    }

    /* ------------------------
       Date Validation
    ------------------------- */

    if (
      orderDate &&
      !validateDate(orderDate)
    ) {
      errors.push({
        row: rowNumber,
        orderId,
        field: "orderDate",
        error: "Invalid date format",
      });

      isValid = false;
    }

    if (isValid) {
      validRows.push(row);
    } else {
      invalidRows.push(row);
    }
  });

  return {
    validRows,
    invalidRows,
    errors,
  };
}