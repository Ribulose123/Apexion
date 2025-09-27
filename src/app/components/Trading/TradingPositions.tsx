"use client";
import React, { useState, useEffect } from "react";
import {  Shuffle } from "lucide-react";
import Position2 from "./Position2";

const TradingPositions = () => {
  const [activeTab, setActiveTab] = useState("Positions (2)");
  const [showToggleMessage, setShowToggleMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const tabs = [
    "Positions (2)",
    "Open Orders (0)",
    "Order History",
    "Position History",
    "Order Details",
    "Transaction History",
    "Assets",
  ];

  const handleToggle = () => {
    setShowToggleMessage(true);
    setTimeout(() => setShowToggleMessage(false), 3000);
  };

  const renderTabContent =()=>{
    switch(activeTab){
      case "Positions (2)":
        return(
          <div>
            <Position2/>
          </div>
        )
        case "Open Orders (0)":
          return(
            <div>
              <h2>No order yet</h2>
            </div>
          )
          case  "Order History":
            return(
              <div>
                <h2>No order History</h2>
              </div>
            )
          case  "Position History":
            return(
              <div>
                <h2>No Position History</h2>
              </div>
            )
          case  "Order Details":
            return(
              <div>
                <h2>No Order Details</h2>
              </div>
            )
          case  "Transaction History":
            return(
              <div>
                <h2>No Transaction History</h2>
              </div>
            )
          case  "Assets":
            return(
              <div>
                <h2>No Assets</h2>
              </div>
            )
    }
  }

  return (
    <div className="bg-[#0a0e17] text-white  w-full rounded-lg py-2 px-2 md:px-4 -ml-0 md:-ml-0 mt-2 border border-[#1E1E2F]">
      {/* Header Tabs - Scrollable on mobile */}
      <div className=" border-b border-gray-800 flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-2 py-3 text-[12px] md:text-[14px] whitespace-nowrap hidden md:block ${
              activeTab === tab
                ? "text-blue-400 border-b border-blue-400 scale-100"
                : "text-[#797A80]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="md:flex gap-1 items-center ml-auto hidden">
          <div className="ml-auto flex items-center pr-2 md:pr-4 gap-0.5">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black border-2 border-gray-300 rounded peer-checked:bg-white peer-checked:border-white flex items-center justify-center">
                <svg
                  className="hidden peer-checked:block w-2 h-2 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                />
                </svg>
              </div>
            </label>
            <span className="text-xs md:text-sm text-[#E8E8E8]">Show details</span>
          </div>
          <Shuffle size={isMobile ? 12 : 15} className="hidden md:block" />
        </div>

      <div className="border-b flex md:hidden">
      {tabs.slice(0,4).map((tab) => (
          <button
            key={tab}
            className={`px-1.5 py-3 md:hidden block text-[11px] md:text-[14px] whitespace-nowrap  ${
              activeTab === tab
                ? " border-b border-blue-400 scale-100"
                : "text-[#797A80]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      </div>



      {/* Notification Message */}
      {showToggleMessage && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50">
          Feature not available yet **
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center">
          <button
            className="border border-gray-700 rounded p-1 mr-2 cursor-pointer"
            onClick={handleToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 md:h-4 md:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
        <button
          className="text-xs bg-[#6967AE] flex items-center p-1 rounded hover:bg-[#6967AE] transition duration-200 ease-in-out cursor-pointer"
          onClick={handleToggle}
        >
          <span>Close positions</span>
        </button>
      </div>

      {/* Content */}
     
      {renderTabContent()}
    </div>
  );
};

export default TradingPositions;