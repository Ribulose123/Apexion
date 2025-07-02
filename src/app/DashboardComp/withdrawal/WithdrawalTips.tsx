import React from 'react'
import Image from 'next/image'

const WithdrawalTips = () => {
  return (
    <div className="bg-[#060A17] rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <Image src='/img/ic_round-tips-and-updates.png' alt='tips' width={30} height={30}/>
            <span className="font-medium">Tips</span>
          </div>
          
          <div className='text-sm text-[#7D8491] space-y-4'>
            <p>For the safety of your funds, our customer support team may contact you by phone to confirm your withdrawal request. Please pay attention to incoming calls.</p>
            <p>Ensure your device is secure to prevent intrusions or leakage of information</p>
            <p>Be aware of scams! Bitget will never ask you for your account, password or any personal information, nor will it request private transfers or withdrawals.</p>
          </div>
        </div>
  )
}

export default WithdrawalTips
