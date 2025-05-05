"use client";
import React, { useState } from "react";
import { Shuffle } from "lucide-react";

const TradingPositions = () => {
  const [activeTab, setActiveTab] = useState("Positions (2)");
  const [showToggleMessage, setShowToggleMessage] = useState(false);

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

  return (
    <div className="bg-[#0a0e17] text-white min-h-screen w-[80%] rounded-lg p-4 -ml-5 mt-6 border border-[#1E1E2F]">
      {/* Header Tabs */}
      <div className="flex space-x-1 border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-2 py-3 text-xs ${
              activeTab === tab
                ? "text-blue-400 border-b border-blue-400 scale-100"
                : "text-[#797A80]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="flex gap-1 items-center ml-auto">
          <div className="ml-auto flex items-center pr-4 gap-0.5">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-4 h-4 bg-black border-2 border-gray-300 rounded peer-checked:bg-white peer-checked:border-white flex items-center justify-center">
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
            <span className="text-sm text-[#E8E8E8]">Show details</span>
          </div>
          <Shuffle size={15} />
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
              className="h-4 w-4"
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
      <div className="py-2">
        {/* Position 1 */}
        <div className="mb-3 bg-gray-900 border border-gray-800 rounded overflow-hidden p-2">
          {/* Position Header */}
          <div className="flex items-center px-4 py-2 ">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-2 text-xs">
                S
              </div>
              <span className="font-medium text-sm text-green-400">SBTCSUSDT</span>
            </div>
            <div className="ml-4 flex items-center space-x-1">
              <div className="px-2 py-0.5 text-xs text-green-400">Cross</div>
              <div className="px-2 py-0.5 text-xs text-green-400">Long</div>
              <div className="px-2 py-0.5 text-xs text-green-400">10x</div>
            </div>
            <div className="ml-auto flex space-x-2">
              <button className="text-gray-400 cursor-pointer" onClick={handleToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
              <button className="text-gray-400 cursor-pointer" onClick={handleToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M12 8v4M12 16h.01"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Position Details */}
          <div className="grid grid-cols-4 gap-4 px-4 py-3  bg-gray-600 text-xs rounded-lg">
            {/* Column 1 */}
            <div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Position</div>
                <div className="text-white">0.001 • 67.99 SUSDT</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Unrealized PnL</div>
                <div className="text-red-500">-0.017 SUSDT • -0.11 USD</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">ROE</div>
                <div className="text-red-500">-1.06%</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Est. liq. price</div>
                <div className="text-white">--</div>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Average price</div>
                <div className="text-white">67994.6</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Mark price</div>
                <div className="text-white">67936.6</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Timed maintenance margin rate</div>
                <div className="text-white">0.40%</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Position size close</div>
                <div className="text-white">0.000/0.001</div>
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Margin</div>
                <div className="text-white">6.799 USDT</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Realized PnL</div>
                <div className="text-red-500">-0.017 SUSDT • -0.11 USD</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Breakeven price</div>
                <div className="text-white">67765.0</div>
              </div>
            </div>

            {/* Column 4 */}
            <div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Full position TP/SL</div>
                <div className="text-white">-- / --</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Partial position TP/SL</div>
                <div className="text-white">-- / --</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Trading TP/SL/MARK SL</div>
                <div className="text-white">-- / -- / --</div>
              </div>
            </div>
          </div>

          {/* Position Footer */}
          <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-900 border-t border-gray-800">
            <div>
              <span className="text-gray-500 text-xs mr-2">Stop Loss</span>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 text-white text-xs px-2 py-1 w-16 rounded cursor-pointer"
                defaultValue="67765.0"
                readOnly
                onClick={handleToggle}
              />
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 text-xs mr-2">Close Quantity</span>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 text-white text-xs px-2 py-1 w-16 rounded cursor-pointer"
                defaultValue="0.001"
                readOnly
                onClick={handleToggle}
              />
            </div>
            <button
              className="bg-white hover:bg-gray-200 text-gray-900 text-xs font-medium rounded px-4 py-1 cursor-pointer"
              onClick={handleToggle}
            >
              Close
            </button>
          </div>
        </div>

        {/* Position 2 */}
        <div className="bg-black border border-gray-800 rounded overflow-hidden">
          {/* Position Header */}
          <div className="flex items-center px-4 py-2 bg-gray-900">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-2 text-xs">
                S
              </div>
              <span className="font-medium text-sm text-green-400">
                SBTCSUSDT
              </span>
            </div>
            <div className="ml-4 flex items-center space-x-1">
              <div className="px-2 py-0.5 text-xs text-green-400">
                Cross
              </div>
              <div className="px-2 py-0.5 text-xs text-green-400">
                Long
              </div>
              <div className="px-2 py-0.5 text-xs text-green-400">
                10x
              </div>
            </div>
            <div className="ml-auto flex space-x-2">
              <button className="text-gray-400 cursor-pointer" onClick={handleToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
              <button className="text-gray-400 cursor-pointer" onClick={handleToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M12 8v4M12 16h.01"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Position Details - grid layout */}
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-900 text-xs">
            {/* Column 1 */}
            <div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Position</div>
                <div className="text-white">0.001 • 67.99 SUSDT</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Unrealized PnL</div>
                <div className="text-red-500">-0.017 SUSDT • -0.11 USD</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">ROE</div>
                <div className="text-red-500">-1.06%</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Est. liq. price</div>
                <div className="text-white">--</div>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Average price</div>
                <div className="text-white">67994.6</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Mark price</div>
                <div className="text-white">67936.6</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">
                  Timed maintenance margin rate
                </div>
                <div className="text-white">0.40%</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Position size close</div>
                <div className="text-white">0.000/0.001</div>
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Margin</div>
                <div className="text-white">6.799 USDT</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Realized PnL</div>
                <div className="text-red-500">-0.017 SUSDT • -0.11 USD</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Breakeven price</div>
                <div className="text-white">67765.0</div>
              </div>
            </div>

            {/* Column 4 */}
            <div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Full position TP/SL</div>
                <div className="text-white">-- / --</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Partial position TP/SL</div>
                <div className="text-white">-- / --</div>
              </div>
              <div className="mb-3">
                <div className="text-gray-500 mb-1">Trading TP/SL/MARK SL</div>
                <div className="text-white">-- / -- / --</div>
              </div>
            </div>
          </div>

          {/* Position Footer */}
          <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-900 border-t border-gray-800">
            <div>
              <span className="text-gray-500 text-xs mr-2">Stop Loss</span>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 text-white text-xs px-2 py-1 w-16 rounded cursor-pointer"
                defaultValue="67765.0"
                readOnly
                onClick={handleToggle}
              />
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 text-xs mr-2">Close Quantity</span>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 text-white text-xs px-2 py-1 w-16 rounded cursor-pointer"
                defaultValue="0.001"
                readOnly
                onClick={handleToggle}
              />
            </div>
            <button
              className="bg-white hover:bg-gray-200 text-gray-900 text-xs font-medium rounded px-4 py-1 cursor-pointer"
              onClick={handleToggle}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPositions;