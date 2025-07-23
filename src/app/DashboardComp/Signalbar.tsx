"use client";
import React, { useState } from "react";
import { mockSignals } from "../data/data";
import { Eye, EyeOff } from "lucide-react";

const Signalbar = () => {
  const [showBalance, setShowBalance] = useState(true);

  const handleBalance = () => {
    setShowBalance(!showBalance);
  };
  const stats = mockSignals;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  sm:gap-4 mb-6">
      <div className="bg-linear-to-b from-[#141E323D]  to-[#141E32] p-4 sm:rounded-lg h-[150px] gap-10">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <h2 className="text-gray-400 font-medium sm:text-lg">
                Total Balance
              </h2>
              <button
                onClick={handleBalance}
                className="text-gray-400 hover:text-white transition ml-2"
              >
                {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
            </div>
            <div className="flex space-x-1 mt-5">
              <p>{showBalance ? "$32,121.52" : "******"}</p>
            </div>
          </div>
         
        </div>
      </div>

      <div className="bg-[#141E323D] backdrop-blur-[24px] p-4 sm:rounded-lg h-[150px]">
        <div className="flex justify-between items-center mb-1 gap-3">
          <p className="text-[#A4A4A4] text-xs sm:text-[16px]">
            No active signal
          </p>
          <p className="text-[#F2AF29] text-xs sm:text-[16px]">View history</p>
        </div>
        <div className="mt-8 flex justify-between">
          <span className="text-[#A4A4A4] text-xs sm:text-[16px]">
            Signal strength
          </span>
          <span className="text-[#F23645] text-xs sm:text-[16px]">
            {stats[0]?.signalStrength || 0}%
          </span>
        </div>
        <div className="flex space-x-0.5 mt-3">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`h-7  w-7 flex-1 ${
                i < stats[0]?.signalStrength / 7
                  ? "bg-[#F23645]"
                  : "bg-gray-800"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signalbar;
