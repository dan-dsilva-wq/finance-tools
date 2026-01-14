'use client';

import { MortgageResults as MortgageResultsType, Country } from '@/types';
import { formatCurrency, formatCurrencyPrecise } from '@/lib/countries';
import { formatPayoffDate } from '@/lib/calculations/mortgage';

interface MortgageResultsProps {
  results: MortgageResultsType;
  country: Country;
}

export default function MortgageResults({ results, country }: MortgageResultsProps) {
  const { loanAmount, monthlyPayment, totalInterest, totalCost, payoffMonths } = results;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Results</h2>

      <div className="text-center mb-8 p-6 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
        <p className="text-4xl font-bold text-blue-600">
          {formatCurrencyPrecise(monthlyPayment, country)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Loan Amount</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(loanAmount, country)}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Interest</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalInterest, country)}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Cost</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalCost, country)}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Payoff Date</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatPayoffDate(payoffMonths, country.locale)}
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> These figures are estimates only and do not constitute financial advice.
          Actual payments may vary based on lender terms and market conditions.
        </p>
      </div>
    </div>
  );
}
