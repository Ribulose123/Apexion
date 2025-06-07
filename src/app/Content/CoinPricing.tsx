'use client'
import React, { useState, useEffect, useMemo } from "react";
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaSearch, FaRegStar, FaStar } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";

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
    const y = height - ((value - minY) / (maxY - minY)) * height; // Invert Y-axis for SVG
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

const CryptoTable = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All"); 
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('cryptoFavorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
    return [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  
  const itemsPerPage = 10;

  const categories = ["All", "Gainers", "Losers", "Hot", "Tradeable", "New", "Volume", "Watchlist"];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cryptoFavorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // --- UPDATED API CALL: sparkline=true ---
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true' // Changed to true
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Coin[] = await response.json();
        setCoins(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to fetch cryptocurrency data: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (coinId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(coinId) 
        ? prev.filter(id => id !== coinId) 
        : [...prev, coinId];
      return newFavorites;
    });
  };

  const filteredAndSearchedCoins = useMemo(() => {
    let currentFiltered = coins;

    if (category === "All") {
      currentFiltered = coins; 
    } else if (category === "Gainers") {
      currentFiltered = currentFiltered.filter(coin => coin.price_change_percentage_24h > 0);
    } else if (category === "Losers") {
      currentFiltered = currentFiltered.filter(coin => coin.price_change_percentage_24h < 0);
    } else if (category === "Hot") {
      currentFiltered = [...currentFiltered].sort((a, b) => b.total_volume - a.total_volume);
    } else if (category === "Tradeable") {
        currentFiltered = coins; 
    } else if (category === "New") {
        currentFiltered = coins; 
    } else if (category === "Volume") {
      currentFiltered = [...currentFiltered].sort((a, b) => b.total_volume - a.total_volume);
    } else if (category === "Watchlist") {
      currentFiltered = currentFiltered.filter(coin => favorites.includes(coin.id));
    }

    if (searchTerm) {
      currentFiltered = currentFiltered.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return currentFiltered;
  }, [coins, category, favorites, searchTerm]);


  const totalPages = Math.ceil(filteredAndSearchedCoins.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Corrected variable name
  const currentItems = filteredAndSearchedCoins.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div className="bg-[#01040F] text-white min-h-screen p-2 sm:p-6 flex justify-center items-center">
        Loading cryptocurrency data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#01040F] text-red-500 min-h-screen p-2 sm:p-6 flex justify-center items-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-[#01040F] text-white min-h-screen p-2 sm:p-6 relative w-full mt-32">
      
      <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 rounded-lg overflow-x-auto">
        <div className="flex overflow-auto items-center gap-10 justify-between text-gray-400 mb-4 px-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`cursor-pointer text-sm whitespace-nowrap ${category === cat ? "text-white border-b-2 border-green-500" : ""}`}
              onClick={() => { setCategory(cat); setCurrentPage(1); }}
            >
              {cat}
            </span>
          ))}
          <div className="relative mt-2 sm:mt-0">
            <input 
              type="search" 
              placeholder="Search asset" 
              className="border border-white bg-[#10131F] rounded-full placeholder:text-[#7D8491] text-center text-[10px] p-2 pr-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <FaSearch className="absolute top-3 right-4 text-[10px]" />
          </div>
        </div>
        <h2 className="text-white capitalize flex items-center gap-1 text-sm sm:text-base px-3">
          {category} cryptocurrencies 
          <span><IoIosInformationCircleOutline/></span>
        </h2>
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
                <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Trending</th> {/* This column will now show the graph */}
                <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Trade</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-5 text-gray-400">
                    {searchTerm ? `No results found for "${searchTerm}" in the "${category}" category.` : `No cryptocurrencies found in the "${category}" category.`}
                    {(category === "New" || category === "Tradeable") && !searchTerm && (
                        <p className="text-sm mt-2">
                            (This category does not apply specific filtering based on available data.)
                        </p>
                    )}
                  </td>
                </tr>
              ) : (
                currentItems.map((coin) => (
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
                            src={coin.image} 
                            alt={coin.name} 
                            width={24} 
                            height={24} 
                            className="w-6 h-6"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/24/0A101D/FFFFFF?text=X';
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
                      {/* Render Sparkline graph */}
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
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 mb-4 flex-wrap">
            <button 
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} 
              className="p-2 rounded-full disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded-full text-[12px] ${currentPage === i + 1 ? "bg-green-500 text-white" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} 
              className="p-2 rounded-full disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoTable;