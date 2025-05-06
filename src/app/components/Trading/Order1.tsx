"use client";
import React, { useState, useEffect } from "react";
import { MinusIcon, PlusIcon, Shuffle, ChevronDown } from "lucide-react";

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

  const renderTabContent = () => {
    switch(activeTab) {
      case "Positions (2)":
        return (
          <div className="py-2">
            {/* Position 1 */}
            <div className="mb-3 bg-gray-900 border border-gray-800 rounded p-2">
              {/* Position Header */}
              <div className="flex items-center px-2 md:px-4 py-2">
                <div className="flex items-center">
                  <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-2 text-xs">
                    S
                  </div>
                  <span className="font-medium text-xs md:text-sm text-green-400">
                    SBTCSUSDT
                  </span>
                </div>
                <div className="ml-2 md:ml-4 flex items-center space-x-1">
                  <div className="px-1 md:px-2 py-0.5 text-[10px] md:text-xs text-green-400">Cross</div>
                  <div className="px-1 md:px-2 py-0.5 text-[10px] md:text-xs text-green-400">Long</div>
                  <div className="px-1 md:px-2 py-0.5 text-[10px] md:text-xs text-green-400">10x</div>
                </div>
                {!isMobile && (
                  <div className="ml-auto flex space-x-2">
                    <button
                      className="text-gray-400 cursor-pointer"
                      onClick={handleToggle}
                    >
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
                    <button
                      className="text-gray-400 cursor-pointer"
                      onClick={handleToggle}
                    >
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
                )}
              </div>

              {/* Position Details */}
              <div className="bg-[#060b1b] text-[10px] md:text-xs rounded-lg overflow-hidden p-0.5 mt-1">
                <div className="grid grid-cols-1">
                  <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-4'} px-3 md:px-4 py-2 md:py-3`}>
                    {/* Column 1 */}
                    <div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">Position</div>
                        <div className="text-white text-[10px] md:text-xs">0.001 • 67.99 SUSDT</div>
                      </div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">Unrealized PnL</div>
                        <div className="text-red-500 text-[10px] md:text-xs">-0.017 SUSDT • -0.11 USD</div>
                      </div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">ROE</div>
                        <div className="text-red-500 text-[10px] md:text-xs">-1.06%</div>
                      </div>
                      {!isMobile && (
                        <div className="mb-2 md:mb-3">
                          <div className="text-gray-500 mb-0.5 md:mb-1">Est. liq. price</div>
                          <div className="text-white text-[10px] md:text-xs">--</div>
                        </div>
                      )}
                    </div>

                    {/* Column 2 */}
                    <div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">Average price</div>
                        <div className="text-white text-[10px] md:text-xs">67994.6</div>
                      </div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">Mark price</div>
                        <div className="text-white text-[10px] md:text-xs">67936.6</div>
                      </div>
                      {!isMobile && (
                        <>
                          <div className="mb-2 md:mb-3">
                            <div className="text-gray-500 mb-0.5 md:mb-1">
                              Timed maintenance margin rate
                            </div>
                            <div className="text-white text-[10px] md:text-xs">0.40%</div>
                          </div>
                          <div className="mb-2 md:mb-3">
                            <div className="text-gray-500 mb-0.5 md:mb-1">
                              Position size close
                            </div>
                            <div className="text-white text-[10px] md:text-xs">0.000/0.001</div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Column 3 & 4 - Only visible on desktop */}
                    {!isMobile && (
                      <>
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
                      </>
                    )}
                  </div>
                  
                  {/* Mobile action buttons */}
                  {isMobile && (
                    <div className="grid grid-cols-3 gap-2 px-3 py-2">
                      <button className="bg-transparent text-[10px] border border-gray-700 rounded-full py-2 text-center">TP/SL</button>
                      <button className="bg-transparent text-[10px] border border-gray-700 rounded-full py-2 text-center">Reverse</button>
                      <button className="bg-white text-black text-[10px] rounded-full py-2 text-center">Close</button>
                    </div>
                  )}

                  {/* Desktop Footer */}
                  {!isMobile && (
                    <div className="col-span-4 flex items-center gap-3 px-4 py-2">
                      <div className="flex items-center justify-between gap-25 bg-[#10131F] rounded-full px-2 py-3 border border-[#141E32]">
                        <span className="text-[#797A80] text-xs mr-2">Stop Loss</span>
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="border-none text-white text-sm w-16 text-center bg-transparent"
                            defaultValue="87765.0"
                            readOnly
                          />
                          <div className="flex flex-col ml-1">
                            <button className="text-gray-500 h-3 flex items-center justify-center hover:text-white">
                              <PlusIcon size={13}/>
                            </button>
                            <button className="text-gray-500 h-3 flex items-center justify-center hover:text-white">
                              <MinusIcon size={13}/>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-25 bg-[#10131F] rounded-full px-2 py-3 border border-[#141E32]">
                        <span className="text-gray-500 text-xs mr-2">Close Quantity</span>
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="border-none text-white text-sm w-12 text-center bg-transparent"
                            defaultValue="0.001"
                            readOnly
                          />
                          <div className="flex flex-col ml-1">
                            <button className="text-gray-500 h-3 flex items-center justify-center hover:text-white">
                              <PlusIcon size={13}/>
                            </button>
                            <button className="text-gray-500 h-3 flex items-center justify-center hover:text-white">
                              <MinusIcon size={13}/>
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        className="bg-white hover:bg-gray-100 text-gray-900 text-xs font-medium rounded-full px-4 py-3 transition-colors duration-200"
                        onClick={handleToggle}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Position 2 */}
            <div className="mb-3 bg-gray-900 border border-gray-800 rounded p-2">
              {/* Position Header */}
              <div className="flex items-center px-2 md:px-4 py-2">
                <div className="flex items-center">
                  <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-2 text-xs">
                    S
                  </div>
                  <span className="font-medium text-xs md:text-sm text-green-400">
                    SBTCSUSDT
                  </span>
                </div>
                <div className="ml-2 md:ml-4 flex items-center space-x-1">
                  <div className="px-1 md:px-2 py-0.5 text-[10px] md:text-xs text-green-400">Cross</div>
                  <div className="px-1 md:px-2 py-0.5 text-[10px] md:text-xs text-green-400">Long</div>
                  <div className="px-1 md:px-2 py-0.5 text-[10px] md:text-xs text-green-400">10x</div>
                </div>
                {!isMobile && (
                  <div className="ml-auto flex space-x-2">
                    <button
                      className="text-gray-400 cursor-pointer"
                      onClick={handleToggle}
                    >
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
                    <button
                      className="text-gray-400 cursor-pointer"
                      onClick={handleToggle}
                    >
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
                )}
              </div>

              {/* Position Details */}
              <div className="bg-[#060b1b] text-[10px] md:text-xs rounded-lg overflow-hidden p-0.5 mt-1">
                <div className="grid grid-cols-1">
                  <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-4'} px-3 md:px-4 py-2 md:py-3`}>
                    {/* Column 1 */}
                    <div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">Position</div>
                        <div className="text-white text-[10px] md:text-xs">0.001 • 67.99 SUSDT</div>
                      </div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">Unrealized PnL</div>
                        <div className="text-red-500 text-[10px] md:text-xs">-0.017 SUSDT • -0.11 USD</div>
                      </div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">ROE</div>
                        <div className="text-red-500 text-[10px] md:text-xs">-1.06%</div>
                      </div>
                      {!isMobile && (
                        <div className="mb-2 md:mb-3">
                          <div className="text-gray-500 mb-0.5 md:mb-1">Est. liq. price</div>
                          <div className="text-white text-[10px] md:text-xs">--</div>
                        </div>
                      )}
                    </div>

                    {/* Column 2 */}
                    <div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">Average price</div>
                        <div className="text-white text-[10px] md:text-xs">67994.6</div>
                      </div>
                      <div className="mb-2 md:mb-3">
                        <div className="text-gray-500 mb-0.5 md:mb-1">Mark price</div>
                        <div className="text-white text-[10px] md:text-xs">67936.6</div>
                      </div>
                      {!isMobile && (
                        <>
                          <div className="mb-2 md:mb-3">
                            <div className="text-gray-500 mb-0.5 md:mb-1">
                              Timed maintenance margin rate
                            </div>
                            <div className="text-white text-[10px] md:text-xs">0.40%</div>
                          </div>
                          <div className="mb-2 md:mb-3">
                            <div className="text-gray-500 mb-0.5 md:mb-1">
                              Position size close
                            </div>
                            <div className="text-white text-[10px] md:text-xs">0.000/0.001</div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Column 3 & 4 - Only visible on desktop */}
                    {!isMobile && (
                      <>
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
                      </>
                    )}
                  </div>
                  
                  {/* Mobile action buttons */}
                  {isMobile && (
                    <div className="grid grid-cols-3 gap-2 px-3 py-2">
                      <button className="bg-transparent text-[10px] border border-gray-700 rounded-full py-2 text-center">TP/SL</button>
                      <button className="bg-transparent text-[10px] border border-gray-700 rounded-full py-2 text-center">Reverse</button>
                      <button className="bg-white text-black text-[10px] rounded-full py-2 text-center">Close</button>
                    </div>
                  )}

                  {/* Desktop Footer */}
                  {!isMobile && (
                    <div className="col-span-4 flex items-center gap-3 px-4 py-2">
                      <div className="flex items-center justify-between gap-25 bg-[#10131F] rounded-full px-2 py-3 border border-[#141E32]">
                        <span className="text-[#797A80] text-xs mr-2">Stop Loss</span>
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="border-none text-white text-sm w-16 text-center bg-transparent"
                            defaultValue="87765.0"
                            readOnly
                          />
                          <div className="flex flex-col ml-1">
                            <button className="text-gray-500 h-3 flex items-center justify-center hover:text-white">
                              <PlusIcon size={13}/>
                            </button>
                            <button className="text-gray-500 h-3 flex items-center justify-center hover:text-white">
                              <MinusIcon size={13}/>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-25 bg-[#10131F] rounded-full px-2 py-3 border border-[#141E32]">
                        <span className="text-gray-500 text-xs mr-2">Close Quantity</span>
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="border-none text-white text-sm w-12 text-center bg-transparent"
                            defaultValue="0.001"
                            readOnly
                          />
                          <div className="flex flex-col ml-1">
                            <button className="text-gray-500 h-3 flex items-center justify-center hover:text-white">
                              <PlusIcon size={13}/>
                            </button>
                            <button className="text-gray-500 h-3 flex items-center justify-center hover:text-white">
                              <MinusIcon size={13}/>
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        className="bg-white hover:bg-gray-100 text-gray-900 text-xs font-medium rounded-full px-4 py-3 transition-colors duration-200"
                        onClick={handleToggle}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case "Open Orders (0)":
        return (
          <div className="py-4 text-center">
            <div className="text-gray-500 text-sm">No open orders</div>
            <button className="mt-2 text-blue-400 text-sm hover:text-blue-300">
              Place Order
            </button>
          </div>
        );
      case "Order History":
        return (
          <div className="py-4">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
              <div className="text-gray-500 text-xs">Date</div>
              <div className="text-gray-500 text-xs">Pair</div>
              <div className="text-gray-500 text-xs">Type</div>
              <div className="text-gray-500 text-xs">Side</div>
              <div className="text-gray-500 text-xs">Price</div>
              <div className="text-gray-500 text-xs">Amount</div>
              <div className="text-gray-500 text-xs">Filled</div>
              <div className="text-gray-500 text-xs">Status</div>
            </div>
            <div className="text-center py-8 text-gray-500 text-sm">
              No order history available
            </div>
          </div>
        );
      case "Position History":
        return (
          <div className="py-4">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
              <div className="text-gray-500 text-xs">Date</div>
              <div className="text-gray-500 text-xs">Pair</div>
              <div className="text-gray-500 text-xs">Side</div>
              <div className="text-gray-500 text-xs">Leverage</div>
              <div className="text-gray-500 text-xs">PNL</div>
              <div className="text-gray-500 text-xs">ROE</div>
              <div className="text-gray-500 text-xs">Margin</div>
              <div className="text-gray-500 text-xs">Fee</div>
            </div>
            <div className="text-center py-8 text-gray-500 text-sm">
              No position history available
            </div>
          </div>
        );
      case "Order Details":
        return (
          <div className="py-4">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
              <div className="text-gray-500 text-xs">Order ID</div>
              <div className="text-gray-500 text-xs">Time</div>
              <div className="text-gray-500 text-xs">Symbol</div>
              <div className="text-gray-500 text-xs">Type</div>
              <div className="text-gray-500 text-xs">Side</div>
              <div className="text-gray-500 text-xs">Price</div>
              <div className="text-gray-500 text-xs">Amount</div>
              <div className="text-gray-500 text-xs">Status</div>
            </div>
            <div className="text-center py-8 text-gray-500 text-sm">
              No order details available
            </div>
          </div>
        );
      case "Transaction History":
        return (
          <div className="py-4">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
              <div className="text-gray-500 text-xs">Transaction ID</div>
              <div className="text-gray-500 text-xs">Time</div>
              <div className="text-gray-500 text-xs">Type</div>
              <div className="text-gray-500 text-xs">Amount</div>
              <div className="text-gray-500 text-xs">Status</div>
            </div>
            <div className="text-center py-8 text-gray-500 text-sm">
              No transaction history available
            </div>
          </div>
        );
      case "Assets":
        return (
          <div className="py-4">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
              <div className="text-gray-500 text-xs">Asset</div>
              <div className="text-gray-500 text-xs">Wallet Balance</div>
              <div className="text-gray-500 text-xs">Available Balance</div>
              <div className="text-gray-500 text-xs">In Order</div>
              <div className="text-gray-500 text-xs">BTC Value</div>
            </div>
            <div className="text-center py-8 text-gray-500 text-sm">
              No assets available
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0e17] text-white md:max-w-6xl w-full rounded-lg py-2 px-2 md:px-4 -ml-0 md:-ml-5 mt-2 border border-[#1E1E2F]">
      {/* Header Tabs - Scrollable on mobile */}
      <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-800">
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

        {tabs.slice(0,4).map((tab) => (
          <button
            key={tab}
            className={`px-2 py-3 md:hidden block text-[12px] md:text-[14px] whitespace-nowrap ${
              activeTab === tab
                ? "text-blue-400 border-b border-blue-400 scale-100"
                : "text-[#797A80]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification Message */}
      {showToggleMessage && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50">
          Feature not available yet **
        </div>
      )}

      {/* Filter Bar - Only show for Positions tab */}
      {activeTab === "Positions (2)" && (
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
      )}

      {/* Content */}
      {renderTabContent()}
    </div>
  );
};

export default TradingPositions;