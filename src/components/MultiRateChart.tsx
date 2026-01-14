'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface MultiRateDataPoint {
  year: number;
  [key: string]: number;
}

interface SeriesConfig {
  key: string;
  name: string;
  color: string;
}

interface MultiRateChartProps {
  data: MultiRateDataPoint[];
  series: SeriesConfig[];
  yAxisLabel?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export default function MultiRateChart({
  data,
  series,
  yAxisLabel = 'Rate',
  valuePrefix = '',
  valueSuffix = '%',
}: MultiRateChartProps) {
  return (
    <div className="w-full h-96">
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
            formatter={(value, name) => {
              const seriesItem = series.find((s) => s.key === name);
              const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
              return [
                `${valuePrefix}${displayValue}${valueSuffix}`,
                seriesItem?.name || name,
              ];
            }}
          />
          <Legend
            formatter={(value) => {
              const seriesItem = series.find((s) => s.key === value);
              return seriesItem?.name || value;
            }}
          />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.key}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: s.color }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
