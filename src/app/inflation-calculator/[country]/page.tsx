'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getCountry } from '@/lib/countries';
import { calculateInflation } from '@/lib/calculations/inflation';
import { InflationInputs, InflationResults as InflationResultsType } from '@/types';
import InflationForm from '@/components/InflationForm';
import InflationResults from '@/components/InflationResults';
import ShareButton from '@/components/ShareButton';
import CountrySelector from '@/components/CountrySelector';
import Link from 'next/link';

export default function InflationCalculatorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const countryCode = params.country as string;
  const country = getCountry(countryCode);

  const [results, setResults] = useState<InflationResultsType | null>(null);
  const [currentInputs, setCurrentInputs] = useState<InflationInputs | null>(null);
  const [error, setError] = useState<string | null>(null);

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
          <Link href="/" className="text-amber-600 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const handleCalculate = (inputs: InflationInputs) => {
    setError(null);
    const calculationResults = calculateInflation(inputs, countryCode);

    if (!calculationResults) {
      setError('Unable to calculate inflation for the selected years. Please try different years.');
      setResults(null);
      return;
    }

    setResults(calculationResults);
    setCurrentInputs(inputs);
  };

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
            {country.name} Inflation Calculator
          </h1>
          <p className="text-gray-600">
            See how inflation has affected purchasing power over time
          </p>
        </div>

        <div className="mb-6">
          <CountrySelector basePath="/inflation-calculator" currentCountry={countryCode} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <InflationForm
              country={country}
              initialValues={initialValues}
              onCalculate={handleCalculate}
            />

            {results && currentInputs && (
              <div className="flex justify-center">
                <ShareButton
                  tool="inflation"
                  countryCode={countryCode}
                  params={currentInputs as any}
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            )}

            {results && currentInputs ? (
              <InflationResults
                results={results}
                country={country}
                originalAmount={currentInputs.amount}
              />
            ) : !error && (
              <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
                <p>Enter your details and click Calculate to see your results</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            This calculator uses historical CPI data and provides estimates only.
            It does not constitute financial advice.
          </p>
        </footer>
      </main>
    </div>
  );
}
