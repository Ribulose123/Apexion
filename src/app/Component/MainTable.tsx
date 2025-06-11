"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; 

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  
}

interface SortOrder {
  name: "asc" | "desc" | null;
  price: "asc" | "desc" | null; 
  change: "asc" | "desc" | null; 
  volume: "asc" | "desc" | null; 
}

const MainTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("popular");
  const [cryptoData, setCryptoData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    name: null,
    price: "desc", // Default sort by price descending for popular
    change: null,
    volume: null,
  });

  const BASE_URL = "https://api.coingecko.com/api/v3";

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
          { cache: "no-store" } 
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status} - ${errorText}`
          );
        }

        const data: Coin[] = await response.json();
        setCryptoData(data);
      } catch (err) {
        console.error("Failed to fetch cryptocurrency data:", err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();

    
     const intervalId = setInterval(fetchCryptoData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []); 
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset sort order when changing tabs, or apply a default sort for the new tab
    if (tab === "topGainers") {
      setSortOrder({ name: null, price: null, change: "desc", volume: null });
    } else if (tab === "popular") {
      setSortOrder({ name: null, price: "desc", change: null, volume: null });
    } else if (tab === "newListings") {
      setSortOrder({ name: null, price: null, change: null, volume: null });
    }
  };

  const getSortedAndFilteredData = useMemo(() => {
    let data = [...cryptoData];

    
    if (activeTab === "topGainers") {
      // Filter out coins with no price change data or 0% change
      data = data.filter(coin => coin.price_change_percentage_24h !== null && coin.price_change_percentage_24h > 0);
      // Sort by 24h percentage change (descending for gainers)
      data.sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
    } else if (activeTab === "newListings") {
      
      data.sort((a, b) => b.total_volume - a.total_volume);
      data = data.slice(0, 10); // Show top 10 by volume as a placeholder for new listings
    } else {
      
    }

    // Apply user-initiated column sorting
    if (sortOrder.name) {
      data.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortOrder.name === "asc" ? -1 : 1;
        if (nameA > nameB) return sortOrder.name === "asc" ? 1 : -1;
        return 0;
      });
    } else if (sortOrder.price) {
      data.sort((a, b) =>
        sortOrder.price === "asc"
          ? a.current_price - b.current_price
          : b.current_price - a.current_price
      );
    } else if (sortOrder.change) {
      data.sort((a, b) =>
        sortOrder.change === "asc"
          ? (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0)
          : (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
      );
    } else if (sortOrder.volume) {
      data.sort((a, b) =>
        sortOrder.volume === "asc"
          ? a.total_volume - b.total_volume
          : b.total_volume - a.total_volume
      );
    }

    return data.slice(0, 10);
  }, [cryptoData, activeTab, sortOrder]);


  const toggleSort = (column: keyof SortOrder) => {
    setSortOrder((prevSortOrder) => {
      const newSortOrder = { ...prevSortOrder }; 
      
      (Object.keys(newSortOrder) as Array<keyof SortOrder>).forEach((key) => {
        if (key !== column) {
          newSortOrder[key] = null;
        }
      });

      // Toggle the specific column's sort order
      if (prevSortOrder[column] === "asc") {
        newSortOrder[column] = "desc";
      } else if (prevSortOrder[column] === "desc") {
        newSortOrder[column] = null; // Cycle through asc, desc, null
      } else {
        newSortOrder[column] = "asc";
      }

      return newSortOrder;
    });
  };

  const getSortIcon = (column: keyof SortOrder) => {
    if (sortOrder[column] === "asc") {
      return <ChevronUp className="inline w-4 h-4" />;
    } else if (sortOrder[column] === "desc") {
      return <ChevronDown className="inline w-4 h-4" />;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto text-center py-10 text-white">
        Loading cryptocurrency data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto text-center py-10 text-red-500">
        Error fetching data: {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto text-white">
      <div className="hidden md:block">
        {/* Tabs */}
        <div className="flex items-center justify-center mx-auto mb-6 mt-3">
          <button
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "popular"
                ? "border-b border-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => handleTabChange("popular")}
          >
            Popular
          </button>
          <button
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "topGainers"
                ? "text-white border-b-2 border-purple-500 bg-gray-800 bg-opacity-30"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => handleTabChange("topGainers")}
          >
            Top Gainers
          </button>
          <button
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "newListings"
                ? "text-white border-b-2 border-purple-500 bg-gray-800 bg-opacity-30"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => handleTabChange("newListings")}
          >
            New Listings
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <colgroup>
              <col className="w-[25%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[15%]" />
            </colgroup>
            <thead>
              <tr className="text-gray-400 text-left">
                <th
                  className="pb-4 pl-4 cursor-pointer"
                  onClick={() => toggleSort("name")}
                >
                  Name {getSortIcon("name")}
                </th>
                <th
                  className="pb-4 cursor-pointer"
                  onClick={() => toggleSort("price")}
                >
                  Last Price {getSortIcon("price")}
                </th>
                <th
                  className="pb-4 cursor-pointer"
                  onClick={() => toggleSort("change")}
                >
                  24h Change {getSortIcon("change")}
                </th>
                <th
                  className="pb-4 cursor-pointer"
                  onClick={() => toggleSort("volume")}
                >
                  24h Volume {getSortIcon("volume")}
                </th>
                <th className="pb-4 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {getSortedAndFilteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No data available for this category.
                  </td>
                </tr>
              ) : (
                getSortedAndFilteredData.map((crypto) => (
                  <tr
                    key={crypto.id} // Use crypto.id as key for unique identification
                    className="border-t border-gray-800 hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-4 pl-4">
                      <div className="flex items-center">
                        <Image
                          src={crypto.image}
                          alt={crypto.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 mr-2 rounded-full"
                          onError={(e) => {
                            // Fallback image if actual icon fails to load
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/24/0A101D/FFFFFF?text=X";
                          }}
                        />
                        <div>
                          <div className="font-medium">{crypto.name}</div>
                          <div className="text-xs text-gray-500">
                            {crypto.symbol.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono">
                      ${crypto.current_price.toLocaleString()}
                    </td>
                    <td
                      className={`py-4 ${
                        (crypto.price_change_percentage_24h || 0) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {crypto.price_change_percentage_24h
                        ? `${crypto.price_change_percentage_24h.toFixed(2)}%`
                        : "N/A"}
                    </td>
                    <td className="py-4">
                      ${crypto.total_volume.toLocaleString()}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex justify-end">
                        <Link href={`/market/${crypto.id}`}>
                          <button className="currency-display hover:bg-gray-700 hover:text-purple-300 px-4 py-2 rounded text-sm transition-colors">
                            Details
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-end justify-end mt-4">
          <Link
            href="/market"
            className="flex items-center justify-end text-[13px] gap-3 text-[#797A80] "
          >
            Explore more assets
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* mobile view */}
      <div className="block md:hidden px-4 py-6">
        <h2 className="text-white font-medium text-lg mb-4">Popular</h2>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            Error: {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 text-xs text-gray-400 mb-2">
              <div>Pairs</div>
              <div>Last Price</div>
              <div>24h Change</div>
            </div>

            {/* Crypto rows */}
            <div className="space-y-3">
              {getSortedAndFilteredData.map((crypto) => (
                <div key={crypto.id} className="grid grid-cols-3 items-center">
                  <div className="text-white font-medium flex items-center">
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 mr-1 rounded-full"
                    />
                    {crypto.symbol.toUpperCase()}/USD
                  </div>
                  <div className="text-white">
                    ${crypto.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div
                    className={`${
                      (crypto.price_change_percentage_24h || 0) >= 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-white text-center py-1 px-2 rounded text-xs font-medium`}
                  >
                    {crypto.price_change_percentage_24h
                      ? `${crypto.price_change_percentage_24h.toFixed(2)}%`
                      : "N/A"}
                  </div>
                </div>
              ))}
              {getSortedAndFilteredData.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                      No data available for this category.
                  </div>
              )}
            </div>
          </>
        )}

        {/* Footer link */}
        <div className="flex justify-center mt-4">
          <Link
            href="/market"
            className="flex items-center text-[13px] gap-3 text-[#797A80]"
          >
            Explore more assets
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainTable;