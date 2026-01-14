import Link from 'next/link';
import CountrySelector from '@/components/CountrySelector';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Financial Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plan your mortgage, savings, and understand inflation with our easy-to-use calculators.
            Get country-specific defaults and share your scenarios with anyone.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
            Select Your Country
          </h2>
          <CountrySelector basePath="/mortgage-calculator" />
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mortgage Calculator</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              Calculate monthly payments, total interest, and view your full amortization schedule.
            </p>
            <Link
              href="/mortgage-calculator/gb"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Try it now →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Savings Calculator</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              See how your savings grow with compound interest over time.
            </p>
            <Link
              href="/savings-calculator/gb"
              className="text-green-600 hover:underline text-sm font-medium"
            >
              Try it now →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md opacity-60 flex flex-col">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Inflation Calculator</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              Understand how inflation affects the value of money over time.
            </p>
            <span className="text-gray-400 text-sm font-medium">Coming soon</span>
          </div>
        </section>

        <section className="text-center bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Use Our Calculators?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Share Your Scenarios</h3>
              <p className="text-sm text-gray-600">
                Create a unique link for any calculation and share it with family, friends, or advisors.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Country-Specific</h3>
              <p className="text-sm text-gray-600">
                Defaults are tailored to your country's typical mortgage terms and rates.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">No Sign-up Required</h3>
              <p className="text-sm text-gray-600">
                Use all calculators and share scenarios without creating an account.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            These calculators provide estimates only and do not constitute financial advice.
          </p>
        </footer>
      </main>
    </div>
  );
}
