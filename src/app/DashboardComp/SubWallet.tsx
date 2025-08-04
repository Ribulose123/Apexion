"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SubWallet = () => {
     const [showBalance, setShowBalance] = useState(true);

      const handleBalance = () => {
        setShowBalance(!showBalance);
      };
  return (
    <div className='bg-linear-to-b from-[#141E323D]  to-[#141E32] p-4 sm:rounded-lg h-[170px] w-full'>
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
          <button className="bg-transparent currency-display text-gray-400 text-xs py-1 px-3 rounded -mt-7">
            Deposit
          </button>
        </div>
        <p className="text-[#A4A4A4] text-[13px] sm:text-[16px] mt-10">no active subscription</p>
    </div>
  )
}

export default SubWallet
