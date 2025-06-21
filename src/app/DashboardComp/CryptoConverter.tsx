'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';
import { PiUserSwitchLight } from "react-icons/pi";
import { FiRefreshCcw } from "react-icons/fi";
import Image from 'next/image';

type Currency = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price?: number;
};

const CurrencySelector = ({ 
  value, onChange, amount, onAmountChange, showAmount = true,
  currencies, isLoading, label, showAvailable = false 
}: {
  value: string;
  onChange: (value: string) => void;
  amount: string;
  onAmountChange: (value: string) => void;
  showAmount?: boolean;
  currencies: Currency[];
  isLoading: boolean;
  label?: string;
  showAvailable?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const selectedCurrency = currencies.find(c => c.id === value);
  const filteredCurrencies = currencies.filter(c => 
    `${c.name} ${c.symbol}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0A0D19] rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#E8E8E87A] text-sm">{label}</span>
        {showAvailable && selectedCurrency && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">Available: 0 {selectedCurrency.symbol.toUpperCase()}</span>
            <span className="text-[#F2AF29] cursor-pointer hover:text-blue-300">Deposit</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-left"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-[#F2AF29] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : selectedCurrency ? (
            <>
              <div className="relative">
                <Image
                  src={selectedCurrency.image}
                  alt={selectedCurrency.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div>
                <div className="text-white font-medium">{selectedCurrency.name}</div>
                <div className="text-gray-400 text-sm">{selectedCurrency.symbol.toUpperCase()}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
            </>
          ) : null}
        </button>

        {showAmount ? (
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="bg-transparent text-white text-right text-xl font-medium outline-none w-32"
            placeholder="0.000000"
            min="0"
            step="any"
          />
        ) : (
          <div className="text-white text-xl font-medium">
            {amount === '--' ? '--' : parseFloat(amount || '0').toFixed(6)}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0A0D19] rounded-xl p-6 w-11/12 max-w-md max-h-[80vh] flex flex-col border border-[#1E2235]">
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-xl font-bold text-white">Select Currency</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative my-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1E2235] text-white focus:outline-none focus:ring-1 focus:ring-[#F2AF29]"
              />
            </div>

            <div className="overflow-y-auto flex-grow custom-scrollbar">
              {filteredCurrencies.map(currency => (
                <button
                  key={currency.id}
                  onClick={() => {
                    onChange(currency.id);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`flex items-center gap-3 p-3 w-full text-left rounded-lg transition-colors ${
                    value === currency.id 
                      ? 'bg-[#F2AF29]/20 hover:bg-[#F2AF29]/30 border border-[#F2AF29]/50' 
                      : 'hover:bg-[#1E2235]'
                  }`}
                >
                  <Image
                    src={currency.image}
                    alt={currency.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">{currency.name}</div>
                    <div className="text-gray-400 text-sm">{currency.symbol.toUpperCase()}</div>
                  </div>
                  {currency.current_price && (
                    <div className="text-white text-sm">
                      ${currency.current_price.toLocaleString()}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CryptoConverter() {
  const [activeTab, setActiveTab] = useState<'instant' | 'limit'>('instant');
  const [fromCurrency, setFromCurrency] = useState('bitcoin');
  const [toCurrency, setToCurrency] = useState('ethereum');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('--');
  const [limitPrice, setLimitPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  // Fetch top cryptocurrencies with prices
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
        );
        const data = await res.json();
        setCurrencies(data.map((coin: {
          id: string;
          symbol: string;
          name: string;
          image: string;
          current_price: number;
        }) => ({
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          image: coin.image,
          current_price: coin.current_price
        })));
        
        // Set default currencies if available
        if (data.length > 1) {
          setFromCurrency(data[0].id);
          setToCurrency(data[1].id);
        }
      } catch (error) {
        console.error("Failed to fetch currencies:", error);
        // Fallback data
        setCurrencies([
          { 
            id: 'bitcoin', 
            symbol: 'btc', 
            name: 'Bitcoin', 
            image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
            current_price: 50000 
          },
          { 
            id: 'ethereum', 
            symbol: 'eth', 
            name: 'Ethereum', 
            image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
            current_price: 3000 
          }
        ]);
      }
    };

    fetchCurrencies();
  }, []);

  const fetchRate = useCallback(async (from: string, to: string) => {
    if (from === to) return 1;
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`
      );
      const data = await res.json();
      const rate = data[from]?.[to];
      setExchangeRate(rate || null);
      return rate;
    } catch (error) {
      console.error("Error fetching rate:", error);
      setExchangeRate(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const convert = useCallback(async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setToAmount('--');
      return;
    }

    const rate = await fetchRate(fromCurrency, toCurrency);
    if (rate) {
      setToAmount((parseFloat(fromAmount) * rate).toFixed(6));
    } else {
      setToAmount('--');
    }
  }, [fromAmount, fromCurrency, toCurrency, fetchRate]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount === '--' ? '' : toAmount);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'instant') {
        convert();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [fromAmount, fromCurrency, toCurrency, convert, activeTab]);

  const fromSymbol = currencies.find(c => c.id === fromCurrency)?.symbol.toUpperCase();
  const toSymbol = currencies.find(c => c.id === toCurrency)?.symbol.toUpperCase();

  return (
    <div className="flex items-center justify-center w-full">

      <div className="w-full">
        <div className="bg-gradient-to-b from-[#0F1320] to-[#070A15] md:rounded-2xl p-6 mdd:border border-[#1E2235] shadow-2xl">
           <div className="flex flex-col  gap-2 md:hidden mb-3">
          <h2 className="text-3xl text-[#E8E8E8] capitalize">convert</h2>
          <p className="text-sm text-[#E8E8E8]">
            zero fees | Real-time swap | Multi-asset support
          </p>
        </div>
          {/* Tab Navigation */}
          <div className="relative md:bg-[#1E2235] rounded-xl p-1 mb-6 overflow-hidden">
            <div 
              className={`absolute top-0 h-full bg-[#F2AF29] rounded-lg transition-all duration-300 ease-out ${
                activeTab === 'instant' 
                  ? 'md:left-0 right-1/2 md:rounded-r-none border-b border-[#F2AF29]' 
                  : 'md:right-0 left-1/2 md:rounded-l-none'
              }`}
            />
            <div className="relative flex">
              <button
                onClick={() => setActiveTab('instant')}
                className={`flex-1 py-3 px-6 text-center font-medium transition-colors relative z-10 ${
                  activeTab === 'instant' ? 'text-[#070A15]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Instant
              </button>
              <button
                onClick={() => setActiveTab('limit')}
                className={`flex-1 py-3 px-6 text-center font-medium transition-colors relative z-10 ${
                  activeTab === 'limit' ? 'text-[#070A15]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Limit
              </button>
            </div>
          </div>

          {/* Account Selector */}
          <div className="flex items-center gap-2 mb-4 text-sm text-[#E8E8E87A]">
            <PiUserSwitchLight size={20}/>
            <span>Main Account</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          {/* Currency Selectors with Exchange Button */}
          <div className="relative">
            <CurrencySelector
              value={fromCurrency}
              onChange={setFromCurrency}
              amount={fromAmount}
              onAmountChange={setFromAmount}
              currencies={currencies}
              isLoading={!currencies.length}
              label="From"
              showAvailable={true}
            />
            
            {/* Exchange Button */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <button
                onClick={swapCurrencies}
                className="w-10 h-10 bg-[#F2AF29] hover:bg-[#F2AF29]/90 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-[#F2AF29]/30"
              >
                <FiRefreshCcw className="w-5 h-5 text-[#070A15]" />
              </button>
            </div>
            
            <div className="mt-6">
              <CurrencySelector
                value={toCurrency}
                onChange={setToCurrency}
                amount={toAmount}
                onAmountChange={() => {}}
                showAmount={false}
                currencies={currencies}
                isLoading={!currencies.length}
                label="To"
              />
            </div>
          </div>

          {/* Tab-specific Content */}
          {activeTab === 'instant' ? (
            <>
              {/* Instant Exchange Info */}
              <div className="mt-8 mb-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#E8E8E87A]">Transaction Fees</span>
                  <span className="text-[#00F66C] bg-[#00F66C14] px-2 py-0.5 rounded-xl text-sm">0.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#E8E8E87A]">Rate</span>
                  <span className="text-white text-sm">
                    {exchangeRate ? `1 ${fromSymbol} = ${exchangeRate.toFixed(6)} ${toSymbol}` : '--'}
                  </span>
                </div>
              </div>

              {/* Convert Button */}
              <button
                onClick={convert}
                disabled={!fromAmount || isLoading}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  !fromAmount || isLoading 
                    ? 'bg-[#439A86]/50 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#F2AF29] text-[#070A15] hover:bg-[#F2AF29]/90 shadow-lg hover:shadow-[#F2AF29]/30'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#070A15] border-t-transparent rounded-full animate-spin" />
                    <span>Converting...</span>
                  </div>
                ) : (
                  'Convert Now'
                )}
              </button>
            </>
          ) : (
            <>
              {/* Limit Order Content */}
              <div className="bg-[#0A0D19] rounded-xl p-4 my-6 border border-[#1E2235]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#E8E8E87A]">Current Price</span>
                  <span className="text-white">
                    {exchangeRate ? `1 ${fromSymbol} = ${exchangeRate.toFixed(6)} ${toSymbol}` : '--'}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block text-[#E8E8E87A] text-sm mb-2">Limit Price</label>
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    className="w-full bg-[#1E2235] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F2AF29]"
                    placeholder={`Price in ${toSymbol}`}
                    min="0"
                    step="any"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#E8E8E87A]">Fee</span>
                  <span className="text-[#00F66C]">0.1%</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={() => alert(`Limit order placed: ${fromAmount} ${fromSymbol} at ${limitPrice} ${toSymbol}`)}
                disabled={!fromAmount || !limitPrice || isLoading}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  !fromAmount || !limitPrice || isLoading
                    ? 'bg-[#439A86]/50 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#F2AF29] text-[#070A15] hover:bg-[#F2AF29]/90 shadow-lg hover:shadow-[#F2AF29]/30'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#070A15] border-t-transparent rounded-full animate-spin" />
                    <span>Placing Order...</span>
                  </div>
                ) : (
                  'Place Limit Order'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}