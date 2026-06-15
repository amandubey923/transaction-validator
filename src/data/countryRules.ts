export const countryRules: Record<
  string,
  {
    phoneLength: number;
  }
> = {
  IN: {
    phoneLength: 10,
  },

  SG: {
    phoneLength: 8,
  },

  US: {
    phoneLength: 10,
  },

  UK: {
    phoneLength: 10,
  },
};