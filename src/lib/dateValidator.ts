export interface DateValidationResult {
  isValid: boolean;
  message?: string;
}

const supportedFormats = [
  /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
  /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
  /^\d{2}-\d{2}-\d{4}$/, // MM-DD-YYYY
];

export const validateDate = (
  dateValue: string
): DateValidationResult => {
  if (!dateValue) {
    return {
      isValid: false,
      message: "Transaction date is required",
    };
  }

  const matchesFormat = supportedFormats.some((format) =>
    format.test(dateValue)
  );

  if (!matchesFormat) {
    return {
      isValid: false,
      message:
        "Supported formats: YYYY-MM-DD, DD/MM/YYYY, MM-DD-YYYY",
    };
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return {
      isValid: false,
      message: "Invalid date",
    };
  }

  return {
    isValid: true,
  };
};

export const validateTime = (
  timeValue: string
): DateValidationResult => {
  if (!timeValue) {
    return {
      isValid: false,
      message: "Transaction time is required",
    };
  }

  const timeRegex =
    /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

  if (!timeRegex.test(timeValue)) {
    return {
      isValid: false,
      message: "Time format should be HH:mm or HH:mm:ss",
    };
  }

  return {
    isValid: true,
  };
};