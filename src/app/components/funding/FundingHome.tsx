'use client'
import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ChevronDown, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/app/config/api"; 


interface BackendTransaction {
  id: string;
  userId: string; 
  platformAssetId: string;
  amount: number;
  type: "DEPOSIT" | "WITHDRAWAL" | "INTEREST" | "TRADE" | "STAKING" | "SUBSCRIPTION" | "SIGNAL";
  status: "PENDING" | "COMPLETED" | "FAILED" | "PROCESSING";
  createdAt: string;
}

interface BackendAsset {
  id: string;
  symbol: string;
  name: string;
  network?: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface TransactionApiResponse {
  status: number;
  message: string;
  data: BackendTransaction[];
  pagination: {
    pagination: Pagination;
  };
}

interface AssetApiResponse {
  status: number;
  message: string;
  data: BackendAsset[];
}

interface EnhancedTransaction extends BackendTransaction {
  coinSymbol: string;
  coinName: string;
  network: string;
}

interface DateRange {
  startDate: string;
  endDate: string;
}

interface CoinFilterOption {
  id: string;
  symbol: string;
  name: string;
}


const FundingHome: React.FC = () => {
  const router = useRouter();

  // State management
  const [transactions, setTransactions] = useState<EnhancedTransaction[]>([]);
  const [allBackendAssets, setAllBackendAssets] = useState<BackendAsset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);

  // Filter state
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<
    "DEPOSIT" | "WITHDRAWAL" | "INTEREST" | "TRADE" | "STAKING" | "SUBSCRIPTION" | "SIGNAL" | "ALL"
  >("DEPOSIT");

