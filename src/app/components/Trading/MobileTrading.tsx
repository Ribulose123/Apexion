'use client'
import React, { useState } from 'react'
import ChartMobile from './ChartMobile';
import OrderBookMobile from './OrderBookMobile';
import RecentTrade from './RecentTrade';

const MobileTrading = () => {
    const [activeTab, setActiveTab]= useState('Chart')

    const tabs = [
        "Chart",
        "Order book",
        "Recent Trade",
        "Assets",
      ];

      const renderTabContent =()=>{
           switch(activeTab){
            case "Chart":
                return(
                    <div>
                        <ChartMobile/>
                    </div>
                )
            case "Order book":
                return(
                    <div>
                        <OrderBookMobile/>
                    </div>
                )
            case "Recent Trade":
                return(
                    <div>
                        <RecentTrade/>
                    </div>
                )
           } 
      }
  return (
    <div>
      {/* activeTab */}
      <div className='border-b'>
      {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-2 py-2 text-[15px]   ${
              activeTab === tab
                ? " border-b-2 border-blue-800 scale-100"
                : "text-[#797A80]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* content */}
      {renderTabContent()}
    </div>
  )
}

export default MobileTrading
