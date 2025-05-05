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
      <div>
        <div className="flex items-center space-x-10 p-1 -ml-5 border-b border-t border-[#141E32] ">
          {/* Custom Crypto Selector */}
          <div className="relative flex items-center mr-4  px-2" ref={dropdownRef}>
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
            
            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                {cryptoOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${
                      selectedCrypto === option.value ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Price Information Columns */}
          <div className="flex gap-4 ml-15 space-x-10 mt-2">
            <div>
              <span className='text-white text-[16px]'>$95,324</span>
              <p className='text-[#089981] text-[12px]'>+0.23% +1.23</p>
            </div>
            {/* 24h Column */}
            <div className="">
              <span className="text-[#A4A4A4] text-xs">24h</span>
              <p className="font-semibold text-[16px]">$95,362</p>
            </div>
            
            {/* High Column */}
            <div className="">
              <span className="text-[#A4A4A4] text-[12px]">24High</span>
              <p className="font-semibold text-[16px]">$95,576</p>
            </div>
            
            {/* Low Column */}
            <div className="">
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
      </div>
    )
}

export default TradingSelect