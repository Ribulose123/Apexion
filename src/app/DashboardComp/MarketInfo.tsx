'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight} from 'lucide-react';
import { FaStar, FaRegStar } from 'react-icons/fa';

// --- Sparkline Component ---
interface SparklineProps {
  data: number[];
  isPositive: boolean;
}

const Sparkline: React.FC<SparklineProps> = ({ data, isPositive }) => {
  if (!data || data.length === 0) {
    return <div className="w-16 h-8 flex items-center justify-center text-gray-500 text-xs">No Data</div>;
  }

  const width = 60;
  const height = 30;
  const strokeColor = isPositive ? "#10B981" : "#EF4444";

  // Find min/max values for scaling
  const minY = Math.min(...data);
  const maxY = Math.max(...data);

  // Calculate points for the SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minY) / (maxY - minY)) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
};

// Interface for a single cryptocurrency coin
interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

const MarketInfo = () => {
    const [cryptoData, setCryptoData] = useState<Coin[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('favorites');
    const [selectedCurrency, setSelectedCurrency] = useState('USDT');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCryptoCount, setTotalCryptoCount] = useState(0); 

    
    const itemsPerPage = 20;

    // Fetch data based on currentPage and selectedCurrency
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=${currentPage}&sparkline=true`);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: Coin[] = await response.json();
          setCryptoData(data);
         
          setTotalCryptoCount(1000); 
        } catch (err) {
          console.error(err);
          setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [currentPage, selectedCurrency, itemsPerPage]); 

    const filteredData = cryptoData
      .filter(crypto =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );

  
    const totalPages = Math.ceil(totalCryptoCount / itemsPerPage);


   
    const currentData = filteredData;

    const toggleFavorite = (id: string) => {
      setFavorites(prev =>
        prev.includes(id)
          ? prev.filter(itemId => itemId !== id)
          : [...prev, id]
      );
    };

    const goToPage = (pageNumber: number) => {
      setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
    };

    // Pagination component
    const Pagination = () => {
      // Calculate visible page numbers
      const visiblePages = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
          let endPage = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

          // Adjust start/end to ensure maxVisiblePages are shown
          if (endPage - startPage + 1 < maxVisiblePages) {
            if (startPage === 1) {
              endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            } else if (endPage === totalPages) {
              startPage = Math.max(1, totalPages - maxVisiblePages + 1);
            }
          }

          for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
          }
        }

        return pages;
      };

      return (
        <div className="flex sm:justify-end justify-center items-center space-x-1 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-[#1A1C24] hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>

          {visiblePages().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === pageNum
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#1A1C24] hover:bg-gray-700'
              }`}
            >
              {pageNum}
            </button>
          ))}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="px-1">...</span>
              <button
                onClick={() => goToPage(totalPages)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentPage === totalPages
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#1A1C24] hover:bg-gray-700'
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-[#1A1C24] hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      );
    };

    if (loading) {
  return (
    <div className="bg-[#01040F] text-white min-h-screen p-2 sm:p-6 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-lg mb-4">Loading cryptocurrency data...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );
}

    if (error) {
      return (
        <div className="text-white mt-15 text-center py-10">
          <div className="text-red-500 mb-4">Error loading market data: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <div className="text-white mt-15">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h1 className="text-2xl font-bold">Market</h1>

            <div className="flex items-center w-full sm:w-auto">
              <div className="relative mr-2 flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-[#1A1C24] pl-10 pr-3 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="bg-[#1A1C24] px-4 py-2 rounded-lg appearance-none sm:block hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                <option value="USDT">USDT</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className='flex justify-between items-center'>
            <div className="mb-4 flex gap-6 sm:hidden">
              <button
                className={`py-3 text-sm font-medium ${activeTab === 'favorites' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab('favorites')}
              >
                Favourites
              </button>
              <button
                className={`py-3 text-sm font-medium ${activeTab === 'hot' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab('hot')}
              >
                Hot
              </button>
            </div>
            <select
              className="bg-[#1A1C24] px-4 py-2 rounded-lg appearance-none sm:hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>

          {/* Desktop Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm mt-4 min-w-[700px]">
              <thead>
                <tr className="border-b border-t border-[#141E325C] p-7">
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]"></th>
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Name</th>
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Price</th>
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">24hr High</th>
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">24hr Low</th>
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">24hr Volume</th>
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">24(%)</th>
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Trending</th>
                  <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Trade</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-5 text-gray-400">
                      {searchTerm ? `No results found for "${searchTerm}"` : 'No cryptocurrencies found'}
                    </td>
                  </tr>
                ) : (
                  currentData.map((coin) => (
                    <tr key={coin.id} className="border-b border-[#141E325C]">
                      <td className="py-3 sm:py-5 px-2 sm:px-4">
                        <button onClick={() => toggleFavorite(coin.id)}>
                          {favorites.includes(coin.id) ?
                            <FaStar className="text-yellow-500"/> :
                            <FaRegStar className="text-gray-500"/>
                          }
                        </button>
                      </td>
                      <td className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px] flex items-center gap-2">
                          <Image
                              src={coin.image || 'https://via.placeholder.com/24/0A101D/FFFFFF?text=X'}
                              alt={coin.name}
                              width={24}
                              height={24}
                              className="w-6 h-6"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/24/0A101D/FFFFFF?text=X';
                                (e.target as HTMLImageElement).onerror = null;
                              }}
                          />
                          <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                      </td>
                      <td className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">
                        ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">
                        ${coin.high_24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">
                        ${coin.low_24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">
                        ${coin.total_volume.toLocaleString()}
                      </td>
                      <td className={`py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px] ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="py-3 sm:py-5 px-2 sm:px-4">
                        {coin.sparkline_in_7d?.price && coin.sparkline_in_7d.price.length > 0 ? (
                          <Sparkline
                            data={coin.sparkline_in_7d.price}
                            isPositive={coin.price_change_percentage_24h >= 0}
                          />
                        ) : (
                          <div className="w-16 h-8 flex items-center justify-center text-gray-500 text-xs">N/A</div>
                        )}
                      </td>
                      <td className="py-3 sm:py-5 px-2 sm:px-4">
                        <button className="border border-gray-100 p-1 w-[100] rounded-full text-[10px] sm:text-[14px]">Trade</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination />
        </div>
      </div>
    );
}

export default MarketInfo;