import {
  TransactionRecord,
  ValidationError,
  ValidationResult,
} from "@/types/transaction";

import { validatePhone } from "./phoneValidator";
import { validateDate, validateTime } from "./dateValidator";
import { getCountryRule } from "@/config/countryRules";

const CORE_REQUIRED_FIELDS = [
  { field: "order_id", label: "Order ID" },
  { field: "product_id", label: "Product ID" },
  { field: "product_name", label: "Product Name" },
  { field: "customer_name", label: "Customer Name" },
  { field: "country", label: "Country" },
  { field: "phone", label: "Phone" },
  { field: "transaction_date", label: "Transaction Date" },
  { field: "transaction_time", label: "Transaction Time" },
  { field: "payment_mode", label: "Payment Mode" },
] as const;

export const validateTransactions = (
  records: TransactionRecord[]
): ValidationResult => {
  const validData: TransactionRecord[] = [];
  const invalidData: TransactionRecord[] = [];
  const errors: ValidationError[] = [];

  const orderIdsSeen = new Map<string, number>(); // order_id -> first row seen
  const countries = new Set<string>();

  records.forEach((record, index) => {
    let isValidRow = true;
    const rowNumber = index + 2; // +1 for 1-based, +1 for CSV header
    const orderIdDisplay = String(record.order_id || `Row ${rowNumber}`).trim();

    // 1. Required Core Fields Check
    for (const { field, label } of CORE_REQUIRED_FIELDS) {
      const val = record[field];
      if (val === undefined || val === null || String(val).trim() === "") {
        isValidRow = false;
        errors.push({
          row: rowNumber,
          order_id: orderIdDisplay,
          field,
          message: `${label} is required and cannot be empty`,
        });
      }
    }

    // 2. Order ID Uniqueness / Duplicate Detection
    if (record.order_id && String(record.order_id).trim() !== "") {
      const normalizedOrderId = String(record.order_id).trim();
      const firstSeenRow = orderIdsSeen.get(normalizedOrderId);

      if (firstSeenRow !== undefined) {
        isValidRow = false;
        errors.push({
          row: rowNumber,
          order_id: normalizedOrderId,
          field: "order_id",
          message: `Duplicate order_id: '${normalizedOrderId}' was already defined on row #${firstSeenRow}`,
        });
      } else {
        orderIdsSeen.set(normalizedOrderId, rowNumber);
      }
    }

    // 3. Country Validation & Tracking
    if (record.country && String(record.country).trim() !== "") {
      const countryStr = String(record.country).trim();
      countries.add(countryStr);

      const countryRule = getCountryRule(countryStr);
      if (!countryRule) {
        // We log recognized country check but do not reject valid international territory if phone conforms
      }
    }

    // 4. Country-Specific Phone Validation
    if (record.phone !== undefined && record.phone !== null && String(record.phone).trim() !== "") {
      const phoneValidation = validatePhone(
        record.phone,
        String(record.country || "")
      );

      if (!phoneValidation.isValid) {
        isValidRow = false;
        errors.push({
          row: rowNumber,
          order_id: orderIdDisplay,
          field: "phone",
          message: phoneValidation.message || "Invalid phone number format for country",
        });
      }
    }

    // 5. Date Validation
    if (record.transaction_date && String(record.transaction_date).trim() !== "") {
      const dateValidation = validateDate(String(record.transaction_date));
      if (!dateValidation.isValid) {
        isValidRow = false;
        errors.push({
          row: rowNumber,
          order_id: orderIdDisplay,
          field: "transaction_date",
          message: dateValidation.message || "Invalid transaction date format",
        });
      }
    }

    // 6. Time Validation
    if (record.transaction_time && String(record.transaction_time).trim() !== "") {
      const timeValidation = validateTime(String(record.transaction_time));
      if (!timeValidation.isValid) {
        isValidRow = false;
        errors.push({
          row: rowNumber,
          order_id: orderIdDisplay,
          field: "transaction_time",
          message: timeValidation.message || "Invalid transaction time format",
        });
      }
    }

    // 7. Product & Monetary Calculation Integrity
    const rawQty = record.quantity;
    const rawUnitPrice = record.unit_price;
    const rawTotal = record.total_amount;

    const quantity = Number(rawQty);
    const unitPrice = Number(rawUnitPrice);
    const totalAmount = Number(rawTotal);

    if (rawQty === undefined || rawQty === null || String(rawQty).trim() === "" || Number.isNaN(quantity)) {
      isValidRow = false;
      errors.push({
        row: rowNumber,
        order_id: orderIdDisplay,
        field: "quantity",
        message: "Quantity must be a valid numeric value",
      });
    } else if (quantity <= 0) {
      isValidRow = false;
      errors.push({
        row: rowNumber,
        order_id: orderIdDisplay,
        field: "quantity",
        message: "Quantity must be greater than zero",
      });
    }

    if (rawUnitPrice === undefined || rawUnitPrice === null || String(rawUnitPrice).trim() === "" || Number.isNaN(unitPrice)) {
      isValidRow = false;
      errors.push({
        row: rowNumber,
        order_id: orderIdDisplay,
        field: "unit_price",
        message: "Unit price must be a valid numeric value",
      });
    } else if (unitPrice < 0) {
      isValidRow = false;
      errors.push({
        row: rowNumber,
        order_id: orderIdDisplay,
        field: "unit_price",
        message: "Unit price cannot be negative",
      });
    }

    if (rawTotal === undefined || rawTotal === null || String(rawTotal).trim() === "" || Number.isNaN(totalAmount)) {
      isValidRow = false;
      errors.push({
        row: rowNumber,
        order_id: orderIdDisplay,
        field: "total_amount",
        message: "Total amount must be a valid numeric value",
      });
    } else if (totalAmount < 0) {
      isValidRow = false;
      errors.push({
        row: rowNumber,
        order_id: orderIdDisplay,
        field: "total_amount",
        message: "Total amount cannot be negative",
      });
    }

    // Mathematical Consistency: total_amount == quantity * unit_price
    if (!Number.isNaN(quantity) && !Number.isNaN(unitPrice) && !Number.isNaN(totalAmount) && quantity > 0 && unitPrice >= 0) {
      const calculatedTotal = quantity * unitPrice;
      const difference = Math.abs(calculatedTotal - totalAmount);

      if (difference > 0.01) {
        isValidRow = false;
        errors.push({
          row: rowNumber,
          order_id: orderIdDisplay,
          field: "total_amount",
          message: `Total amount mismatch: expected ${calculatedTotal.toFixed(2)} (${quantity} × ${unitPrice.toFixed(2)}), but found ${totalAmount.toFixed(2)}`,
        });
      }
    }

    // 8. Currency Code Format
    if (record.currency && String(record.currency).trim() !== "") {
      const curr = String(record.currency).trim();
      if (!/^[A-Za-z]{3}$/.test(curr)) {
        isValidRow = false;
        errors.push({
          row: rowNumber,
          order_id: orderIdDisplay,
          field: "currency",
          message: `Currency '${curr}' is invalid; must be a 3-letter ISO code (e.g. USD, EUR, INR, SGD)`,
        });
      }
    }

    // Append to partitioned datasets
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
        : Number(((validRows / totalRows) * 100).toFixed(2)),
    validData,
    invalidData,
    errors,
  };
};