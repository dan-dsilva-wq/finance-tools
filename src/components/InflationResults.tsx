'use client';

import { InflationResults as InflationResultsType, Country } from '@/types';
import { formatCurrency } from '@/lib/countries';

interface InflationResultsProps {
  results: InflationResultsType;
  country: Country;
  originalAmount: number;
}

export default function InflationResults({ results, country, originalAmount }: InflationResultsProps) {
  const { adjustedAmount, percentageChange, fromYear, toYear } = results;
  const isIncrease = percentageChange > 0;
  const yearsDiff = Math.abs(toYear - fromYear);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Results</h2>

      <div className="text-center mb-8 p-6 bg-amber-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">
          {formatCurrency(originalAmount, country)} in {fromYear} equals
        </p>
        <p className="text-4xl font-bold text-amber-600">
          {formatCurrency(adjustedAmount, country)}
        </p>
        <p className="text-sm text-gray-600 mt-1">in {toYear}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Inflation</p>
          <p className={`text-lg font-semibold ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
            {isIncrease ? '+' : ''}{percentageChange}%
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Time Period</p>
          <p className="text-lg font-semibold text-gray-900">
            {yearsDiff} year{yearsDiff !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Avg. Annual Inflation</p>
          <p className="text-lg font-semibold text-gray-900">
            {yearsDiff > 0 ? (percentageChange / yearsDiff).toFixed(1) : 0}%
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Purchasing Power Change</p>
          <p className={`text-lg font-semibold ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
            {isIncrease ? '-' : '+'}{Math.abs(Math.round((1 - originalAmount / adjustedAmount) * 100))}%
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>What this means:</strong> {formatCurrency(originalAmount, country)} in {fromYear} had
          the same buying power as {formatCurrency(adjustedAmount, country)} in {toYear}.
          {isIncrease && ` Your money's purchasing power decreased by ${Math.round((1 - originalAmount / adjustedAmount) * 100)}% over this period.`}
        </p>
      </div>
    </div>
  );
}
