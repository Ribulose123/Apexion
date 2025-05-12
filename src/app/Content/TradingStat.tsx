import React from "react";
import { LuArrowUpRight } from "react-icons/lu";
import Image from 'next/image';

const TradingStats = () => {
  return (
    <div className="w-full max-w-[450px] sm:max-w-[550px] h-[240px] mx-auto relative bg-[#0D0E13] text-white p-4 rounded-2xl shadow-lg border border-gray-800 overflow-hidden">
      <div className="flex flex-col justify-start items-start">
        <div className="flex items-center text-[35px] sm:text-[60px] font-normal text-[#E8E8E8]">
          68.2%
          <LuArrowUpRight className="ml-2 text-gray-400" size={20} />
        </div>

        <div className="">
        <p className="text-base sm:text-lg mt-4">
          Spots · <span className="text-yellow-400">Worldwide</span>
        </p>

        <p className="text-[#E8E8E8] font-medium text-[11px] sm:text-[13px] mt-8 sm:mt-3  w-[68%] text-start">
          Join Bidvest Trades to enjoy the benefits of trading with a regulated, 
          secure broker designed to execute your transactions in seconds.
        </p>
        </div>
      </div>

      <Image
        src="/img/GlobexNoGLow 2.png" 
        alt="Globe Network"
        layout="fill"
        objectFit="cover"
        className="absolute right-0 bottom-0 w-1/2 opacity-60"
      />
    </div>
  );
};

export default TradingStats;