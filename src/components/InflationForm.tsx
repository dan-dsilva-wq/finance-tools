'use client';

import { useState } from 'react';
import { InflationInputs, Country } from '@/types';
import { getAvailableYears, getLatestYear } from '@/lib/calculations/inflation';

interface InflationFormProps {
  country: Country;
  initialValues?: Partial<InflationInputs>;
  onCalculate: (inputs: InflationInputs) => void;
}

export default function InflationForm({ country, initialValues, onCalculate }: InflationFormProps) {
  const availableYears = getAvailableYears(country.code);
  const latestYear = getLatestYear(country.code);

  const [amount, setAmount] = useState(
    initialValues?.amount?.toString() || '100'
  );
  const [fromYear, setFromYear] = useState(
    initialValues?.fromYear?.toString() || '2000'
  );
  const [toYear, setToYear] = useState(
    initialValues?.toYear?.toString() || latestYear.toString()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      amount: parseFloat(amount) || 0,
      fromYear: parseInt(fromYear),
      toYear: parseInt(toYear),
    });
  };

  const handleSwapYears = () => {
    const temp = fromYear;
    setFromYear(toYear);
    setToYear(temp);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount ({country.currencySymbol})
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white"
          min="0"
          step="any"
          required
        />
      </div>

      <div>
        <label htmlFor="fromYear" className="block text-sm font-medium text-gray-700 mb-1">
          From Year
        </label>
        <select
          id="fromYear"
          value={fromYear}
          onChange={(e) => setFromYear(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSwapYears}
          className="p-2 text-gray-500 hover:text-amber-600 transition-colors"
          title="Swap years"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      <div>
        <label htmlFor="toYear" className="block text-sm font-medium text-gray-700 mb-1">
          To Year
        </label>
        <select
          id="toYear"
          value={toYear}
          onChange={(e) => setToYear(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-3 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 font-medium transition-colors"
      >
        Calculate
      </button>
    </form>
  );
}
