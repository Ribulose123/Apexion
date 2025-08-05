'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { TransactionType } from '../data/data';
import axios from 'axios';

interface SignalProps {
  id: string;
  name: string;
  amount: number;
  price: number;
  strength: number;
}

interface PlatformAsset {
  id: string;
  name: string;
  symbol: string;
  networkId?: string;
}

interface TransactionRequest {
  userId: string;
  platformAssetId: string;
  amount: number;
  type: TransactionType;
  signal: string;
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

const SignalCard: React.FC<SignalProps> = ({
  id,
  name,
  amount,
  strength,
  price = 0,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platformAssets, setPlatformAssets] = useState<PlatformAsset[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState(price ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [assetPrices, setAssetPrices] = useState<CoinGeckoPriceResponse>({});
  const [calculation, setCalculation] = useState<AssetCalculation | null>(null);

  const fetchPlatformAssetsWithPrices = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Please login to purchase signals');

      const extractedUserId = getUserIdFromToken(token);
      if (!extractedUserId) throw new Error('Invalid authentication token');

      setUserId(extractedUserId);

      const res = await fetch(API_ENDPOINTS.ASSET.ASSET_LIST, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) throw new Error('Failed to fetch platform assets');

      const data = await res.json();
      const assets: PlatformAsset[] = data.data || [];
      if (assets.length === 0) throw new Error('No assets available for purchase');

      setPlatformAssets(assets);
      setSelectedAssetId(assets[0]?.id || '');

      const coinGeckoIds = assets
        .map(a => getCoinGeckoId(a))
        .filter(Boolean)
        .join(',');

      const pricesRes = await axios.get<CoinGeckoPriceResponse>(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd`,
        { timeout: 5000 }
      );

      setAssetPrices(pricesRes.data);
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate purchase');
      setIsModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getAssetPrice = useCallback((assetId: string): number => {
    const asset = platformAssets.find(a => a.id === assetId);
    if (!asset) return 0;
    const coinGeckoId = getCoinGeckoId(asset);
    return assetPrices[coinGeckoId]?.usd || 0;
  }, [platformAssets, assetPrices]);

  useEffect(() => {
    if (selectedAssetId && purchaseAmount > 0) {
      const asset = platformAssets.find(a => a.id === selectedAssetId);
      if (asset) {
        const assetPrice = getAssetPrice(asset.id);
        if (assetPrice > 0) {
          const amountInAsset = purchaseAmount / assetPrice;
          setCalculation({
            amountInAsset,
            assetSymbol: asset.symbol
          });
          return;
        }
      }
    }
    setCalculation(null);
  }, [selectedAssetId, purchaseAmount, platformAssets, getAssetPrice]);

  const handlePurchase = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication required');

      if (!userId) throw new Error('User ID not found');

      const transactionData: TransactionRequest = {
        userId: userId,
        platformAssetId: selectedAssetId,
        amount: purchaseAmount,
        type: TransactionType.signal,
        signal: id,
      };

      const res = await fetch(API_ENDPOINTS.TRANSACTION.CREATE_TRANCSACTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transactionData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Purchase failed');
      }

      setIsModalOpen(false);
      alert(`Successfully purchased ${name} signal for $${purchaseAmount.toFixed(2)}!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Purchase failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl p-[1px] bg-gradient-to-b from-[#06023daf] via-[#240a6b] to-[#644ca1] shadow-lg h-[250px] sm:w-[365px]">
        <div className="rounded-2xl p-4 h-full flex flex-col justify-between gradient-border">
          <div>
            <h2 className="text-[#D2D1EE] sm:text-[20px] text-[16px] font-medium mb-8">{name}</h2>

            <div className="flex justify-between text-[12px] border-b border-[#6967AE29] font-semibold sm:text-[16px] text-[#C4C4C4] mb-2">
              <span>Amount</span>
              <span className="text-white text-[12px] font-semibold sm:text-[16px]">{amount}</span>
            </div>

            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span className='text-[12px] font-semibold sm:text-[16px]'>Signal Strength</span>
              <span className="text-[#00F66C] text-[12px] font-semibold sm:text-[14px]">{strength}</span>
            </div>

            <div className="flex justify-between text-xs text-gray-400 currency-display rounded-lg">
              <span className='text-[12px] font-semibold sm:text-[16px] text-white'>Price</span>
              <span className="text-white">${price.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-b from-[#6967AE]/30 to-[#6967AE]/10 text-white py-2 rounded-lg text-sm hover:opacity-80 transition cursor-pointer"
            onClick={fetchPlatformAssetsWithPrices}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : `Buy`}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/65 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-white to-purple-50 rounded-2xl p-6 w-full max-w-md border border-purple-200 shadow-lg">
            <h3 className="text-purple-900 text-xl font-bold mb-4">Confirm Purchase</h3>

            <div className="mb-6">
              <p className="text-purple-700 mb-1">You are purchasing:</p>
              <p className="text-purple-900 font-medium text-lg">{name}</p>

              <div className="flex justify-between mt-4">
                <span className="text-purple-700">Signal Price:</span>
                <span className="text-purple-900 font-bold">${price.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-purple-700 text-sm mb-2">Purchase Amount (USD)</label>
              <input
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                min={0.01}
                step={0.01}
                max={price}
                className="w-full bg-white border border-purple-300 text-purple-900 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <p className="text-xs text-purple-500 mt-1">Max: ${price.toFixed(2)}</p>
            </div>

            {calculation && calculation.amountInAsset && (
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-purple-700 text-sm">
                  ${purchaseAmount.toFixed(2)} USD = {calculation.amountInAsset.toFixed(8)} {calculation.assetSymbol}
                </p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-purple-700 text-sm mb-2">Select Payment Asset</label>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="w-full bg-white border border-purple-300 text-purple-900 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                {platformAssets.map(asset => {
                  const assetPrice = getAssetPrice(asset.id);
                  return (
                    <option
                      key={asset.id}
                      value={asset.id}
                      className="bg-white text-purple-900"
                    >
                      {asset.name} ({asset.symbol}) - ${assetPrice.toFixed(2)}/coin
                    </option>
                  );
                })}
              </select>
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4 p-2 bg-red-100 rounded">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isLoading || purchaseAmount <= 0 || purchaseAmount > price}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center min-w-[120px]"
              >
                {isLoading ? <LoadingSpinner /> : 'Deposit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SignalGrid: React.FC = () => {
  const [signals, setSignals] = useState<SignalProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignals = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('No authentication token found. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.SIGNAL.GET_SIGNAL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch signals');
        }

        const result = await response.json();
        setSignals(result.data);
      } catch (err) {
        console.error("Error fetching signals:", err);
        setError('Failed to load signals. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignals();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-6 text-white text-center">
        <LoadingSpinner />
        <p className="mt-2">Loading signals...</p>
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
    <div className="mt-6">
      <h2 className="text-white text-lg font-medium mb-4">Signals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.length > 0 ? (
          signals.map(signal => (
            <SignalCard
              key={signal.id}
              id={signal.id}
              name={signal.name}
              amount={signal.amount}
              price={signal.price}
              strength={signal.strength}
            />
          ))
        ) : (
          <p className="text-white text-center col-span-full">No signals available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default SignalGrid;