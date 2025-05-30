'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Calendar, ChevronDown, Equal, Plus } from 'lucide-react'
import { IoNewspaperOutline } from "react-icons/io5";

const BalanceCard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [statusFilter, setStatusFilter] = useState("All Trade");
  const tabs = ['Dashboard', 'Open Positions', 'Order History']
  
  return (
    <div className='w-full relative'>
      {/* Hero Section */}
      <div className=' md:h-60 h-[20rem]'> 
        <div className='flex items-center gap-4 md:p-6 pt-6'>
          
        <Image src='/img/Avatar DP.png' alt='User' width={100} height={100}/>
        <div className='font-semibold'>
          <h2 className='text-[#E8E8E8] text-3xl'>User Center <br className='md:hidden block'/>(Follower)</h2>
          <div className='flex items-center gap-2 mt-2'>
            <p className='text-[13px] text-[#797A80] font-semibold border-r border-[#797A80] pr-2'>@HappyPlanets</p>
            <p className='text-[13px] text-[#797A80] font-semibold flex items-center gap-1'>
              <Calendar size={13}/>
              Registered 626 day(s) ago
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Balance Card - Centered between hero and content */}
      <div className='absolute md:top-37 top-40 left-0 right-0 px-4 z-10'> {/* Adjusted positioning */}
        <div className=' bg-[#E8E8E8] p-6 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.3)]'> {/* More prominent shadow */}
          {/* Balance Card Content */}
         <div className='flex flex-col gap-16'>
          <div className='grid grid-cols-4 md:grid-cols-7  items-center'>
          <div>
            <p className='md:text-[18px] text-[13px] text-[#01040F47] font-normal'>Total Equity</p>
            <p  className='text-[#01040F] text-[26px] font-semibold '>0.00<span className='text-[18px]'>usdt</span></p>
          </div>
          <div className='w-8 h-8 rounded-full p-1 bg-[#D9D9D9] flex items-center justify-center'>
            <Equal size={13}/>
          </div>
          <div>
            <p className='md:text-[18px] text-[12px] text-[#01040F47] font-normal capitalize'>available Balance</p>
            <p  className='text-[#01040F] text-[26px] font-semibold '>0.00<span className='text-[18px]'>usdt</span></p>
          </div>
           <div className='w-8 h-8 rounded-full p-1 bg-[#D9D9D9] flex items-center justify-center'>
            <Plus size={13}/>
          </div>

           <div>
            <p className='md:text-[18px] text-[13px] text-[#01040F47] font-normal capitalize'>margin Balance</p>
            <p  className='text-[#01040F] text-[26px] font-semibold '>0.00<span className='text-[18px]'>usdt</span></p>
          </div>
           
           <div className='w-8 h-8 rounded-full p-1 bg-[#D9D9D9] flex items-center justify-center'>
            <Plus size={13}/>
          </div>

          <div>
            <p className='md:text-[18px] text-[14px] text-[#01040F47] font-normal capitalize'>unrealized P&L</p>
            <p  className='text-[#01040F] text-[26px] font-semibold '>0.00<span className='text-[18px]'>usdt</span></p>
          </div>
         </div>

         <div className='flex flex-col md:flex-row md:gap-170 items-center'>
            <div className='flex items-center gap-3 md:ml-0 -ml-4'>
          <div className='flex items-center gap-2'>
            <p className='md:text-[16px] text-[13px] text-[#01040F47] font-normal'>Realized Profit Share</p>
            <p className='flex border-b border-dotted border-[#01040F] text-[#01040F] font-semibold'>0.00</p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='md:text-[16px] text-[13px] text-[#01040F47] font-normal'>Unrealized Profit Share</p>
            <p className='flex border-b border-dotted border-[#01040F] text-[#01040F] font-semibold'>0.00</p>
          </div>
         </div>

          <button className="flex items-center text-[#01040F47] transition-colors text-[12px] sm:text-[14px] self-start sm:self-auto">
            <IoNewspaperOutline className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Assets History
          </button>
         </div>
         </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='w-full min-h-screen bg-[#E8E8E8] md:pt-34 pt-40'> {/* Added padding-top to account for balance card */}
        {/* Tabs toggle */}
        <div className='flex space-x-5 border-b border-[#10131F14] py-2 px-6 pt-4'>
          {tabs.map((tab)=>(
            <button 
              key={tab} 
              className={`${activeTab === tab ? 'text-[#01040F] font-bold' : 'text-[#01040F7A]'} md:text-[24px] text-[16px]`} 
              onClick={()=>setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Tab content */}
        {activeTab === 'Dashboard' && (
          <div className='p-6'>
            {/* Select option */}
            <div className='relative inline-block'>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border border-[#10131F14] rounded px-3 py-2 text-[#01040F] appearance-none pr-8 text-sm md:text-base w-40" 
              >
                <option value="All Trade">All Trade</option>
                <option value="Open Trade">Open Trade</option>
                <option value="Closed Trade">Closed Trade</option>
              </select>
               <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className='mx-auto flex justify-center items-center pt-20'>
              <div className='flex flex-col items-center'>
                <Image src='/img/searc.png' alt='Folder' width={100} height={100}/>
              <p className='text-black'>No data</p>
              </div>
            </div>
          </div>
        )}

          {/* Open Positions */}
        {activeTab === 'Open Positions' && (
          <div className='text-black'>No Data</div>
        )}

        {/* Order History */}
        {activeTab === 'Order Historys' && (
          <div className='text-black'>No Data</div>
        )}
      </div>
    </div>
  )
}

export default BalanceCard