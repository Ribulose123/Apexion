"use client";
import React, { useState, useEffect } from "react";
import TimeframeSelector from "./TimeframeSelector "; 
import SimpleCandlestickChart from "./CandlestickChart";

const ChartMobile = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='mt-2 border-2 border-[#1E1E2F] rounded-lg bg-[#01040F] flex flex-col h-full w-full p-2'>
      <div className='flex flex-col h-full min-h-0'> {/* Added h-full and min-h-0 */}
        <div className="ml-5">
          <TimeframeSelector />
        </div>
        <div className="flex flex-1 min-h-0"> {/* Added min-h-0 for proper flex sizing */}
          <div className="h-full w-full min-h-0"> {/* Added min-h-0 */}
            {isClient && <SimpleCandlestickChart/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartMobile;