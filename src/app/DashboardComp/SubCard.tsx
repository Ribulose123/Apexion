"use client";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import { TransactionType } from "../data/data";
import axios from "axios";

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

interface UserAsset {
  platformAssetId: string;
  platformAsset: PlatformAsset;
  balance: number;
  usdValue: number;
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

const SYMBOL_TO_COINGECKO_ID: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  BNB: "binancecoin",
  SOL: "solana",
  XRP: "ripple",
  ADA: "cardano",
  DOGE: "dogecoin",
  DOT: "polkadot",
  SHIB: "shiba-inu",
  AVAX: "avalanche-2",
  MATIC: "matic-network",
  LTC: "litecoin",
  TRX: "tron",
  UNI: "uniswap",
  LINK: "chainlink",
  ATOM: "cosmos",
  XLM: "stellar",
  XMR: "monero",
  ETC: "ethereum-classic",
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
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.sub || payload.id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
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
  price,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [subAmount, setSubAmount] = useState(price);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string>("");

  const fetchUserAssetsWithPrices = async () => {
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Please login to stake in pools");

      const extractedUserId = getUserIdFromToken(token);
      if (!extractedUserId) throw new Error("Invalid authentication token");

      setUserId(extractedUserId);

      const res = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch assets");

      const data = await res.json();
      const assets: UserAsset[] = data.data.userAssets || [];
      if (assets.length === 0)
        throw new Error("No assets available for staking");

      const coinGeckoIds = assets
        .map((a) => getCoinGeckoId(a.platformAsset))
        .filter(Boolean)
        .join(",");

      const pricesRes = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd`,
        { timeout: 5000 }
      );

      const assetsWithUsd = assets.map((asset) => {
        const coinGeckoId = getCoinGeckoId(asset.platformAsset);
        const usdPrice = pricesRes.data[coinGeckoId]?.usd || 0;
        return {
          ...asset,
          usdValue: usdPrice * asset.balance,
        };
      });

      setUserAssets(assetsWithUsd);
      setSelectedAssetId(assetsWithUsd[0]?.platformAssetId || "");
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initiate stake");
      setIsModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscription = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (subAmount < min || subAmount > max) {
        throw new Error(`Amount must be between ${min} and ${max}`);
      }
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authentication required");

      if (!userId) throw new Error("User ID not found");

      const selectedAsset = userAssets.find(
        (a) => a.platformAssetId === selectedAssetId
      );
      if (!selectedAsset) throw new Error("Selected asset not found");

      if (selectedAsset.usdValue < subAmount) {
        throw new Error(
          `Insufficient ${selectedAsset.platformAsset.symbol} balance`
        );
      }

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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Staking failed");
      }

      setIsModalOpen(false);
      alert("Successfully staked $${stakeAmount.toFixed(2)} in ");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Staking failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl p-[1px] bg-gradient-to-b from-[#06023daf] from-25%   via-[#240a6b] to-[#644ca1] shadow-lg sm:w-[365px] h-[330px]">
        <div className=" rounded-2xl p-5  h-full flex flex-col justify-between text-white">
          {/* Header */}
          <h2 className="text-lg font-semibold text-[#D2D1EE] mb-4">{name}</h2>

          {/* Info Section */}
          <div className="space-y-2 text-sm text-[#C4C4C4]">
            <div className="flex justify-between">
              <span>Minimum</span>
              <span className="text-white font-medium">{min}</span>
            </div>
            <div className="flex justify-between">
              <span>Maximum</span>
              <span className="text-white font-medium">{max}</span>
            </div>
            <div className="flex justify-between">
              <span>Plan Duration</span>
              <span className="text-white font-medium">{duration}</span>
            </div>
            <div className="flex justify-between">
              <span>ROI</span>
              <span className="text-green-400 font-medium">{roi}</span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={fetchUserAssetsWithPrices}
            disabled={isLoading}
            className="w-full mt-4 bg-[#6967AE] hover:bg-[#7f7cd1] transition text-white py-2 rounded-lg  text-sm font-medium"
          >
            {isLoading ? <LoadingSpinner /> : "Subscribe"}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#06023d] to-[#240a6b] rounded-2xl p-6 w-full max-w-md border border-[#6967AE]">
            <h3 className="text-white text-xl font-bold mb-4">
              Confirm Subscription
            </h3>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Minimum:</span>
                <span className="text-white">${min}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Maximum:</span>
                <span className="text-white">${max}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Roi:</span>
                <span className="text-white">{roi}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">
                Subscription Amount (USD)
              </label>
              <input
                type="number"
                value={subAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  // Ensure the value stays within min/max bounds
                  if (value > max) {
                    setSubAmount(max);
                  } else if (value < min) {
                    setSubAmount(min);
                  } else {
                    setSubAmount(value);
                  }
                }}
                min={min}
                max={max}
                step="0.01"
                className="w-full bg-[#06023d] border border-[#6967AE] text-white rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#6967AE]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Must be between ${min} and ${max}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-2">
                Select Payment Asset
              </label>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="w-full bg-[#06023d] border border-[#6967AE] text-white rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#6967AE]"
              >
                {userAssets.map((asset) => (
                  <option
                    key={asset.platformAssetId}
                    value={asset.platformAssetId}
                    className="bg-[#06023d]"
                  >
                    {asset.platformAsset.name} ({asset.platformAsset.symbol}) -
                    Balance: ${asset.usdValue.toFixed(2)}
                  </option>
                ))}
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
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubscription}
                disabled={isLoading || subAmount < min || subAmount > max}
                className="px-4 py-2 bg-gradient-to-r from-[#6967AE] to-[#644ca1] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center min-w-[120px]"
              >
                {isLoading ? <LoadingSpinner /> : "Confirm Stake"}
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
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.SUBSCRIPTION.GET_SUB, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stakes");
        }

        const result = await response.json();
        setSubscription(result.data);
      } catch (err) {
        console.error("Error fetching Subscription:", err);
        setError("Failed to load Subscription. Please try again later.");
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
    <div className="mt-6">
      <h2 className="text-white text-lg font-medium mb-4">Subscription</h2>
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
