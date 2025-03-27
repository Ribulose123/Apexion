import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import Image from 'next/image';

const TradingStats = () => {
  return (
    <div className="w-full max-w-[450px] sm:max-w-[550px] mx-auto relative bg-[#0D0E13] text-white p-4 rounded-2xl shadow-lg border border-gray-800 overflow-hidden">
      <div className="flex flex-col justify-start items-start">
        <div className="flex items-center text-[35px] sm:text-[60px] font-normal text-[#E8E8E8]">
          68.2%
          <GoArrowUpRight className="ml-2 text-gray-400" size={20} />
        </div>

        <p className="text-base sm:text-lg mt-2">
          Spots · <span className="text-yellow-400">Worldwide</span>
        </p>

        <p className="text-[#E8E8E8] text-[14px] sm:text-[15px] mt-4 w-full sm:w-[70%] text-start">
          Join Apexion Trades to enjoy the benefits of trading with a regulated, 
          secure broker designed to execute your transactions in seconds.
        </p>
      </div>

      <Image
        src="/img/GlobexNoGLow 1.png" 
        alt="Globe Network"
        layout="fill"
        objectFit="cover"
        className="absolute right-0 bottom-0 w-1/2 opacity-60"
      />
    </div>
  );
};

export default TradingStats;