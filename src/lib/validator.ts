import {
  TransactionRecord,
  ValidationError,
  ValidationResult,
} from "@/types/transaction";

import { validatePhone } from "./phoneValidator";
import { validateDate, validateTime } from "./dateValidator";
import { getCountryRule } from "@/data/countryRules";

const REQUIRED_FIELDS = [
  "order_id",
  "phone",
  "country",
  "transaction_date",
  "transaction_time",
];

export const validateTransactions = (
  records: TransactionRecord[]
): ValidationResult => {
  const validData: TransactionRecord[] = [];
  const invalidData: TransactionRecord[] = [];
  const errors: ValidationError[] = [];

  const orderIds = new Set<string>();
  const countries = new Set<string>();

  records.forEach((record, index) => {
    let isValidRow = true;

    const rowNumber = index + 2;

    REQUIRED_FIELDS.forEach((field) => {
      const value = record[field];

      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
        isValidRow = false;

        errors.push({
          row: rowNumber,
          order_id: record.order_id || "N/A",
          field,
          message: `${field} is required`,
        });
      }
    });

    if (record.country) {
      countries.add(record.country);

      const countryRule = getCountryRule(record.country);

      if (!countryRule) {
        isValidRow = false;

        errors.push({
          row: rowNumber,
          order_id: record.order_id || "N/A",
          field: "country",
          message: "Unsupported country",
        });
      }
    }

    if (record.phone && record.country) {
      const phoneValidation = validatePhone(
        String(record.phone),
        record.country
      );

      if (!phoneValidation.isValid) {
        isValidRow = false;

        errors.push({
          row: rowNumber,
          order_id: record.order_id || " ",
          field: "phone",
          message: phoneValidation.message || "Invalid phone",
        });
      }
    }

    if (record.transaction_date) {
      const dateValidation = validateDate(
        record.transaction_date
      );

      if (!dateValidation.isValid) {
        isValidRow = false;

        errors.push({
          row: rowNumber,
          order_id: record.order_id || "N/A",
          field: "transaction_date",
          message: dateValidation.message || "Invalid date",
        });
      }
    }

    if (record.transaction_time) {
      const timeValidation = validateTime(
        record.transaction_time
      );

      if (!timeValidation.isValid) {
        isValidRow = false;

        errors.push({
          row: rowNumber,
          order_id: record.order_id || "N/A",
          field: "transaction_time",
          message: timeValidation.message || "Invalid time",
        });
      }
    }

    if (record.order_id) {
      if (orderIds.has(record.order_id)) {
        isValidRow = false;

        errors.push({
          row: rowNumber,
          order_id: record.order_id,
          field: "order_id",
          message: "Duplicate order_id detected",
        });
      } else {
        orderIds.add(record.order_id);
      }
    }

    const quantity = Number(record.quantity);
    const unitPrice = Number(record.unit_price);
    const totalAmount = Number(record.total_amount);

    if (!Number.isNaN(quantity) && quantity < 0) {
      isValidRow = false;

      errors.push({
        row: rowNumber,
        order_id: record.order_id || " ",
        field: "quantity",
        message: "Quantity cannot be negative",
      });
    }

    if (!Number.isNaN(unitPrice) && unitPrice < 0) {
      isValidRow = false;

      errors.push({
        row: rowNumber,
        order_id: record.order_id || " ",
        field: "unit_price",
        message: "Unit price cannot be negative",
      });
    }

    if (!Number.isNaN(totalAmount) && totalAmount < 0) {
      isValidRow = false;

      errors.push({
        row: rowNumber,
        order_id: record.order_id || " ",
        field: "total_amount",
        message: "Total amount cannot be negative",
      });
    }

    if (
      !Number.isNaN(quantity) &&
      !Number.isNaN(unitPrice) &&
      !Number.isNaN(totalAmount)
    ) {
      const calculatedTotal = quantity * unitPrice;

      if (
        Math.abs(calculatedTotal - totalAmount) > 0.01
      ) {
        isValidRow = false;

        errors.push({
          row: rowNumber,
          order_id: record.order_id || " ",
          field: "total_amount",
          message:
            "total_amount does not match quantity × unit_price",
        });
      }
    }

    if (isValidRow) {
      validData.push(record);
    } else {
      invalidData.push(record);
    }
  });

  const totalRows = records.length;
  const validRows = validData.length;
  const invalidRows = invalidData.length;

  return {
    totalRows,
    validRows,
    invalidRows,
    countriesDetected: countries.size,
    successRate:
      totalRows === 0
        ? 0
        : Number(
            ((validRows / totalRows) * 100).toFixed(2)
          ),
    validData,
    invalidData,
    errors,
  };
};