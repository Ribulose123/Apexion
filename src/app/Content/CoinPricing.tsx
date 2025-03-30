'use client'
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaSearch, FaRegStar } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";

const dummyData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: "Bitcoin",
  symbol: "BTC",
  price: "$64,774.95",
  marketCap: "$1.2T",
  volume: "$36.5B",
  change: i % 2 === 0 ? "+3.45%" : "-2.10%",
}));

const CryptoTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const itemsPerPage = 10;

  const filteredData = dummyData.filter((coin) => {
    if (category === "Gainers") return coin.change.includes("+");
    if (category === "Losers") return coin.change.includes("-");
    return true;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-[#01040F] text-white min-h-screen p-2 sm:p-6 relative w-full">
     
      <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 rounded-lg overflow-x-auto">
      <div className="flex overflow-auto items-center gap-10 justify-between text-gray-400 mb-4 px-3">
          {["All", "Gainers", "Losers", "Hot", "Tradeable", "New", "Volume", "Watchlist"].map((cat) => (
            <span
              key={cat}
              className={`cursor-pointer text-sm whitespace-nowrap ${category === cat ? "text-white border-b-3 border-b-green-500  " : ""}`}
              onClick={() => { setCategory(cat); setCurrentPage(1); }}
            >
              {cat}
            </span>
          ))}
          <div className="relative mt-2 sm:mt-0">
            <input type="search" placeholder="Search asset" className="border border-white bg-[#10131F] rounded-full placeholder:text-[#7D8491] text-center text-[10px] p-2"/>
            <FaSearch className="absolute top-3 left-4 text-[10px]" />
          </div>
        </div>
        <h2 className="text-white capitalize flex items-center gap-1 text-sm sm:text-base">
          all cryptocurrencies 
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
                <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Trending</th>
                <th className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">Trade</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((coin) => (
                <tr key={coin.id} className="">
                  <td className="py-3 sm:py-5 px-2 sm:px-4"><FaRegStar className="text-gray-500"/></td>
                  <td className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">{coin.name} ({coin.symbol})</td>
                  <td className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">{coin.price}</td>
                  <td className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">{coin.marketCap}</td>
                  <td className="py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px]">{coin.volume}</td>
                  <td className={`py-3 sm:py-5 px-2 sm:px-4 text-[10px] sm:text-[14px] ${coin.change.includes("+") ? "text-green-500" : "text-red-500"}`}>{coin.change}</td>
                  <td></td>
                  <td></td>
                  <td className="py-3 sm:py-5 px-2 sm:px-4">
                    <button className="border border-gray-100 p-1 w-[100] rounded-full text-[10px] sm:text-[14px]">Trade</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="p-2 rounded-full"><FaArrowLeft /></button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded-full text-[12px] ${currentPage === i + 1 ? "bg-green-300" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} className="p-2 rounded-full"><FaArrowRight /></button>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;