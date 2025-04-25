import Image from 'next/image';
import React from 'react';
import { ThumbsUp } from 'lucide-react';

interface Seller {
  id?: number;
  name: string;
  completedOrders?: number;
  completionRate?: string;
  price: number;
  availableUSDT: number;
  minAmount: number;
  maxAmount: number;
  paymentMethods: string[] | string;
  online?: boolean;
  lastSeen?: string;
}

interface TradingTableProps {
  sellers: Seller[];
}

const TradingTable: React.FC<TradingTableProps> = ({ sellers }) => {
  return (
    <div className="w-full">
      {/* Desktop View - Table Format */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-[#141E32] border-t ">
              <th className="p-3 text-left">Merchants (Trades | Completion rate)</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Amount/Limit (Low to high)</th>
              <th className="p-3 text-left">Payment Method</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={index} className="border-b border-[#141E32]">
                {/* Merchant Info */}
                <td className="p-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-teal-900 text-white flex items-center justify-center mr-3">
                      {seller.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{seller.name}</div>
                      <div className="text-sm text-gray-500">
                        30-day trades: {seller.completedOrders || 24} | Completion rate {seller.completionRate || '100.00%'}
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="mr-2">Online</span>
                        <span className="text-xs text-[#01BC8D] flex items-center"><ThumbsUp size={17} className='-mt-1 '/> 100%</span>
                      </div>
                    </div>
                  </div>
                </td>
                
                {/* Price */}
                <td className="p-3">
                  {seller.price.toFixed(3)} USD
                </td>
                
                {/* Amount/Limit */}
                <td className="p-3">
                  <div>{seller.availableUSDT.toFixed(4)} USDT</div>
                  <div>{seller.minAmount} - {seller.maxAmount} USD</div>
                </td>
                
                {/* Payment Methods */}
                <td className="p-3">
                  {Array.isArray(seller.paymentMethods) 
                    ? seller.paymentMethods.join(', ') 
                    : seller.paymentMethods}
                </td>
                
                {/* Action Button */}
                <td className="p-3">
                  <button className="currency-display text-white px-4 py-2 rounded">
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Card Format - Styled to match the image */}
      <div className="md:hidden space-y-3">
        {sellers.map((seller, index) => (
          <div key={index} className="bg- rounded-lg px-4 py-2 text-white border-b border-[#141E32}">
            <div className="flex items-center mb-1">
              <div className="w-6 h-6 rounded-full bg-teal-900 text-white flex items-center justify-center mr-2">
                <span className="text-sm">{seller.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{seller.name}</div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <span>Online</span>
                  <span className="text-xs text-gray-400">{seller.lastSeen || '2 minutes ago'}</span>
                </div>
              </div>
              <div className="text-right">
                
                <div className="text-xs text-gray-400 text-start">
                  30-day trades: {seller.completedOrders || 24} <br />| Completion rate {seller.completionRate || '100.00%'} <br /> 15 min(s)
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-1">
              <div className="text-xs text-gray-400">Amount: <span className='text-white'>{seller.availableUSDT.toFixed(4)} USDT</span></div>
              <div className="text-sm">
              <span className="text-xs text-[#01BC8D] flex items-center"><ThumbsUp size={17} className='-mt-1 '/> 100%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-1">
              <div className="text-xs text-gray-400">Limit: <span className='text-white'>{seller.minAmount} - {seller.maxAmount} USD</span></div>
              <div className="text-sm">{seller.price.toFixed(3)} USD</div>
            </div>
            
           
            
            {/* Payment method box - shown in image as a yellow/gold box or money symbol */}
            <div className="flex items-center mb-2 justify-between">
              <Image src='/img/ant-design_credit-card-filled.png' alt='card' width={15} height={15}/>

              <button className="currency-display text-white w-[15%] py-1.5 rounded text-sm text-center">
             <p className='text-center ml-1'> Buy</p>
            </button>
            </div>
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradingTable;