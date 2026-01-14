'use client';

interface AffiliateLink {
  name: string;
  description: string;
  url: string;
  logo?: string;
  highlight?: string;
}

interface AffiliateModuleProps {
  title: string;
  description?: string;
  links: AffiliateLink[];
  className?: string;
}

export default function AffiliateModule({
  title,
  description,
  links,
  className = '',
}: AffiliateModuleProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}
      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{link.name}</span>
                  {link.highlight && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {link.highlight}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{link.description}</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">
        * We may earn a commission from partner links
      </p>
    </div>
  );
}

// Pre-configured affiliate modules for different calculator types

export function MortgageAffiliates({ countryCode }: { countryCode: string }) {
  const affiliatesByCountry: Record<string, AffiliateLink[]> = {
    gb: [
      {
        name: 'Compare Mortgage Rates',
        description: 'Compare rates from 90+ UK lenders',
        url: '#', // Replace with actual affiliate link
        highlight: 'Free',
      },
      {
        name: 'Speak to a Broker',
        description: 'Get free mortgage advice from qualified experts',
        url: '#', // Replace with actual affiliate link
      },
      {
        name: 'First-Time Buyer Guide',
        description: 'Everything you need to know about getting your first mortgage',
        url: '#', // Replace with actual affiliate link
      },
    ],
    us: [
      {
        name: 'Compare Mortgage Rates',
        description: 'See rates from multiple lenders in minutes',
        url: '#', // Replace with actual affiliate link
        highlight: 'Free',
      },
      {
        name: 'Get Pre-Approved',
        description: 'Check your rate without affecting your credit score',
        url: '#', // Replace with actual affiliate link
      },
      {
        name: 'Refinance Calculator',
        description: 'See if refinancing could save you money',
        url: '#', // Replace with actual affiliate link
      },
    ],
    ca: [
      {
        name: 'Compare Mortgage Rates',
        description: 'Find the best rates from Canadian lenders',
        url: '#', // Replace with actual affiliate link
        highlight: 'Free',
      },
      {
        name: 'Mortgage Broker Network',
        description: 'Connect with licensed brokers across Canada',
        url: '#', // Replace with actual affiliate link
      },
    ],
    au: [
      {
        name: 'Compare Home Loans',
        description: 'Compare 100+ home loans from Australian lenders',
        url: '#', // Replace with actual affiliate link
        highlight: 'Free',
      },
      {
        name: 'Speak to a Broker',
        description: 'Free advice from qualified mortgage brokers',
        url: '#', // Replace with actual affiliate link
      },
    ],
  };

  const links = affiliatesByCountry[countryCode] || affiliatesByCountry['gb'];

  return (
    <AffiliateModule
      title="Ready to Get a Mortgage?"
      description="Compare rates and find the best deal for your situation"
      links={links}
    />
  );
}

export function SavingsAffiliates({ countryCode }: { countryCode: string }) {
  const affiliatesByCountry: Record<string, AffiliateLink[]> = {
    gb: [
      {
        name: 'Best Savings Rates',
        description: 'Compare easy-access and fixed-rate savings accounts',
        url: '#', // Replace with actual affiliate link
        highlight: 'Up to 5% AER',
      },
      {
        name: 'Cash ISA Comparison',
        description: 'Tax-free savings accounts compared',
        url: '#', // Replace with actual affiliate link
      },
      {
        name: 'Investment Platforms',
        description: 'Start investing from just £1',
        url: '#', // Replace with actual affiliate link
      },
    ],
    us: [
      {
        name: 'High-Yield Savings',
        description: 'Compare the best high-yield savings accounts',
        url: '#', // Replace with actual affiliate link
        highlight: 'Up to 5% APY',
      },
      {
        name: 'CD Rates',
        description: 'Lock in the best certificate of deposit rates',
        url: '#', // Replace with actual affiliate link
      },
      {
        name: 'Investment Accounts',
        description: 'Start investing with no minimums',
        url: '#', // Replace with actual affiliate link
      },
    ],
    ca: [
      {
        name: 'Best Savings Accounts',
        description: 'Compare high-interest savings accounts in Canada',
        url: '#', // Replace with actual affiliate link
        highlight: 'Up to 4.5%',
      },
      {
        name: 'TFSA Comparison',
        description: 'Tax-free savings account options',
        url: '#', // Replace with actual affiliate link
      },
      {
        name: 'GIC Rates',
        description: 'Find the best GIC rates',
        url: '#', // Replace with actual affiliate link
      },
    ],
    au: [
      {
        name: 'Best Savings Rates',
        description: 'Compare high-interest savings accounts',
        url: '#', // Replace with actual affiliate link
        highlight: 'Up to 5.5%',
      },
      {
        name: 'Term Deposits',
        description: 'Lock in competitive term deposit rates',
        url: '#', // Replace with actual affiliate link
      },
      {
        name: 'Investment Platforms',
        description: 'Low-cost investing options for Australians',
        url: '#', // Replace with actual affiliate link
      },
    ],
  };

  const links = affiliatesByCountry[countryCode] || affiliatesByCountry['gb'];

  return (
    <AffiliateModule
      title="Grow Your Savings"
      description="Find the best rates for your savings goals"
      links={links}
    />
  );
}
