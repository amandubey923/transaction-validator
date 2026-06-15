import { countryRules } from "@/data/countryRules";

export function validatePhone(
  phone: string,
  country: string
): boolean {
  const rule = countryRules[country];

  if (!rule) {
    return false;
  }

  const cleanedPhone = phone.replace(
    /\D/g,
    ""
  );

  return (
    cleanedPhone.length ===
    rule.phoneLength
  );
}