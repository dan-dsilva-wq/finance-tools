'use client';

import { AmortizationRow, Country } from '@/types';
import { formatCurrency } from '@/lib/countries';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BalanceChartProps {
  schedule: AmortizationRow[];
  country: Country;
}

export default function BalanceChart({ schedule, country }: BalanceChartProps) {
  // Sample the data to avoid rendering too many points
  const sampleRate = Math.ceil(schedule.length / 50);
  const chartData = schedule
    .filter((_, index) => index % sampleRate === 0 || index === schedule.length - 1)
    .map((row) => ({
      month: row.month,
      year: Math.round(row.month / 12),
      balance: row.balance,
      principalPaid: schedule[0].balance - row.balance,
    }));

  // Add starting point
  if (chartData.length > 0 && chartData[0].month !== 1) {
    chartData.unshift({
      month: 0,
      year: 0,
      balance: schedule[0].balance + schedule[0].principal,
      principalPaid: 0,
    });
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Balance Over Time</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                return Math.round(value);
              }}
            />
            <Tooltip
              formatter={(value) => [formatCurrency(Number(value) || 0, country), '']}
              labelFormatter={(label) => `Year ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              fill="#93c5fd"
              name="Remaining Balance"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded" />
          <span className="text-gray-600">Remaining Balance</span>
        </div>
      </div>
    </div>
  );
}
