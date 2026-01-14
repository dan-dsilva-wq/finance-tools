'use client';

import { useState } from 'react';
import { AmortizationRow, Country } from '@/types';
import { formatCurrencyPrecise } from '@/lib/countries';

interface AmortizationTableProps {
  schedule: AmortizationRow[];
  country: Country;
}

type ViewMode = 'monthly' | 'yearly';

export default function AmortizationTable({ schedule, country }: AmortizationTableProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('yearly');
  const [expanded, setExpanded] = useState(false);

  const yearlySchedule = schedule.reduce((acc, row) => {
    const year = Math.ceil(row.month / 12);
    if (!acc[year]) {
      acc[year] = {
        year,
        payment: 0,
        interest: 0,
        principal: 0,
        balance: row.balance,
      };
    }
    acc[year].payment += row.payment;
    acc[year].interest += row.interest;
    acc[year].principal += row.principal;
    acc[year].balance = row.balance;
    return acc;
  }, {} as Record<number, { year: number; payment: number; interest: number; principal: number; balance: number }>);

  const displayData = viewMode === 'yearly'
    ? Object.values(yearlySchedule)
    : schedule;

  const visibleData = expanded ? displayData : displayData.slice(0, 10);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Amortization Schedule</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('yearly')}
            className={`px-3 py-1 text-sm rounded-md ${
              viewMode === 'yearly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Yearly
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-3 py-1 text-sm rounded-md ${
              viewMode === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-600">
                {viewMode === 'yearly' ? 'Year' : 'Month'}
              </th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Payment</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Interest</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Principal</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Balance</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr
                key={viewMode === 'yearly' ? (row as typeof yearlySchedule[number]).year : (row as AmortizationRow).month}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-2 px-2 text-gray-900">
                  {viewMode === 'yearly' ? (row as typeof yearlySchedule[number]).year : (row as AmortizationRow).month}
                </td>
                <td className="py-2 px-2 text-right text-gray-900">
                  {formatCurrencyPrecise(row.payment, country)}
                </td>
                <td className="py-2 px-2 text-right text-gray-900">
                  {formatCurrencyPrecise(row.interest, country)}
                </td>
                <td className="py-2 px-2 text-right text-gray-900">
                  {formatCurrencyPrecise(row.principal, country)}
                </td>
                <td className="py-2 px-2 text-right text-gray-900">
                  {formatCurrencyPrecise(row.balance, country)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {displayData.length > 10 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {expanded ? 'Show Less' : `Show All ${displayData.length} ${viewMode === 'yearly' ? 'Years' : 'Months'}`}
        </button>
      )}
    </div>
  );
}
