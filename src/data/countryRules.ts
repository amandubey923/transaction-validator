export interface CountryRule {
  code: string;
  country: string;
  phoneLength: number;
}

export const countryRules: Record<string, CountryRule> = {
  India: {
    code: "+91",
    country: "India",
    phoneLength: 10,
  },

  Singapore: {
    code: "+65",
    country: "Singapore",
    phoneLength: 8,
  },

  USA: {
    code: "+1",
    country: "USA",
    phoneLength: 10,
  },

  Canada: {
    code: "+1",
    country: "Canada",
    phoneLength: 10,
  },

  UK: {
    code: "+44",
    country: "UK",
    phoneLength: 10,
  },

  Australia: {
    code: "+61",
    country: "Australia",
    phoneLength: 9,
  },

  UAE: {
    code: "+971",
    country: "UAE",
    phoneLength: 9,
  },

  Malaysia: {
    code: "+60",
    country: "Malaysia",
    phoneLength: 9,
  },
};

export const getCountryRule = (country: string) => {
  return countryRules[country];
};

export const getSupportedCountries = () => {
  return Object.keys(countryRules);
};