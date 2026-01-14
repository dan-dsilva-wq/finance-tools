'use client';

import { SavingsResults as SavingsResultsType, Country } from '@/types';
import { formatCurrency } from '@/lib/countries';

interface SavingsResultsProps {
  results: SavingsResultsType;
  country: Country;
}

export default function SavingsResults({ results, country }: SavingsResultsProps) {
  const { finalBalance, totalContributions, totalInterestEarned } = results;

  const interestPercentage = totalContributions > 0
    ? ((totalInterestEarned / totalContributions) * 100).toFixed(1)
    : '0';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Results</h2>

      <div className="text-center mb-8 p-6 bg-green-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Final Balance</p>
        <p className="text-4xl font-bold text-green-600">
          {formatCurrency(finalBalance, country)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Contributions</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalContributions, country)}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Interest Earned</p>
          <p className="text-lg font-semibold text-green-600">
            {formatCurrency(totalInterestEarned, country)}
          </p>
        </div>

        <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Interest as % of Contributions</p>
          <p className="text-lg font-semibold text-gray-900">
            {interestPercentage}%
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>The power of compound interest:</strong> Your contributions of {formatCurrency(totalContributions, country)} grew
          by {formatCurrency(totalInterestEarned, country)} through compound interest alone.
        </p>
      </div>
    </div>
  );
}
