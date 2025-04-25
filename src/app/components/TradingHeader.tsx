'use client'
import { useState } from 'react';

const TradingHeader = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [buyAmount] = useState('0.00');
  const [paymentMethod, setPaymentMethod] = useState('Payment Methods');
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [amountDropdownOpen, setAmountDropdownOpen] = useState(false);
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];
  const paymentMethods = ['All Assets', 'Bank Transfer', 'Credit Card', 'Debit Card', 'PayPal'];
  
  return (
    <div className="w-full  text-white py-3 px-4">
      {/* Desktop and Mobile Layout */}
      <div className="flex flex-row justify-between items-center">
        {/* Buy/Sell Tabs */}
        <div className="flex space-x-6">
          <button 
            className={`text-sm font-medium ${activeTab === 'buy' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy
          </button>
          <button 
            className={`text-sm font-medium ${activeTab === 'sell' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell
          </button>
        </div>
        
        {/* Filter icon for mobile only */}
        <div className="md:hidden">
          <button>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </button>
        </div>
        
        {/* Dropdowns - Desktop layout (inline), Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Currency Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-1 text-sm bg-transparent border border-gray-800 rounded-full px-3 py-2"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            >
              <div className="flex items-center">
                <span className="text-teal-500 mr-1">•</span>
                <span>{selectedCurrency}</span>
              </div>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {currencyDropdownOpen && (
              <div className="absolute mt-1 w-full bg-gray-900 border border-gray-800 rounded shadow-lg z-10">
                {currencies.map((currency) => (
                  <div 
                    key={currency} 
                    className="px-3 py-2 hover:bg-gray-800 cursor-pointer text-sm"
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setCurrencyDropdownOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <span className="text-teal-500 mr-1">•</span>
                      <span>{currency}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Buy Amount Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-1 text-sm bg-transparent border border-gray-800 rounded-full px-3 py-2"
              onClick={() => setAmountDropdownOpen(!amountDropdownOpen)}
            >
              <span>Buy Amount</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {amountDropdownOpen && (
              <div className="absolute mt-1 w-40 bg-gray-900 border border-gray-800 rounded shadow-lg z-10">
                <div className="p-3">
                  <input 
                    type="text" 
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm"
                    placeholder="Enter amount"
                    defaultValue={buyAmount}
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Payment Methods Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-1 text-sm bg-transparent border border-gray-800 rounded-full px-3 py-2"
              onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
            >
              <span>{paymentMethod}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {paymentDropdownOpen && (
              <div className="absolute mt-1 w-full bg-gray-900 border border-gray-800 rounded shadow-lg z-10">
                {paymentMethods.map((method) => (
                  <div 
                    key={method} 
                    className="px-3 py-2 hover:bg-gray-800 cursor-pointer text-sm"
                    onClick={() => {
                      setPaymentMethod(method);
                      setPaymentDropdownOpen(false);
                    }}
                  >
                    {method}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Refresh Icon */}
          <button className="ml-2 text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdowns Row - Only visible on mobile */}
      <div className="flex mt-3 space-x-2 md:hidden">
        {/* Currency Dropdown for Mobile */}
        <div className="relative flex-1">
          <button 
            className="flex items-center justify-between w-full bg-transparent border border-gray-800 rounded px-2 py-1"
            onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
          >
            <div className="flex items-center">
              <span className="text-teal-500 mr-1">•</span>
              <span className="text-xs">{selectedCurrency}</span>
            </div>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {currencyDropdownOpen && (
            <div className="absolute mt-1 w-full bg-gray-900 border border-gray-800 rounded shadow-lg z-10">
              {currencies.map((currency) => (
                <div 
                  key={currency} 
                  className="px-3 py-2 hover:bg-gray-800 cursor-pointer text-xs"
                  onClick={() => {
                    setSelectedCurrency(currency);
                    setCurrencyDropdownOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <span className="text-teal-500 mr-1">•</span>
                    <span>{currency}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Buy Amount Dropdown for Mobile */}
        <div className="relative flex-1">
          <button 
            className="flex items-center justify-between w-full bg-transparent border border-gray-800 rounded px-2 py-2"
            onClick={() => setAmountDropdownOpen(!amountDropdownOpen)}
          >
            <span className="text-xs">Buy Amount</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {amountDropdownOpen && (
            <div className="absolute mt-1 w-full bg-gray-900 border border-gray-800 rounded shadow-lg z-10">
              <div className="p-2">
                <input 
                  type="text" 
                  className="w-full bg-gray-800 border border-gray-700 rounded p-1 text-xs"
                  placeholder="Enter amount"
                  defaultValue={buyAmount}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingHeader;