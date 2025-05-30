// src/components/crypto-deposit/DepositHistory.tsx
import React, { useState } from 'react';
import { CoinDepost, DepositHistory, DateRange } from '@/app/data/data';
import {  ArrowRight, Loader, Funnel } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DepositHistoryProps {
  depositHistory: DepositHistory[];
  selectedCoin: CoinDepost | null;
  dateRange: DateRange;
  isLoading: boolean;
  totalPages: number;
  onDateRangeChange: (field: keyof DateRange, value: string) => void;
  onFilterCoinChange: (coinId: string) => void;
  onPageChange: (page: number) => void;
}

const DepositHistoryComponent: React.FC<DepositHistoryProps> = ({
  depositHistory,
  selectedCoin,
  dateRange,
  isLoading,
  totalPages,
  onDateRangeChange,
  onFilterCoinChange,
  onPageChange
}) => {
  const [filteredCoin, setFilteredCoin] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterCoinChange = (coin: string) => {
    setFilteredCoin(coin);
    onFilterCoinChange(coin);
    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof DateRange) => {
    onDateRangeChange(field, e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="mt-6">
      <div className="bg-[#141E323D] rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-medium text-lg">Deposit History</h2>
          <Link href='/fund' className="bg-[#6967AE] text-white text-sm px-4 py-2 rounded-lg flex items-center">
            View All <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        
        <div className="mb-4 flex items-center gap-2">
          <div className="relative bg-[#10131F] border  border-white/10 px-4 py-3.5 md:w-[15rem] w-[90%] rounded-full ">
            <select
              className=" text-white text-sm  appearance-none pr-8 border-none"
              value={filteredCoin}
              onChange={(e) => handleFilterCoinChange(e.target.value)}
            >
              <option value="all">All Coins</option>
              {selectedCoin && (
                <option value={selectedCoin.id}>{selectedCoin.symbol}</option>
              )}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="bg-[#10131F] border  border-white/10 px-3 py-2 rounded-full  items-center space-x-2 hidden md:flex">
            <input 
              type="date" 
              className=" text-white text-sm  border-none"
              value={dateRange.startDate}
              onChange={(e) => handleDateChange(e, 'startDate')}
            />
            <span className="text-gray-400">→</span>
            <input 
              type="date" 
              className=" text-white text-sm px-3 py-1 rounded-md border-none"
              value={dateRange.endDate}
              onChange={(e) => handleDateChange(e, 'endDate')}
            />
          </div>
          <div className='w-15 h-15 rounded-full bg-[#10131F]  md:hidden flex items-center justify-center'>
            <Funnel size={26} className='text-white m-2' />
          </div>
        </div>

        {/* Table Header */}
        <div className="md:grid grid-cols-7 text-sm text-gray-400 border-b border-gray-800 pb-2 hidden">
          <div>Order Number</div>
          <div>Time</div>
          <div>Fiat</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Transaction Fees</div>
          <div>Status</div>
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin text-indigo-500" size={24} />
          </div>
        ) : depositHistory.length > 0 ? (
          <div>
            {depositHistory.map((item, index) => (
              <div key={item.id || index} className="grid grid-cols-7 text-sm text-white py-3 border-b border-gray-800">
                <div>{item.orderNumber}</div>
                <div>{item.time}</div>
                <div>{item.fiat}</div>
                <div>{item.type}</div>
                <div>{item.amount}</div>
                <div>{item.transactionFees}</div>
                <div>
                  <span 
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      item.status.toLowerCase() === 'completed' ? 'bg-green-900 text-green-400' : 
                      item.status.toLowerCase() === 'pending' ? 'bg-yellow-900 text-yellow-400' :
                      'bg-red-900 text-red-400'
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                <button 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1 ? 'bg-gray-800 text-gray-500' : 'bg-gray-700 text-white'
                  }`}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages ? 'bg-gray-800 text-gray-500' : 'bg-gray-700 text-white'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="p-4 rounded-lg w-24 h-24 flex items-center justify-center">
              <Image src='/img/empty-folder (3) 1.png' alt='empty' width={400} height={400}/>
            </div>
            <p className="text-center text-[13px] -mt10">No data</p>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositHistoryComponent;