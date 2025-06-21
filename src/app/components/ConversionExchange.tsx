import React from "react";
import Link from "next/link";
import { BookIcon } from "lucide-react";
import { featuredCoins, newlyListedCoins } from "../data/data";
import CryptoConverter from "../DashboardComp/CryptoConverter";
import BidvestFAQ from "../DashboardComp/FAQItem";

const ConversionExchange = () => {
  return (
    <div className="px-2 md:px-6">
      <div className="md:flex items-center justify-between hidden">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl text-[#E8E8E8] capitalize">convert</h2>
          <p className="text-sm text-[#E8E8E8]">
            zero fees | Real-time swap | Multi-asset support
          </p>
        </div>

        <div className="currency-display">
          <Link
            href="#"
            className="text-[14px] text-[E8E8E8] flex items-center gap-2"
          >
            <BookIcon size={14} />
            Conversion history
          </Link>
        </div>
      </div>

      <div className="mt-15 flex md:flex-row flex-col">
        <div className="md:w-[70%] hidden md:block">
          <h3 className="text-[#E8E8E8] text-2xl font-semibold mb-10">Market highlights</h3>
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Featured/Newly Listed Section - First on desktop, Second on mobile */}
            <div className="w-full md:w-1/2">
              <div className="flex flex-col  border border-[#141E32] text-white rounded-lg overflow-hidden w-full max-w-md mx-auto md:mx-0 shadow-lg">
                <div className="flex flex-col md:flex-row">
                  {/* Trending Column */}
                  <div className="md:w-1/2 w-full border-r border-gray-800 p-4">
                    <h3 className="text-gray-400 mb-4 text-sm font-medium">
                      Trending
                    </h3>
                    <div className="space-y-1">
                      {featuredCoins.map((coin) => (
                        <div
                          key={coin.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">{coin.symbol}</span>
                          </div>
                          <span className="text-sm">{coin.price}</span>
                          <span
                            className={`text-sm ${
                              coin.positive ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {coin.change}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Newly Listed Column */}
                  <div className="md:w-1/2 w-full p-4 ">
                    <h3 className="text-gray-400 mb-4 text-sm font-medium">
                      Newly Listed
                    </h3>
                    <div className="space-y-1">
                      {newlyListedCoins.map((coin) => (
                        <div
                          key={coin.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                            <span className="text-sm">{coin.symbol}</span>
                          </div>
                          <span className="text-sm">{coin.price}</span>
                          <span
                            className={`text-sm ${
                              coin.positive ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {coin.change}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[50%] w-fullz">
            <CryptoConverter/>
        </div>
      </div>
      <BidvestFAQ/>
    </div>
  );
};

export default ConversionExchange;
