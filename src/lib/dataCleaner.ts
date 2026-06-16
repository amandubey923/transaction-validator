import {
  TransactionRecord,
  CleaningStats,
} from "@/types/transaction";

const createStats = (): CleaningStats => ({
  recordsCleaned: 0,
  phoneFixed: 0,
  countryFixed: 0,
  dateFixed: 0,
  timeFixed: 0,
  trimmedFields: 0,
});

const formatCountry = (
  country: string,
  stats: CleaningStats
): string => {
  const original = country;

  const value = country
    .trim()
    .toLowerCase();

 const countryMap: Record<
  string,
  string
> = {
  india: "India",
  singapore: "Singapore",
  usa: "USA",
  uk: "UK",
  australia: "Australia",

  france: "France",
  germany: "Germany",
  russia: "Russia",
  indonesia: "Indonesia",
  botswana: "Botswana",
  venezuela: "Venezuela",
  brazil: "Brazil",
  canada: "Canada",
  mexico: "Mexico",
  japan: "Japan",
  china: "China",
  italy: "Italy",
  spain: "Spain",
};

  const formatted =
    countryMap[value] ||
    country.trim();

  if (formatted !== original) {
    stats.countryFixed++;
  }

  return formatted;
};

const cleanPhone = (
  phone: string,
  country: string,
  stats: CleaningStats
): string => {
  const original = String(phone);

  let cleaned = original
    .replace(/\D/g, "")
    .trim();

  if (
    country.toLowerCase() ===
      "india" &&
    cleaned.startsWith("91") &&
    cleaned.length === 12
  ) {
    cleaned = cleaned.slice(2);
  }

  if (
    country.toLowerCase() ===
      "singapore" &&
    cleaned.startsWith("65") &&
    cleaned.length === 10
  ) {
    cleaned = cleaned.slice(2);
  }

  if (cleaned !== original) {
    stats.phoneFixed++;
  }

  return cleaned;
};

const cleanDate = (
  date: string,
  stats: CleaningStats
): string => {
  const original = date;

  const value = String(date).trim();

  if (value.includes("/")) {
    const parts =
      value.split("/");

    if (parts.length === 3) {
      stats.dateFixed++;

      const day =
        parts[0].padStart(
          2,
          "0"
        );

      const month =
        parts[1].padStart(
          2,
          "0"
        );

      const year =
        parts[2];

      return `${year}-${month}-${day}`;
    }
  }

  return original;
};

const cleanTime = (
  time: string,
  stats: CleaningStats
): string => {
  const value = String(time ?? "").trim();

  if (!value) return "";

  // Already HH:mm:ss
  if (/^\d{2}:\d{2}:\d{2}$/.test(value)) {
    return value;
  }

  // HH:mm
  if (/^\d{1,2}:\d{2}$/.test(value)) {
    stats.timeFixed++;
    return `${value}:00`;
  }

  // Excel style decimal time
  if (/^\d+(\.\d+)?$/.test(value)) {
    const decimal = parseFloat(value);

    const hours = Math.floor(decimal);

    let minutes = Math.round(
      (decimal - hours) * 60
    );

    if (minutes > 59) {
      minutes = 59;
    }

    stats.timeFixed++;

    return `${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(
      2,
      "0"
    )}:00`;
  }

  return value;
};
const cleanText = (
  value: any,
  stats: CleaningStats
): string => {
  const original =
    String(value ?? "");

  const cleaned = original
    .trim()
    .replace(/\s+/g, " ");

  if (cleaned !== original) {
    stats.trimmedFields++;
  }

  return cleaned;
};

export const cleanTransactionData = (
  records: TransactionRecord[]
) => {
  const stats =
    createStats();

  const cleanedData =
    records.map((record) => {
      const cleanedCountry =
        record.country
          ? formatCountry(
              String(
                record.country
              ),
              stats
            )
          : "";

      stats.recordsCleaned++;

      return {
        ...record,

        order_id: cleanText(
          record.order_id,
          stats
        ),

        product_id: cleanText(
          record.product_id,
          stats
        ),

        product_name: cleanText(
          record.product_name,
          stats
        ),

        customer_name:
          cleanText(
            record.customer_name,
            stats
          ),

        payment_mode:
          cleanText(
            record.payment_mode,
            stats
          ),

        currency: cleanText(
          record.currency,
          stats
        ),

        country:
          cleanedCountry,

        phone: cleanPhone(
          String(
            record.phone ?? ""
          ),
          cleanedCountry,
          stats
        ),

        transaction_date:
          cleanDate(
            String(
              record.transaction_date ??
                ""
            ),
            stats
          ),

        transaction_time:
          cleanTime(
            String(
              record.transaction_time ??
                ""
            ),
            stats
          ),
      };
    });

  return {
    cleanedData,
    cleaningStats: stats,
  };
};