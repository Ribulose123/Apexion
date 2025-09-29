"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import LeaderContentMore from "./LeaderContentMore";
import AllTrades from "./AllTrades";
import Subscribed from "./Subscribed";

const TopMore = () => {
  const [leadeTrade, setLeaderTrade] = useState("🔥Leaderboard");
  const [searchQuery, setSearchQuery] = useState("");
  const tabs = ["🔥Leaderboard", "All traders", "subscribed"];


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

    const clearSearch = () => {
    setSearchQuery("");
  };


  const renderCopyContent = () => {
    switch (leadeTrade) {
      case "🔥Leaderboard":
        return (
          <div>
            <LeaderContentMore searchQuery={searchQuery}/>
          </div>
        );
      case "All traders":
        return (
          <div>
           <AllTrades searchQuery={searchQuery}/>
          </div>
        );
      case "subscribed":
        return (
          <div>
           <Subscribed searchQuery={searchQuery} />
          </div>
        );
    }
  };
  return (
    <div className="min-h-screen text-white md:p-4 w-full">
      {/* Copy controlls */}
      <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-3 w-full">
        {/* leaders toggle */}
        <div className="flex md:space-x-4 space-x-7">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`relative px-1 text-[20px] md:text-[20px] ${
                leadeTrade === tab
                  ? "text-white after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-[#6967AE]"
                  : "text-[#7D8491]"
              }`}
              onClick={() => setLeaderTrade(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* search */}
        <div className="md:flex space-x-2 hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="bg-[#10131F]  px-3 py-2 pr-8 rounded-full text-sm text-gray-200 focus:outline-none placeholder:text-[#E8E8E8] placeholder:text-[14px]"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[E8E8E8]"
              size={16}
            />
             {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
          <button className="bg-linear-to-r from-[#439A86] to-[#283F3B] hover:bg-teal-700 text-white border border-[#439A8636] text-[12px] rounded-md px-3 py-2">
            Daily Picks
          </button>
        </div>
      </div>
      {/* content */}
      <div className="mt-4">
        {renderCopyContent()}
        </div>
      
    </div>
  );
};

export default TopMore;
