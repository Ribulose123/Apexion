import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { API_ENDPOINTS } from "../config/api";

interface PlatformAsset {
  id: string;
  name: string;
  symbol: string;
  networkId?: string;
  updatedAt: string;
}

interface UserAsset {
  platformAssetId: string;
  platformAsset: PlatformAsset;
  balance: number;
}

interface ChartDataPoint {
  date: string;
  balance: number;
}

interface CoinGeckoPrice {
  [coinId: string]: {
    usd: number;
  };
}

// Comprehensive mapping of symbols to CoinGecko IDs
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
  // Checking if networkId is available
  if (asset.networkId) {
    return asset.networkId.toLowerCase();
  }
  
  // Fallback to symbol mapping
  return SYMBOL_TO_COINGECKO_ID[asset.symbol] || asset.symbol.toLowerCase();
};


const TopSection: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [activeBtn, setActiveBtn] = useState("Deposit");
  const [loadingUserAssets, setLoadingUserAssets] = useState(true);
  const [loadingChartData, setLoadingChartData] = useState(false);
  const [userAssetsError, setUserAssetsError] = useState<string | null>(null);
  const [chartDataError, setChartDataError] = useState<string | null>(null);

  const links = [
    { name: "Deposit", herf: '/deposit' },
    { name: "Buy Crypto", herf: '/buy/coin' },
    { name: "Convert", herf: '/conversion' },
    { name: "Withdraw", herf: '/withdrawal' },
  ];




 const fetchPrices = async (assets: UserAsset[]): Promise<CoinGeckoPrice> => {
    try {
      // Get all unique CoinGecko IDs
      const coinGeckoIds = [...new Set(
        assets.map(asset => getCoinGeckoId(asset.platformAsset))
      )].filter(Boolean).join(',');

      if (!coinGeckoIds) {
        return {};
      }

      const response = await axios.get<CoinGeckoPrice>(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd`,
        { timeout: 5000 }
      );

      return response.data || {};
    } catch (error) {
      console.error('no id', error);
      return {};
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUserAssets(true);
      setUserAssetsError(null);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");

        const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const assets: UserAsset[] = responseData.data?.userAssets || [];
        setUserAssets(assets);

        if (assets.length > 0) {
          const prices = await fetchPrices(assets);
          
          const totalUsdBalance = assets.reduce((sum, asset) => {
            const coinGeckoId = getCoinGeckoId(asset.platformAsset);
            const price = prices[coinGeckoId]?.usd || 0;
            return sum + (asset.balance * price);
          }, 0);

          setTotalBalance(totalUsdBalance);
          setSelectedAssetId(assets[0].platformAssetId);
        } else {
          setTotalBalance(0);
        }
      } catch (err) {
        setUserAssetsError(
          err instanceof Error ? err.message : "Failed to load user assets"
        );
      } finally {
        setLoadingUserAssets(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!selectedAssetId) {
       
        setChartData([]);
        return;
      }

     
      setLoadingChartData(true);
      setChartDataError(null);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.log('No auth token - skipping chart fetch');
          return;
        }

        const chartEndpoint = API_ENDPOINTS.USER.USER_CHART.replace(
          "{platformAssetId}",
          selectedAssetId
        );
       

        const response = await fetch(chartEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

       
        if (!response.ok) {
          throw new Error(`Chart data fetch failed: ${response.status}`);
        }

        const chartData = await response.json();
        setChartData(chartData || []);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setChartDataError(
          err instanceof Error ? err.message : "Failed to load chart data"
        );
        setChartData([]);
      } finally {
        console.groupEnd();
        setLoadingChartData(false);
      }
    };

    fetchChartData();
  }, [selectedAssetId]);

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "No update time available";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
      });
    } catch {
      return "No update time available";
    }
  };

  const handleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div className="bg-gradient-to-r from-[rgba(20,30,50,0.0576)] to-[rgba(61,70,104,0.24)] rounded-xl p-6 mb-6 border border-[#141E32]">
      <div className="flex flex-col lg:flex-row w-full gap-10">
        {/* Left Section - Balance */}
        <div className="w-full lg:w-1/2">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-row sm:flex-col gap-10 text-xs sm:text-sm lg:text-base">
              <div className="flex justify-between items-center gap-6 sm:gap-60">
                <div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <h2 className="text-gray-400 font-medium sm:text-lg">
                        Total Balance
                      </h2>
                      <button
                        onClick={handleBalance}
                        className="text-gray-400 hover:text-white transition ml-2"
                      >
                        {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                    </div>
                    <div className="flex items-center mt-1">
                      <h2 className="sm:text-2xl text-[15px] text-gray-200 font-bold tracking-wider">
                        {loadingUserAssets
                          ? "Loading..."
                          : showBalance
                            ? `$${totalBalance.toFixed(2)}`
                            : "******"}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2 mt-22">
            {links.map((btn) => (
              <Link
                href={btn.herf}
                key={btn.name}
                onClick={() => setActiveBtn(btn.name)}
                className={`
                  py-2 px-3 rounded-md text-xs font-medium transition
                  ${
                  activeBtn === btn.name
                    ? "bg-indigo-700 text-white"
                    : "bg-transparent border border-gray-600 text-white hover:bg-gray-700"
                  }
                `}
              >
                {btn.name}
              </Link>
            ))}
          </div>
          {userAssetsError && (
            <p className="text-red-500 text-sm mt-4">{userAssetsError}</p>
          )}
        </div>

        {/* Right Section - Chart */}
        <div className="w-full lg:w-1/2">
          {/* Asset selection dropdown */}
          <div className="relative mb-4 w-full sm:w-64">
            <select
              value={selectedAssetId || ""}
              onChange={(e) => setSelectedAssetId(e.target.value || null)}
              className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-600"
              disabled={loadingUserAssets}
            >
              <option value="">Select an asset</option>
              {userAssets.map((asset) => (
                <option
                  key={asset.platformAssetId}
                  value={asset.platformAssetId}
                >
                  {asset.platformAsset?.name} ({asset.platformAsset?.symbol})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          
          {/* Selected asset info */}
          <div className="h-48 w-full -ml-8 sm:ml-0">
            {loadingChartData ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                Loading chart data...
              </div>
            ) : chartDataError ? (
              <div className="h-full flex items-center justify-center text-red-500">
                Error: {chartDataError}
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorBalance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1F2937"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "none",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                    formatter={(value) => [`$${value}`, "Balance"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#8B5CF6"
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                {selectedAssetId
                  ? "No chart data available for this asset."
                  : "Select an asset to view chart."}
              </div>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            {selectedAssetId && (
              <span>
                Last Update:{" "}
                {formatDate(
                  userAssets.find(
                    (asset) => asset.platformAssetId === selectedAssetId
                  )?.platformAsset?.updatedAt || ""
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;