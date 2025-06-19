"use client";
import Image from "next/image";
import React, { useState } from "react";
import { LuMegaphone } from "react-icons/lu";
import { ArrowRight, EyeOff, Eye, Info } from "lucide-react";
import SlideData from "@/app/Component/SlideData";

const Topheader = () => {
  const [showBalance, setShowBalanced] = useState<boolean>(false);

  const handleBalance = () => {
    setShowBalanced(!showBalance);
  };

  return (
    <div className="text-white md:p-4 w-full mb-4 mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side */}
        <div className="flex-1">
          <h2 className="md:text-[50px] text-[30px] font-bold">
            Trade Smarter: <br className="md:block hidden" /> 
            Copy the Pros, <br /> 
            Earn Like One!
          </h2>
          <p className="flex items-center gap-2 text-[#7D8491] md:text-[14px] text-[14px] font-semibold">
            <LuMegaphone className="rotate-330" />
            Updating elite trader tier requirements and perks
          </p>

          {/* Balance Card  */}
          <div className="border-2 border-[#141E32] rounded-lg p-4 max-w-md w-full mt-10">
            {/* User info */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/img/Avatar DP.png"
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-medium">Mike Pence</h3>
                    <button onClick={handleBalance}>
                      {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                  </div>
                  <span className="text-xs text-[#7D8491] bg-[#797A8029] px-2 py-1 rounded-md">
                    Copier
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 -mt-5">
                <div className="flex items-center bg-[#6967AE29] px-2 py-1 rounded-md gap-2 text-[#6967AE]">
                  <Info size={13}/>
                  <span className="text-[12px] font-medium">Insufficient balance</span>
                </div>
                <ArrowRight size={16} className="shrink-0" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-white text-[13px] font-semibold">
                  {showBalance ? '$20,000' : '*******'}
                </p>
                <p className="text-[#7D8491] text-[12px] font-semibold">Total Assets(USDT)</p>
              </div>
              <div>
                <p className="text-white text-[13px] font-semibold">
                  {showBalance ? '$700' : '*******'}
                </p>
                <p className="text-[#7D8491] text-[12px] font-semibold">Profit (USDT)</p>
              </div>
              <div>
                <p className="text-white text-[13px] font-semibold">
                  {showBalance ? '$700' : '*******'}
                </p>
                <p className="text-[#7D8491] text-[12px] font-semibold">Net profit (USDT)</p>
              </div>
              <div>
                <p className="text-white text-[13px] font-semibold">
                  {showBalance ? '$700' : '*******'}
                </p>
                <p className="text-[#7D8491] text-[12px] font-semibold">ROI (USDT)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <SlideData/>
        </div>
      </div>
    </div>
  );
};

export default Topheader;