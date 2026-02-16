import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PriceHistoryChartProps {
  data: {
    date: string;
    price: number;
  }[];
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value: any) => {
              if (value === undefined || value === null) return '';
              const numValue = Number(value);
              if (isNaN(numValue)) return value;
              return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(numValue);
            }}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#d946ef"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;
