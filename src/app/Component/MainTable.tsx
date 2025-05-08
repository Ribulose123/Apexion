"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { tabData } from "../data/data";
import Link from "next/link";

interface CryptoData {
  icon: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  volume: string;
}

interface TabData {
  [key: string]: CryptoData[];
}

interface SortOrder {
  name: "asc" | "desc" | null;
  price: "asc" | "desc" | null;
  change: "asc" | "desc" | null;
  volume: "asc" | "desc" | null;
}

const MainTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("popular");
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    name: null,
    price: "desc",
    change: null,
    volume: null,
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getCurrentData = (): CryptoData[] => {
    return (tabData as TabData)[activeTab] || (tabData as TabData).popular;
  };

  const toggleSort = (column: keyof SortOrder) => {
    const newSortOrder = { ...sortOrder };
    if (sortOrder[column] === "asc") {
      newSortOrder[column] = "desc";
    } else if (sortOrder[column] === "desc") {
      newSortOrder[column] = null;
    } else {
      newSortOrder[column] = "asc";
    }

    (Object.keys(newSortOrder) as Array<keyof SortOrder>).forEach((key) => {
      if (key !== column) {
        newSortOrder[key] = null;
      }
    });

    setSortOrder(newSortOrder);
  };

  const getSortIcon = (column: keyof SortOrder) => {
    if (sortOrder[column] === "asc") {
      return <ChevronUp className="inline w-4 h-4" />;
    } else if (sortOrder[column] === "desc") {
      return <ChevronDown className="inline w-4 h-4" />;
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="hidden md:block">
        {/* Tabs */}
        <div className="flex items-center justify-center mx-auto mb-6 mt-3">
          <button
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "popular" ? "border-b border-white" : ""
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
                  Change {getSortIcon("change")}
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
              {getCurrentData().map((crypto, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-4 pl-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{crypto.icon}</span>
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs text-gray-500">
                          {crypto.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-mono">{crypto.price}</td>
                  <td
                    className={`py-4 ${
                      crypto.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.change}
                  </td>
                  <td className="py-4">{crypto.volume}</td>
                  <td className="py-4 pr-4">
                    <div className="flex justify-end">
                      <button className="currency-display hover:bg-gray-700 hover:text-purple-300 px-4 py-2 rounded text-sm transition-colors">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-end justify-end">
          <Link
            href="#"
            className="flex items-center justify-end text-[13px] gap-3 text-[#797A80] "
          >
            Explore more assest
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      {/* mobile view */}
      <div className="block md:hidden px-4 py-6">
        <h2 className="text-white font-medium text-lg mb-4">Popular</h2>

        <div className="grid grid-cols-3 text-xs text-gray-400 mb-2">
          <div>Pairs</div>
          <div>Last Price</div>
          <div>24h Change</div>
        </div>

        {/* Crypto rows */}
        <div className="space-y-3">
          {/* Row 1 */}
          <div className="grid grid-cols-3 items-center">
            <div className="text-white font-medium">BTC/USDT</div>
            <div className="text-white">63,813.4</div>
            <div className="bg-green-500 text-white text-center py-1 px-2 rounded text-xs font-medium">
              0.7%
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 items-center">
            <div className="text-white font-medium">BTC/USDT</div>
            <div className="text-white">63,813.4</div>
            <div className="bg-red-500 text-white text-center py-1 px-2 rounded text-xs font-medium">
              -0.7%
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 items-center">
            <div className="text-white font-medium">BTC/USDT</div>
            <div className="text-white">63,813.4</div>
            <div className="bg-green-500 text-white text-center py-1 px-2 rounded text-xs font-medium">
              0.8%
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-3 items-center">
            <div className="text-white font-medium">BTC/USDT</div>
            <div className="text-white">63,813.4</div>
            <div className="bg-red-500 text-white text-center py-1 px-2 rounded text-xs font-medium">
              -0.7%
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-3 items-center">
            <div className="text-white font-medium">BTC/USDT</div>
            <div className="text-white">63,813.4</div>
            <div className="bg-red-500 text-white text-center py-1 px-2 rounded text-xs font-medium">
              -0.7%
            </div>
          </div>
        </div>

        {/* Footer link */}
        <div className="flex justify-center mt-4">
          <a href="#" className="flex items-center text-[13px] gap-3 text-[#797A80]">
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
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainTable;
