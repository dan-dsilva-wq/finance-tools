'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAllPolicyRates, PolicyRateInfo } from '@/lib/data/policyRates';
import RateChart from '@/components/RateChart';
import MultiRateChart from '@/components/MultiRateChart';

const countryColors: Record<string, string> = {
  gb: '#1d4ed8', // Blue
  us: '#dc2626', // Red
  ca: '#ea580c', // Orange
  au: '#059669', // Green
};

export default function PolicyRatesPage() {
  const allRates = getAllPolicyRates();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Build comparison data - align all countries by year
  const years = new Set<number>();
  allRates.forEach((rate) => {
    rate.data.forEach((d) => years.add(d.year));
  });
  const sortedYears = Array.from(years).sort((a, b) => a - b);

  const comparisonData = sortedYears.map((year) => {
    const point: { year: number; [key: string]: number } = { year };
    allRates.forEach((rate) => {
      const yearData = rate.data.find((d) => d.year === year);
      if (yearData) {
        point[rate.countryCode] = yearData.rate;
      }
    });
    return point;
  });

  const series = allRates.map((rate) => ({
    key: rate.countryCode,
    name: rate.countryName,
    color: countryColors[rate.countryCode] || '#6b7280',
  }));

  const selectedRate = selectedCountry
    ? allRates.find((r) => r.countryCode === selectedCountry)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Central Bank Policy Rates
          </h1>
          <p className="text-gray-600">
            Historical interest rates set by major central banks
          </p>
        </div>

        {/* Current Rates Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Rates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allRates.map((rate) => (
              <button
                key={rate.countryCode}
                onClick={() =>
                  setSelectedCountry(
                    selectedCountry === rate.countryCode ? null : rate.countryCode
                  )
                }
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedCountry === rate.countryCode
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className="text-sm text-gray-600">{rate.countryName}</p>
                <p className="text-2xl font-bold text-gray-900">{rate.currentRate}%</p>
                <p className="text-xs text-gray-500">{rate.rateName}</p>
                <p className="text-xs text-gray-400">Updated: {rate.lastUpdated}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Comparison Chart */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Historical Comparison (1970-2025)
          </h2>
          <MultiRateChart
            data={comparisonData}
            series={series}
            yAxisLabel="Interest Rate"
            valueSuffix="%"
          />
        </section>

        {/* Individual Country Detail */}
        {selectedRate && (
          <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedRate.countryName} - {selectedRate.rateName}
            </h2>
            <p className="text-gray-600 mb-4">
              Set by the {selectedRate.bankName}
            </p>
            <RateChart
              data={selectedRate.data}
              color={countryColors[selectedRate.countryCode]}
              yAxisLabel="Rate"
              valueSuffix="%"
              showCurrentRate={selectedRate.currentRate}
            />
          </section>
        )}

        {/* Data Table */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Rate History Table
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                  {allRates.map((rate) => (
                    <th
                      key={rate.countryCode}
                      className="text-right py-3 px-4 font-semibold text-gray-900"
                    >
                      {rate.countryName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedYears
                  .slice()
                  .reverse()
                  .slice(0, 20)
                  .map((year) => (
                    <tr key={year} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-4 text-gray-900 font-medium">{year}</td>
                      {allRates.map((rate) => {
                        const yearData = rate.data.find((d) => d.year === year);
                        return (
                          <td
                            key={rate.countryCode}
                            className="text-right py-2 px-4 text-gray-700"
                          >
                            {yearData ? `${yearData.rate.toFixed(2)}%` : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Showing most recent 20 years. Data represents annual averages.
          </p>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Data sources: Bank of England, Federal Reserve, Bank of Canada, Reserve Bank of Australia.
            Annual averages shown.
          </p>
        </footer>
      </main>
    </div>
  );
}
