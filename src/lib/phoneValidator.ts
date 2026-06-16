import { getCountryRule } from "@/data/countryRules";


export interface PhoneValidationResult {
  isValid: boolean;
  message?: string;
}

export const validatePhone = (
  phone: string,
  country: string
): PhoneValidationResult => {
  if (!phone) {
    return {
      isValid: false,
      message: "Phone number is required",
    };
  }

  if (!country) {
    return {
      isValid: false,
      message: "Country is required",
    };
  }

  const countryRule = getCountryRule(country);

  if (!countryRule) {
    return {
      isValid: true,
      // message: `Unsupported country: ${country}`,
    };
  }

  const cleanedPhone = phone.replace(/\D/g, "");

  if (cleanedPhone.length !== countryRule.phoneLength) {
    return {
      isValid: false,
      message: `${country} phone number must contain ${countryRule.phoneLength} digits`,
    };
  }

  return {
    isValid: true,
  };
};