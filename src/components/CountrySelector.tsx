'use client';

import Link from 'next/link';
import { countryList } from '@/lib/countries';

interface CountrySelectorProps {
  basePath?: string;
  currentCountry?: string;
}

const flagEmojis: Record<string, string> = {
  gb: '🇬🇧',
  us: '🇺🇸',
  ca: '🇨🇦',
  au: '🇦🇺',
};

export default function CountrySelector({ basePath = '', currentCountry }: CountrySelectorProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {countryList.map((country) => {
        const isSelected = currentCountry === country.code;
        const href = basePath ? `${basePath}/${country.code}` : `/${country.code}`;

        return (
          <Link
            key={country.code}
            href={href}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow border border-gray-200'
            }`}
          >
            <span className="text-xl">{flagEmojis[country.code]}</span>
            <span className="font-medium">{country.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
