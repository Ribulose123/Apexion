import React from 'react'
import { CoinDepost } from '@/app/data/data'

import { Dropdown } from '@/app/ui/Dropdown'

interface CoinSelectorProps{
    coins:CoinDepost[]
    selectedCoin: CoinDepost | null
    isloading:boolean
    onSelctCoin:(coin:CoinDepost)=>void
}

const CoinSelector:React.FC<CoinSelectorProps> = ({coins, selectedCoin, isloading, onSelctCoin}) => {
  return (
    <div className='p-2 mb-4'>
      <div className=' flex items-center mb-2'>
      <div className="bg-[#439A86] text-white rounded-full w-7 h-7 flex items-center justify-center text-xs mr-2">1</div>
      <span className="font-semibold text-[20px] text-[#E8E8E8]">Select a coin</span>
      </div>
      <Dropdown<CoinDepost>
        value={selectedCoin}
        onChange={onSelctCoin}
        options={coins}
        loading={isloading}
        loadingText='Loading coins...'
        placeholder='Select a coin'
        renderOption={(coins)=>(
          <div className="flex items-center">
          <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
          <span className='text-[#E8E8E8] text-[15px]'>{coins.symbol} - {coins.name}</span>
        </div>
        )}
        renderValue={(coins)=>(
          <div className="flex items-center">
          <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
          <span>{coins.symbol} - {coins.name}</span>
          </div>
        )}
        />
         {selectedCoin && (
        <div className="flex text-xs text-gray-400 mt-2 gap-4">
          {selectedCoin.networks.map((network, idx) => (
            <div key={idx} className="flex items-center">
              <div className={`w-2 h-2 ${
                network === 'TRC20' ? 'bg-green-500' : 
                network === 'BEP20' ? 'bg-blue-500' : 
                network === 'ERC20' ? 'bg-orange-500' : 'bg-purple-500'
              } rounded-full mr-1`}></div>
              <span>{network}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CoinSelector
