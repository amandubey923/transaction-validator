export interface CountryRule {
  country: string; // Canonical name
  dialingCode: string; // e.g. "+91"
  phoneLengths: number[]; // Allowed digit count for national numbers e.g. [10] or [8] or [9, 10]
  iso2: string; // ISO 3166-1 alpha-2 e.g. "IN"
  iso3: string; // ISO 3166-1 alpha-3 e.g. "IND"
  aliases?: string[]; // Common alternative names e.g. ["UK", "Great Britain", "England"]
}

export const COUNTRY_RULES: Record<string, CountryRule> = {
  // Asia
  India: {
    country: "India",
    dialingCode: "+91",
    phoneLengths: [10],
    iso2: "IN",
    iso3: "IND",
    aliases: ["bharat", "hindustan"],
  },
  Singapore: {
    country: "Singapore",
    dialingCode: "+65",
    phoneLengths: [8],
    iso2: "SG",
    iso3: "SGP",
  },
  Malaysia: {
    country: "Malaysia",
    dialingCode: "+60",
    phoneLengths: [9, 10],
    iso2: "MY",
    iso3: "MYS",
  },
  Indonesia: {
    country: "Indonesia",
    dialingCode: "+62",
    phoneLengths: [9, 10, 11, 12],
    iso2: "ID",
    iso3: "IDN",
  },
  Thailand: {
    country: "Thailand",
    dialingCode: "+66",
    phoneLengths: [9],
    iso2: "TH",
    iso3: "THA",
  },
  Vietnam: {
    country: "Vietnam",
    dialingCode: "+84",
    phoneLengths: [9, 10],
    iso2: "VN",
    iso3: "VNM",
  },
  Philippines: {
    country: "Philippines",
    dialingCode: "+63",
    phoneLengths: [10],
    iso2: "PH",
    iso3: "PHL",
  },
  Pakistan: {
    country: "Pakistan",
    dialingCode: "+92",
    phoneLengths: [10],
    iso2: "PK",
    iso3: "PAK",
  },
  Bangladesh: {
    country: "Bangladesh",
    dialingCode: "+880",
    phoneLengths: [10],
    iso2: "BD",
    iso3: "BGD",
  },
  SriLanka: {
    country: "Sri Lanka",
    dialingCode: "+94",
    phoneLengths: [9],
    iso2: "LK",
    iso3: "LKA",
    aliases: ["sri lanka", "ceylon"],
  },
  Nepal: {
    country: "Nepal",
    dialingCode: "+977",
    phoneLengths: [10],
    iso2: "NP",
    iso3: "NPL",
  },
  China: {
    country: "China",
    dialingCode: "+86",
    phoneLengths: [11],
    iso2: "CN",
    iso3: "CHN",
    aliases: ["prc", "peoples republic of china"],
  },
  Japan: {
    country: "Japan",
    dialingCode: "+81",
    phoneLengths: [10],
    iso2: "JP",
    iso3: "JPN",
    aliases: ["nippon"],
  },
  SouthKorea: {
    country: "South Korea",
    dialingCode: "+82",
    phoneLengths: [9, 10],
    iso2: "KR",
    iso3: "KOR",
    aliases: ["korea", "republic of korea", "south korea"],
  },
  HongKong: {
    country: "Hong Kong",
    dialingCode: "+852",
    phoneLengths: [8],
    iso2: "HK",
    iso3: "HKG",
  },
  Taiwan: {
    country: "Taiwan",
    dialingCode: "+886",
    phoneLengths: [9],
    iso2: "TW",
    iso3: "TWN",
  },

  // North America
  USA: {
    country: "USA",
    dialingCode: "+1",
    phoneLengths: [10],
    iso2: "US",
    iso3: "USA",
    aliases: ["united states", "united states of america", "us", "america"],
  },
  Canada: {
    country: "Canada",
    dialingCode: "+1",
    phoneLengths: [10],
    iso2: "CA",
    iso3: "CAN",
  },
  Mexico: {
    country: "Mexico",
    dialingCode: "+52",
    phoneLengths: [10],
    iso2: "MX",
    iso3: "MEX",
  },

  // Europe
  UK: {
    country: "UK",
    dialingCode: "+44",
    phoneLengths: [10],
    iso2: "GB",
    iso3: "GBR",
    aliases: ["united kingdom", "great britain", "britain", "england", "scotland", "wales"],
  },
  France: {
    country: "France",
    dialingCode: "+33",
    phoneLengths: [9, 10],
    iso2: "FR",
    iso3: "FRA",
  },
  Germany: {
    country: "Germany",
    dialingCode: "+49",
    phoneLengths: [10, 11],
    iso2: "DE",
    iso3: "DEU",
    aliases: ["deutschland"],
  },
  Italy: {
    country: "Italy",
    dialingCode: "+39",
    phoneLengths: [9, 10],
    iso2: "IT",
    iso3: "ITA",
    aliases: ["italia"],
  },
  Spain: {
    country: "Spain",
    dialingCode: "+34",
    phoneLengths: [9],
    iso2: "ES",
    iso3: "ESP",
    aliases: ["espana"],
  },
  Netherlands: {
    country: "Netherlands",
    dialingCode: "+31",
    phoneLengths: [9],
    iso2: "NL",
    iso3: "NLD",
    aliases: ["holland"],
  },
  Belgium: {
    country: "Belgium",
    dialingCode: "+32",
    phoneLengths: [9],
    iso2: "BE",
    iso3: "BEL",
  },
  Switzerland: {
    country: "Switzerland",
    dialingCode: "+41",
    phoneLengths: [9],
    iso2: "CH",
    iso3: "CHE",
  },
  Austria: {
    country: "Austria",
    dialingCode: "+43",
    phoneLengths: [10],
    iso2: "AT",
    iso3: "AUT",
  },
  Sweden: {
    country: "Sweden",
    dialingCode: "+46",
    phoneLengths: [9],
    iso2: "SE",
    iso3: "SWE",
  },
  Norway: {
    country: "Norway",
    dialingCode: "+47",
    phoneLengths: [8],
    iso2: "NO",
    iso3: "NOR",
  },
  Denmark: {
    country: "Denmark",
    dialingCode: "+45",
    phoneLengths: [8],
    iso2: "DK",
    iso3: "DNK",
  },
  Finland: {
    country: "Finland",
    dialingCode: "+358",
    phoneLengths: [9, 10],
    iso2: "FI",
    iso3: "FIN",
  },
  Poland: {
    country: "Poland",
    dialingCode: "+48",
    phoneLengths: [9],
    iso2: "PL",
    iso3: "POL",
    aliases: ["polska"],
  },
  Portugal: {
    country: "Portugal",
    dialingCode: "+351",
    phoneLengths: [9],
    iso2: "PT",
    iso3: "PRT",
  },
  Ireland: {
    country: "Ireland",
    dialingCode: "+353",
    phoneLengths: [9],
    iso2: "IE",
    iso3: "IRL",
    aliases: ["eire"],
  },
  Greece: {
    country: "Greece",
    dialingCode: "+30",
    phoneLengths: [10],
    iso2: "GR",
    iso3: "GRC",
  },
  Russia: {
    country: "Russia",
    dialingCode: "+7",
    phoneLengths: [10],
    iso2: "RU",
    iso3: "RUS",
    aliases: ["russian federation"],
  },
  Ukraine: {
    country: "Ukraine",
    dialingCode: "+380",
    phoneLengths: [9],
    iso2: "UA",
    iso3: "UKR",
  },
  Turkey: {
    country: "Turkey",
    dialingCode: "+90",
    phoneLengths: [10],
    iso2: "TR",
    iso3: "TUR",
    aliases: ["turkiye"],
  },

  // Middle East
  UAE: {
    country: "UAE",
    dialingCode: "+971",
    phoneLengths: [9],
    iso2: "AE",
    iso3: "ARE",
    aliases: ["united arab emirates", "dubai", "abu dhabi"],
  },
  SaudiArabia: {
    country: "Saudi Arabia",
    dialingCode: "+966",
    phoneLengths: [9],
    iso2: "SA",
    iso3: "SAU",
    aliases: ["saudi", "ksa"],
  },
  Qatar: {
    country: "Qatar",
    dialingCode: "+974",
    phoneLengths: [8],
    iso2: "QA",
    iso3: "QAT",
  },
  Kuwait: {
    country: "Kuwait",
    dialingCode: "+965",
    phoneLengths: [8],
    iso2: "KW",
    iso3: "KWT",
  },
  Oman: {
    country: "Oman",
    dialingCode: "+968",
    phoneLengths: [8],
    iso2: "OM",
    iso3: "OMN",
  },
  Israel: {
    country: "Israel",
    dialingCode: "+972",
    phoneLengths: [9],
    iso2: "IL",
    iso3: "ISR",
  },

  // Oceania
  Australia: {
    country: "Australia",
    dialingCode: "+61",
    phoneLengths: [9],
    iso2: "AU",
    iso3: "AUS",
  },
  NewZealand: {
    country: "New Zealand",
    dialingCode: "+64",
    phoneLengths: [8, 9],
    iso2: "NZ",
    iso3: "NZL",
  },

  // Africa
  SouthAfrica: {
    country: "South Africa",
    dialingCode: "+27",
    phoneLengths: [9],
    iso2: "ZA",
    iso3: "ZAF",
  },
  Nigeria: {
    country: "Nigeria",
    dialingCode: "+234",
    phoneLengths: [10],
    iso2: "NG",
    iso3: "NGA",
  },
  Kenya: {
    country: "Kenya",
    dialingCode: "+254",
    phoneLengths: [9],
    iso2: "KE",
    iso3: "KEN",
  },
  Egypt: {
    country: "Egypt",
    dialingCode: "+20",
    phoneLengths: [10],
    iso2: "EG",
    iso3: "EGY",
  },
  Morocco: {
    country: "Morocco",
    dialingCode: "+212",
    phoneLengths: [9],
    iso2: "MA",
    iso3: "MAR",
  },
  Ghana: {
    country: "Ghana",
    dialingCode: "+233",
    phoneLengths: [9],
    iso2: "GH",
    iso3: "GHA",
  },

  // South America
  Brazil: {
    country: "Brazil",
    dialingCode: "+55",
    phoneLengths: [10, 11],
    iso2: "BR",
    iso3: "BRA",
    aliases: ["brasil"],
  },
  Argentina: {
    country: "Argentina",
    dialingCode: "+54",
    phoneLengths: [10],
    iso2: "AR",
    iso3: "ARG",
  },
  Chile: {
    country: "Chile",
    dialingCode: "+56",
    phoneLengths: [9],
    iso2: "CL",
    iso3: "CHL",
  },
  Colombia: {
    country: "Colombia",
    dialingCode: "+57",
    phoneLengths: [10],
    iso2: "CO",
    iso3: "COL",
  },
  Peru: {
    country: "Peru",
    dialingCode: "+51",
    phoneLengths: [9],
    iso2: "PE",
    iso3: "PER",
  },
};

