export interface DateValidationResult {
  isValid: boolean;
  message?: string;
  parsedDate?: string; // Standardized ISO YYYY-MM-DD
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year: number, month: number): number {
  switch (month) {
    case 1: // Jan
    case 3: // Mar
    case 5: // May
    case 7: // Jul
    case 8: // Aug
    case 10: // Oct
    case 12: // Dec
      return 31;
    case 4: // Apr
    case 6: // Jun
    case 9: // Sep
    case 11: // Nov
      return 30;
    case 2: // Feb
      return isLeapYear(year) ? 29 : 28;
    default:
      return 0;
  }
}

/**
 * Parses and strictly validates calendar date values across international formats.
 */
export const validateDate = (dateValue: string): DateValidationResult => {
  if (!dateValue || typeof dateValue !== "string") {
    return {
      isValid: false,
      message: "Transaction date is required",
    };
  }

  const trimmed = dateValue.trim();

  let year: number;
  let month: number;
  let day: number;

  // Pattern 1: ISO format YYYY-MM-DD or YYYY/MM/DD
  const isoMatch = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.exec(trimmed);
  if (isoMatch) {
    year = parseInt(isoMatch[1], 10);
    month = parseInt(isoMatch[2], 10);
    day = parseInt(isoMatch[3], 10);
  } else {
    // Pattern 2: DD/MM/YYYY or DD-MM-YYYY or MM/DD/YYYY or MM-DD-YYYY
    const dmyMatch = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/.exec(trimmed);
    if (!dmyMatch) {
      return {
        isValid: false,
        message: "Invalid date format. Expected YYYY-MM-DD, DD/MM/YYYY, or MM-DD-YYYY",
      };
    }

    const first = parseInt(dmyMatch[1], 10);
    const second = parseInt(dmyMatch[2], 10);
    year = parseInt(dmyMatch[3], 10);

    // Disambiguation between DD/MM/YYYY and MM/DD/YYYY
    if (first > 12 && second <= 12) {
      // Must be DD/MM/YYYY
      day = first;
      month = second;
    } else if (second > 12 && first <= 12) {
      // Must be MM/DD/YYYY
      month = first;
      day = second;
    } else {
      // Default standard international priority: DD/MM/YYYY
      day = first;
      month = second;
    }
  }

  // Strict year boundary check
  if (year < 1970 || year > 2050) {
    return {
      isValid: false,
      message: `Date year ${year} is out of realistic transaction range (1970–2050)`,
    };
  }

  // Month boundary check
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      message: `Invalid month ${month}. Must be between 1 and 12`,
    };
  }

  // Calendar day boundary check for the specific month/year
  const maxDays = getDaysInMonth(year, month);
  if (day < 1 || day > maxDays) {
    return {
      isValid: false,
      message: `Invalid day ${day} for month ${month} in year ${year} (max ${maxDays} days)`,
    };
  }

  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");

  return {
    isValid: true,
    parsedDate: `${year}-${paddedMonth}-${paddedDay}`,
  };
};

/**
 * Validates 24-hour and 12-hour time formats.
 */
export const validateTime = (timeValue: string): DateValidationResult => {
  if (!timeValue || typeof timeValue !== "string") {
    return {
      isValid: false,
      message: "Transaction time is required",
    };
  }

  const trimmed = timeValue.trim();

  // 24-hour format: HH:mm or HH:mm:ss
  const match24 = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(trimmed);
  if (match24) {
    const hours = parseInt(match24[1], 10);
    const minutes = parseInt(match24[2], 10);
    const seconds = match24[3] !== undefined ? parseInt(match24[3], 10) : 0;

    if (hours < 0 || hours > 23) {
      return { isValid: false, message: `Hours (${hours}) must be between 00 and 23` };
    }
    if (minutes < 0 || minutes > 59) {
      return { isValid: false, message: `Minutes (${minutes}) must be between 00 and 59` };
    }
    if (seconds < 0 || seconds > 59) {
      return { isValid: false, message: `Seconds (${seconds}) must be between 00 and 59` };
    }

    return {
      isValid: true,
      parsedDate: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
    };
  }

  // 12-hour format: hh:mm:ss AM/PM or hh:mm AM/PM
  const match12 = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)$/i.exec(trimmed);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = parseInt(match12[2], 10);
    const seconds = match12[3] !== undefined ? parseInt(match12[3], 10) : 0;
    const period = match12[4].toUpperCase();

    if (hours < 1 || hours > 12) {
      return { isValid: false, message: `12-hour format hours (${hours}) must be between 1 and 12` };
    }
    if (minutes < 0 || minutes > 59) {
      return { isValid: false, message: `Minutes (${minutes}) must be between 00 and 59` };
    }
    if (seconds < 0 || seconds > 59) {
      return { isValid: false, message: `Seconds (${seconds}) must be between 00 and 59` };
    }

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return {
      isValid: true,
      parsedDate: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
    };
  }

  return {
    isValid: false,
    message: "Time format should be HH:mm or HH:mm:ss (e.g. 14:30:00)",
  };
};