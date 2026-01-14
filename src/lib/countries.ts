import { Country } from '@/types';

export const countries: Record<string, Country> = {
  gb: {
    code: 'gb',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    defaultMortgageTermYears: 25,
    defaultDepositPct: 10,
    defaultRate: 4.5,
  },
  us: {
    code: 'us',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    defaultMortgageTermYears: 30,
    defaultDepositPct: 20,
    defaultRate: 6.5,
  },
  ca: {
    code: 'ca',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    locale: 'en-CA',
    defaultMortgageTermYears: 25,
    defaultDepositPct: 20,
    defaultRate: 5.0,
  },
  au: {
    code: 'au',
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    locale: 'en-AU',
    defaultMortgageTermYears: 30,
    defaultDepositPct: 20,
    defaultRate: 6.0,
  },
};

export const countryList = Object.values(countries);

export function getCountry(code: string): Country | undefined {
  return countries[code.toLowerCase()];
}

export function formatCurrency(amount: number, country: Country): string {
  return new Intl.NumberFormat(country.locale, {
    style: 'currency',
    currency: country.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyPrecise(amount: number, country: Country): string {
  return new Intl.NumberFormat(country.locale, {
    style: 'currency',
    currency: country.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
