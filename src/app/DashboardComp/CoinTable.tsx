'use client'
import React, { useState, useEffect } from 'react'
import { dummyCoins } from '../data/data'
import { FaRegStar } from "react-icons/fa";
import { CgArrowsExchangeV } from "react-icons/cg";

type Coin = {
  id: number;
  name: string;
  symbol: string;
  icon: string;
  trend: 'up' | 'down';
  quantity: string;
  quantityUsd: string;
  type: string;
  price: string;
};

const CoinTable = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call with loading state
    setTimeout(() => {
      setCoins(dummyCoins.slice(0, 6) as Coin[]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="text-white text-center py-4">Loading...</div>;
  }

  return (
    <div className="border border-[#141E32] p-4 rounded-xl text-white mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Market</h2>
        <a href="#" className="text-sm text-yellow-500 hover:underline">View More →</a>
      </div>

      <div className="flex gap-4 mb-4">
        <button className="bg-[#1E293B] text-xs px-4 py-1 rounded-md text-white">Favourites</button>
        <button className="bg-purple-700 text-xs px-4 py-1 rounded-md text-white">Hot</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-[#1E293B]">
            <tr className="text-left">
              <th className="py-2"></th>
              <th className="py-2">Asset</th>
              <th className="py-2 hidden sm:table-cell">Trend</th>
              <th className="py-2 hidden sm:table-cell">Quantity</th>
              <th className="py-2 hidden sm:table-cell">Type</th>
              <th className="py-2 hidden sm:table-cell">Current Price</th>
              <th className="py-2 table-cell sm:hidden sm:ml-0 ml-15">
                <button className='flex gap-1'>
                  <span className='flex items-center'>Last Price <CgArrowsExchangeV size={15}/></span><br />
                  <span className='flex items-center'>24hr Change <CgArrowsExchangeV size={15}/></span>
                </button>
              </th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id} className={`border-b border-[#1E293B] p-2 hover:bg-[#1C1F2E] rounded-lg ${index % 2 === 0 ? 'bg-[#2D3748] rounded-full' : ''}`}>
                <td className="py-3 sm:py-5 px-2 sm:px-4">
                  <FaRegStar className="text-gray-500" />
                </td>
                <td className="flex items-center gap-2 py-3 sm:py-5 sm:px-4">
                  <div>
                    <div>{coin.name}</div>
                    <div className="text-gray-400 text-xs">{coin.symbol}</div>
                  </div>
                </td>
                <td className="hidden sm:table-cell">
                  <div className={`w-20 h-6 ${coin.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </td>
                <td className=" text-center sm:text-start ">
                  <div>{coin.quantity}</div>
                  <div className="text-gray-400 text-xs">{coin.quantityUsd}</div>
                </td>
                <td className="hidden sm:table-cell">{coin.type}</td>
                <td className="hidden sm:table-cell">{coin.price}</td>
                <td className="hidden sm:table-cell">
                  <button className="bg-[#1F2937] px-4 py-1 rounded-full text-white">Trade</button>
                </td>
                <td className="sm:hidden">
                  <button className="rounded-full text-white sm:hidden">-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoinTable;
