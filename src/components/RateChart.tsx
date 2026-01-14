'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface RateDataPoint {
  year: number;
  rate: number;
}

interface RateChartProps {
  data: RateDataPoint[];
  color?: string;
  yAxisLabel?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  showCurrentRate?: number;
}

export default function RateChart({
  data,
  color = '#2563eb',
  yAxisLabel = 'Rate',
  valuePrefix = '',
  valueSuffix = '%',
  showCurrentRate,
}: RateChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#9ca3af' }}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#9ca3af' }}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              fill: '#6b7280',
              fontSize: 12,
            }}
            tickFormatter={(value) => `${valuePrefix}${value}${valueSuffix}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            labelStyle={{ color: '#111827', fontWeight: 600 }}
            formatter={(value) => {
              const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
              return [
                `${valuePrefix}${displayValue}${valueSuffix}`,
                yAxisLabel,
              ];
            }}
          />
          {showCurrentRate !== undefined && (
            <ReferenceLine
              y={showCurrentRate}
              stroke="#ef4444"
              strokeDasharray="5 5"
              label={{
                value: `Current: ${valuePrefix}${showCurrentRate}${valueSuffix}`,
                position: 'right',
                fill: '#ef4444',
                fontSize: 11,
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="rate"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
