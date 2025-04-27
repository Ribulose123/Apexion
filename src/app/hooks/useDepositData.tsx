

import { useState, useEffect, useCallback } from 'react';
import { CoinDepost, Network, DepositHistory, DateRange } from '../data/data';

export const useDepositData = () => {
  const [coins, setCoins] = useState<CoinDepost[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [depositHistory, setDepositHistory] = useState<DepositHistory[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinDepost | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [depositAddress, setDepositAddress] = useState('');
  
  // UI states
  const [isLoadingCoins, setIsLoadingCoins] = useState(false);
  const [isLoadingNetworks, setIsLoadingNetworks] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
    endDate: new Date().toISOString().split('T')[0], 
  });

  // Fetch coins from API
  const fetchCoins = useCallback(async () => {
    setIsLoadingCoins(true);
    setError(null);
    try {
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockCoins: CoinDepost[] = [
        { id: 'btc', name: 'Bitcoin', symbol: 'BTC', networks: ['BTC', 'BEP20', 'ERC20'] },
        { id: 'eth', name: 'Ethereum', symbol: 'ETH', networks: ['ERC20', 'BEP20'] },
        { id: 'usdt', name: 'Tether', symbol: 'USDT', networks: ['TRC20', 'BEP20', 'ERC20'] },
        { id: 'sol', name: 'Solana', symbol: 'SOL', networks: ['SOL'] },
      ];
      
      setCoins(mockCoins);
      setSelectedCoin(mockCoins.find(coin => coin.id === 'usdt') || null);
    } catch (err) {
      setError('Failed to load coins. Please try again.');
      console.error('Error fetching coins:', err);
    } finally {
      setIsLoadingCoins(false);
    }
  }, []);

  // Fetch networks from API
  const fetchNetworks = useCallback(async () => {
    setIsLoadingNetworks(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      
      const mockNetworks: Network[] = [
        { id: 'bep20', name: 'BEP20 (Binance Smart Chain)', chain: 'BSC' },
        { id: 'erc20', name: 'ERC20 (Ethereum)', chain: 'ETH' },
        { id: 'trc20', name: 'TRC20 (TRON)', chain: 'TRON' },
        { id: 'btc', name: 'Bitcoin', chain: 'BTC' },
        { id: 'sol', name: 'Solana', chain: 'SOL' },
      ];
      
      setNetworks(mockNetworks);
      setSelectedNetwork(mockNetworks.find(network => network.id === 'bep20') || null);
    } catch (err) {
      setError('Failed to load networks. Please try again.');
      console.error('Error fetching networks:', err);
    } finally {
      setIsLoadingNetworks(false);
    }
  }, []);

  // Fetch deposit address based on selected coin and network
  const fetchDepositAddress = useCallback(async () => {
    if (!selectedCoin || !selectedNetwork) return;
    
    setIsLoadingAddress(true);
    setError(null);
    try {
     
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      
      setDepositAddress('0x3ba9fef4192acd1ad7a91c70429e2qadh');
    } catch (err) {
      setError('Failed to load deposit address. Please try again.');
      console.error('Error fetching deposit address:', err);
    } finally {
      setIsLoadingAddress(false);
    }
  }, [selectedCoin, selectedNetwork]);

  // Fetch deposit history with filtering
  const fetchDepositHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    setError(null);
    try {
      // Simulate API call with pagination and filters
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response data - empty for now
      setDepositHistory([]);
      setTotalPages(1);
    } catch (err) {
      setError('Failed to load deposit history. Please try again.');
      console.error('Error fetching deposit history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  // Initial data loading
  useEffect(() => {
    fetchCoins();
    fetchNetworks();
  }, [fetchCoins, fetchNetworks]);

  // Fetch address when coin or network changes
  useEffect(() => {
    if (selectedCoin && selectedNetwork) {
      fetchDepositAddress();
    }
  }, [selectedCoin, selectedNetwork, fetchDepositAddress]);

  return {
    // Data
    coins,
    networks,
    depositHistory,
    selectedCoin,
    selectedNetwork,
    depositAddress,
    dateRange,
    totalPages,
    
    // Loading states
    isLoadingCoins,
    isLoadingNetworks,
    isLoadingAddress,
    isLoadingHistory,
    
    // Error state
    error,
    
    // Actions
    setSelectedCoin,
    setSelectedNetwork,
    setError,
    setDateRange,
    fetchDepositHistory,
  };
};