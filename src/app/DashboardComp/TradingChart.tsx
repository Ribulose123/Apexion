import React from 'react'
import Header from '../components/Trading/Header'
import ChartTrade from '../components/Trading/ChartTrade'

const TradingChart = () => {
  return (
    <div className='min-h-screen px-2 sm:px-4 w-full bg-[#01040F] text-white'>
      <div className=''>
        {/*header*/}
        <div className='md:-ml-5'>
            <Header/>
        </div>
        {/* main content */}
        <div>
            {/*right content */}

            <div>
                {/* chart */}
                <ChartTrade/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TradingChart
