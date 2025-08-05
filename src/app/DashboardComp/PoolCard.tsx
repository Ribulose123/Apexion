'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { TransactionType } from '../data/data';
import axios from 'axios';

interface PoolCardProps {
  id: string;
  min: number;
  max: number;
  cycle: number;
  price: number;
}

interface PlatformAsset {
  id: string;
  name: string;
  symbol: string;
  networkId?: string;
  depositAddress?: string; // Added depositAddress for consistency
}

interface TransactionRequest {
  userId: string;
  amount: number;
  platformAssetId: string;
  type: TransactionType;
  staking: {
    id: string;
    amount: number;
  };
}

interface CoinGeckoPriceResponse {
  [coinId: string]: {
    usd: number;
  };
}

interface AssetCalculation {
  amountInAsset: number;
  assetSymbol: string;
}

interface TransactionResponseData {
  id: string;
  status: string;
}

interface TransactionResponse {
  message: string;
  data: TransactionResponseData;
}

const SYMBOL_TO_COINGECKO_ID: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  BNB: 'binancecoin',
  SOL: 'solana',
  XRP: 'ripple',
  ADA: 'cardano',
  DOGE: 'dogecoin',
  DOT: 'polkadot',
  SHIB: 'shiba-inu',
  AVAX: 'avalanche-2',
  MATIC: 'matic-network',
  LTC: 'litecoin',
  TRX: 'tron',
  UNI: 'uniswap',
  LINK: 'chainlink',
  ATOM: 'cosmos',
  XLM: 'stellar',
  XMR: 'monero',
  ETC: 'ethereum-classic',
};

const getCoinGeckoId = (asset: PlatformAsset): string => {
  if (asset.networkId) {
    return asset.networkId.toLowerCase();
  }
  return SYMBOL_TO_COINGECKO_ID[asset.symbol] || asset.symbol.toLowerCase();
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  </div>
);

