export interface CountryRule {
  code: string;
  country: string;
  phoneLength: number;
}

export const countryRules: Record<string, CountryRule> = {
  // Asia
  India: { code: "+91", country: "India", phoneLength: 10 },
  Singapore: { code: "+65", country: "Singapore", phoneLength: 8 },
  Malaysia: { code: "+60", country: "Malaysia", phoneLength: 9 },
  Indonesia: { code: "+62", country: "Indonesia", phoneLength: 10 },
  Thailand: { code: "+66", country: "Thailand", phoneLength: 9 },
  Vietnam: { code: "+84", country: "Vietnam", phoneLength: 10 },
  Philippines: { code: "+63", country: "Philippines", phoneLength: 10 },
  Pakistan: { code: "+92", country: "Pakistan", phoneLength: 10 },
  Bangladesh: { code: "+880", country: "Bangladesh", phoneLength: 10 },
  SriLanka: { code: "+94", country: "Sri Lanka", phoneLength: 9 },
  Nepal: { code: "+977", country: "Nepal", phoneLength: 10 },
  China: { code: "+86", country: "China", phoneLength: 11 },
  Japan: { code: "+81", country: "Japan", phoneLength: 10 },
  SouthKorea: { code: "+82", country: "South Korea", phoneLength: 10 },

  // North America
  USA: { code: "+1", country: "USA", phoneLength: 10 },
  Canada: { code: "+1", country: "Canada", phoneLength: 10 },
  Mexico: { code: "+52", country: "Mexico", phoneLength: 10 },

  // Europe
  UK: { code: "+44", country: "UK", phoneLength: 10 },
  France: { code: "+33", country: "France", phoneLength: 10 },
  Germany: { code: "+49", country: "Germany", phoneLength: 11 },
  Italy: { code: "+39", country: "Italy", phoneLength: 10 },
  Spain: { code: "+34", country: "Spain", phoneLength: 9 },
  Netherlands: { code: "+31", country: "Netherlands", phoneLength: 9 },
  Belgium: { code: "+32", country: "Belgium", phoneLength: 9 },
  Switzerland: { code: "+41", country: "Switzerland", phoneLength: 9 },
  Austria: { code: "+43", country: "Austria", phoneLength: 10 },
  Sweden: { code: "+46", country: "Sweden", phoneLength: 9 },
  Norway: { code: "+47", country: "Norway", phoneLength: 8 },
  Denmark: { code: "+45", country: "Denmark", phoneLength: 8 },
  Finland: { code: "+358", country: "Finland", phoneLength: 10 },
  Poland: { code: "+48", country: "Poland", phoneLength: 9 },
  Portugal: { code: "+351", country: "Portugal", phoneLength: 9 },
  Ireland: { code: "+353", country: "Ireland", phoneLength: 9 },
  Greece: { code: "+30", country: "Greece", phoneLength: 10 },
  Russia: { code: "+7", country: "Russia", phoneLength: 10 },
  Ukraine: { code: "+380", country: "Ukraine", phoneLength: 9 },

  // Middle East
  UAE: { code: "+971", country: "UAE", phoneLength: 9 },
  SaudiArabia: { code: "+966", country: "Saudi Arabia", phoneLength: 9 },
  Qatar: { code: "+974", country: "Qatar", phoneLength: 8 },
  Kuwait: { code: "+965", country: "Kuwait", phoneLength: 8 },
  Oman: { code: "+968", country: "Oman", phoneLength: 8 },

  // Africa
  SouthAfrica: { code: "+27", country: "South Africa", phoneLength: 9 },
  Nigeria: { code: "+234", country: "Nigeria", phoneLength: 10 },
  Kenya: { code: "+254", country: "Kenya", phoneLength: 9 },
  Egypt: { code: "+20", country: "Egypt", phoneLength: 10 },
  Morocco: { code: "+212", country: "Morocco", phoneLength: 9 },
  Botswana: { code: "+267", country: "Botswana", phoneLength: 8 },
  Ghana: { code: "+233", country: "Ghana", phoneLength: 9 },
  Tanzania: { code: "+255", country: "Tanzania", phoneLength: 9 },

  // South America
  Brazil: { code: "+55", country: "Brazil", phoneLength: 11 },
  Argentina: { code: "+54", country: "Argentina", phoneLength: 10 },
  Chile: { code: "+56", country: "Chile", phoneLength: 9 },
  Colombia: { code: "+57", country: "Colombia", phoneLength: 10 },
  Peru: { code: "+51", country: "Peru", phoneLength: 9 },
  Venezuela: { code: "+58", country: "Venezuela", phoneLength: 10 },
};

export const getCountryRule = (country: string) => {
  return countryRules[country];
};

export const getSupportedCountries = () => {
  return Object.keys(countryRules);
};