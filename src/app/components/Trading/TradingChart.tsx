import React from "react";
import Header from "./Header";

import TradingPlatform from "./TradingPlatform";
import TradingSelect from "./TradingSelect";
import TradingPositions from "./TradingPositions";
import TradingInterface from "./TradingInterface";
import MobileTrading from "./MobileTrading";

const TradingChart = () => {
  return (
    <div className="min-h-screen md:px-2 w-full bg-[#01040F] text-white mx-auto">
      <div className="">
        {/*header*/}
        <div className="md:-ml-5">
          <Header />
        </div>

        <div className=" mt-4">
          <TradingSelect />
        </div>
        {/* main content */}
      <div className="flex flex-col md:flex-row mt-4 md:ml-2   w-full gap-3">
      <div className=" md:w-[80%] w-full">
          <div className="hidden md:block">
            <TradingPlatform />
          </div>
          <div className="block md:hidden">
            <MobileTrading/>
          </div>
          <div className="ml md:ml-0">
            <TradingPositions />
          </div>
        </div>
        <div className="md:w-[30%] w-full ">
          <TradingInterface/>
        </div>
      </div>

       
      </div>
    </div>
  );
};

export default TradingChart;