// Fast O(1) Case-Insensitive Lookup Index
const COUNTRY_LOOKUP_MAP = new Map<string, CountryRule>();

for (const rule of Object.values(COUNTRY_RULES)) {
  // Index canonical country name
  COUNTRY_LOOKUP_MAP.set(rule.country.toLowerCase(), rule);
  // Index ISO codes
  COUNTRY_LOOKUP_MAP.set(rule.iso2.toLowerCase(), rule);
  COUNTRY_LOOKUP_MAP.set(rule.iso3.toLowerCase(), rule);
  // Index Dialing code without plus and with plus
  COUNTRY_LOOKUP_MAP.set(rule.dialingCode.toLowerCase(), rule);
  COUNTRY_LOOKUP_MAP.set(rule.dialingCode.replace("+", ""), rule);

  // Index any aliases
  if (rule.aliases) {
    for (const alias of rule.aliases) {
      COUNTRY_LOOKUP_MAP.set(alias.toLowerCase(), rule);
    }
  }
}

/**
 * Resolves any country identifier (name, alias, ISO-2, ISO-3) to its canonical CountryRule in O(1).
 */
export function getCountryRule(countryInput: string): CountryRule | undefined {
  if (!countryInput) return undefined;
  const normalized = countryInput.trim().toLowerCase();
  return COUNTRY_LOOKUP_MAP.get(normalized);
}

/**
 * Normalizes any country representation to its canonical display name.
 */
export function normalizeCountryName(countryInput: string): string {
  if (!countryInput) return "";
  const rule = getCountryRule(countryInput);
  return rule ? rule.country : countryInput.trim();
}

/**
 * Returns all supported canonical country names.
 */
export function getSupportedCountries(): string[] {
  return Object.values(COUNTRY_RULES).map((r) => r.country);
}

