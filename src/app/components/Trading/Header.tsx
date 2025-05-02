import React from "react";
import { Info } from "lucide-react";

const Header = () => {
  return (
    <div>
      <div className="flex items-center space-x-2 p-2">
        <div className="flex items-center space-x-3 border-r border-[#141E32] px-2">
          <div className="w-3 h-3 bg-amber-300 rounded-full"></div>
          <h3 className="text-[#E8E8E8] text-[14px]">BTCUSTD</h3>
          <p className="text-[#E8E8E8] text-[13px]">180,000</p>
          <p className="text-red-800 text-[13px]">-1,006.01(-1.11%)</p>
        </div>

        <div className="flex items-center space-x-3 border-r border-[#141E32] px-2">
          <div className="w-3 h-3 bg-teal-300 rounded-full"></div>
          <h3 className="text-[#E8E8E8] text-[14px]">ETHUSTD</h3>
          <p className="text-[#E8E8E8] text-[13px]">200,000</p>
          <p className="text-green-800 text-[13px]">+1,006.01(+0.21%)</p>
        </div>
        <div className="flex items-center space-x-3 border-r border-[#141E32] px-2">
            <div className="bg-gray-700/10 w-3 h-3 rounded-full"></div>
            <p className="text-[#E8E8E8] text-[14px]">BINANCE:MATICUDST</p>
            <Info className="text-gray-500" size={16} />
        </div>

        <div className="flex items-center space-x-3 border-r border-[#141E32] px-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <h3 className="text-[#E8E8E8] text-[14px]">SOLUSDT</h3>
            <p className="text-[#E8E8E8] text-[13px]">200.12</p>
            <p className="text-green-800 text-[12px]">+1,0(+0.21%)</p>
        </div>

        <div className="flex items-center space-x-3  px-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <h3 className="text-[#E8E8E8] text-[14px]">BTCUSDT</h3>
            <p className="text-[#E8E8E8] text-[13px]">200.12</p>
            <p className="text-green-800 text-[12px]">+1,0(+0.21%)</p>
        </div>
      </div>

    </div>
  );
};

export default Header;
