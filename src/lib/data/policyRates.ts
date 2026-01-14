// Historical central bank policy rates (annual averages)
// Sources: Bank of England, Federal Reserve, Bank of Canada, Reserve Bank of Australia

export interface PolicyRateData {
  year: number;
  rate: number;
}

export interface PolicyRateInfo {
  countryCode: string;
  countryName: string;
  bankName: string;
  rateName: string;
  currentRate: number;
  lastUpdated: string;
  data: PolicyRateData[];
}

export const policyRates: Record<string, PolicyRateInfo> = {
  gb: {
    countryCode: 'gb',
    countryName: 'United Kingdom',
    bankName: 'Bank of England',
    rateName: 'Bank Rate',
    currentRate: 4.5,
    lastUpdated: '2025-01',
    data: [
      { year: 1970, rate: 7.0 }, { year: 1971, rate: 5.5 }, { year: 1972, rate: 5.5 },
      { year: 1973, rate: 9.0 }, { year: 1974, rate: 11.5 }, { year: 1975, rate: 11.0 },
      { year: 1976, rate: 11.5 }, { year: 1977, rate: 8.0 }, { year: 1978, rate: 9.0 },
      { year: 1979, rate: 14.0 }, { year: 1980, rate: 16.0 }, { year: 1981, rate: 13.0 },
      { year: 1982, rate: 11.0 }, { year: 1983, rate: 9.5 }, { year: 1984, rate: 9.5 },
      { year: 1985, rate: 12.0 }, { year: 1986, rate: 11.0 }, { year: 1987, rate: 9.0 },
      { year: 1988, rate: 10.0 }, { year: 1989, rate: 14.0 }, { year: 1990, rate: 14.0 },
      { year: 1991, rate: 11.5 }, { year: 1992, rate: 9.5 }, { year: 1993, rate: 6.0 },
      { year: 1994, rate: 5.5 }, { year: 1995, rate: 6.5 }, { year: 1996, rate: 6.0 },
      { year: 1997, rate: 6.5 }, { year: 1998, rate: 7.0 }, { year: 1999, rate: 5.5 },
      { year: 2000, rate: 6.0 }, { year: 2001, rate: 5.0 }, { year: 2002, rate: 4.0 },
      { year: 2003, rate: 3.75 }, { year: 2004, rate: 4.5 }, { year: 2005, rate: 4.5 },
      { year: 2006, rate: 4.75 }, { year: 2007, rate: 5.5 }, { year: 2008, rate: 4.5 },
      { year: 2009, rate: 0.5 }, { year: 2010, rate: 0.5 }, { year: 2011, rate: 0.5 },
      { year: 2012, rate: 0.5 }, { year: 2013, rate: 0.5 }, { year: 2014, rate: 0.5 },
      { year: 2015, rate: 0.5 }, { year: 2016, rate: 0.25 }, { year: 2017, rate: 0.25 },
      { year: 2018, rate: 0.75 }, { year: 2019, rate: 0.75 }, { year: 2020, rate: 0.1 },
      { year: 2021, rate: 0.1 }, { year: 2022, rate: 2.25 }, { year: 2023, rate: 4.75 },
      { year: 2024, rate: 5.0 }, { year: 2025, rate: 4.5 },
    ],
  },
  us: {
    countryCode: 'us',
    countryName: 'United States',
    bankName: 'Federal Reserve',
    rateName: 'Federal Funds Rate',
    currentRate: 4.5,
    lastUpdated: '2025-01',
    data: [
      { year: 1970, rate: 7.2 }, { year: 1971, rate: 4.7 }, { year: 1972, rate: 4.4 },
      { year: 1973, rate: 8.7 }, { year: 1974, rate: 10.5 }, { year: 1975, rate: 5.8 },
      { year: 1976, rate: 5.1 }, { year: 1977, rate: 5.5 }, { year: 1978, rate: 7.9 },
      { year: 1979, rate: 11.2 }, { year: 1980, rate: 13.4 }, { year: 1981, rate: 16.4 },
      { year: 1982, rate: 12.2 }, { year: 1983, rate: 9.1 }, { year: 1984, rate: 10.2 },
      { year: 1985, rate: 8.1 }, { year: 1986, rate: 6.8 }, { year: 1987, rate: 6.7 },
      { year: 1988, rate: 7.6 }, { year: 1989, rate: 9.2 }, { year: 1990, rate: 8.1 },
      { year: 1991, rate: 5.7 }, { year: 1992, rate: 3.5 }, { year: 1993, rate: 3.0 },
      { year: 1994, rate: 4.2 }, { year: 1995, rate: 5.8 }, { year: 1996, rate: 5.3 },
      { year: 1997, rate: 5.5 }, { year: 1998, rate: 5.4 }, { year: 1999, rate: 5.0 },
      { year: 2000, rate: 6.2 }, { year: 2001, rate: 3.9 }, { year: 2002, rate: 1.7 },
      { year: 2003, rate: 1.1 }, { year: 2004, rate: 1.4 }, { year: 2005, rate: 3.2 },
      { year: 2006, rate: 5.0 }, { year: 2007, rate: 5.0 }, { year: 2008, rate: 1.9 },
      { year: 2009, rate: 0.2 }, { year: 2010, rate: 0.2 }, { year: 2011, rate: 0.1 },
      { year: 2012, rate: 0.1 }, { year: 2013, rate: 0.1 }, { year: 2014, rate: 0.1 },
      { year: 2015, rate: 0.1 }, { year: 2016, rate: 0.4 }, { year: 2017, rate: 1.0 },
      { year: 2018, rate: 1.8 }, { year: 2019, rate: 2.2 }, { year: 2020, rate: 0.4 },
      { year: 2021, rate: 0.1 }, { year: 2022, rate: 1.7 }, { year: 2023, rate: 5.0 },
      { year: 2024, rate: 5.3 }, { year: 2025, rate: 4.5 },
    ],
  },
  ca: {
    countryCode: 'ca',
    countryName: 'Canada',
    bankName: 'Bank of Canada',
    rateName: 'Overnight Rate',
    currentRate: 3.25,
    lastUpdated: '2025-01',
    data: [
      { year: 1970, rate: 6.0 }, { year: 1971, rate: 4.75 }, { year: 1972, rate: 4.75 },
      { year: 1973, rate: 5.5 }, { year: 1974, rate: 8.75 }, { year: 1975, rate: 9.0 },
      { year: 1976, rate: 9.25 }, { year: 1977, rate: 7.5 }, { year: 1978, rate: 8.5 },
      { year: 1979, rate: 11.75 }, { year: 1980, rate: 13.0 }, { year: 1981, rate: 17.9 },
      { year: 1982, rate: 13.9 }, { year: 1983, rate: 9.5 }, { year: 1984, rate: 10.1 },
      { year: 1985, rate: 9.5 }, { year: 1986, rate: 9.0 }, { year: 1987, rate: 8.4 },
      { year: 1988, rate: 9.5 }, { year: 1989, rate: 12.3 }, { year: 1990, rate: 13.0 },
      { year: 1991, rate: 9.0 }, { year: 1992, rate: 6.8 }, { year: 1993, rate: 5.1 },
      { year: 1994, rate: 5.5 }, { year: 1995, rate: 7.3 }, { year: 1996, rate: 4.5 },
      { year: 1997, rate: 3.5 }, { year: 1998, rate: 5.0 }, { year: 1999, rate: 4.75 },
      { year: 2000, rate: 5.75 }, { year: 2001, rate: 4.0 }, { year: 2002, rate: 2.5 },
      { year: 2003, rate: 3.0 }, { year: 2004, rate: 2.5 }, { year: 2005, rate: 2.75 },
      { year: 2006, rate: 4.25 }, { year: 2007, rate: 4.5 }, { year: 2008, rate: 3.0 },
      { year: 2009, rate: 0.25 }, { year: 2010, rate: 0.75 }, { year: 2011, rate: 1.0 },
      { year: 2012, rate: 1.0 }, { year: 2013, rate: 1.0 }, { year: 2014, rate: 1.0 },
      { year: 2015, rate: 0.75 }, { year: 2016, rate: 0.5 }, { year: 2017, rate: 0.75 },
      { year: 2018, rate: 1.5 }, { year: 2019, rate: 1.75 }, { year: 2020, rate: 0.5 },
      { year: 2021, rate: 0.25 }, { year: 2022, rate: 2.5 }, { year: 2023, rate: 4.75 },
      { year: 2024, rate: 4.5 }, { year: 2025, rate: 3.25 },
    ],
  },
  au: {
    countryCode: 'au',
    countryName: 'Australia',
    bankName: 'Reserve Bank of Australia',
    rateName: 'Cash Rate',
    currentRate: 4.35,
    lastUpdated: '2025-01',
    data: [
      { year: 1970, rate: 5.0 }, { year: 1971, rate: 5.25 }, { year: 1972, rate: 4.75 },
      { year: 1973, rate: 5.5 }, { year: 1974, rate: 8.5 }, { year: 1975, rate: 8.0 },
      { year: 1976, rate: 8.5 }, { year: 1977, rate: 8.75 }, { year: 1978, rate: 8.0 },
      { year: 1979, rate: 9.5 }, { year: 1980, rate: 10.5 }, { year: 1981, rate: 12.5 },
      { year: 1982, rate: 14.5 }, { year: 1983, rate: 11.5 }, { year: 1984, rate: 11.5 },
      { year: 1985, rate: 15.5 }, { year: 1986, rate: 16.5 }, { year: 1987, rate: 14.0 },
      { year: 1988, rate: 12.5 }, { year: 1989, rate: 17.0 }, { year: 1990, rate: 15.0 },
      { year: 1991, rate: 10.5 }, { year: 1992, rate: 6.5 }, { year: 1993, rate: 5.25 },
      { year: 1994, rate: 5.5 }, { year: 1995, rate: 7.5 }, { year: 1996, rate: 7.0 },
      { year: 1997, rate: 5.5 }, { year: 1998, rate: 5.0 }, { year: 1999, rate: 4.75 },
      { year: 2000, rate: 6.0 }, { year: 2001, rate: 5.0 }, { year: 2002, rate: 4.75 },
      { year: 2003, rate: 4.75 }, { year: 2004, rate: 5.25 }, { year: 2005, rate: 5.5 },
      { year: 2006, rate: 5.75 }, { year: 2007, rate: 6.5 }, { year: 2008, rate: 6.0 },
      { year: 2009, rate: 3.25 }, { year: 2010, rate: 4.5 }, { year: 2011, rate: 4.75 },
      { year: 2012, rate: 3.5 }, { year: 2013, rate: 2.75 }, { year: 2014, rate: 2.5 },
      { year: 2015, rate: 2.0 }, { year: 2016, rate: 1.5 }, { year: 2017, rate: 1.5 },
      { year: 2018, rate: 1.5 }, { year: 2019, rate: 1.0 }, { year: 2020, rate: 0.25 },
      { year: 2021, rate: 0.1 }, { year: 2022, rate: 1.5 }, { year: 2023, rate: 4.0 },
      { year: 2024, rate: 4.35 }, { year: 2025, rate: 4.35 },
    ],
  },
};

export function getPolicyRate(countryCode: string): PolicyRateInfo | null {
  return policyRates[countryCode.toLowerCase()] || null;
}

export function getAllPolicyRates(): PolicyRateInfo[] {
  return Object.values(policyRates);
}
