import { getCountryRule, CountryRule } from "@/config/countryRules";

export interface PhoneValidationResult {
  isValid: boolean;
  message?: string;
  normalizedPhone?: string;
  countryRule?: CountryRule;
}

/**
 * Validates international phone numbers against country-specific rules.
 * Supports national formats, international dialing prefixes, and common formatting symbols (+, -, (), spaces).
 */
export const validatePhone = (
  phone: string | number,
  country: string
): PhoneValidationResult => {
  if (phone === undefined || phone === null || String(phone).trim() === "") {
    return {
      isValid: false,
      message: "Phone number is required",
    };
  }

  if (!country || typeof country !== "string" || country.trim() === "") {
    return {
      isValid: false,
      message: "Country is required for phone validation",
    };
  }

  const phoneStr = String(phone).trim();
  const rawDigits = phoneStr.replace(/\D/g, "");

  if (rawDigits.length === 0) {
    return {
      isValid: false,
      message: "Phone number must contain numeric digits",
    };
  }

  const countryRule = getCountryRule(country);

  if (!countryRule) {
    // International standard E.164 fallback for unindexed territories: 7 to 15 digits
    if (rawDigits.length < 7 || rawDigits.length > 15) {
      return {
        isValid: false,
        message: `Phone number for ${country} must be between 7 and 15 digits (E.164 standard)`,
      };
    }
    return {
      isValid: true,
      normalizedPhone: rawDigits,
    };
  }

  const dialingDigits = countryRule.dialingCode.replace(/\D/g, "");
  const allowedLengths = countryRule.phoneLengths;

  // Check 1: Direct national length match (e.g. 10 digits for India/USA, 8 digits for Singapore)
  if (allowedLengths.includes(rawDigits.length)) {
    return {
      isValid: true,
      normalizedPhone: rawDigits,
      countryRule,
    };
  }

  // Check 2: International format starting with dialing code (e.g. 919876543210 -> 9876543210)
  if (rawDigits.startsWith(dialingDigits)) {
    const nationalNumber = rawDigits.slice(dialingDigits.length);
    if (allowedLengths.includes(nationalNumber.length)) {
      return {
        isValid: true,
        normalizedPhone: nationalNumber,
        countryRule,
      };
    }
  }

  // Check 3: Leading zero for some national formats (e.g. 07911123456 -> 7911123456)
  if (rawDigits.startsWith("0")) {
    const withoutZero = rawDigits.slice(1);
    if (allowedLengths.includes(withoutZero.length)) {
      return {
        isValid: true,
        normalizedPhone: withoutZero,
        countryRule,
      };
    }
  }

  const expectedLengthsText = allowedLengths.length === 1
    ? `${allowedLengths[0]} digits`
    : allowedLengths.join(" or ") + " digits";

  return {
    isValid: false,
    message: `${countryRule.country} phone numbers must contain ${expectedLengthsText} (received ${rawDigits.length} digits)`,
    countryRule,
  };
};