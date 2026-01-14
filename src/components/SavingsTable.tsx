'use client';

import { useState } from 'react';
import { SavingsYearRow, Country } from '@/types';
import { formatCurrency } from '@/lib/countries';

interface SavingsTableProps {
  schedule: SavingsYearRow[];
  country: Country;
}

export default function SavingsTable({ schedule, country }: SavingsTableProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleData = expanded ? schedule : schedule.slice(0, 10);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Year-by-Year Breakdown</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-600">Year</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Start Balance</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Contributions</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Interest</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">End Balance</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr
                key={row.year}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-2 px-2 text-gray-900">{row.year}</td>
                <td className="py-2 px-2 text-right text-gray-900">
                  {formatCurrency(row.startBalance, country)}
                </td>
                <td className="py-2 px-2 text-right text-gray-900">
                  {formatCurrency(row.contributions, country)}
                </td>
                <td className="py-2 px-2 text-right text-green-600">
                  {formatCurrency(row.interestEarned, country)}
                </td>
                <td className="py-2 px-2 text-right font-medium text-gray-900">
                  {formatCurrency(row.endBalance, country)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 10 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full py-2 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          {expanded ? 'Show Less' : `Show All ${schedule.length} Years`}
        </button>
      )}
    </div>
  );
}
