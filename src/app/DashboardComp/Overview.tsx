import { useState } from 'react';

import { Eye, EyeOff, Plus, Minus, ArrowLeftRight } from 'lucide-react';
import Link from 'next/link';
export default function Overview() {
 
  const [hideBalance, setHideBalance] = useState(false);

 

  const toggleBalanceVisibility = () => {
    setHideBalance(!hideBalance);
  };

  return (
    <div className="absolute top-full left-0 mt-3 w-[300px] bg-[#0D1B2A] text-white rounded-xl shadow-xl z-50 p-4  gap-4">
      <div className="flex items-center  gap-2 mb-2">
        <div className="flex items-center">
          <span className="text-gray-400 text-sm">Assets Overview</span>
          
        </div>
        
        <button onClick={toggleBalanceVisibility} className="text-gray-400 hover:text-white">
          {hideBalance ? 
            <EyeOff size={18} /> : 
            <Eye size={18} />
          }
        </button>
      </div>

      <div className="mt-1 mb-4">
        <h2 className="text-2xl font-bold">
          {hideBalance ? "••••••" : "34.71"}
          <span className="text-sm text-gray-400 ml-1">USD</span>
        </h2>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="text-center">
          <div className="flex flex-col items-center">
            <Plus className="w-5 h-5 mb-1" />
            <span className="text-xs">Deposit</span>
          </div>
        </button>

        <button className="text-center">
          <div className="flex flex-col items-center">
            <Minus className="w-5 h-5 mb-1" />
            <span className="text-xs">Withdraw</span>
          </div>
        </button>

        <button className="text-center">
          <div className="flex flex-col items-center">
            <ArrowLeftRight className="w-5 h-5 mb-1" />
            <span className="text-xs">Transfer</span>
          </div>
        </button>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        <Link href='/asset' className="flex items-center p-2 hover:bg-[#152232] rounded-lg cursor-pointer">
          <div className="w-8 h-8 bg-[#152232] rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12V8H6a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0 0 4h2v-4h-2z" />
            </svg>
          </div>
          <span>Assets</span>
        </Link>

        

        <Link href ='/copy' className="flex items-center p-2 hover:bg-[#152232] rounded-lg cursor-pointer">
          <div className="w-8 h-8 bg-[#152232] rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span>Copy Trading</span>
        </Link>

        <Link href='/deposit' className="flex items-center p-2 hover:bg-[#152232] rounded-lg cursor-pointer">
          <div className="w-8 h-8 bg-[#152232] rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span>Earn</span>
        </Link>
      </div>
    </div>
  );
}