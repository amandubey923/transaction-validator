import {
  TransactionRecord,
  CleaningStats,
} from "@/types/transaction";
import { normalizeCountryName } from "@/config/countryRules";
import { validatePhone } from "./phoneValidator";
import { validateDate, validateTime } from "./dateValidator";

const createStats = (): CleaningStats => ({
  recordsCleaned: 0,
  phoneFixed: 0,
  countryFixed: 0,
  dateFixed: 0,
  timeFixed: 0,
  trimmedFields: 0,
});

/**
 * Trims leading/trailing whitespace and collapses multiple internal spaces.
 */
const cleanText = (
  text: any,
  stats: CleaningStats,
  rowChangedRef: { changed: boolean }
): string => {
  if (text === undefined || text === null) return "";
  const original = String(text);
  const cleaned = original.trim().replace(/\s+/g, " ");

  if (cleaned !== original) {
    stats.trimmedFields++;
    rowChangedRef.changed = true;
  }

  return cleaned;
};

/**
 * Strips currency symbols, spaces, and commas, returning clean numeric value.
 */
const cleanNumericString = (val: any): string => {
  if (val === undefined || val === null) return "";
  return String(val)
    .trim()
    .replace(/[$€£₹¥,]/g, "");
};

/**
 * Normalizes country names using centralized directory.
 */
const cleanCountry = (
  country: string,
  stats: CleaningStats,
  rowChangedRef: { changed: boolean }
): string => {
  if (!country) return "";
  const original = country.trim();
  const normalized = normalizeCountryName(original);

  if (normalized !== original) {
    stats.countryFixed++;
    rowChangedRef.changed = true;
  }

  return normalized;
};

/**
 * Cleans and normalizes phone numbers based on country rules.
 */
const cleanPhone = (
  phone: any,
  country: string,
  stats: CleaningStats,
  rowChangedRef: { changed: boolean }
): string => {
  if (!phone) return "";
  const original = String(phone).trim();

  const result = validatePhone(original, country);
  if (result.isValid && result.normalizedPhone) {
    if (result.normalizedPhone !== original) {
      stats.phoneFixed++;
      rowChangedRef.changed = true;
    }
    return result.normalizedPhone;
  }

  // Fallback: extract clean digits if possible
  const rawDigits = original.replace(/\D/g, "");
  if (rawDigits !== original && rawDigits.length > 0) {
    stats.phoneFixed++;
    rowChangedRef.changed = true;
    return rawDigits;
  }

  return original;
};

/**
 * Normalizes dates to standard ISO YYYY-MM-DD.
 */
const cleanDate = (
  date: any,
  stats: CleaningStats,
  rowChangedRef: { changed: boolean }
): string => {
  if (!date) return "";
  const original = String(date).trim();

  const validation = validateDate(original);
  if (validation.isValid && validation.parsedDate) {
    if (validation.parsedDate !== original) {
      stats.dateFixed++;
      rowChangedRef.changed = true;
    }
    return validation.parsedDate;
  }

  return original;
};

/**
 * Normalizes time to HH:mm:ss.
 */
const cleanTime = (
  time: any,
  stats: CleaningStats,
  rowChangedRef: { changed: boolean }
): string => {
  if (!time) return "";
  const original = String(time).trim();

  const validation = validateTime(original);
  if (validation.isValid && validation.parsedDate) {
    if (validation.parsedDate !== original) {
      stats.timeFixed++;
      rowChangedRef.changed = true;
    }
    return validation.parsedDate;
  }

  return original;
};

/**
 * Cleans and standardizes an entire transaction dataset.
 */
export const cleanTransactionData = (
  records: TransactionRecord[]
): {
  cleanedData: TransactionRecord[];
  cleaningStats: CleaningStats;
} => {
  const stats = createStats();

  const cleanedData = records.map((record) => {
    const rowChangedRef = { changed: false };

    const country = cleanCountry(
      record.country ? String(record.country) : "",
      stats,
      rowChangedRef
    );

    const phone = cleanPhone(
      record.phone,
      country,
      stats,
      rowChangedRef
    );

    const transaction_date = cleanDate(
      record.transaction_date,
      stats,
      rowChangedRef
    );

    const transaction_time = cleanTime(
      record.transaction_time,
      stats,
      rowChangedRef
    );

    const order_id = cleanText(record.order_id, stats, rowChangedRef);
    const product_id = cleanText(record.product_id, stats, rowChangedRef);
    const product_name = cleanText(record.product_name, stats, rowChangedRef);
    const customer_name = cleanText(record.customer_name, stats, rowChangedRef);
    const payment_mode = cleanText(record.payment_mode, stats, rowChangedRef);
    const currency = cleanText(record.currency, stats, rowChangedRef).toUpperCase();

    // Clean numeric values
    const cleanedQty = cleanNumericString(record.quantity);
    const quantity = cleanedQty !== "" && !Number.isNaN(Number(cleanedQty))
      ? Number(cleanedQty)
      : record.quantity;

    const cleanedUnitPrice = cleanNumericString(record.unit_price);
    const unit_price = cleanedUnitPrice !== "" && !Number.isNaN(Number(cleanedUnitPrice))
      ? Number(cleanedUnitPrice)
      : record.unit_price;

    const cleanedTotal = cleanNumericString(record.total_amount);
    const total_amount = cleanedTotal !== "" && !Number.isNaN(Number(cleanedTotal))
      ? Number(cleanedTotal)
      : record.total_amount;

    if (rowChangedRef.changed) {
      stats.recordsCleaned++;
    }

    return {
      ...record,
      order_id,
      product_id,
      product_name,
      customer_name,
      payment_mode,
      currency,
      country,
      phone,
      transaction_date,
      transaction_time,
      quantity,
      unit_price,
      total_amount,
    };
  });

  return {
    cleanedData,
    cleaningStats: stats,
  };
};