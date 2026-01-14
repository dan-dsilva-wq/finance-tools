'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getCountry } from '@/lib/countries';
import { calculateMortgage } from '@/lib/calculations/mortgage';
import { MortgageInputs, MortgageResults as MortgageResultsType, Country } from '@/types';
import MortgageForm from '@/components/MortgageForm';
import MortgageResults from '@/components/MortgageResults';
import AmortizationTable from '@/components/AmortizationTable';
import BalanceChart from '@/components/BalanceChart';
import ShareButton from '@/components/ShareButton';
import CountrySelector from '@/components/CountrySelector';
import Link from 'next/link';

export default function MortgageCalculatorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const countryCode = params.country as string;
  const country = getCountry(countryCode);

  const [results, setResults] = useState<MortgageResultsType | null>(null);
  const [currentInputs, setCurrentInputs] = useState<MortgageInputs | null>(null);

  // Load scenario from URL params if present
  const initialValues = searchParams.get('scenario')
    ? JSON.parse(decodeURIComponent(searchParams.get('scenario')!))
    : undefined;

  useEffect(() => {
    // Auto-calculate if scenario was loaded
    if (initialValues) {
      handleCalculate(initialValues);
    }
  }, []);

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const handleCalculate = (inputs: MortgageInputs) => {
    const calculationResults = calculateMortgage(inputs);
    setResults(calculationResults);
    setCurrentInputs(inputs);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {country.name} Mortgage Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your monthly payments and see your amortization schedule
          </p>
        </div>

        <div className="mb-6">
          <CountrySelector basePath="/mortgage-calculator" currentCountry={countryCode} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <MortgageForm
              country={country}
              initialValues={initialValues}
              onCalculate={handleCalculate}
            />

            {results && currentInputs && (
              <div className="flex justify-center">
                <ShareButton
                  tool="mortgage"
                  countryCode={countryCode}
                  params={currentInputs}
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {results ? (
              <>
                <MortgageResults results={results} country={country} />
                <BalanceChart schedule={results.schedule} country={country} />
              </>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
                <p>Enter your details and click Calculate to see your results</p>
              </div>
            )}
          </div>
        </div>

        {results && (
          <div className="mt-8">
            <AmortizationTable schedule={results.schedule} country={country} />
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            This calculator provides estimates only and does not constitute financial advice.
            Please consult a qualified financial advisor before making any financial decisions.
          </p>
        </footer>
      </main>
    </div>
  );
}
