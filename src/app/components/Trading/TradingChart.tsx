import React from "react";
import Header from "./Header";

import TradingPlatform from "./TradingPlatform";
import TradingSelect from "./TradingSelect";
import TradingPositions from "./TradingPositions";
import TradingInterface from "./TradingInterface";

const TradingChart = () => {
  return (
    <div className="min-h-screen px-2 sm:px-4 w-full bg-[#01040F] text-white">
      <div className="">
        {/*header*/}
        <div className="md:-ml-5">
          <Header />
        </div>

        <div className=" mt-4">
          <TradingSelect />
        </div>
        {/* main content */}
      <div className="flex flex-col md:flex-row gap-8 mt-4">
      <div className="">
          <div>
            <TradingPlatform />
          </div>
          <div>
            <TradingPositions />
          </div>
        </div>
        <div>
          <TradingInterface/>
        </div>
      </div>

       
      </div>
    </div>
  );
};

export default TradingChart;
