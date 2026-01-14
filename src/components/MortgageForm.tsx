'use client';

import { useState } from 'react';
import { MortgageInputs, Country } from '@/types';

interface MortgageFormProps {
  country: Country;
  initialValues?: Partial<MortgageInputs>;
  onCalculate: (inputs: MortgageInputs) => void;
}

export default function MortgageForm({ country, initialValues, onCalculate }: MortgageFormProps) {
  const [propertyPrice, setPropertyPrice] = useState(
    initialValues?.propertyPrice?.toString() || '300000'
  );
  const [deposit, setDeposit] = useState(
    initialValues?.deposit?.toString() || country.defaultDepositPct.toString()
  );
  const [depositType, setDepositType] = useState<'amount' | 'percentage'>(
    initialValues?.depositType || 'percentage'
  );
  const [interestRate, setInterestRate] = useState(
    initialValues?.interestRate?.toString() || country.defaultRate.toString()
  );
  const [termYears, setTermYears] = useState(
    initialValues?.termYears?.toString() || country.defaultMortgageTermYears.toString()
  );
  const [monthlyOverpayment, setMonthlyOverpayment] = useState(
    initialValues?.monthlyOverpayment?.toString() || '0'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      propertyPrice: parseFloat(propertyPrice) || 0,
      deposit: parseFloat(deposit) || 0,
      depositType,
      interestRate: parseFloat(interestRate) || 0,
      termYears: parseInt(termYears) || 25,
      monthlyOverpayment: parseFloat(monthlyOverpayment) || 0,
    });
  };

  const depositAmount = depositType === 'percentage'
    ? (parseFloat(propertyPrice) || 0) * (parseFloat(deposit) || 0) / 100
    : parseFloat(deposit) || 0;

  const loanAmount = (parseFloat(propertyPrice) || 0) - depositAmount;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-700 mb-1">
          Property Price ({country.currencySymbol})
        </label>
        <input
          type="number"
          id="propertyPrice"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
          min="0"
          step="1000"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deposit
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            min="0"
            step={depositType === 'percentage' ? '1' : '1000'}
            required
          />
          <select
            value={depositType}
            onChange={(e) => setDepositType(e.target.value as 'amount' | 'percentage')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
          >
            <option value="percentage">%</option>
            <option value="amount">{country.currencySymbol}</option>
          </select>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Loan amount: {country.currencySymbol}{loanAmount.toLocaleString()}
        </p>
      </div>

      <div>
        <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
          Interest Rate (% per year)
        </label>
        <input
          type="number"
          id="interestRate"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
          min="0"
          max="30"
          step="0.1"
          required
        />
      </div>

      <div>
        <label htmlFor="termYears" className="block text-sm font-medium text-gray-700 mb-1">
          Mortgage Term (years)
        </label>
        <input
          type="number"
          id="termYears"
          value={termYears}
          onChange={(e) => setTermYears(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
          min="1"
          max="40"
          step="1"
          required
        />
      </div>

      <div>
        <label htmlFor="monthlyOverpayment" className="block text-sm font-medium text-gray-700 mb-1">
          Monthly Overpayment ({country.currencySymbol}) - Optional
        </label>
        <input
          type="number"
          id="monthlyOverpayment"
          value={monthlyOverpayment}
          onChange={(e) => setMonthlyOverpayment(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
          min="0"
          step="50"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
      >
        Calculate
      </button>
    </form>
  );
}
