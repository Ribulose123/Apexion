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

interface ChartDataPoint {
  date: string
  balance: number
}

interface PlatformAsset {
  id: string
  name: string
  symbol: string
}

interface UserAsset {
  platformAssetId: string
  platformAsset: PlatformAsset
  balance: number
}

const Chart = () => {
  const [totalBalance, setTotalBalance] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [userAssets, setUserAssets] = useState<UserAsset[]>([])
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null)

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
        console.log('User assets:', responseData.data.userAssets)
        
        const assets = responseData.data.userAssets || []
        setUserAssets(assets)
        setTotalBalance(assets.reduce((sum: number, asset: UserAsset) => sum + asset.balance, 0))

        // Select first asset by default if available
        if (assets.length > 0) {
          setSelectedAssetId(assets[0].platformAssetId)
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
                    Balance: ${userAssets.find(a => a.platformAssetId === selectedAssetId)?.balance.toFixed(2)}
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