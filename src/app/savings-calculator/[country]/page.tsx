'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getCountry } from '@/lib/countries';
import { calculateSavings } from '@/lib/calculations/savings';
import { SavingsInputs, SavingsResults as SavingsResultsType } from '@/types';
import SavingsForm from '@/components/SavingsForm';
import SavingsResults from '@/components/SavingsResults';
import SavingsChart from '@/components/SavingsChart';
import SavingsTable from '@/components/SavingsTable';
import ShareButton from '@/components/ShareButton';
import CountrySelector from '@/components/CountrySelector';
import { SavingsAffiliates } from '@/components/AffiliateModule';
import { AdPlaceholder } from '@/components/AdUnit';
import Link from 'next/link';

export default function SavingsCalculatorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const countryCode = params.country as string;
  const country = getCountry(countryCode);

  const [results, setResults] = useState<SavingsResultsType | null>(null);
  const [currentInputs, setCurrentInputs] = useState<SavingsInputs | null>(null);

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
          <Link href="/" className="text-green-600 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const handleCalculate = (inputs: SavingsInputs) => {
    const calculationResults = calculateSavings(inputs);
    setResults(calculationResults);
    setCurrentInputs(inputs);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-green-600 hover:underline text-sm">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {country.name} Savings Calculator
          </h1>
          <p className="text-gray-600">
            See how your savings grow with compound interest over time
          </p>
        </div>

        <div className="mb-6">
          <CountrySelector basePath="/savings-calculator" currentCountry={countryCode} />
        </div>

        {/* Top Ad Banner */}
        <div className="mb-6">
          <AdPlaceholder format="horizontal" className="w-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <SavingsForm
                country={country}
                initialValues={initialValues}
                onCalculate={handleCalculate}
              />

              <div className="space-y-6">
                {results ? (
                  <SavingsResults results={results} country={country} />
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
                    <p>Enter your details and click Calculate to see your results</p>
                  </div>
                )}

                {results && currentInputs && (
                  <div className="flex justify-center">
                    <ShareButton
                      tool="savings"
                      countryCode={countryCode}
                      params={currentInputs as any}
                    />
                  </div>
                )}
              </div>
            </div>

            {results && (
              <>
                <SavingsChart
                  schedule={results.schedule}
                  country={country}
                  initialDeposit={currentInputs?.initialDeposit || 0}
                />
                <AdPlaceholder format="horizontal" className="w-full" />
                <SavingsTable schedule={results.schedule} country={country} />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SavingsAffiliates countryCode={countryCode} />
            <AdPlaceholder format="rectangle" className="mx-auto" />
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            This calculator provides estimates only and does not constitute financial advice.
            Actual returns may vary based on market conditions and account terms.
          </p>
        </footer>
      </main>
    </div>
  );
}
