"use client";
import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import TopBalanced from "./TopBalanced";

const LeaderContent = () => {
  const [activeTab, setActiveTab] = useState("Top Balanced Traders");

  const tabs = [
    "Top Balanced Traders",
    "High ROI",
    "High yields",
    "Highest copiers'PnL",
    "Most Copied",
  ];

  const renderLeaderContent = () => {
    switch (activeTab) {
      case "Top Balanced Traders":
        return (
          <div>
            <TopBalanced/>
          </div>
        );
      case "High ROI":
        return (
          <div>
            <h2>High ROI</h2>
          </div>
        );
      case "High yields":
        return (
          <div>
            <h2>High yields</h2>
          </div>
        );
      case "Highest copiers'PnL":
        return (
          <div>
            <h2>Highest copiers&#39;PnL</h2>
          </div>
        );
      case "Most Copied":
        return (
          <div>
            <h2>Most Copied</h2>
          </div>
        );
    }
  };
  return (
    <div>
      {/* tab toggle */}
      <div>
        {/* desktop view */}
        <div className="md:flex space-x-4 hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={` bg-[#141E32] p-2 text-[14px] rounded-md ${
                activeTab === tab ? "text-[#6967AE]" : "text-white"
              } cursor-pointer`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Mobile view select dropdown */}
        <div className="flex flex-row gap-2 md:hidden mb-4 w-full items-center">
          {/* Option dropdown - flexible width */}
          <div className="relative flex-1 min-w-[120px]">
            <select
              className="w-full bg-[#10131F]  rounded-md px-3 py-2 text-white text-sm  appearance-none pr-7"
              onChange={(e) => setActiveTab(e.target.value)}
              value={activeTab}
            >
              {tabs.map((tab) => (
                <option
                  value={tab}
                  key={tab}
                  className="bg-[#10131F] text-white"
                >
                  {tab}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Search - takes remaining space */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#10131F] px-3 py-2 pr-7 rounded-full text-sm text-gray-200 focus:outline-none placeholder:text-[#E8E8E8] placeholder:text-[12px] border border-[#2D2F3D]"
            />
            <Search
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#E8E8E8]"
              size={14}
            />
          </div>

          {/* Daily Picks button - fixed width */}
          <button className="bg-gradient-to-r from-[#439A86] to-[#283F3B] hover:bg-teal-700 text-white border border-[#439A8636] text-[12px] rounded-md px-3 py-2 whitespace-nowrap flex-shrink-0">
            Daily Picks
          </button>
        </div>
      </div>
      <div>
        {renderLeaderContent()}
      </div>
    </div>
  );
};

export default LeaderContent;
