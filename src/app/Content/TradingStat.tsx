import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import Image from 'next/image';

const TradingStats = () => {
  return (
    <div className="relative sm:w-[550px] sm:h-[355px] w-[450px] h-[350px] bg-[#0D0E13] text-white p-6 rounded-2xl shadow-lg border border-gray-800 overflow-hidden">
      {/* Percentage with Arrow */}
     <div className="flex flex-col justify-start items-start">
     <div className="flex items-center sm:text-[60px] text-[35px] font-normal text-[#E8E8E8]">
        68.2%
        <GoArrowUpRight className="ml-2 text-gray-400" size={20} />
      </div>

      {/* Title */}
      <p className="text-lg mt-2">
        Spots · <span className="text-yellow-400">Worldwide</span>
      </p>

      {/* Description */}
      <p className="text-[#E8E8E8] text-[15px] mt-4  w-[70%] text-start">
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
