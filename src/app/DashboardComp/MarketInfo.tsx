'use client'
import React, { useState, useEffect } from 'react'
import { dummyData } from '../data/data'
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const MarketInfo = () => {
    const [cryptoData, setCryptoData] = useState<{ id: number; name: string; symbol: string; price: number; change24h: number; marketCap: number; trend: string; image: string; }[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('favorites'); 
    const [selectedCurrency, setSelectedCurrency] = useState('USDT');
    
    const itemsPerPage = 10;
    const totalPages = Math.ceil(dummyData.length / itemsPerPage);

    useEffect(() => {
        // In a real implementation, this would be your API fetch
        setCryptoData(dummyData);
      }, []);
      
      // Filter data based on search term and active tab
      const filteredData = cryptoData
        .filter(crypto => 
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(crypto => {
          if (activeTab === 'hot') return Math.abs(crypto.change24h) > 2; // Just an example condition
          return true; // Show all if tab is 'all'
        });
        
      // Get current page data
      const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      const toggleFavorite = (id: number) => {
        setFavorites(prev => 
          prev.includes(id) 
            ? prev.filter(itemId => itemId !== id) 
            : [...prev, id]
        );
      };

      const TrendChart = ({ type }: { type: 'up' | 'down' }) => {
        if (type === 'up') {
          return (
            <svg width="40" height="16" viewBox="0 0 40 16" className="text-green-500">
              <polyline points="0,12 5,8 10,10 15,6 20,8 25,4 30,2 35,0 40,3" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
            </svg>
          );
        } else {
          return (
            <svg width="40" height="16" viewBox="0 0 40 16" className="text-red-500">
              <polyline points="0,3 5,6 10,4 15,8 20,6 25,10 30,12 35,14 40,12" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
            </svg>
          );
        }
      };

      const goToPage = (pageNumber: number) => {
        setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
      };
    
      // Removed unused formatNumber function
    
      // Pagination component
      const Pagination = () => (
        <div className="flex sm:justify-end justify-center items-center space-x-1 mt-4">
          <button 
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-[#1A1C24] hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>
          
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum;
            
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            if (pageNum > 0 && pageNum <= totalPages) {
              return (
                <button
                  key={i}
                  onClick={() => goToPage(pageNum)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPage === pageNum 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-[#1A1C24] hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
            return null;
          })}
          
          {totalPages > 5 && (
            <>
              <div className="px-1">...</div>
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

  return (
    <div className=" text-white mt-15">
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
          className={` py-3 text-sm font-medium `}
          onClick={() => setActiveTab('favorites')}
        >
          Favourites
        </button>
        <button
          className={` py-3 text-sm font-medium ${activeTab === 'hot' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('hot')}
        >
          Hot
        </button>
      </div>
      <select
            className="bg-[#1A1C24] px-4 py-2 rounded-lg appearance-none sm:hidden  cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="USDT" >USDT</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
      </div>
      
      {/* Pagination at the top */}
     
      
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="text-gray-400 text-sm ">
              <th className="py-3 px-4 text-left w-16"></th>
              <th className="py-3 px-4 text-left">Asset</th>
              <th className="py-3 px-4 text-right">Current Price</th>
              <th className="py-3 px-4 text-right">24h Change</th>
              <th className="py-3 px-4 text-right">Market Cap</th>
              <th className="py-3 px-4 text-center">Trend</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((crypto, index) => (
              <tr 
                key={crypto.id} 
                className={` hover:bg-gray-800/20 rounded-lg ${
                  index % 2 === 1 ? 'bg-[#1A1C24]' : ''
                }`}
              >
                <td className="py-4 px-4">
                  <button
                    onClick={() => toggleFavorite(crypto.id)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={18}
                      className={favorites.includes(crypto.id) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}
                    />
                  </button>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Image
                        src={crypto.image}
                        alt={crypto.name}
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-medium">${crypto.price.toLocaleString()}</td>
                <td className={`py-4 px-4 text-right font-medium ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </td>
                <td className="py-4 px-4 text-right">{crypto.marketCap}T ({selectedCurrency})</td>
                <td className="py-4 px-4 flex justify-center">
                  <TrendChart type={crypto.trend as 'up' | 'down'} />
                </td>
                <td className="py-4 px-4 text-center">
                  <button className="bg-[#1A1C24] px-4 py-1 rounded text-sm hover:bg-blue-600 transition">
                    Trade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile List */}
      <div className="sm:hidden">
        {currentData.map((crypto, index) => (
        <div 
        key={crypto.id} 
        className={`mb-2 py-4 px-3 flex items-center justify-between rounded-lg ${
          index % 2 === 0 ? 'bg-[#0D0E12]' : ''
        }`}
      >
            <div className="flex items-center">
              <button
                onClick={() => toggleFavorite(crypto.id)}
                className="mr-3 focus:outline-none"
              >
                <Star
                  size={16}
                  className={favorites.includes(crypto.id) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}
                />
              </button>
              <div className="w-7 h-7 mr-2 bg-yellow-500 rounded-full flex items-center justify-center">
                <Image
                  src={crypto.image}
                  alt={crypto.name}
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <div className="font-medium text-sm">{crypto.name}</div>
                <div className="text-gray-400 text-xs">{crypto.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-sm">${crypto.price.toLocaleString()}</div>
              <div className={crypto.change24h >= 0 ? 'text-green-500 text-xs' : 'text-red-500 text-xs'}>
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Pagination />
    </div>
  </div>
  )
}

export default MarketInfo