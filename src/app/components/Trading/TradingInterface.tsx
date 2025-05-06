'use client';
import React, { useState } from 'react';

type TradingProps = unknown;

interface CryptoOption {
  value: string;
  label: string;
}



const TradingInterface: React.FC<TradingProps> = () => {
  // State variables
  const [cryptoType, setCryptoType] = useState<string>('Crypto');
  const [price, setPrice] = useState<string>('3053.85');
  const [priceUnit, setPriceUnit] = useState<string>('USDT');
  const [amount, setAmount] = useState<string>('100');
  const [amountUnit, setAmountUnit] = useState<string>('BTC');
  const [stopLoss, setStopLoss] = useState<string>('99,431,568');
  const [takeProfit, setTakeProfit] = useState<string>('92,421,568');
  const [leverage] = useState<number>(5);
  const [duration, setDuration] = useState<string>('2 minutes');
  const [availableBalance] = useState<number>(31.24);
  const [profitRate] = useState<number>(0.2);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'convert' | 'futures'>('buy');
  
  
  
  
  // Options for dropdown selectors
  const cryptoOptions: CryptoOption[] = [
    { value: 'Crypto', label: 'Crypto' },
    { value: 'Forex', label: 'Forex' },
    { value: 'Stocks', label: 'Stocks' },
    { value: 'Commodities', label: 'Commodities' }
  ];
  
  const durationOptions = [
    '2 minutes',
    '5 minutes',
    '15 minutes',
    '30 minutes',
    '1 hour',
    '4 hours'
  ];
  



  
  // Handlers
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  
  const handleStopLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStopLoss(e.target.value);
  };
  
  const handleTakeProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTakeProfit(e.target.value);
  };
 
  
  const handleBuyClick = () => {
    alert('Trade executed');
  };
  
  return (
    <div className="md:flex flex-col hidden text-white w-full max-w-sm mx-auto space-y-1">
      {/* Type Selector */}
      <div className='space-y-4 bg-[#141E323D]  p-4 rounded-lg'>
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-800 mb-4">
          {['buy', 'sell', 'convert'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-center capitalize ${
                activeTab === tab ? 'text-white border-b border-blue-400 scale-100' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab as 'buy' | 'sell' | 'convert')}
            >
              {tab}
            </button>
          ))}
        </div>
      <div className="space-y-1 ">
        <label className="text-xs text-gray-400">Type:</label>
        <div className="relative">
          <select 
            className="w-full bg-[#10131F] rounded-lg px-2 py-2 focus:outline-none appearance-none"
            value={cryptoType}
            onChange={(e) => setCryptoType(e.target.value)}
          >
            {cryptoOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-[#10131F]">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Price Input */}
      <div className="space-y-1 ">
        <label className="text-xs text-gray-400">Price:</label>
        <div className="flex items-center space-x-2 w-full bg-[#10131F] rounded-lg px-2 ">
          <input
            type="text"
            className="flex-1  focus:outline-none"
            value={price}
            onChange={handlePriceChange}
          />
          <div className="relative">
            <select 
              className="bg-transparent py-2 pr-8 focus:outline-none appearance-none"
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
            >
              <option value="USDT" className="bg-[#070823]">USDT</option>
              <option value="USD" className="bg-[#070823]">USD</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          </div>
        </div>
      </div>
      
      {/* Amount Input */}
      <div className="space-y-1">
        <label className="text-xs text-gray-400">Amount:</label>
        <div className="flex items-center space-x-2 w-full bg-[#10131F] rounded-lg px-2">
          <input
            type="text"
            className="flex-1  py-2 focus:outline-none"
            value={amount}
            onChange={handleAmountChange}
          />
          <div className="relative">
            <select 
              className="bg-transparent py-2 pr-8 focus:outline-none appearance-none"
              value={amountUnit}
              onChange={(e) => setAmountUnit(e.target.value)}
            >
              <option value="BTC" className="bg-[#070823]">BTC</option>
              <option value="ETH" className="bg-[#070823]">ETH</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stop Loss & Take Profit */}
      <div className="flex gap-2">
        <div className="space-y-1 w-[50%]">
          <label className="text-xs text-gray-400">Stop Loss:</label>
          <div className="flex items-center bg-[#10131F] rounded p-2">
            <input
              type="text"
              className="bg-transparent py-2  w-full focus:outline-none text-[12px]"
              value={stopLoss}
              onChange={handleStopLossChange}
            />
            <span className="text-[10px] flex space-x-1">BTC
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            </span>
          </div>
        </div>
        <div className="space-y-1 w-[50%]">
          <label className="text-xs text-gray-400">Take Profit:</label>
          <div className="flex items-center bg-[#10131F] rounded p-2">
            <input
              type="text"
              className="bg-transparent py-2 w-full focus:outline-none text-[12px]"
              value={takeProfit}
              onChange={handleTakeProfitChange}
            />
            <span className="text-[10px] flex">BTC
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            </span>
          </div>
        </div>
      </div>
      
      {/* Leverage Slider */}
      <div className="pt-2">
        <div className="relative w-full h-1 bg-gray-700 rounded-full">
          <div className="absolute h-3 w-3 bg-purple-500 rounded-full -top-1" style={{ left: `${(leverage / 500) * 100}%` }}></div>
        </div>
      </div>
      
      {/* Duration */}
      <div className="space-y-1">
        <label className="text-xs text-gray-400">Duration:</label>
        <div className="relative">
          <select 
            className=" w-full bg-[#10131F] rounded-lg px-2 py-2 focus:outline-none appearance-none"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            {durationOptions.map(option => (
              <option key={option} value={option} className="bg-[#070823]">
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Available Balance */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Available balance:</span>
        <span>{availableBalance.toFixed(2)} USD</span>
      </div>
      
      {/* Liquidation Price & Profit Rate */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Liquidation Price:</span>
        <span className="text-green-500">${price}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Profit Rate:</span>
        <span className="text-green-500">{profitRate.toFixed(1)}%</span>
      </div>
      
      {/* Buy Button */}
      <button 
        className="w-full bg-[#6967AE]  text-white font-medium py-3 rounded-md mt-4"
        onClick={handleBuyClick}
      >
        Buy
      </button>
      </div>
      
      {/* Margin Section */}
      <div className='space-y-4 bg-[#141E323D] p-4 rounded-lg h-[101vh]'>
      <div className="">
        <h3 className="text-lg font-medium mb-4">Margin</h3>
        
        <div className="space-y-3 border-b border-[#141E325C] pb-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Maintenance margin rate (MMR)</span>
            <div className="flex items-center">
              <div className="h-2 w-4 bg-white rounded-full mr-2"></div>
              <span>0.09%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Maintenance margin</span>
            <span>0.8017</span>
          </div>
        </div>
      </div>
      
      {/* Assets Section */}
      <div className="mt-4">
        <div className="text-lg font-medium mb-2">Assets</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">SUSDT balance</span>
            <span className="text-sm">2,909.7399</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Wallet balance</span>
            <span className="text-sm">2,909.7399</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Available</span>
            <span className="text-sm">2,090.0415</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total unrealized PnL</span>
            <span className="text-sm">0.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">ROI</span>
            <span className="text-sm">0.00%</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="flex mt-6 pb-4 border-b border-[#141E325C] space-x-2">
        <button className="flex-1 py-3 px-2 text-center text-gray-400 text-sm border border-[#141E32] rounded-full">
          Buy Crypto
        </button>
        <button className="flex-1 py-3 px-2 text-center text-gray-400 text-sm border border-[#141E32] rounded-full">
          Deposit
        </button>
      </div>
      </div>
    </div>
  );
};

export default TradingInterface;