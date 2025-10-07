'use client'
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { API_ENDPOINTS } from '../config/api';

type TabId = 'dashboard' | 'positions' | 'history';

interface TabItem {
  id: TabId;
  label: string;
}

interface UserAsset {
 id: string;
 userId: string;
}

interface UserTrade {
 id: string;
 
tradePair: string;
 type: 'Long' | 'Short';
 isolated: string;
 pnl: string;
 
unrealizedPnL: number;
 entryPrice: string;
 exitPrice: string;
 quantity: string;
 trader: string;
 status: 'OPEN' | 'CLOSED' | 'CANCELLED';
 createdAt: string;
 updatedAt: string;
}

interface TradesApiResponse {
 status: number;
 message: string;
 data: {
  trades: UserTrade[];
  pagination: {
   page: number;
   limit: number;
   total: number;
   totalPages: number;
  };
 };
}


interface CopyStats {
 id: string;
 userId: string;
 totalAssetsUSDT: number;
 profitUSDT: number;
 activeCopyPositions: number;
 averageReturnPercent: number;
 bestTradeUSDT: number;
 copyTradingPnLUSDT: number;
 netProfitUSDT: number;
 successfulTrades: number;
 totalCopyTrades: number;
 totalFeesPaidUSDT: number;
 totalInvestedUSDT: number;
 winRate: number;
 worstTradeUSDT: number;
 createdAt: string;
 updatedAt: string;
}

interface UserSignal {
 id: string;
 userId: string;
 stakings: number;
 strength: number;
}

interface UserStaking {
 id: string;
 userId: string;
}

interface UserProfile {
 id: string;
 fullName: string;
 email: string;
 isEmailVerified: boolean;
 kycImage: string | null;
 kycStatus: string;
 referralCode: string;
 subscriptionBalance: number;
 twoFactorEnabled: boolean;
 createdAt: string;
 updatedAt: string;
 allowWithdrawal: boolean;
 copyStats: CopyStats;
 userAssets: UserAsset[];
 userSignal: UserSignal;
 userStaking: UserStaking;
}

interface ApiResponse {
 status: number;
 message: string;
 data: UserProfile;
}




const CryptoTradingDashboard = () => {
 const [activeTab, setActiveTab] = useState<'dashboard' | 'positions' | 'history'>('history');
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string>('');
 const [userData, setUserData] = useState<UserProfile | null>(null);
 const [currentPage, setCurrentPage] = useState<number>(1);
 const [itemsPerPage] = useState<number>(14);
 const [tradesLoading, setTradesLoading] = useState(false);
 const [userTrades, setUserTrades] = useState<UserTrade[]>([]);


 useEffect(() => {
  const fetchUserData = async () => {
   setIsLoading(true);
   setError('');

   try {
    const token = localStorage.getItem('authToken');
    if (!token) {
     setError("Authentication required");
     setIsLoading(false);
     return;
    }

    const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
     method: 'GET',
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     }
    });

    if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    
    console.log('API response', result);
    
    if (result.status === 200 && result.data) {
     setUserData(result.data);
    } else {
     throw new Error(result.message || 'Failed to fetch user data');
    }
   } catch (err) {
    console.error('Failed to fetch data', err);
    setError(err instanceof Error ? err.message : 'An unknown error occurred');
   } finally {
    setIsLoading(false);
   }
  };

  fetchUserData();
 }, []);

 const fetchUserTrade = useCallback(async()=>{
  setTradesLoading(true)
  try{
     const token = localStorage.getItem('authToken');
   if (!token) {
    throw new Error("Authentication required");
   }
   const response = await fetch(API_ENDPOINTS.TRADERS.USER_TRADERS, {
     method: 'GET',
    headers: {
     Authorization: `Bearer ${token}`,
     "Content-Type": "application/json",
    }
   })

   if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
   }

   const result: TradesApiResponse = await response.json();

   if (result.status === 200 && result.data) {
    setUserTrades(result.data.trades);
   } else {
    throw new Error(result.message || 'Failed to fetch trades');
   }
  }catch(err){
    console.error('Failed to fetch trades', err);
  } finally{
    setTradesLoading(false)
  }
 },[])


 useEffect(()=>{
  if(activeTab === 'history'){
    fetchUserTrade()
  }
 },[activeTab, fetchUserTrade])

 
 const totalPages = Math.ceil(userTrades.length / itemsPerPage);
 const currentTransactions = useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return userTrades.slice(startIndex, endIndex);
 }, [currentPage, userTrades, itemsPerPage]);

 const handlePageChange = useCallback(
  (page: number) => {
   if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
   }
  },
  [totalPages]
 );

  const renderPaginationButtons = useCallback(() => {
  const pagesToShow = 7;
  const buttons = [];
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (startPage > 1) {
   buttons.push(
    <button
     key={1}
     onClick={() => handlePageChange(1)}
     className="px-3 py-1 rounded-md hover:bg-gray-700 text-gray-400"
    >
     1
    </button>
   );
   if (startPage > 2) {
    buttons.push(
     <span key="dots-start" className="px-3 py-1 text-[#7D8491DE]">
      ...
     </span>
    );
   }
  }

  for (let i = startPage; i <= endPage; i++) {
   buttons.push(
    <button
     key={i}
     onClick={() => handlePageChange(i)}
     className={`px-3 py-1 rounded-md text-[#7D8491DE] ${
      currentPage === i ? "bg-[#7D849114] text-white font-semibold" : "hover:bg-gray-700"
     }`}
    >
     {i}
    </button>
   );
  }

  if (endPage < totalPages) {
   if (endPage < totalPages - 1) {
    buttons.push(
     <span key="dots-end" className="px-3 py-1 text-gray-400">
      ...
     </span>
    );
   }
   buttons.push(
    <button
     key={totalPages}
     onClick={() => handlePageChange(totalPages)}
     className="px-3 py-1 rounded-md hover:bg-gray-700 text-gray-400"
    >
     {totalPages}
    </button>
   );
  }

  return buttons;
 }, [currentPage, totalPages, handlePageChange]);


 const totalEquity = userData?.copyStats.totalAssetsUSDT || 0;
 const availableBalance = userData?.subscriptionBalance || 0;

 // Mock data for 'positions' tab or other uses
 
 if (isLoading) {
  return (
   <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div className="text-center">
     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
     <p className="mt-4">Loading user data...</p>
     </div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div className="text-center text-red-500">
     <p>Error: {error}</p>
     <button 
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
     >
      Retry
     </button>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-900 text-white">
  <div className="px-6 py-8">
    {/* User Profile Section */}
    <div className="flex items-center gap-4 mb-8">
      <Image
        src="/img/Avatar DP.png"
        alt="User Avatar"
        width={100}
        height={100}
        className="w-20 h-20 rounded-full border-4 border-gray-700"
        unoptimized
      />
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">USER CENTER (FOLLOWER)</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>@{userData?.fullName || 'User'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            📅 Registered {userData ? Math.floor((new Date().getTime() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0} Day(s) Ago
          </span>
        </div>
      </div>
    </div>

    {/* Balance Cards Section */}
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: "Total Equity", value: totalEquity },
          { label: "Available Balance", value: availableBalance },
          { label: "Margin Balance", value: 0 },
          { label: "Unrealized P&L", value: 0 }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-3">
              <span>{item.label}</span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">ⓘ</button>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {item.value.toFixed(2)}<span className="text-gray-500 text-lg ml-1">USDT</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 gap-4">
        <div className="flex flex-col sm:flex-row gap-6 text-center sm:text-left">
          <div>
            <span className="text-gray-500 text-sm">Realized Profit Share </span>
            <span className="font-bold text-gray-800">0.00</span>
            <span className="text-gray-400 text-xs ml-1">USDT/DAY</span>
          </div>
          <div>
            <span className="text-gray-500 text-sm">Unrealized Profit Share </span>
            <span className="font-bold text-gray-800">0.00</span>
            <span className="text-gray-400 text-xs ml-1">USDT/DAY</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-sm">
          📊 Assets History
        </button>
      </div>
    </div>

    {/* Tabs Section */}
    <div className="flex gap-8 mb-6 border-b border-gray-700 pb-2">
      {([
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'positions', label: 'Open Positions' },
        { id: 'history', label: 'Order History' }
      ]as TabItem[]).map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-3 px-1 relative transition-colors ${
            activeTab === tab.id
              ? 'text-yellow-400 font-semibold'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"></div>
          )}
        </button>
      ))}
    </div>

    {/* Filter Section */}
   {/*  <div className="mb-6">
      <button className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm hover:bg-gray-700 text-gray-300 transition-colors">
        {selectedTrader}
        <ChevronDown className="w-4 h-4" />
      </button>
    </div> */}

    {/* Order History Table */}
    {activeTab === 'history' && (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
          {tradesLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
              <span className="ml-3 text-gray-300">Loading trades...</span>
            </div>
          ) : currentTransactions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-lg mb-2">No trades history available</div>
              <div className="text-sm">Trades from followed traders will appear here</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-750">
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Trading Pair</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">PNL</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Qty</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Order ID</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((trade, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-white">{trade.
tradePair}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1 font-medium`}>
                          <span className="text-sm">({trade.
unrealizedPnL})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{trade.quantity}</td>
                      
                      <td className="px-6 py-4 text-gray-400 font-mono text-sm">{trade.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {activeTab === 'history' && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border border-gray-700 transition-colors ${
                currentPage === 1 
                  ? 'opacity-50 cursor-not-allowed text-gray-500' 
                  : 'text-gray-300 hover:bg-gray-700 hover:border-gray-600'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {renderPaginationButtons()}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border border-gray-700 transition-colors ${
                currentPage === totalPages 
                  ? 'opacity-50 cursor-not-allowed text-gray-500' 
                  : 'text-gray-300 hover:bg-gray-700 hover:border-gray-600'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    )}
  </div>
</div>
);
};

export default CryptoTradingDashboard;