import React, {useState, useEffect} from 'react'
import { MinusIcon, PlusIcon,  } from "lucide-react";

const Position2 = () => {
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
  return (
    <div>
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

          {/* Position Details - Always visible now */}
          <div className="bg-[#060b1b] text-[10px] md:text-xs rounded-lg overflow-hidden p-0.5 mt-1">
            <div className="grid grid-cols-1">
              {/* Main content grid */}
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

              {/* Desktop Footer - spans all columns */}
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

          {/* Position Details - Always visible now */}
          <div className="bg-[#060b1b] text-[10px] md:text-xs rounded-lg overflow-hidden p-0.5 mt-1">
            <div className="grid grid-cols-1">
              {/* Main content grid */}
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

              {/* Desktop Footer - spans all columns */}
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
                    
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Position2
