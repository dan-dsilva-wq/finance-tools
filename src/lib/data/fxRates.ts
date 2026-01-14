// Historical FX rates (annual averages) against USD
// Sources: Federal Reserve, Bank of England, Bank of Canada, Reserve Bank of Australia

export interface FxRateData {
  year: number;
  rate: number; // Amount of foreign currency per 1 USD
}

export interface FxRateInfo {
  pair: string;
  baseCurrency: string;
  quoteCurrency: string;
  baseCountryCode: string;
  quoteCountryCode: string;
  currentRate: number;
  lastUpdated: string;
  description: string;
  data: FxRateData[];
}

export const fxRates: Record<string, FxRateInfo> = {
  'gbp-usd': {
    pair: 'GBP/USD',
    baseCurrency: 'GBP',
    quoteCurrency: 'USD',
    baseCountryCode: 'gb',
    quoteCountryCode: 'us',
    currentRate: 1.22,
    lastUpdated: '2025-01',
    description: 'British Pound to US Dollar',
    data: [
      { year: 1970, rate: 2.40 }, { year: 1971, rate: 2.44 }, { year: 1972, rate: 2.50 },
      { year: 1973, rate: 2.45 }, { year: 1974, rate: 2.34 }, { year: 1975, rate: 2.22 },
      { year: 1976, rate: 1.80 }, { year: 1977, rate: 1.74 }, { year: 1978, rate: 1.92 },
      { year: 1979, rate: 2.12 }, { year: 1980, rate: 2.33 }, { year: 1981, rate: 2.02 },
      { year: 1982, rate: 1.75 }, { year: 1983, rate: 1.52 }, { year: 1984, rate: 1.34 },
      { year: 1985, rate: 1.30 }, { year: 1986, rate: 1.47 }, { year: 1987, rate: 1.64 },
      { year: 1988, rate: 1.78 }, { year: 1989, rate: 1.64 }, { year: 1990, rate: 1.78 },
      { year: 1991, rate: 1.77 }, { year: 1992, rate: 1.77 }, { year: 1993, rate: 1.50 },
      { year: 1994, rate: 1.53 }, { year: 1995, rate: 1.58 }, { year: 1996, rate: 1.56 },
      { year: 1997, rate: 1.64 }, { year: 1998, rate: 1.66 }, { year: 1999, rate: 1.62 },
      { year: 2000, rate: 1.52 }, { year: 2001, rate: 1.44 }, { year: 2002, rate: 1.50 },
      { year: 2003, rate: 1.64 }, { year: 2004, rate: 1.83 }, { year: 2005, rate: 1.82 },
      { year: 2006, rate: 1.84 }, { year: 2007, rate: 2.00 }, { year: 2008, rate: 1.85 },
      { year: 2009, rate: 1.57 }, { year: 2010, rate: 1.55 }, { year: 2011, rate: 1.60 },
      { year: 2012, rate: 1.59 }, { year: 2013, rate: 1.56 }, { year: 2014, rate: 1.65 },
      { year: 2015, rate: 1.53 }, { year: 2016, rate: 1.36 }, { year: 2017, rate: 1.29 },
      { year: 2018, rate: 1.33 }, { year: 2019, rate: 1.28 }, { year: 2020, rate: 1.28 },
      { year: 2021, rate: 1.38 }, { year: 2022, rate: 1.24 }, { year: 2023, rate: 1.24 },
      { year: 2024, rate: 1.27 }, { year: 2025, rate: 1.22 },
    ],
  },
  'usd-cad': {
    pair: 'USD/CAD',
    baseCurrency: 'USD',
    quoteCurrency: 'CAD',
    baseCountryCode: 'us',
    quoteCountryCode: 'ca',
    currentRate: 1.44,
    lastUpdated: '2025-01',
    description: 'US Dollar to Canadian Dollar',
    data: [
      { year: 1970, rate: 1.01 }, { year: 1971, rate: 1.01 }, { year: 1972, rate: 0.99 },
      { year: 1973, rate: 1.00 }, { year: 1974, rate: 0.98 }, { year: 1975, rate: 1.02 },
      { year: 1976, rate: 0.99 }, { year: 1977, rate: 1.06 }, { year: 1978, rate: 1.14 },
      { year: 1979, rate: 1.17 }, { year: 1980, rate: 1.17 }, { year: 1981, rate: 1.20 },
      { year: 1982, rate: 1.23 }, { year: 1983, rate: 1.23 }, { year: 1984, rate: 1.30 },
      { year: 1985, rate: 1.37 }, { year: 1986, rate: 1.39 }, { year: 1987, rate: 1.33 },
      { year: 1988, rate: 1.23 }, { year: 1989, rate: 1.18 }, { year: 1990, rate: 1.17 },
      { year: 1991, rate: 1.15 }, { year: 1992, rate: 1.21 }, { year: 1993, rate: 1.29 },
      { year: 1994, rate: 1.37 }, { year: 1995, rate: 1.37 }, { year: 1996, rate: 1.36 },
      { year: 1997, rate: 1.38 }, { year: 1998, rate: 1.48 }, { year: 1999, rate: 1.49 },
      { year: 2000, rate: 1.49 }, { year: 2001, rate: 1.55 }, { year: 2002, rate: 1.57 },
      { year: 2003, rate: 1.40 }, { year: 2004, rate: 1.30 }, { year: 2005, rate: 1.21 },
      { year: 2006, rate: 1.13 }, { year: 2007, rate: 1.07 }, { year: 2008, rate: 1.07 },
      { year: 2009, rate: 1.14 }, { year: 2010, rate: 1.03 }, { year: 2011, rate: 0.99 },
      { year: 2012, rate: 1.00 }, { year: 2013, rate: 1.03 }, { year: 2014, rate: 1.10 },
      { year: 2015, rate: 1.28 }, { year: 2016, rate: 1.32 }, { year: 2017, rate: 1.30 },
      { year: 2018, rate: 1.30 }, { year: 2019, rate: 1.33 }, { year: 2020, rate: 1.34 },
      { year: 2021, rate: 1.25 }, { year: 2022, rate: 1.30 }, { year: 2023, rate: 1.35 },
      { year: 2024, rate: 1.37 }, { year: 2025, rate: 1.44 },
    ],
  },
  'aud-usd': {
    pair: 'AUD/USD',
    baseCurrency: 'AUD',
    quoteCurrency: 'USD',
    baseCountryCode: 'au',
    quoteCountryCode: 'us',
    currentRate: 0.62,
    lastUpdated: '2025-01',
    description: 'Australian Dollar to US Dollar',
    data: [
      { year: 1970, rate: 1.12 }, { year: 1971, rate: 1.12 }, { year: 1972, rate: 1.19 },
      { year: 1973, rate: 1.42 }, { year: 1974, rate: 1.31 }, { year: 1975, rate: 1.30 },
      { year: 1976, rate: 1.22 }, { year: 1977, rate: 1.11 }, { year: 1978, rate: 1.14 },
      { year: 1979, rate: 1.12 }, { year: 1980, rate: 1.14 }, { year: 1981, rate: 1.15 },
      { year: 1982, rate: 1.02 }, { year: 1983, rate: 0.90 }, { year: 1984, rate: 0.88 },
      { year: 1985, rate: 0.70 }, { year: 1986, rate: 0.67 }, { year: 1987, rate: 0.70 },
      { year: 1988, rate: 0.78 }, { year: 1989, rate: 0.79 }, { year: 1990, rate: 0.78 },
      { year: 1991, rate: 0.78 }, { year: 1992, rate: 0.73 }, { year: 1993, rate: 0.68 },
      { year: 1994, rate: 0.73 }, { year: 1995, rate: 0.74 }, { year: 1996, rate: 0.78 },
      { year: 1997, rate: 0.74 }, { year: 1998, rate: 0.63 }, { year: 1999, rate: 0.65 },
      { year: 2000, rate: 0.58 }, { year: 2001, rate: 0.52 }, { year: 2002, rate: 0.54 },
      { year: 2003, rate: 0.65 }, { year: 2004, rate: 0.74 }, { year: 2005, rate: 0.76 },
      { year: 2006, rate: 0.75 }, { year: 2007, rate: 0.84 }, { year: 2008, rate: 0.85 },
      { year: 2009, rate: 0.79 }, { year: 2010, rate: 0.92 }, { year: 2011, rate: 1.03 },
      { year: 2012, rate: 1.04 }, { year: 2013, rate: 0.97 }, { year: 2014, rate: 0.90 },
      { year: 2015, rate: 0.75 }, { year: 2016, rate: 0.74 }, { year: 2017, rate: 0.77 },
      { year: 2018, rate: 0.75 }, { year: 2019, rate: 0.70 }, { year: 2020, rate: 0.69 },
      { year: 2021, rate: 0.75 }, { year: 2022, rate: 0.69 }, { year: 2023, rate: 0.66 },
      { year: 2024, rate: 0.66 }, { year: 2025, rate: 0.62 },
    ],
  },
  'eur-usd': {
    pair: 'EUR/USD',
    baseCurrency: 'EUR',
    quoteCurrency: 'USD',
    baseCountryCode: 'eu',
    quoteCountryCode: 'us',
    currentRate: 1.03,
    lastUpdated: '2025-01',
    description: 'Euro to US Dollar',
    data: [
      // Euro was introduced in 1999
      { year: 1999, rate: 1.07 }, { year: 2000, rate: 0.92 }, { year: 2001, rate: 0.90 },
      { year: 2002, rate: 0.95 }, { year: 2003, rate: 1.13 }, { year: 2004, rate: 1.24 },
      { year: 2005, rate: 1.24 }, { year: 2006, rate: 1.26 }, { year: 2007, rate: 1.37 },
      { year: 2008, rate: 1.47 }, { year: 2009, rate: 1.39 }, { year: 2010, rate: 1.33 },
      { year: 2011, rate: 1.39 }, { year: 2012, rate: 1.29 }, { year: 2013, rate: 1.33 },
      { year: 2014, rate: 1.33 }, { year: 2015, rate: 1.11 }, { year: 2016, rate: 1.11 },
      { year: 2017, rate: 1.13 }, { year: 2018, rate: 1.18 }, { year: 2019, rate: 1.12 },
      { year: 2020, rate: 1.14 }, { year: 2021, rate: 1.18 }, { year: 2022, rate: 1.05 },
      { year: 2023, rate: 1.08 }, { year: 2024, rate: 1.08 }, { year: 2025, rate: 1.03 },
    ],
  },
};

export function getFxRate(pair: string): FxRateInfo | null {
  return fxRates[pair.toLowerCase()] || null;
}

export function getAllFxRates(): FxRateInfo[] {
  return Object.values(fxRates);
}

export function getFxRatesByCountry(countryCode: string): FxRateInfo[] {
  const code = countryCode.toLowerCase();
  return Object.values(fxRates).filter(
    (rate) => rate.baseCountryCode === code || rate.quoteCountryCode === code
  );
}
