'use client';

import { useState } from 'react';
import { SavingsInputs, Country } from '@/types';

interface SavingsFormProps {
  country: Country;
  initialValues?: Partial<SavingsInputs>;
  onCalculate: (inputs: SavingsInputs) => void;
}

export default function SavingsForm({ country, initialValues, onCalculate }: SavingsFormProps) {
  const [initialDeposit, setInitialDeposit] = useState(
    initialValues?.initialDeposit?.toString() || '1000'
  );
  const [monthlyContribution, setMonthlyContribution] = useState(
    initialValues?.monthlyContribution?.toString() || '200'
  );
  const [annualInterestRate, setAnnualInterestRate] = useState(
    initialValues?.annualInterestRate?.toString() || '5'
  );
  const [years, setYears] = useState(
    initialValues?.years?.toString() || '10'
  );
  const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'quarterly' | 'annually'>(
    initialValues?.compoundingFrequency || 'monthly'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      initialDeposit: parseFloat(initialDeposit) || 0,
      monthlyContribution: parseFloat(monthlyContribution) || 0,
      annualInterestRate: parseFloat(annualInterestRate) || 0,
      years: parseInt(years) || 10,
      compoundingFrequency,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="initialDeposit" className="block text-sm font-medium text-gray-700 mb-1">
          Initial Deposit ({country.currencySymbol})
        </label>
        <input
          type="number"
          id="initialDeposit"
          value={initialDeposit}
          onChange={(e) => setInitialDeposit(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
          min="0"
          step="100"
          required
        />
      </div>

      <div>
        <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700 mb-1">
          Monthly Contribution ({country.currencySymbol})
        </label>
        <input
          type="number"
          id="monthlyContribution"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
          min="0"
          step="50"
          required
        />
      </div>

      <div>
        <label htmlFor="annualInterestRate" className="block text-sm font-medium text-gray-700 mb-1">
          Annual Interest Rate (%)
        </label>
        <input
          type="number"
          id="annualInterestRate"
          value={annualInterestRate}
          onChange={(e) => setAnnualInterestRate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
          min="0"
          max="30"
          step="0.1"
          required
        />
      </div>

      <div>
        <label htmlFor="years" className="block text-sm font-medium text-gray-700 mb-1">
          Time Period (years)
        </label>
        <input
          type="number"
          id="years"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
          min="1"
          max="50"
          step="1"
          required
        />
      </div>

      <div>
        <label htmlFor="compoundingFrequency" className="block text-sm font-medium text-gray-700 mb-1">
          Compounding Frequency
        </label>
        <select
          id="compoundingFrequency"
          value={compoundingFrequency}
          onChange={(e) => setCompoundingFrequency(e.target.value as 'monthly' | 'quarterly' | 'annually')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annually">Annually</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium transition-colors"
      >
        Calculate
      </button>
    </form>
  );
}
