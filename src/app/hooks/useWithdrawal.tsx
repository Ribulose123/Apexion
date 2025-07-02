'use client'
import { useState, useEffect, useCallback } from "react";
import {
  CoinDepost,
  Network,
  DepositHistory,
  DateRange,
  AssetFromBackend,
} from "../data/data";
import { API_ENDPOINTS } from "../config/api";
import { jwtDecode } from "jwt-decode";

interface BackendTransaction {
  id: string;
  userId: string;
  platformAssetId: string;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
}

export const useWithdrawal = () => {
  const [coins, setCoins] = useState<CoinDepost[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState<
    DepositHistory[]
  >([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinDepost | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [depositAddress, setDepositAddress] = useState("");
  const [allBackendAssets, setAllBackendAssets] = useState<AssetFromBackend[]>(
    []
  );
  const [isLoadingCoins, setIsLoadingCoins] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); // This is the state
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  const getAuthToken = useCallback(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) {
      setError("Authentication token not found. Please log in.");
      return null;
    }
    return token;
  }, []);

  const getUserIdFromToken = useCallback((): string | null => {
    const token = getAuthToken();
    if (!token) {
      return null;
    }
    try {
      const decoded: { id?: string } = jwtDecode(token);
      if (decoded && decoded.id) {
        return decoded.id;
      }
      setError("User ID not found in token.");
      return null;
    } catch (e) {
      setError("Invalid or malformed token.");
      console.error("Error decoding token:", e);
      return null;
    }
  }, [getAuthToken]);

  const fetchCoins = useCallback(async () => {
        setIsLoadingCoins(true);
        setError(null);
        try {
            const token = getAuthToken();
            if (!token) return;

            const response = await fetch(API_ENDPOINTS.ASSET.ASSET_LIST, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData: { message?: string } = await response.json();
                throw new Error(errorData.message || 'Failed to load assets.');
            }

            const responseData = await response.json();
            let backendAssets: AssetFromBackend[];

            if (Array.isArray(responseData)) {
                backendAssets = responseData;
            } else if (responseData && Array.isArray(responseData.data)) {
                backendAssets = responseData.data;
            } else {
                if (responseData && typeof responseData === 'object' && responseData.id) {
                    backendAssets = [responseData as AssetFromBackend];
                } else {
                    throw new Error('Unexpected API response structure for assets.');
                }
            }

            setAllBackendAssets(backendAssets);

            const uniqueCoinsMap = new Map<string, CoinDepost>();
            const uniqueNetworksMap = new Map<string, Network>();

            backendAssets.forEach(asset => {
                const coinSymbol = asset.symbol;
                if (!uniqueCoinsMap.has(coinSymbol)) {
                    uniqueCoinsMap.set(coinSymbol, {
                        id: asset.id,
                        name: asset.name,
                        symbol: asset.symbol,
                        networks: [],
                    });
                }
                const coinEntry = uniqueCoinsMap.get(coinSymbol)!;
                if (!coinEntry.networks.includes(asset.network)) {
                    coinEntry.networks.push(asset.network);
                }

                const networkId = asset.network.toLowerCase();
                if (!uniqueNetworksMap.has(networkId)) {
                    uniqueNetworksMap.set(networkId, {
                        id: networkId,
                        name: asset.network,
                        chain: asset.network,
                        des: 'deposit completion: X confirmation(s)',
                        min: `Min. Deposit Amount: 0 ${asset.symbol}`,
                    });
                }
            });

            const processedCoins = Array.from(uniqueCoinsMap.values());
            const derivedNetworks = Array.from(uniqueNetworksMap.values());

            setCoins(processedCoins);
            setNetworks(derivedNetworks);

            if (processedCoins.length > 0 && !selectedCoin) {
                setSelectedCoin(processedCoins[0]);
            }
            if (derivedNetworks.length > 0 && !selectedNetwork) {
                const defaultNetwork = derivedNetworks.find(net => net.id === 'bep20' || net.id === 'erc20') || derivedNetworks[0];
                setSelectedNetwork(defaultNetwork);
            }

        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load assets. An unknown error occurred.';
            setError(errorMessage);
            console.error('Error fetching coins:', err);
        } finally {
            setIsLoadingCoins(false);
        }
    }, [selectedCoin, selectedNetwork, getAuthToken]);

    const fetchDepositAddress = useCallback(async () => {
        if (!selectedCoin || !selectedNetwork) {
            setDepositAddress('');
            return;
        }

        setIsLoadingAddress(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockAddress = `0x${Math.random().toString(16).substring(2, 42)}`;
            setDepositAddress(mockAddress);

        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load deposit address. An unknown error occurred.';
            setError(errorMessage);
            console.error('Error fetching deposit address:', err);
            setDepositAddress('');
        } finally {
            setIsLoadingAddress(false);
        }
    }, [selectedCoin, selectedNetwork]);

    
     const fetchDepositHistory = useCallback(async (
        pageParam?: number,
        limitParam?: number,
        transactionTypeFilterParam?: string,
        transactionStatusFilterParam?: string,
        coinIdFilterParam?: string
    ) => {
        const page = pageParam !== undefined ? pageParam : currentPage;
        const limit = limitParam !== undefined ? limitParam : 10;
        const transactionTypeFilter = transactionTypeFilterParam !== undefined ? transactionTypeFilterParam : 'DEPOSIT';
        const transactionStatusFilter = transactionStatusFilterParam !== undefined ? transactionStatusFilterParam : 'all';
        const coinIdFilter = coinIdFilterParam !== undefined ? coinIdFilterParam : 'all';
    
        setIsLoadingHistory(true);
        setError(null);
        try {
            const token = getAuthToken();
            if (!token) return;
    
            const userId = getUserIdFromToken();
            if (!userId) {
                setError("User ID not available for fetching history.");
                return;
            }
    
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                type: transactionTypeFilter,
            });
    
            
    
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
    
            const responseData = await response.json();
            const backendTransactions: BackendTransaction[] = responseData.data || [];
            const pagination = responseData.pagination?.pagination;
    
            let mappedHistory: DepositHistory[] = backendTransactions
                .filter(tx => {
                    const txDate = new Date(tx.createdAt);
                    const start = new Date(dateRange.startDate);
                    const end = new Date(dateRange.endDate);
                    end.setDate(end.getDate() + 1);
    
                    return txDate >= start && txDate < end;
                })
                .map(tx => {
                    const asset = allBackendAssets.find(asset => asset.id === tx.platformAssetId);
    
                    let frontendStatus: 'pending' | 'completed' | 'failed';
                    switch (tx.status) {
                        case 'COMPLETED':
                            frontendStatus = 'completed';
                            break;
                        case 'PENDING':
                            frontendStatus = 'pending';
                            break;
                        case 'FAILED':
                            frontendStatus = 'failed';
                            break;
                        default:
                            frontendStatus = 'pending';
                    }
    
                    return {
                        id: tx.id,
                        coin: asset?.symbol || 'N/A',
                        network: asset?.network || 'N/A',
                        amount: tx.amount,
                        status: frontendStatus,
                        date: tx.createdAt.split('T')[0],
                        transactionId: tx.id,
                    };
                });
    
            // Apply client-side filtering for coin/asset if needed
            if (coinIdFilter !== 'all') {
                mappedHistory = mappedHistory.filter(historyItem => {
                    const asset = allBackendAssets.find(asset => asset.symbol === historyItem.coin);
                    return asset?.id === coinIdFilter;
                });
            }
    
            // Apply client-side status filtering since backend doesn't support it
            if (transactionStatusFilter !== 'all') {
                mappedHistory = mappedHistory.filter(historyItem => {
                    // Convert frontend status back to backend format for comparison
                    let backendStatus: string;
                    switch (historyItem.status) {
                        case 'completed':
                            backendStatus = 'COMPLETED';
                            break;
                        case 'pending':
                            backendStatus = 'PENDING';
                            break;
                        case 'failed':
                            backendStatus = 'FAILED';
                            break;
                        default:
                            backendStatus = 'PENDING';
                    }
                    return backendStatus === transactionStatusFilter;
                });
            }
    
            setWithdrawalHistory(mappedHistory);
            if (pagination) {
                setTotalPages(pagination.totalPages);
                setCurrentPage(pagination.page);
            } else {
                setTotalPages(1);
                setCurrentPage(1);
            }
    
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load deposit history. An unknown error occurred.';
            setError(errorMessage);
            console.error('Error fetching deposit history:', err);
            setWithdrawalHistory([]);
            setTotalPages(1);
        } finally {
            setIsLoadingHistory(false);
        }
    }, [
        currentPage,
        dateRange,
        getAuthToken,
        getUserIdFromToken,
        allBackendAssets,
    ]);
    useEffect(() => {
        fetchCoins();
    }, [fetchCoins]);

     useEffect(() => {
        if (selectedCoin) {
            if (!selectedNetwork) {
                const derivedNetworks = Array.from(new Map(
                    allBackendAssets
                        .filter(asset => asset.symbol === selectedCoin.symbol)
                        .map(asset => [asset.network.toLowerCase(), {
                            id: asset.network.toLowerCase(),
                            name: asset.network,
                            chain: asset.network,
                            des: 'deposit completion: X confirmation(s)',
                            min: `Min. Deposit Amount: 0 ${asset.symbol}`,
                        }])
                ).values());

                if (derivedNetworks.length > 0) {
                    const defaultNetwork = derivedNetworks.find(net => net.id === 'bep20' || net.id === 'erc20') || derivedNetworks[0];
                    setSelectedNetwork(defaultNetwork);
                } else {
                    setSelectedNetwork(null);
                }
            }
        }
    }, [selectedCoin, allBackendAssets, selectedNetwork]);

    useEffect(() => {
        fetchDepositAddress();
    }, [fetchDepositAddress]);

  // You should return the state and setters you want to use outside this hook
  return {
  coins,
        networks,
        withdrawalHistory,
        selectedCoin,
        selectedNetwork,
        depositAddress,
        dateRange,
        totalPages,
        currentPage,
        isLoadingCoins,
        isLoadingAddress,
        isLoadingHistory,
        error,
        setSelectedCoin,
        setSelectedNetwork,
        setError,
        setDateRange,
        fetchDepositHistory,
        setCurrentPage,
        getUserIdFromToken,
  };
};
