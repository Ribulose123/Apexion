'use client';
import React, { useState } from 'react';

type TradingProps = unknown;

const TradingInterface: React.FC<TradingProps> = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'convert'>('buy');
  const [price, setPrice] = useState<string>('3053.85');
  const [amount, setAmount] = useState<string>('100');
  const [selectedLeverage, setSelectedLeverage] = useState<string>('5x');
  const [duration, setDuration] = useState<string>('2 minutes');
  
  // Sample data
  const balance = 21341.05;
  const liquidationPrice = 965.352;
  const profitRate = 0.23;
  const stableBalance = 2993.7599;
  const walletBalance = 2993.7599;
  const available = 2993.0446;
  const pnl = 0.00;
  const roi = 0.00;
  
  const leverageOptions = ['5X', '50X', '250X', '500X'];

  const handleTabChange = (tab: 'buy' | 'sell' | 'convert') => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white w-full max-w-md  rounded-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800">
        <button
          className={`flex-1 py-4 text-center ${activeTab === 'buy' ? 'border-b-2 border-purple-500 font-medium' : 'text-gray-400'}`}
          onClick={() => handleTabChange('buy')}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-4 text-center ${activeTab === 'sell' ? 'border-b-2 border-purple-500 font-medium' : 'text-gray-400'}`}
          onClick={() => handleTabChange('sell')}
        >
          Sell
        </button>
        <button
          className={`flex-1 py-4 text-center ${activeTab === 'convert' ? 'border-b-2 border-purple-500 font-medium' : 'text-gray-400'}`}
          onClick={() => handleTabChange('convert')}
        >
          Convert
        </button>
      </div>

      {/* Form Content */}
      <div className="p-4">
        {/* Type Selection */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Type</label>
          <div className="relative">
            <select className="w-full bg-gray-800 p-2 rounded text-white appearance-none pr-8">
              <option>Crypto</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Price</label>
          <div className="relative">
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded text-white"
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm">USDT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Amount</label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded text-white"
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-400 text-sm">BTC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stop Loss and Take Profit */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Stop Loss</span>
            <span>Take Profit</span>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex items-center bg-gray-800 rounded p-2">
              <span className="text-gray-400 text-xs">997.821368</span>
              <span className="mx-1 text-gray-500">|</span>
              <span className="text-gray-400 text-xs">BTC</span>
              <span className="mx-1 text-gray-500">-</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex-1 flex items-center bg-gray-800 rounded p-2">
              <span className="text-gray-400 text-xs">92,421.968</span>
              <span className="mx-1 text-gray-500">|</span>
              <span className="text-gray-400 text-xs">BTC</span>
              <span className="mx-1 text-gray-500">-</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
          </div>
        </div>

        {/* Leverage Selection */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Leverage</label>
          <div className="flex gap-2">
            {leverageOptions.map((leverage) => (
              <button
                key={leverage}
                className={`flex-1 py-2 rounded text-center text-sm ${
                  selectedLeverage === leverage ? 'bg-purple-600' : 'bg-gray-800'
                }`}
                onClick={() => setSelectedLeverage(leverage)}
              >
                {leverage}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Dropdown */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Duration</label>
          <div className="relative">
            <select 
              className="w-full bg-gray-800 p-2 rounded text-white appearance-none pr-8"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option>2 minutes</option>
              <option>5 minutes</option>
              <option>15 minutes</option>
              <option>1 hour</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Account Balance */}
        <div className="mb-4 py-2 border-t border-gray-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-400">Available balance:</span>
            <span className="text-sm">{balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Liquidation Price:</span>
            <div className="flex gap-1 items-center">
              <span className="text-sm text-green-500">{liquidationPrice.toFixed(3)}</span>
              <span className="px-1 py-0.5 bg-green-900 text-green-500 text-xs rounded">{profitRate.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Buy Button */}
        <button className="w-full py-3 bg-purple-600 text-white font-medium rounded">
          {activeTab === 'buy' ? 'Buy' : activeTab === 'sell' ? 'Sell' : 'Convert'}
        </button>
      </div>

      {/* Margin Section */}
      <div className="p-4 border-t border-gray-800">
        <h3 className="font-medium mb-2">Margin</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Maintenance margin rate (MMR)</span>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
            <span>0.50%</span>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-400">Maintenance margin</span>
          <span>0.80177</span>
        </div>

        {/* Assets Section */}
        <h3 className="font-medium mb-2">Assets</h3>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-400">SUSD Balance</span>
          <span>${stableBalance.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-400">Wallet balance</span>
          <span>${walletBalance.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-400">Available</span>
          <span>${available.toFixed(4)}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-400">Total unrealized PnL</span>
          <span>{pnl.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">ROI</span>
          <span>{roi.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;