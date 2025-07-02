'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, RefreshCw, Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';


type PlatformAsset = {
  id: string;
  name: string;
  symbol: string;
  image?: string;
};

type UserAsset = {
  platformAssetId: string;
  platformAsset: PlatformAsset;
  balance: number;
};

const DEFAULT_ASSETS: PlatformAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    
  }
];

export default function CryptoConverter() {
  const [fromAsset, setFromAsset] = useState<string>('');
  const [toAsset, setToAsset] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string>('--');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [assets, setAssets] = useState<PlatformAsset[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<'from' | 'to' | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Please log in to view your assets');
        }

        const response = await fetch(API_ENDPOINTS.USER.USER_PROFILE, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }
        
        const data = await response.json();
        const userAssets = data.data?.userAssets || data.userAssets || [];
        
        let platformAssets: PlatformAsset[] = [];

        if (userAssets.length > 0) {
          platformAssets = userAssets.map((asset: UserAsset) => ({
            id: asset.platformAssetId,
            name: asset.platformAsset?.name || `Asset ${asset.platformAssetId}`,
            symbol: asset.platformAsset?.symbol || '???',
            image: asset.platformAsset?.image || '/icons/default-crypto.png'
          }));
        } else {
          platformAssets = DEFAULT_ASSETS;
          setError('No assets found in your account. Using demo assets.');
        }

        setAssets(platformAssets);

        if (platformAssets.length >= 2) {
          setFromAsset(platformAssets[0].id);
          setToAsset(platformAssets[1].id);
        } else if (platformAssets.length === 1) {
          setFromAsset(platformAssets[0].id);
        }

      } catch (err) {
        console.error('Error fetching assets:', err);
        setError('Failed to load assets. Using demo data instead.');
        setAssets(DEFAULT_ASSETS);
        if (DEFAULT_ASSETS.length >= 2) {
          setFromAsset(DEFAULT_ASSETS[0].id);
          setToAsset(DEFAULT_ASSETS[1].id);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

 const handleConversion = async () => {
  if (!fromAsset || !toAsset || !amount || parseFloat(amount) <= 0) {
    setError('Please select assets and enter a valid amount');
    return;
  }

  setIsConverting(true);
  setError('');
  setConvertedAmount('--');

  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(API_ENDPOINTS.USER.CONVERT_ASSEST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fromAssetId: fromAsset,
        toAssetId: toAsset,
        amount: parseFloat(amount)
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Conversion failed');
    }

    
    if (result.statusCode === 201 && result.message === 'Asset converted successfully') {
    
      const convertedValue = result.data?.amount || parseFloat(amount);
      setConvertedAmount(convertedValue);
    } else {
      console.log('Full API response:', result);
      throw new Error('Conversion completed but with unexpected response');
    }

  } catch (err) {
    console.error('Conversion error:', err);
    setError(err instanceof Error ? err.message : 'Conversion failed');
  } finally {
    setIsConverting(false);
  }
};

  const swapAssets = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setAmount(convertedAmount === '--' ? '' : convertedAmount);
    setConvertedAmount(amount || '--');
  };

  const getAssetById = (id: string) => assets.find(asset => asset.id === id);

  const fromAssetData = getAssetById(fromAsset);
  const toAssetData = getAssetById(toAsset);

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-900 rounded-xl relative">
      <h2 className="text-2xl font-bold text-white mb-6">Crypto Converter</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
          <span className="ml-2 text-gray-400">Loading assets...</span>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 p-3 bg-yellow-900/50 text-yellow-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* From Asset */}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">From</label>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(isDropdownOpen === 'from' ? null : 'from')}
                className="flex items-center justify-between w-full bg-gray-800 rounded-lg p-3 text-left hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {fromAssetData ? (
                    <>
                      <span className="text-white">{fromAssetData.symbol}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Select asset</span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen === 'from' ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen === 'from' && (
                <div className="absolute z-50 mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-auto">
                  {assets.map(asset => (
                    <button
                      key={asset.id}
                      onClick={() => {
                        setFromAsset(asset.id);
                        setIsDropdownOpen(null);
                      }}
                      className={`flex items-center gap-2 w-full p-3 text-left hover:bg-gray-700 ${fromAsset === asset.id ? 'bg-gray-700' : ''}`}
                    >
                     
                      <span className="text-white">{asset.name} ({asset.symbol})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="mt-2 w-full bg-gray-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
              disabled={!fromAsset}
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-2">
            <button
              onClick={swapAssets}
              className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              disabled={!fromAsset || !toAsset}
            >
              <RefreshCw className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* To Asset */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">To</label>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(isDropdownOpen === 'to' ? null : 'to')}
                className="flex items-center justify-between w-full bg-gray-800 rounded-lg p-3 text-left hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {toAssetData ? (
                    <>
                     
                      <span className="text-white">{toAssetData.name}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Select asset</span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen === 'to' ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen === 'to' && (
                <div className="absolute z-50 mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-auto">
                  {assets.map(asset => (
                    <button
                      key={asset.id}
                      onClick={() => {
                        setToAsset(asset.id);
                        setIsDropdownOpen(null);
                      }}
                      className={`flex items-center gap-2 w-full p-3 text-left hover:bg-gray-700 ${toAsset === asset.id ? 'bg-gray-700' : ''}`}
                    >
                     
                      <span className="text-white">{asset.name} ({asset.symbol})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-2 w-full bg-gray-800 rounded-lg p-3 text-white">
              {convertedAmount}
            </div>
          </div>

          {/* Convert Button */}
          <button
            onClick={handleConversion}
            disabled={!fromAsset || !toAsset || !amount || isConverting}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
              !fromAsset || !toAsset || !amount || isConverting
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-500 text-black hover:bg-yellow-400'
            }`}
          >
            {isConverting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Converting...
              </span>
            ) : (
              'Convert Now'
            )}
          </button>
        </>
      )}
    </div>
  );
}