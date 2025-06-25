// src/app/components/components-deposit/crypto-deposit/DepositHistoryComponent.tsx
import React from 'react';
import { DepositHistory, CoinDepost, DateRange, TransactionStatus } from '@/app/data/data'; 
import { Loader } from '@/app/ui/Loader';
import { ChevronDown, CalendarDays } from 'lucide-react';

interface DepositHistoryProps {
    depositHistory: DepositHistory[];
    selectedCoin: CoinDepost | null; 
    dateRange: DateRange;
    isLoading: boolean;
    totalPages: number;
    currentPage: number;
    onDateRangeChange: (field: keyof DateRange, value: string) => void;
    onFilterCoinChange: (coinId: string) => void;
    onPageChange: (page: number) => void;
    currentStatusFilter: string;
    onStatusFilterChange: (status: string) => void;
    allCoins: CoinDepost[]; 
    selectedHistoryCoinId: string; 
}

const DepositHistoryComponent: React.FC<DepositHistoryProps> = ({
    depositHistory,
    dateRange,
    isLoading,
    totalPages,
    currentPage,
    onDateRangeChange,
    onFilterCoinChange,
    onPageChange,
    currentStatusFilter,
    onStatusFilterChange,
    allCoins, 
    selectedHistoryCoinId, 
}) => {
    // Now using allCoins to populate the filter dropdown
    const availableCoinsForFilter = [{ id: 'all', symbol: 'All Coins' }, ...allCoins];

    const statusOptions = [
        { label: 'All Statuses', value: 'all' },
        { label: 'Pending', value: TransactionStatus.PENDING },
        { label: 'Completed', value: TransactionStatus.COMPLETED },
        { label: 'Failed', value: TransactionStatus.FAILED },
    ];

    return (
        <div className="mt-8 p-4 sm:p-6 bg-gradient-to-t from-[rgba(20,30,50,0.0576)] to-[rgba(61,70,104,0.24)] rounded-xl border border-[#439A8633]">
  <h3 className="font-semibold text-lg sm:text-[20px] text-[#E8E8E8] mb-4">Deposit History</h3>

  
  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 mb-4">
    {/* Date Range - Full width on mobile, auto on desktop */}
    <div className="w-full sm:w-auto flex flex-col md:flex-row items-start xs:items-center gap-2">
      <div className="relative w-full xs:w-auto">
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => onDateRangeChange('startDate', e.target.value)}
          className="w-full bg-[#1a232f] text-white p-2 rounded-lg border border-[#439A8633] focus:outline-none focus:ring-1 focus:ring-teal-500 pr-8 text-sm sm:text-base"
        />
        <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
      </div>
      <span className="hidden xs:inline text-gray-400">-</span>
      <div className="relative w-full xs:w-auto">
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => onDateRangeChange('endDate', e.target.value)}
          className="w-full bg-[#1a232f] text-white p-2 rounded-lg border border-[#439A8633] focus:outline-none focus:ring-1 focus:ring-teal-500 pr-8 text-sm sm:text-base"
        />
        <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
      </div>
    </div>

    {/* Coin and Status Filters - Full width on mobile, auto on desktop */}
    <div className="w-full sm:w-auto flex flex-col md:flex-row items-start xs:items-center gap-2">
      <div className="relative w-full xs:w-auto">
        <select
          value={selectedHistoryCoinId}
          onChange={(e) => onFilterCoinChange(e.target.value)}
          className="w-full bg-[#1a232f] text-white p-2 rounded-lg border border-[#439A8633] focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none pr-8 text-sm sm:text-base"
        >
          {availableCoinsForFilter.map(coin => (
            <option key={coin.id} value={coin.id}>
              {coin.symbol}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
      </div>

      <div className="relative w-full xs:w-auto">
        <select
          value={currentStatusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full bg-[#1a232f] text-white p-2 rounded-lg border border-[#439A8633] focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none pr-8 text-sm sm:text-base"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
      </div>
    </div>
  </div>

  {/* Loading/Empty States */}
  {isLoading ? (
    <div className="flex justify-center py-8">
      <Loader />
    </div>
  ) : depositHistory.length === 0 ? (
    <p className="text-center text-gray-400 py-8">No deposit history found for the selected criteria.</p>
  ) : (
    <>
      {/* Table - Horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#439A8633]">
          <thead>
            <tr>
              <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Coin</th>
              <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Network</th>
              <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden xs:table-cell">Date</th>
              <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">Transaction ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#439A8633]">
            {depositHistory.map((deposit) => (
              <tr key={deposit.id}>
                <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm font-medium text-white">{deposit.coin}</td>
                <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-300 hidden sm:table-cell">{deposit.network}</td>
                <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-300">{deposit.amount}</td>
                <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    deposit.status === 'completed' ? 'bg-green-100 text-green-800' :
                    deposit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                  </span>
                </td>
                <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-300 hidden xs:table-cell">{deposit.date}</td>
                <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-300 hidden md:table-cell truncate max-w-[100px] sm:max-w-[150px] lg:max-w-[200px]">
                  {deposit.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - Alternative view for small screens */}
{/*       <div className="mt-4 sm:hidden space-y-3">
        {depositHistory.map((deposit) => (
          <div key={deposit.id} className="p-3 bg-[#1a232f] rounded-lg border border-[#439A8633]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">{deposit.coin}</span>
                <span className="text-xs text-gray-400">{deposit.network}</span>
              </div>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                deposit.status === 'completed' ? 'bg-green-100 text-green-800' :
                deposit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-300">Amount: {deposit.amount}</div>
            <div className="mt-1 text-sm text-gray-300">Date: {deposit.date}</div>
            <div className="mt-1 text-sm text-gray-300 truncate">ID: {deposit.transactionId}</div>
          </div>
        ))}
      </div> */}
    </>
  )}

  {/* Pagination - Responsive */}
  {totalPages > 1 && (
    <div className="flex justify-center mt-4">
      <nav className="flex items-center gap-1 sm:gap-0" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 sm:px-2 sm:py-2 rounded-md sm:rounded-l-md border border-gray-700 bg-gray-800 text-xs sm:text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        
        {/* Show limited page numbers on mobile */}
        <div className="hidden sm:flex">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              aria-current={currentPage === i + 1 ? 'page' : undefined}
              className={`relative inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 border text-xs sm:text-sm font-medium ${
                currentPage === i + 1
                  ? 'z-10 bg-teal-500 border-teal-500 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        
        {/* Mobile pagination - shows current page and total */}
        <div className="sm:hidden flex items-center px-3 py-1 bg-gray-800 border border-gray-700 text-xs text-gray-300">
          {currentPage} of {totalPages}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 sm:px-2 sm:py-2 rounded-md sm:rounded-r-md border border-gray-700 bg-gray-800 text-xs sm:text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  )}
</div>
    );
};

export default DepositHistoryComponent;