'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', price: 410000 },
  { month: 'Feb', price: 412000 },
  { month: 'Mar', price: 415000 },
  { month: 'Apr', price: 418000 },
  { month: 'May', price: 417500 },
  { month: 'Jun', price: 420000 },
];

const PriceHistoryChart = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
          />
          <YAxis 
            hide={true} 
            domain={['dataMin - 5000', 'dataMax + 5000']} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            formatter={(value: any) => [
              new Intl.NumberFormat('es-ES', { 
                style: 'currency', 
                currency: 'EUR',
                maximumFractionDigits: 0 
              }).format(Number(value || 0)), 
              'Price'
            ]}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#4f46e5" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;
