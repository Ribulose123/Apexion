'use client'
import React, {useState, useRef, useEffect} from 'react'
import { ChevronDown } from 'lucide-react';
import { RiErrorWarningLine } from "react-icons/ri";

const TradingSelect = () => {
    const [selectedCrypto, setSelectedCrypto] = useState('BTC/USDT');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const cryptoOptions = [
      { value: 'BTC/USDT', label: 'BTC/USDT' },
      { value: 'ETH/USDT', label: 'ETH/USDT' },
      { value: 'BNB/USDT', label: 'BNB/USDT' },
      { value: 'SOL/USDT', label: 'SOL/USDT' },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (option: string): void => {
      setSelectedCrypto(option);
      setIsOpen(false);
    };
  
    return (
      <div className="w-full">
        {/* Desktop version */}
        <div className="hidden md:flex md:flex-row md:items-center md:gap-20 md:space-x-10 md:p-1 border-b md:border-t border-[#141E32]">
          {/* Custom Crypto Selector */}
          <div className="relative flex items-center mr-4 px-2" ref={dropdownRef}>
            <div 
              className="flex items-center rounded-md cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                <span className="text-xs font-bold">₿</span>
              </div>
              
              <div className="bg-transparent p-2 text-white font-medium text-[16px] pr-6">
                {selectedCrypto}
              </div>
              
              <div className="absolute -right-10 text-gray-400 flex gap-1">
                <ChevronDown size={26} className={`text-white ${isOpen ? 'rotate-180' : ''} transition-transform`} />
                <RiErrorWarningLine size={25} />
              </div>
            </div>
            
            {/* Dropdown Menu (Desktop) */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                {cryptoOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${
                      selectedCrypto === option.value ? 'bg-gray-700' : ''
                    } text-white`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Price Information Columns (Desktop) */}
          <div className="flex gap-4 space-x-10">
            <div>
              <span className='text-white text-[16px]'>$95,324</span>
              <p className='text-[#089981] text-[12px]'>+0.23% +1.23</p>
            </div>
            {/* 24h Column */}
            <div>
              <span className="text-[#A4A4A4] text-xs">24h</span>
              <p className="font-semibold text-[16px]">$95,362</p>
            </div>
            
            {/* High Column */}
            <div>
              <span className="text-[#A4A4A4] text-[12px]">24High</span>
              <p className="font-semibold text-[16px]">$95,576</p>
            </div>
            
            {/* Low Column */}
            <div>
              <span className="text-[#A4A4A4] text-[12px]">24Low</span>
              <p className="font-semibold text-[16px]">$89,481</p>
            </div>
            
            {/* Change Column */}
            <div>
              <span className="text-[#A4A4A4] text-[13px]">24 Amount (BTC)</span>
              <p className="text-[16px] font-medium">+$2901.83</p>
            </div>
            
            {/* Volume Column */}
            <div>
              <span className="text-[#A4A4A4] text-[13px]">24hVolume(USSD)</span>
              <p className="text-[16px] font-semibold">$58.9M</p>
            </div>
          </div>
        </div>

        {/* Mobile version (matches image) */}
        <div className="md:hidden flex flex-col rounded-lg overflow-hidden">
          {/* Header with currency selector */}
          <div className="flex items-center justify-between p-4 border-b border-[#141E32]">
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-white">₿</span>
                </div>
                
                <span className="text-white font-medium text-sm mr-1">
                  {selectedCrypto}
                </span>
                
                <ChevronDown size={16} className={`text-white ${isOpen ? 'rotate-180' : ''} transition-transform`} />
              </div>
              
              {/* Dropdown Menu (Mobile) */}
              {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-36 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                  {cryptoOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${
                        selectedCrypto === option.value ? 'bg-gray-700' : ''
                      } text-white text-sm`}
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <span className="text-white font-medium mr-2">$95,324</span>
              <RiErrorWarningLine size={16} className="text-gray-400" />
            </div>
          </div>
          
          {/* Price info section (Mobile) */}
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">24h Change</span>
              <p className="text-green-500 font-medium text-sm">+0.23% +$1.23</p>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">24h High</span>
              <p className="text-white font-medium text-sm">$95,576</p>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">24h Low</span>
              <p className="text-white font-medium text-sm">$89,481</p>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">24h Volume</span>
              <p className="text-white font-medium text-sm">$58.9M</p>
            </div>
          </div>
          
          {/* Trade button (Mobile) */}
          <div className="p-4 pt-0">
            <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-md font-medium">
              Trade
            </button>
          </div>
        </div>
      </div>
    )
}

export default TradingSelect