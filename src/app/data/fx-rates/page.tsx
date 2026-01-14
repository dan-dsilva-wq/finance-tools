'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllFxRates, FxRateInfo } from '@/lib/data/fxRates';
import RateChart from '@/components/RateChart';
import MultiRateChart from '@/components/MultiRateChart';

const pairColors: Record<string, string> = {
  'gbp-usd': '#1d4ed8', // Blue
  'usd-cad': '#ea580c', // Orange
  'aud-usd': '#059669', // Green
  'eur-usd': '#7c3aed', // Purple
};

export default function FxRatesPage() {
  const allRates = getAllFxRates();
  const [selectedPair, setSelectedPair] = useState<string | null>(null);

  // Build comparison data - align all pairs by year
  const comparisonData = useMemo(() => {
    const years = new Set<number>();
    allRates.forEach((rate) => {
      rate.data.forEach((d) => years.add(d.year));
    });
    const sortedYears = Array.from(years).sort((a, b) => a - b);

    return sortedYears.map((year) => {
      const point: { year: number; [key: string]: number } = { year };
      allRates.forEach((rate) => {
        const yearData = rate.data.find((d) => d.year === year);
        if (yearData) {
          point[rate.pair.toLowerCase().replace('/', '-')] = yearData.rate;
        }
      });
      return point;
    });
  }, [allRates]);

  const series = allRates.map((rate) => {
    const key = rate.pair.toLowerCase().replace('/', '-');
    return {
      key,
      name: rate.pair,
      color: pairColors[key] || '#6b7280',
    };
  });

  const selectedRate = selectedPair
    ? allRates.find((r) => r.pair.toLowerCase().replace('/', '-') === selectedPair)
    : null;

  // Calculate YTD change for each pair
  const getYtdChange = (rate: FxRateInfo): number => {
    const data = rate.data;
    if (data.length < 2) return 0;
    const current = data[data.length - 1].rate;
    const prev = data[data.length - 2].rate;
    return ((current - prev) / prev) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-purple-600 hover:underline text-sm">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Foreign Exchange Rates
          </h1>
          <p className="text-gray-600">
            Historical exchange rates for major currency pairs
          </p>
        </div>

        {/* Current Rates Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Rates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allRates.map((rate) => {
              const key = rate.pair.toLowerCase().replace('/', '-');
              const ytdChange = getYtdChange(rate);
              return (
                <button
                  key={key}
                  onClick={() =>
                    setSelectedPair(selectedPair === key ? null : key)
                  }
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedPair === key
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className="text-sm text-gray-600">{rate.description}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {rate.currentRate.toFixed(4)}
                  </p>
                  <p className="text-sm font-medium text-gray-700">{rate.pair}</p>
                  <p className={`text-xs ${ytdChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {ytdChange >= 0 ? '+' : ''}{ytdChange.toFixed(1)}% YoY
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Comparison Chart */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Historical Exchange Rates
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Note: Different currency pairs have different scales. Select individual pairs below for detailed view.
          </p>
          <MultiRateChart
            data={comparisonData}
            series={series}
            yAxisLabel="Exchange Rate"
            valueSuffix=""
          />
        </section>

        {/* Individual Pair Detail */}
        {selectedRate && (
          <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedRate.pair} - {selectedRate.description}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              {selectedRate.baseCurrency === 'GBP' || selectedRate.baseCurrency === 'AUD' || selectedRate.baseCurrency === 'EUR'
                ? `1 ${selectedRate.baseCurrency} = X ${selectedRate.quoteCurrency}`
                : `1 ${selectedRate.baseCurrency} = X ${selectedRate.quoteCurrency}`}
            </p>
            <RateChart
              data={selectedRate.data}
              color={pairColors[selectedRate.pair.toLowerCase().replace('/', '-')] || '#6b7280'}
              yAxisLabel="Rate"
              valueSuffix=""
              showCurrentRate={selectedRate.currentRate}
            />
          </section>
        )}

        {/* Data Table */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Exchange Rate History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                  {allRates.map((rate) => (
                    <th
                      key={rate.pair}
                      className="text-right py-3 px-4 font-semibold text-gray-900"
                    >
                      {rate.pair}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData
                  .slice()
                  .reverse()
                  .slice(0, 20)
                  .map((row) => (
                    <tr key={row.year} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-4 text-gray-900 font-medium">{row.year}</td>
                      {allRates.map((rate) => {
                        const key = rate.pair.toLowerCase().replace('/', '-');
                        const value = row[key];
                        return (
                          <td
                            key={rate.pair}
                            className="text-right py-2 px-4 text-gray-700"
                          >
                            {value !== undefined ? value.toFixed(4) : '-'}
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
            Data sources: Federal Reserve, Bank of England, Bank of Canada, Reserve Bank of Australia.
            EUR/USD data available from 1999 (Euro introduction).
          </p>
        </footer>
      </main>
    </div>
  );
}
