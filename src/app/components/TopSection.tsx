import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const TopSection: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('Days');
  const [showBalanceDropdown, setShowBalanceDropdown] = useState(false);
  const [activeBtn, setActiveBtn] = useState('Deposit');

  const buttons = ['Deposit', 'Buy Crypto', 'Convert', 'Withdraw'];
  
  const handleBalance = () => {
    setShowBalance(!showBalance);
  };
  
  const toggleBalanceDropdown = () => {
    setShowBalanceDropdown(!showBalanceDropdown);
  };
  
  const timePeriods = ['Days', 'Weeks', 'Month', 'Months'];
  
  const chartData = [
    { name: 'Apr 5', value: 4000 },
    { name: 'Apr 10', value: 3000 },
    { name: 'Apr 15', value: 5000 },
    { name: 'Apr 20', value: 2780 },
    { name: 'Apr 25', value: 1890 },
    { name: 'Apr 30', value: 2390 },
  ];
  
  return (
    <div className="bg-gradient-to-r from-[rgba(20,30,50,0.0576)] to-[rgba(1,4,15,0.24)] rounded-xl p-6 mb-6 sm:border sm:border-[#141E32]">
      <div className="flex flex-col lg:flex-row w-full gap-10">
        {/* Left Section - Balance */}
        <div className="w-full lg:w-1/2">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-row sm:flex-col gap-10 text-xs sm:text-sm lg:text-base">
              
              {/* Total Balance and Profit Balance Row */}
              <div className="flex justify-between items-center gap-6 sm:gap-60">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-gray-400 font-medium sm:text-lg">Total Balance</h2>
                    <button
                      onClick={handleBalance}
                      className="text-gray-400 hover:text-white transition ml-2"
                    >
                      {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                  </div>
                  <div className="flex items-center mt-1">
                    <h2 className="sm:text-2xl text-[15px] text-gray-200 font-bold tracking-wider">
                      {showBalance ? "$12,600.00" : "******"}
                    </h2>
                  </div>
                </div>
      
                {/* Profit Balance with Dropdown */}
                <div>
                  <div className="relative">
                    <button 
                      onClick={toggleBalanceDropdown}
                      className="flex items-center gap-1 text-gray-400 hover:text-white transition"
                    >
                      <span className="font-medium">Profit Bal</span>
                      <ChevronDown size={16} />
                    </button>
      
                    {showBalanceDropdown && (
                      <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                        <ul className="py-1">
                          {['Profit Bal', 'Total Bal', 'Deposit Bal'].map((item, i) => (
                            <li
                              key={i}
                              onClick={() => setShowBalanceDropdown(false)}
                              className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 items-end mt-1">
                    <p className="text-green-500 font-bold sm:text-xl">
                      {showBalance ? "$32,121.52" : "******"}
                    </p>
                    <div className="bg-green-900/20 text-green-500 px-2 py-1 rounded sm:text-xs text-[10px] font-semibold mt-1">
                      +5.23%
                    </div>
                  </div>
                </div>
              </div>

              {/* Deposit Balance */}
              <div>
                <p className="text-gray-400 font-medium sm:text-sm">Deposit Balance</p>
                <div className="flex items-center space-x-2">
                  <h2 className="sm:text-xl text-[12px] font-bold text-gray-200 tracking-wider">
                    {showBalance ? "$5,300.00" : "*****"}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2 mt-22">
          {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => setActiveBtn(btn)}
          className={`
            py-2 px-3 rounded-md text-xs font-medium transition
            ${activeBtn === btn
              ? 'bg-indigo-700 text-white'
              : 'bg-transparent border border-gray-600 text-white hover:bg-gray-700'}
          `}
        >
          {btn}
        </button>
      ))}
          </div>
        </div>

        {/* Right Section - Chart */}
        <div className="w-full lg:w-1/2">
          <div className="flex space-x-4 mb-4 border boder-[#141E32] sm:w-[58%] w-[70%] rounded-lg p-2">
            {timePeriods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? 'text-indigo-400 border-b border-indigo-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <div className="h-48 w-full -ml-8 sm:ml-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  stroke="#6B7280" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Last Update: April 10, 2025 (07:45 UTC)
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;