const getUserIdFromToken = (token: string): string | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || payload.sub || payload.id || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const PoolCard: React.FC<PoolCardProps> = ({ id, min, max, cycle, price = 0 }) => {
  // New state variables for the three modals
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);

  const [platformAssets, setPlatformAssets] = useState<PlatformAsset[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [stakeAmount, setStakeAmount] = useState(price ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [assetPrices, setAssetPrices] = useState<CoinGeckoPriceResponse>({});
  const [calculation, setCalculation] = useState<AssetCalculation | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionResponseData | null>(null); // To store transaction ID and status

  // Function to fetch assets and open the FIRST modal (deposit address)
  const fetchAssetsAndOpenDepositModal = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Please login to stake');

      const extractedUserId = getUserIdFromToken(token);
      if (!extractedUserId) throw new Error('Invalid authentication token');

      setUserId(extractedUserId);

      const res = await fetch(API_ENDPOINTS.ASSET.ASSET_LIST, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch platform assets');

      const data = await res.json();
      const assets: PlatformAsset[] = data.data || [];
      if (assets.length === 0) throw new Error('No assets available for staking');

      setPlatformAssets(assets);
      setSelectedAssetId(assets[0]?.id || ''); // Select the first asset by default

      const coinGeckoIds = assets
        .map((a) => getCoinGeckoId(a))
        .filter(Boolean)
        .join(',');

      const pricesRes = await axios.get<CoinGeckoPriceResponse>(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd`,
        { timeout: 5000 }
      );

      setAssetPrices(pricesRes.data);
      setIsDepositModalOpen(true); // Open the first modal
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate staking');
      setIsDepositModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to proceed from Deposit Modal to Confirmation Modal
  const handleProceedToStake = () => {
    setIsDepositModalOpen(false); // Close first modal
    setIsConfirmationModalOpen(true); // Open second modal
  };

  // Function for the final stake confirmation
  const handleStakeConfirmation = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (stakeAmount < min || stakeAmount > max) {
        throw new Error(`Amount must be between ${min.toFixed(2)} and ${max.toFixed(2)}`);
      }

      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication required');

      if (!userId) throw new Error('User ID not found');

      const transactionDataRequest: TransactionRequest = {
        userId: userId,
        amount: stakeAmount,
        platformAssetId: selectedAssetId,
        type: TransactionType.stake,
        staking: {
          id: id,
          amount: stakeAmount,
        },
      };

      const res = await fetch(API_ENDPOINTS.TRANSACTION.CREATE_TRANCSACTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionDataRequest),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Staking failed');
      }

      const result: TransactionResponse = await res.json();
      setTransactionData(result.data); // Store transaction ID and status

      setIsConfirmationModalOpen(false); // Close second modal
      setIsPendingModalOpen(true); // Open third modal

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Staking failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getAssetPrice = useCallback((assetId: string): number => {
    const asset = platformAssets.find((a) => a.id === assetId);
    if (!asset) return 0;
    const coinGeckoId = getCoinGeckoId(asset);
    return assetPrices[coinGeckoId]?.usd || 0;
  }, [platformAssets, assetPrices]);

  useEffect(() => {
    if (selectedAssetId && stakeAmount > 0) {
      const asset = platformAssets.find((a) => a.id === selectedAssetId);
      if (asset) {
        const assetPrice = getAssetPrice(asset.id);
        if (assetPrice > 0) {
          const amountInAsset = stakeAmount / assetPrice;
          setCalculation({
            amountInAsset,
            assetSymbol: asset.symbol,
          });
          return;
        }
      }
    }
    setCalculation(null);
  }, [selectedAssetId, stakeAmount, platformAssets, getAssetPrice]);

  const selectedAsset = platformAssets.find((a) => a.id === selectedAssetId);

  return (
    <>
      {/* Existing PoolCard UI */}
      <div className="rounded-xl bg-gradient-to-b from-[#06023daf] from-25% via-[#240a6b] to-[#644ca1] overflow-hidden p-4 flex flex-col">
        <div className="flex items-center mb-4 gap-3">
          <span>Price</span>
          <p>${price.toFixed(2)}</p>
        </div>

        <div className="text-sm space-y-3 flex-grow">
          <div className="flex justify-between border-b border-indigo-800/30 pb-1">
            <span className="text-gray-300">Minimum</span>
            <span className="text-white">${min.toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-b border-indigo-800/30 pb-1">
            <span className="text-gray-300">Maximum</span>
            <span className="text-white">${max.toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-b border-indigo-800/30 pb-1">
            <span className="text-gray-300">Cycle</span>
            <span className="text-white">{cycle} days</span>
          </div>
        </div>

        <button
          onClick={fetchAssetsAndOpenDepositModal} // Call the new function
          disabled={isLoading}
          className="w-full mt-4 bg-indigo-700/50 hover:bg-indigo-700/70 text-white py-2 rounded-md text-sm transition disabled:opacity-50"
        >
          {isLoading ? <LoadingSpinner /> : 'Stake'}
        </button>
      </div>

      {/* NEW: First Modal (Deposit Address) */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-white to-purple-50 rounded-2xl p-6 w-full max-w-md border border-purple-200 shadow-lg text-black text-center">
            <h3 className="text-xl font-bold mb-4">Deposit Address for Staking</h3>
            <p className="mb-4">
              Please choose your preferred deposit asset.
            </p>
            <div className="mb-4">
              <label className="block text-sm mb-2">
                Select Asset
              </label>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none"
              >
                {platformAssets.map(asset => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} ({asset.symbol})
                  </option>
                ))}
              </select>
            </div>
            {selectedAsset && selectedAsset.depositAddress ? (
              <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
                <p className="text-sm font-semibold mb-2">Deposit Address ({selectedAsset.symbol}):</p>
                <p className="break-words font-mono bg-white p-2 rounded border border-gray-300">
                  {selectedAsset.depositAddress}
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(selectedAsset.depositAddress as string)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Copy Address
                </button>
              </div>
            ) : (
              <p className="text-red-500 mb-4">Deposit address not available for this asset.</p>
            )}
            {error && (
              <div className="text-red-500 text-sm mb-4 p-2 bg-red-900/30 rounded">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDepositModalOpen(false)}
                className="px-4 py-2 border rounded-lg transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToStake}
                className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:opacity-90 transition"
              >
                Proceed to Stake
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal (Confirmation) */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-white to-purple-50 rounded-2xl p-6 w-full max-w-md border border-purple-200 shadow-lg">
            <h3 className="text-black text-xl font-bold mb-4">Confirm Stake</h3>
            <div className="mb-6">
              <p className="text-black mb-1">You are staking in:</p>
              <p className="text-black font-medium text-lg">Pool ID: {id}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-black">Minimum:</span>
                  <span className="text-black">${min.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Maximum:</span>
                  <span className="text-black">${max.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Cycle:</span>
                  <span className="text-black">{cycle} days</span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm mb-2">
                Stake Amount (USD)
              </label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setStakeAmount(value);
                }}
                min={min}
                max={max}
                step="0.01"
                className="w-full border text-black rounded-lg p-2 focus:outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Must be between ${min.toFixed(2)} and ${max.toFixed(2)}
              </p>
            </div>
            {calculation && calculation.amountInAsset && (
              <div className="mb-4 p-3 bg-white/10 rounded-lg">
                <p className="text-black text-sm">
                  ${stakeAmount.toFixed(2)} USD = {calculation.amountInAsset.toFixed(8)} {calculation.assetSymbol}
                </p>
              </div>
            )}
            <div className="mb-6">
              <label className="block text-black text-sm mb-2">
                Payment Asset
              </label>
              <div className="w-full border rounded-lg p-3 bg-gray-100">
                {selectedAsset ? `${selectedAsset.name} (${selectedAsset.symbol})` : 'No asset selected'}
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-4 p-2 bg-red-900/30 rounded">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsConfirmationModalOpen(false)}
                disabled={isLoading}
                className="px-4 py-2 border text-black rounded-lg transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStakeConfirmation} // Call the new confirmation function
                disabled={isLoading || stakeAmount < min || stakeAmount > max}
                className="px-4 py-2 bg-purple-950 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center min-w-[120px]"
              >
                {isLoading ? <LoadingSpinner /> : 'Confirm Stake'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Third Modal (Pending Status) */}
      {isPendingModalOpen && transactionData && (
        <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-white to-purple-50 rounded-2xl p-6 w-full max-w-md border border-purple-200 shadow-lg text-black text-center">
            <h3 className="text-xl font-bold mb-4">Staking Initiated</h3>
            <p className="mb-2">
              Your staking request has been submitted.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
              <p className="text-sm font-semibold">Transaction ID:</p>
              <p className="break-words font-mono text-xs">{transactionData.id}</p>
              <p className="text-sm font-semibold mt-2">Status:</p>
              <p className="text-lg font-bold text-yellow-600">
                {transactionData.status}
              </p>
            </div>
            <p className="text-sm text-gray-700">
              An administrator will review and approve your transaction shortly. You will be notified when the status changes to Success.
            </p>
            <button
              onClick={() => setIsPendingModalOpen(false)}
              className="mt-6 w-full bg-purple-800 text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const PoolGrid: React.FC = () => {
  const [staking, setStaking] = useState<PoolCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStakes = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError('No authentication token found. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.STAKING.GET_SIGNAL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stakes');
        }
        const result = await response.json();

        setStaking(result.data);
      } catch (err) {
        console.error("Error fetching stakes:", err);
        setError('Failed to load stakes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStakes();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-6 text-white text-center">
        <LoadingSpinner />
        <p className="mt-2">Loading stakes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className=" p-4 text-white">
      <h1 className="text-xl font-medium mb-4">Pools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staking.length > 0 ?
          (
            staking.map(stake => (
              <PoolCard
                key={stake.id}
                id={stake.id}
                price={stake.price}
                max={stake.max}
                min={stake.min}
                cycle={stake.cycle}
              />
            ))
          ) : (
            <p className="text-white text-center col-span-full">No stakes available at the moment.</p>
          )}
      </div>
    </div>
  );
};

export default PoolGrid;