  const [transactionStatusFilter, setTransactionStatusFilter] = useState<
    "PENDING" | "COMPLETED" | "FAILED" | "PROCESSING" | "ALL"
  >("ALL");

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: '',
    endDate: '',
  });

  const [selectedHistoryCoinId, setSelectedHistoryCoinId] = useState<string>('all');

  const getAuthToken = useCallback(() => {
    return localStorage.getItem('authToken') || 'mock-auth-token'; 
  }, []);


  // Fetch assets first
  const fetchAssets = useCallback(async () => {
    setIsLoadingAssets(true);
    try {
      const token = getAuthToken();
      const response = await fetch(API_ENDPOINTS.ASSET.ASSET_LIST, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData: { message?: string } = await response.json();
        throw new Error(errorData.message || 'Failed to fetch assets');
      }

      const result: AssetApiResponse = await response.json();
      setAllBackendAssets(result.data || []);
      setError('');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred while fetching assets.';
      console.error('Error fetching assets:', error);
      setAllBackendAssets([]);
      setError(errorMessage);
    } finally {
      setIsLoadingAssets(false);
    }
  }, [getAuthToken]);

  // Fetch transactions function
  const fetchTransactions = useCallback(async () => {
    if (isLoadingAssets && allBackendAssets.length === 0) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = getAuthToken();

      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });

      if (transactionTypeFilter !== "ALL") {
        params.append('type', transactionTypeFilter);
      }

      if (transactionStatusFilter !== "ALL") {
        params.append('status', transactionStatusFilter);
      }

      if (dateRange.startDate) {
        params.append('startDate', dateRange.startDate);
      }

      if (dateRange.endDate) {
        params.append('endDate', dateRange.endDate);
      }

      const response = await fetch(`${API_ENDPOINTS.TRANSACTION.TRANSACTION_HISTORY}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData: { message?: string } = await response.json();
        throw new Error(errorData.message || 'Failed to load transaction history.');
      }

      const responseData: TransactionApiResponse = await response.json();
      const backendTransactions: BackendTransaction[] = responseData.data || [];
      const pagination = responseData.pagination?.pagination;

      let enhancedTransactions: EnhancedTransaction[] = backendTransactions
        .map(tx => {
          const asset = allBackendAssets.find(asset => asset.id === tx.platformAssetId);
          return {
            ...tx,
            coinSymbol: asset?.symbol || 'N/A',
            coinName: asset?.name || 'Unknown',
            network: asset?.network || 'N/A',
          };
        });

      if (selectedHistoryCoinId !== 'all') {
        enhancedTransactions = enhancedTransactions.filter(tx => {
          const asset = allBackendAssets.find(asset => asset.id === selectedHistoryCoinId);
          return asset && tx.platformAssetId === asset.id;
        });
      }

      setTransactions(enhancedTransactions);

      if (pagination) {
        setTotalPages(pagination.totalPages);
        setCurrentPage(pagination.page);
        setTotalTransactions(pagination.total);
      } else {
        setTotalPages(1);
        setCurrentPage(1);
        setTotalTransactions(enhancedTransactions.length);
      }

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load transaction history. An unknown error occurred.';
      setError(errorMessage);
      console.error('Error fetching transaction history:', err);
      setTransactions([]);
      setTotalPages(1);
      setTotalTransactions(0);
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    limit,
    transactionTypeFilter,
    transactionStatusFilter,
    dateRange.startDate,
    dateRange.endDate,
    selectedHistoryCoinId,
    getAuthToken,
    allBackendAssets,
    isLoadingAssets
  ]);

  // Load assets on component mount
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Load transactions when assets are ready or filters change
  useEffect(() => {
    if (!isLoadingAssets) {
      fetchTransactions();
    }
  }, [fetchTransactions, isLoadingAssets]);

  // Event handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleTypeFilterChange = (
    type: "DEPOSIT" | "WITHDRAWAL" | "INTEREST" | "TRADE" | "STAKING" | "SUBSCRIPTION" | "SIGNAL" | "ALL"
  ) => {
    setTransactionTypeFilter(type);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (
    status: "PENDING" | "COMPLETED" | "FAILED" | "PROCESSING" | "ALL"
  ) => {
    setTransactionStatusFilter(status);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (field: keyof DateRange, value: string) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleFilterCoinChange = (coinId: string) => {
    setSelectedHistoryCoinId(coinId);
    setCurrentPage(1);
  };

  // Generate coin options from assets
  const allCoins: CoinFilterOption[] = [
    { id: 'all', symbol: 'ALL', name: 'All Coins' },
    ...allBackendAssets.map(asset => ({
      id: asset.id,
      symbol: asset.symbol,
      name: asset.name
    }))
  ];

  const transactionTypeTabs = ["DEPOSIT", "WITHDRAWAL", "INTEREST", "TRADE"];
  const transactionStatuses = ["PENDING", "COMPLETED", "FAILED", "PROCESSING"];

  // Helper functions
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-600 text-white';
      case 'PENDING':
        return 'bg-yellow-600 text-white';
      case 'FAILED':
        return 'bg-red-600 text-white';
      case 'PROCESSING':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="p-1 md:p-8">
      <div className="flex items-center">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6 mr-3" />
        </button>
        <span className="text-lg">Funding History</span>
      </div>

      <div className="mt-10">
        <p className="text-[24px]">Funding Account History</p>

        {/* Transaction Type Tabs */}
        <div className="flex space-x-4 md:space-x-8 mb-6 md:mb-8 overflow-x-auto border-b border-[#141E325C]">
          {transactionTypeTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTypeFilterChange(tab as "DEPOSIT" | "WITHDRAWAL" | "INTEREST" | "TRADE" | "STAKING" | "SUBSCRIPTION" | "SIGNAL" |  "ALL")}
              className={`pb-2 transition-colors whitespace-nowrap text-sm md:text-base ${
                transactionTypeFilter === tab
                  ? "border-b-2 border-[#439A86]"
                  : ""
              }`}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => handleTypeFilterChange("ALL")}
            className={`pb-2 transition-colors whitespace-nowrap text-sm md:text-base ${
              transactionTypeFilter === "ALL"
                ? "border-b-2 border-[#439A86]"
                : ""
            }`}
          >
            All
          </button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Coin Filter */}
          <div className="relative">
            <select
              value={selectedHistoryCoinId}
              onChange={(e) => handleFilterCoinChange(e.target.value)}
              className="appearance-none bg-[#0A0D19] border border-[#3E455B] text-white py-2 px-3 pr-8 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#439A86]"
            >
              {allCoins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.symbol}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={transactionStatusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value as "PENDING" | "COMPLETED" | "FAILED" | "PROCESSING" | "ALL")}
              className="appearance-none bg-[#0A0D19] border border-[#3E455B] text-white py-2 px-3 pr-8 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#439A86]"
            >
              <option value="ALL">All Status</option>
              {transactionStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Start Date */}
          <div className="relative">
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
              className="bg-[#0A0D19] border border-[#3E455B] text-white py-2 px-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#439A86]"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <Calendar className="h-4 w-4" />
            </div>
          </div>

          {/* End Date */}
          <div className="relative">
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
              className="bg-[#0A0D19] border border-[#3E455B] text-white py-2 px-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#439A86]"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Transactions Table */}
        {isLoading || isLoadingAssets ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#439A86]"></div>
            <p className="ml-3">Loading {isLoadingAssets ? 'assets...' : 'transactions...'}</p>
          </div>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#0A0D19] rounded-md overflow-hidden">
              <thead>
                <tr className="bg-[#141E32] text-left text-sm text-[#797A80]">
                  <th className="py-3 px-4 uppercase font-semibold">Date/Time</th>
                  <th className="py-3 px-4 uppercase font-semibold">Type</th>
                  <th className="py-3 px-4 uppercase font-semibold">Coin</th>
                  <th className="py-3 px-4 uppercase font-semibold">Network</th>
                  <th className="py-3 px-4 uppercase font-semibold">Amount</th>
                  <th className="py-3 px-4 uppercase font-semibold">Status</th>
                  <th className="py-3 px-4 uppercase font-semibold">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-[#1A2C3F] text-white text-sm">
                    <td className="py-3 px-4">{formatDate(tx.createdAt)}</td>
                    <td className="py-3 px-4">{tx.type}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{tx.coinSymbol}</div>
                        <div className="text-xs text-gray-400">{tx.coinName}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{tx.network}</td>
                    <td className="py-3 px-4">{tx.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono">{tx.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <p>No transactions found for the selected criteria.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="bg-[#141E32] text-white px-3 py-2 rounded-md disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-[#141E32] text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
            </div>

            <div className="text-white text-sm">
              <span>Page {currentPage} of {totalPages}</span>
              <span className="ml-4 text-gray-400">
                ({totalTransactions} total transactions)
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-[#141E32] text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="bg-[#141E32] text-white px-3 py-2 rounded-md disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundingHome;