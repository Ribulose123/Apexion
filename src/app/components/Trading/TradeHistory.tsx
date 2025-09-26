import { API_ENDPOINTS } from "@/app/config/api";
import React, { useEffect, useState } from "react";

interface Trade {
  id: string;
  tradePair: string;
  price: number;
  amount: number;
  side: "BUY" | "SELL";
  executionStatus: string;
  realizedPnL: number;
  createdAt: string;
  updatedAt: string;
}

interface TradeHistoryResponse {
  status: number;
  message: string;
  data: {
    trades: Trade[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
    summary: {
      personalTrades: number;
      copiedTrades: number;
      totalTrades: number;
    };
  };
}

const TradeHistory = () => {
  const [tradeHistory, setTradeHistory] = useState<Trade[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    const fetchTradeHistory = async () => {
      const token = localStorage.getItem("authToken");
      setIsLoadingHistory(true);
      setHistoryError("");

      if (!token) {
        setHistoryError("No authentication token found");
        setIsLoadingHistory(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.TRADERS.TRADER_HOSTORY, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TradeHistoryResponse = await response.json();

        if (data.status === 200 && data.data.trades) {
          setTradeHistory(data.data.trades);
        }
      } catch (err) {
        console.error("Error fetching trade history:", err);
        setHistoryError("Failed to load trade history. Please try again.");
      } finally {
        setIsLoadingHistory(false);
      }
    };
    fetchTradeHistory();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-[#141E323D] rounded-2xl shadow-2xl  overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Trade History
          </h2>
          {tradeHistory.length > 0 && (
            <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium text-gray-300">
              {tradeHistory.length} trades
            </span>
          )}
        </div>
      </div>

      {/* Error State */}
      {historyError && (
        <div className="mx-4 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-400">{historyError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoadingHistory ? (
        <div className="py-12 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-3"></div>
          <p className="text-gray-400 text-sm">Loading trade history...</p>
        </div>
      ) : tradeHistory.length === 0 && !historyError ? (
        /* Empty State */
        <div className="py-12 flex flex-col items-center justify-center text-gray-500">
          <svg className="h-12 w-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium mb-1">No trades yet</p>
          <p className="text-sm">Your trade history will appear here</p>
        </div>
      ) : (
        /* Trade List */
        <div className="divide-y divide-gray-700">
          {tradeHistory.map((trade) => (
            <div key={trade.id} className="px-6 py-4 hover:bg-gray-700/30 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    trade.side === "BUY" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {trade.side === "BUY" ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <span className={`font-semibold ${
                      trade.side === "BUY" ? "text-green-400" : "text-red-400"
                    }`}>
                      {trade.side}
                    </span>
                    <span className="text-gray-300 ml-1">{trade.tradePair}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-100">
                    {formatCurrency(trade.price)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatCurrency(trade.amount)} units
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 text-gray-400">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(trade.createdAt)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    trade.executionStatus === 'FILLED' 
                      ? 'bg-green-500/20 text-green-400'
                      : trade.executionStatus === 'PENDING'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {trade.executionStatus}
                  </span>
                </div>
                <div className={`font-semibold ${
                  trade.realizedPnL >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {trade.realizedPnL >= 0 ? '+' : ''}{formatCurrency(trade.realizedPnL)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TradeHistory;