'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cpiData, getAvailableYears } from '@/lib/calculations/inflation';
import { countries } from '@/lib/countries';
import MultiRateChart from '@/components/MultiRateChart';
import RateChart from '@/components/RateChart';

const countryColors: Record<string, string> = {
  gb: '#1d4ed8', // Blue
  us: '#dc2626', // Red
  ca: '#ea580c', // Orange
  au: '#059669', // Green
};

interface CountryInflationInfo {
  code: string;
  name: string;
  latestCpi: number;
  latestYear: number;
  latestInflation: number;
}

export default function InflationIndicesPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cpi' | 'yoy'>('yoy');

  // Calculate country summaries
  const countryInfo: CountryInflationInfo[] = Object.keys(cpiData).map((code) => {
    const years = getAvailableYears(code);
    const latestYear = years[years.length - 1];
    const prevYear = years[years.length - 2];
    const latestCpi = cpiData[code][latestYear];
    const prevCpi = cpiData[code][prevYear];
    const yoyInflation = ((latestCpi - prevCpi) / prevCpi) * 100;

    return {
      code,
      name: countries[code]?.name || code.toUpperCase(),
      latestCpi,
      latestYear,
      latestInflation: Math.round(yoyInflation * 10) / 10,
    };
  });

  // Build comparison data for all countries
  const comparisonData = useMemo(() => {
    const allYears = new Set<number>();
    Object.keys(cpiData).forEach((code) => {
      Object.keys(cpiData[code]).forEach((year) => allYears.add(parseInt(year)));
    });
    const sortedYears = Array.from(allYears).sort((a, b) => a - b);

    if (viewMode === 'cpi') {
      // Normalize CPI to base year 2000 = 100 for comparison
      const baseYear = 2000;
      const baseValues: Record<string, number> = {};
      Object.keys(cpiData).forEach((code) => {
        baseValues[code] = cpiData[code][baseYear] || cpiData[code][sortedYears[0]];
      });

      return sortedYears.map((year) => {
        const point: { year: number; [key: string]: number } = { year };
        Object.keys(cpiData).forEach((code) => {
          if (cpiData[code][year]) {
            point[code] = (cpiData[code][year] / baseValues[code]) * 100;
          }
        });
        return point;
      });
    } else {
      // Year-over-year inflation rate
      return sortedYears.slice(1).map((year, idx) => {
        const prevYear = sortedYears[idx];
        const point: { year: number; [key: string]: number } = { year };
        Object.keys(cpiData).forEach((code) => {
          if (cpiData[code][year] && cpiData[code][prevYear]) {
            const yoy = ((cpiData[code][year] - cpiData[code][prevYear]) / cpiData[code][prevYear]) * 100;
            point[code] = Math.round(yoy * 10) / 10;
          }
        });
        return point;
      });
    }
  }, [viewMode]);

  const series = countryInfo.map((info) => ({
    key: info.code,
    name: info.name,
    color: countryColors[info.code] || '#6b7280',
  }));

  // Single country data
  const selectedData = useMemo(() => {
    if (!selectedCountry) return null;
    const years = getAvailableYears(selectedCountry);

    if (viewMode === 'cpi') {
      const baseValue = cpiData[selectedCountry][2000] || cpiData[selectedCountry][years[0]];
      return years.map((year) => ({
        year,
        rate: (cpiData[selectedCountry][year] / baseValue) * 100,
      }));
    } else {
      return years.slice(1).map((year, idx) => {
        const prevYear = years[idx];
        const yoy = ((cpiData[selectedCountry][year] - cpiData[selectedCountry][prevYear]) / cpiData[selectedCountry][prevYear]) * 100;
        return { year, rate: Math.round(yoy * 10) / 10 };
      });
    }
  }, [selectedCountry, viewMode]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-amber-600 hover:underline text-sm">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inflation Indices
          </h1>
          <p className="text-gray-600">
            Historical Consumer Price Index (CPI) data and inflation rates
          </p>
        </div>

        {/* Current Inflation Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Inflation Rates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countryInfo.map((info) => (
              <button
                key={info.code}
                onClick={() =>
                  setSelectedCountry(
                    selectedCountry === info.code ? null : info.code
                  )
                }
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedCountry === info.code
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className="text-sm text-gray-600">{info.name}</p>
                <p className={`text-2xl font-bold ${info.latestInflation > 3 ? 'text-red-600' : info.latestInflation > 2 ? 'text-amber-600' : 'text-green-600'}`}>
                  {info.latestInflation > 0 ? '+' : ''}{info.latestInflation}%
                </p>
                <p className="text-xs text-gray-500">YoY Inflation ({info.latestYear})</p>
              </button>
            ))}
          </div>
        </section>

        {/* View Mode Toggle */}
        <section className="mb-6">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setViewMode('yoy')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'yoy'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Year-over-Year Inflation
            </button>
            <button
              onClick={() => setViewMode('cpi')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'cpi'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              CPI Index (2000=100)
            </button>
          </div>
        </section>

        {/* Comparison Chart */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {viewMode === 'yoy' ? 'Annual Inflation Rate Comparison' : 'CPI Index Comparison (Base: 2000=100)'}
          </h2>
          <MultiRateChart
            data={comparisonData}
            series={series}
            yAxisLabel={viewMode === 'yoy' ? 'Inflation Rate' : 'CPI Index'}
            valueSuffix={viewMode === 'yoy' ? '%' : ''}
          />
        </section>

        {/* Individual Country Detail */}
        {selectedCountry && selectedData && (
          <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {countries[selectedCountry]?.name || selectedCountry.toUpperCase()} - {viewMode === 'yoy' ? 'Annual Inflation' : 'CPI Index'}
            </h2>
            <RateChart
              data={selectedData}
              color={countryColors[selectedCountry]}
              yAxisLabel={viewMode === 'yoy' ? 'Inflation %' : 'CPI Index'}
              valueSuffix={viewMode === 'yoy' ? '%' : ''}
            />
          </section>
        )}

        {/* Data Table */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {viewMode === 'yoy' ? 'Annual Inflation Rates' : 'CPI Index Values'}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                  {countryInfo.map((info) => (
                    <th
                      key={info.code}
                      className="text-right py-3 px-4 font-semibold text-gray-900"
                    >
                      {info.name}
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
                      {countryInfo.map((info) => {
                        const value = row[info.code];
                        return (
                          <td
                            key={info.code}
                            className={`text-right py-2 px-4 ${
                              viewMode === 'yoy' && value !== undefined
                                ? value > 5
                                  ? 'text-red-600'
                                  : value > 3
                                  ? 'text-amber-600'
                                  : 'text-gray-700'
                                : 'text-gray-700'
                            }`}
                          >
                            {value !== undefined
                              ? viewMode === 'yoy'
                                ? `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
                                : value.toFixed(1)
                              : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Showing most recent 20 years. Sources: ONS (UK), BLS (US), StatCan (Canada), ABS (Australia).
          </p>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            CPI data represents annual averages. Year-over-year inflation shows percentage change from previous year.
          </p>
        </footer>
      </main>
    </div>
  );
}
