'use client'
import React, { useState, useEffect } from 'react'
import { FaRegStar, FaStar } from "react-icons/fa";
import Image from 'next/image';
import { Loader } from '../ui/Loader';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

const CoinTable = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  // Set initial active tab to 'Hot'
  const [activeTab, setActiveTab] = useState('Hot'); 
  const [favorites, setFavorites] = useState<string[]>([]);

  // Define tabs for rendering
  const tabs = ['Favourites', 'Hot'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to add an error state here to show a message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (coinId: string) => {
    setFavorites(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId) 
        : [...prev, coinId]
    );
  };

  // Filter coins based on the active tab
  const filteredCoins = activeTab === 'Favourites' 
    ? coins.filter(coin => favorites.includes(coin.id))
    
    : coins.slice(0, 9); 

  if (loading) return <div className="text-center py-4 flex gap-2">Loading coins <Loader/> </div>;

  return (
    <div className="border border-[#141E32] p-4 rounded-xl text-white mt-6">

       <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Market</h2>
        <a href="#" className="text-sm text-yellow-500 hover:underline">View More →</a>
      </div>
      
       <div className="flex gap-2">
          {tabs.map((tab) => (
            <button 
              key={tab} 
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-purple-700 text-white' : 'bg-[#1E293B]'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm mt-4 min-w-[700px]">
          <thead className='text-gray-400 border-b border-[#1E293B]'>
            <tr className="">
              <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]"></th>
              <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Coin</th>
              <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Price</th>
              <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">24h Change</th>
              <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {/* Display message if no coins match the filter */}
            {filteredCoins.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  {activeTab === 'Favourites' ? 'No favorite coins added yet.' : 'No hot coins to display.'}
                </td>
              </tr>
            ) : (
              filteredCoins.map(coin => (
                <tr key={coin.id} className="border-b border-[#1E293B] hover:bg-[#1E293B]">
                  <td className="py-3">
                    <button onClick={() => toggleFavorite(coin.id)}>
                      {favorites.includes(coin.id) ? 
                        <FaStar className="text-yellow-500" /> : 
                        <FaRegStar className="text-gray-400" />
                      }
                    </button>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <Image 
                      src={coin.image} 
                      alt={coin.name} 
                      className="w-6 h-6"
                      width={24}
                      height={24}
                     
                    />
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-gray-500 text-sm">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </td>
                  <td className="p-3 text-right">${coin.current_price.toLocaleString()}</td>
                  <td className={`p-3 text-right ${
                    coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="p-3 text-right">${coin.market_cap.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinTable;