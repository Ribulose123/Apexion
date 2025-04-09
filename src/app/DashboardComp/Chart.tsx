'use client'
import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: 'Apr 8', price: 5 },
  { date: 'Apr 9', price: 3 },
  { date: 'Apr 10', price: 7 },
  { date: 'Apr 11', price: 10 },
  { date: 'Apr 12', price: 14 },
  { date: 'Apr 13', price: 13 },
  { date: 'Apr 14', price: 15 },
];

const Chart = () => {
  return (
    <div className="  bg-linear-to-bl from-[#141E32] to-[#01040F] text-white rounded-xl py-4 px-3 h-full sm:w-[70%]  w-full">
   <div className='mx-auto'>
     {/* Account balance section */}
     <div className="flex justify-between items-center mb-6">
      <div>
        <div className="flex items-center gap-1 mb-1">
          <span className="text-xs text-gray-400">Total Balance</span>
          <span className="text-xs bg-gray-800 px-1 rounded">$</span>
          <span className="text-xs text-gray-400">Main Account</span>
        </div>
        <h1 className="text-2xl font-bold">$0.00</h1>
      </div>
      <div className="flex gap-2">
        <button className="bg-purple-600 text-white px-4 py-1 rounded-md text-sm">Deposit</button>
        <button className="bg-gray-800 text-white px-4 py-1 rounded-md text-sm">Buy Crypto</button>
      </div>
    </div>

    {/* Assets section */}
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Assets</h2>
        <div className="flex items-center text-orange-400 text-sm">
          <span>Asset Details</span>
          <span className="ml-1">▸</span>
        </div>
      </div>

      {/* Time filter tabs */}
      <div className="flex justify-end mb-4">
        <div className="flex gap-4 text-xs bg-gray-800 px-3 py-1 rounded-md">
          <button className="text-gray-400">Days</button>
          <button className="text-white">Weeks</button>
          <button className="text-gray-400">Month</button>
        </div>
      </div>

      {/* Chart using Recharts */}
      <div className="h-52  border border-gray-800 rounded-lg p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: 'none',
                borderRadius: '8px',
                color: '#F9FAFB',
              }}
              itemStyle={{ color: '#F9FAFB' }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '0.25rem' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8B5CF6"
              fillOpacity={1}
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
   </div>
  </div>
  );
};

export default Chart;
