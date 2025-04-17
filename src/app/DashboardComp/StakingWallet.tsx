"use client";
import React, { useState } from "react";
import { Eye, EyeOff, File } from "lucide-react";

const StakingWallet = () => {
  const [showBalance, setShowBalance] = useState(true);

  const handleBalance = () => {
    setShowBalance(!showBalance);
  };
  return (
    <div className=" bg-linear-to-b from-[#141E323D]  to-[#141E32]   p-6 w-full h-40">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row space-x-24">
          <div className="">
            <div className="flex items-center space-x-2">
              <h2 className="text-gray-400 text-sm font-medium">
                Total Stakings
              </h2>
              <button
                onClick={handleBalance}
                className="text-gray-400 hover:text-white transition ml-2"
              >
                {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
            </div>
            <div className="mt-2">
              <p className="text-white text-2xl">
                {showBalance ? "$10000" : "********"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-0 items-center sm:flex-col sm:items-start">
            <h2 className="text-gray-400 text-sm font-medium">
              Active Stakings
            </h2>
            <div className="mt-2">
              <p className="text-white text-2xl">
                {showBalance ? "$10000" : "********"}
              </p>
            </div>
          </div>

          <div className="flex gap-3  sm:gap-0 items-center sm:flex-col sm:items-start">
            <h2 className="text-gray-400 text-sm font-medium">
              Active Stakings
            </h2>
            <div className="mt-2">
              <p className="text-white text-2xl">
                {showBalance ? "$10000" : "********"}
              </p>
            </div>
          </div>
        </div>

        <button className="bg-transparent currency-display text-gray-400 text-xs py-1 px-3 rounded -mt-28 gap-3 sm:mt-0 ">
            <File size={14}/>
          View Stakings
        </button>
      </div>
    </div>
  );
};

export default StakingWallet;
