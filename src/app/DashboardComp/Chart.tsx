'use client'
import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import axios from 'axios'

interface ChartDataPoint {
  date: string
  balance: number
}

interface PlatformAsset {
  id: string;
  name: string;
  symbol: string;
  networkId?: string;
}

interface UserAsset {
  platformAssetId: string
  platformAsset: PlatformAsset
  balance: number
}

interface CoinGeckoPrice{
  [coinId: string]:{
    usd:number
  }
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


const Chart = () => {
  const [totalBalance, setTotalBalance] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [userAssets, setUserAssets] = useState<UserAsset[]>([])
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null)


  const fetchPrices = async (assets: UserAsset[]):
  Promise<CoinGeckoPrice>=>{
    try{
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
    }  catch (error) {
      console.error('no id', error);
      return {};
    }
  }
  useEffect(() => {
    const fetchUserData = async () => {
  try {
    if (typeof window === 'undefined') return
    
    const token = localStorage.getItem('authToken')
    if (!token) throw new Error('No authentication token found')

    const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData = await response.json()
    
    const assets = responseData.data.userAssets || []
    setUserAssets(assets)
    if (assets.length > 0) {
      const prices = await fetchPrices(assets);

      const totalBalance = assets.reduce((sum: number, asset: UserAsset) => {
        const coinGeckoId = getCoinGeckoId(asset.platformAsset);
        const price = prices[coinGeckoId]?.usd || 0;
        return sum + (asset.balance * price);
      }, 0);

      setTotalBalance(totalBalance);
      setSelectedAssetId(assets[0].platformAssetId);
    } else {
      setTotalBalance(0);
    }

  } catch (err) {
    console.error('Error fetching user data:', err)
    setError(err instanceof Error ? err.message : 'An error occurred')
  } finally {
    setLoading(false)
  }
}

    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchChartData = async () => {
      if (!selectedAssetId) {
        setChartData([])
        return
      }

      try {
        const token = localStorage.getItem('authToken')
        if (!token) return

        const chartEndpoint = API_ENDPOINTS.USER.USER_CHART.replace(
          '{platformAssetId}', 
          selectedAssetId
        )

        console.log('Fetching chart data for asset:', selectedAssetId)
        const response = await fetch(chartEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Chart data fetch failed: ${response.status}`)
        }

        const chartData = await response.json()
        console.log('Chart data received:', chartData)
        setChartData(chartData || [])
      } catch (err) {
        console.error('Error fetching chart data:', err)
        setChartData([])
      }
    }

    fetchChartData()
  }, [selectedAssetId])

  const getSelectedAsset = () => {
    return userAssets.find(asset => asset.platformAssetId === selectedAssetId)?.platformAsset
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-bl from-[#141E32] to-[#01040F] text-white rounded-xl py-4 px-3 h-full sm:w-[70%] w-full flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-bl from-[#141E32] to-[#01040F] text-white rounded-xl py-4 px-3 h-full sm:w-[70%] w-full flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-bl from-[#141E32] to-[#01040F] text-white rounded-xl py-4 px-3 h-full sm:w-[70%] w-full">
      <div className="mx-auto">
        {/* Account balance section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs text-gray-400">Total Balance</span>
              <span className="text-xs bg-gray-800 px-1 rounded">$</span>
              <span className="text-xs text-gray-400">Main Account</span>
            </div>
            <h1 className="text-2xl font-bold">${totalBalance.toFixed(2)}</h1>
          </div>
          <div className="flex gap-2">
            <button className="bg-purple-600 text-white px-4 py-1 rounded-md text-sm hover:bg-purple-700 transition-colors">
              Deposit
            </button>
            <button className="bg-gray-800 text-white px-4 py-1 rounded-md text-sm hover:bg-gray-700 transition-colors">
              Buy Crypto
            </button>
          </div>
        </div>

        {/* Assets section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Assets</h2>
            <div className="flex items-center text-orange-400 text-sm cursor-pointer hover:text-orange-300 transition-colors">
              <span>Asset Details</span>
              <span className="ml-1">▸</span>
            </div>
          </div>

          {/* Asset selection dropdown */}
          <div className="relative mb-4 w-full sm:w-64">
            <select
              value={selectedAssetId || ''}
              onChange={(e) => setSelectedAssetId(e.target.value || null)}
              className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-600"
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
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          {/* Selected asset info */}
          {selectedAssetId && (
            <div className="mb-4 flex items-center">
              {getSelectedAsset() && (
                <>
                  <span className="text-sm font-medium mr-2">
                    {getSelectedAsset()?.name} ({getSelectedAsset()?.symbol})
                  </span>
                  <span className="text-sm text-gray-400">
                    Balance:{userAssets.find(a => a.platformAssetId === selectedAssetId)?.balance.toFixed(2)}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Chart */}
          <div className="h-52 border border-gray-800 rounded-lg p-2">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#F9FAFB',
                    }}
                    formatter={(value) => [`$${value}`, 'Balance']}
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
                {selectedAssetId ? 'No chart data available' : 'Select an asset to view chart'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart