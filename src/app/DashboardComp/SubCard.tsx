"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { TransactionType } from '../data/data';
import axios from 'axios';

interface SubProps {
  id: string;
  name: string;
  max: number;
  min: number;
  roi: number;
  duration: number;
  price: number;
}

interface PlatformAsset {
  id: string;
  name: string;
  symbol: string;
  networkId?: string;
}

interface TransactionRequest {
  userId: string;
  amount: number;
  platformAssetId: string;
  type: TransactionType;
  subscription: {
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

const SubCard: React.FC<SubProps> = ({
  id,
  name,
  min,
  max,
  duration,
  roi,
  price = 0, // Default price to 0
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platformAssets, setPlatformAssets] = useState<PlatformAsset[]>([]); // Correctly named and used
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [subAmount, setSubAmount] = useState(price ?? 0); // Initialize with price or 0
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [assetPrices, setAssetPrices] = useState<CoinGeckoPriceResponse>({}); // Correctly named and used
  const [calculation, setCalculation] = useState<AssetCalculation | null>(null);

  const fetchPlatformAssetsWithPrices = async () => { // Renamed for clarity
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Please login to subscribe');

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
      const assets: PlatformAsset[] = data.data || []; // Assuming data.data is directly the array of assets
      if (assets.length === 0) throw new Error('No assets available for subscription');

      setPlatformAssets(assets); // Set platform assets
      setSelectedAssetId(assets[0]?.id || '');

      const coinGeckoIds = assets
        .map((a) => getCoinGeckoId(a))
        .filter(Boolean)
        .join(',');

      const pricesRes = await axios.get<CoinGeckoPriceResponse>(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd`,
        { timeout: 5000 }
      );

      setAssetPrices(pricesRes.data); // Set asset prices
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate subscription');
      setIsModalOpen(false);
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
    if (selectedAssetId && subAmount > 0) {
      const asset = platformAssets.find((a) => a.id === selectedAssetId);
      if (asset) {
        const assetPrice = getAssetPrice(asset.id);
        if (assetPrice > 0) {
          const amountInAsset = subAmount / assetPrice;
          setCalculation({
            amountInAsset,
            assetSymbol: asset.symbol,
          });
          return;
        }
      }
    }
    setCalculation(null);
  }, [selectedAssetId, subAmount, platformAssets, getAssetPrice]);

  const handleSubscription = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (subAmount < min || subAmount > max) {
        throw new Error(`Amount must be between ${min.toFixed(2)} and ${max.toFixed(2)}`);
      }
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication required');

      if (!userId) throw new Error('User ID not found');

      const transactionData: TransactionRequest = {
        userId: userId,
        amount: subAmount,
        platformAssetId: selectedAssetId,
        type: TransactionType.subscription,
        subscription: {
          id: id,
          amount: subAmount,
        },
      };

      const res = await fetch(API_ENDPOINTS.TRANSACTION.CREATE_TRANCSACTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Subscription failed');
      }

      setIsModalOpen(false);
      alert(`Successfully subscribed to ${name} for $${subAmount.toFixed(2)}!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Subscription failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl p-[1px] bg-gradient-to-b from-[#06023daf] from-25% via-[#240a6b] to-[#644ca1] shadow-lg sm:w-[365px] h-[330px]">
        <div className="rounded-2xl p-5 h-full flex flex-col justify-between text-white">
          <h2 className="text-lg font-semibold text-[#D2D1EE] mb-4">{name}</h2>

          <div className="space-y-2 text-sm text-[#C4C4C4]">
            <div className="flex justify-between">
              <span>Minimum</span>
              <span className="text-white font-medium">${min.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Maximum</span>
              <span className="text-white font-medium">${max.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Plan Duration</span>
              <span className="text-white font-medium">{duration} days</span>
            </div>
            <div className="flex justify-between">
              <span>ROI</span>
              <span className="text-green-400 font-medium">{roi}%</span>
            </div>
            <div className="flex justify-between">
              <span>Price</span>
              <span className="text-white font-medium">${price.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={fetchPlatformAssetsWithPrices}
            disabled={isLoading}
            className="w-full mt-4 bg-[#6967AE] hover:bg-[#7f7cd1] transition text-white py-2 rounded-lg text-sm font-medium"
          >
            {isLoading ? <LoadingSpinner /> : 'Subscribe'}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-white to-purple-50 rounded-2xl p-6 w-full max-w-md border border-purple-200 shadow-lg text-black">
            <h3 className=" text-xl font-bold mb-4">
              Confirm Subscription
            </h3>

            <div className="mb-6">
              <p className=" mb-1">You are subscribing to:</p>
              <p className=" font-medium text-lg">{name} (ID: {id})</p>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="">Minimum:</span>
                  <span className="">${min.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="">Maximum:</span>
                  <span className="">${max.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="">ROI:</span>
                  <span className="">{roi}%</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block  text-sm mb-2">
                Subscription Amount (USD)
              </label>
              <input
                type="number"
                value={subAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setSubAmount(value);
                }}
                min={min}
                max={max}
                step="0.01"
                className="w-full  border rounded-lg p-2"
              />
              <p className="text-xs text-gray-400 mt-1">
                Must be between ${min.toFixed(2)} and ${max.toFixed(2)}
              </p>
            </div>
            {calculation && calculation.amountInAsset && (
              <div className="mb-4 p-3 bg-white/10 rounded-lg">
                <p className=" text-sm">
                  ${subAmount.toFixed(2)} USD = {calculation.amountInAsset.toFixed(8)} {calculation.assetSymbol}
                </p>
              </div>
            )}

            <div className="mb-6">
              <label className="block  text-sm mb-2">
                Select Payment Asset
              </label>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="w-full  border rounded-lg p-3 focus:outline-none "
              >
                {platformAssets.map(asset => {
                  const assetPrice = getAssetPrice(asset.id);
                  return (
                    <option
                      key={asset.id}
                      value={asset.id}
                    >
                      {asset.name} ({asset.symbol}) - ${assetPrice.toFixed(2)}/coin
                    </option>
                  );
                })}
              </select>
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4 p-2 bg-red-900/30 rounded">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
                className="px-4 py-2 border rounded-lg  transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubscription}
                disabled={isLoading || subAmount < min || subAmount > max}
                className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center min-w-[120px]"
              >
                {isLoading ? <LoadingSpinner /> : 'Confirm Subscription'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SubGrid: React.FC = () => {
  const [subscription, setSubscription] = useState<SubProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSub = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('No authentication token found. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.SUBSCRIPTION.GET_SUB, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions'); // Changed from stakes
        }

        const result = await response.json();
        setSubscription(result.data);
      } catch (err) {
        console.error('Error fetching Subscription:', err);
        setError('Failed to load Subscription. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSub();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-6 text-white text-center">
        <LoadingSpinner />
        <p className="mt-2">Loading subscriptions...</p> {/* Changed from stakes */}
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
    <div className="mt-6 p-4 text-white">
      <h2 className="text-xl font-medium mb-4">Subscriptions</h2> {/* Changed from Pools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscription.length > 0 ? (
          subscription.map((sub) => (
            <SubCard
              key={sub.id}
              id={sub.id}
              price={sub.price}
              duration={sub.duration}
              roi={sub.roi}
              max={sub.max}
              min={sub.min}
              name={sub.name}
            />
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No subscription available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubGrid;
