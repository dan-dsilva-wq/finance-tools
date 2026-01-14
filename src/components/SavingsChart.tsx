'use client';

import { SavingsYearRow, Country } from '@/types';
import { formatCurrency } from '@/lib/countries';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface SavingsChartProps {
  schedule: SavingsYearRow[];
  country: Country;
  initialDeposit: number;
}

export default function SavingsChart({ schedule, country, initialDeposit }: SavingsChartProps) {
  // Transform data for stacked area chart
  const chartData = schedule.map((row) => {
    const cumulativeContributions = initialDeposit + schedule
      .slice(0, row.year)
      .reduce((sum, r) => sum + r.contributions, 0);
    const cumulativeInterest = row.endBalance - cumulativeContributions - row.contributions;

    return {
      year: row.year,
      contributions: cumulativeContributions + row.contributions,
      interest: cumulativeInterest + row.interestEarned,
      total: row.endBalance,
    };
  });

  // Add starting point
  chartData.unshift({
    year: 0,
    contributions: initialDeposit,
    interest: 0,
    total: initialDeposit,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Growth Over Time</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}y`}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
                if (value >= 1000) return `${Math.round(value / 1000)}k`;
                return `${Math.round(value)}`;
              }}
            />
            <Tooltip
              formatter={(value, name) => {
                const label = name === 'contributions' ? 'Contributions'
                  : name === 'interest' ? 'Interest Earned'
                  : 'Total Balance';
                return [formatCurrency(Number(value) || 0, country), label];
              }}
              labelFormatter={(label) => `Year ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
              }}
              labelStyle={{
                color: '#111827',
                fontWeight: 600,
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="contributions"
              stackId="1"
              stroke="#3b82f6"
              fill="#93c5fd"
              name="Contributions"
            />
            <Area
              type="monotone"
              dataKey="interest"
              stackId="1"
              stroke="#22c55e"
              fill="#86efac"
              name="Interest Earned"
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#6b7280"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Total Balance"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-300 rounded" />
          <span className="text-gray-600">Contributions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-300 rounded" />
          <span className="text-gray-600">Interest Earned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 border-t-2 border-dashed border-gray-500" />
          <span className="text-gray-600">Total</span>
        </div>
      </div>
    </div>
  );
}
