'use client';
import React, {useState} from 'react';

interface OrderBookProps {
  orderBook: {
    asks: { price: number; amount: number; total: number }[];
    bids: { price: number; amount: number; total: number }[];
  };
  currentPrice: number;
  priceChange: number;
  formatCurrency: (value: number) => string;
  formatAmount: (value: number) => string;
  trades: { id: string; price: number; amount: number; side: string; time: string }[];
}

const OrderBook: React.FC<OrderBookProps> = ({ orderBook, currentPrice, priceChange, formatCurrency, formatAmount, trades }) => {
    const [activeTab, setActiveTab] = useState('orderbook');

  return (
    <div className="flex flex-col bg-[#01040F] p-4 sm:p-6   h-full overflow-hidden -mt-4 ">
      {/* Tabs */}
      <div className="flex border-b border-[#1E1E2F] p-1">
        <button
          className={`px-4 py-2 text-[18px] transition-colors rounded-full ${
            activeTab === 'orderbook'
              ? "text-white bg-[#10131F]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab('orderbook')}
        >
          Order Book
        </button>
        <button
          className={`px-4 py-2 text-sm transition-colors rounded-full ${
            activeTab === 'trades'
              ? "text-white bg-[#10131F]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab('trades')}
        >
          Last Trade
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'orderbook' ? (
          <div className="h-full">
            {/* Current price indicator */}
            <div className="px-4 py-2 border-b border-[#1E1E2F] text-sm">
              <div className="flex justify-between">
                <div className="text-gray-400">Last Price</div>
                <div className={priceChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {formatCurrency(currentPrice)} 
                  <span className="ml-2">
                    {priceChange >= 0 ? "+" : ""}{formatCurrency(priceChange)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order book header */}
            <div className="grid grid-cols-3 text-xs text-gray-400 px-4 py-5 border-b border-[#1E1E2F]">
              <div>Price (USDT)</div>
              <div className="text-right">Quantity (BTC)</div>
              <div className="text-right">Total (BTC)</div>
            </div>
            
            {/* Order book content */}
            <div className="overflow-auto flex-1 h-full">
              {/* Ask orders (sell) */}
              <div className="flex flex-col-reverse">
                {orderBook.asks.slice(0, 7).map((ask, index) => (
                  <div key={`ask-${index}`} className="grid grid-cols-3 text-xs px-4 py-4 relative">
                    <div className="text-red-500 z-10">{formatCurrency(ask.price)}</div>
                    <div className="text-right text-gray-300 z-10">{formatAmount(ask.amount)}</div>
                    <div className="text-right text-gray-300 z-10">{formatAmount(ask.total)}</div>
                    <div 
                      className="absolute inset-y-0 right-0 bg-red-900/20"
                      style={{ 
                        width: `${(ask.total / Math.max(
                          ...orderBook.asks.map(a => a.total),
                          ...orderBook.bids.map(b => b.total)
                        )) * 100}%` 
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Current price indicator */}
              <div className="grid grid-cols-3 text-xs px-4 py-1.5 bg-[#162033] border-y border-[#1E1E2F]">
                <div className={priceChange >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                  {formatCurrency(currentPrice)}
                </div>
                <div className="text-right"></div>
                <div className="text-right"></div>
              </div>
              
              {/* Bid orders (buy) */}
              <div>
                {orderBook.bids.slice(0, 7).map((bid, index) => (
                  <div key={`bid-${index}`} className="grid grid-cols-3 text-xs px-6 py-4 relative">
                    <div className="text-green-500 z-10">{formatCurrency(bid.price)}</div>
                    <div className="text-right text-gray-300 z-10">{formatAmount(bid.amount)}</div>
                    <div className="text-right text-gray-300 z-10">{formatAmount(bid.total)}</div>
                    <div 
                      className="absolute inset-y-0 right-0 bg-green-900/20"
                      style={{ 
                        width: `${(bid.total / Math.max(
                          ...orderBook.asks.map(a => a.total),
                          ...orderBook.bids.map(b => b.total)
                        )) * 100}%` 
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full">
            {/* Trades header */}
            <div className="grid grid-cols-3 text-xs text-gray-400 px-4 border-b border-[#1E1E2F]">
              <div>Price (USDT)</div>
              <div className="text-right">Amount (BTC)</div>
              <div className="text-right">Time</div>
            </div>
            
            {/* Trades content */}
            <div className="overflow-auto flex-1 h-full">
              {trades.map((trade, index) => (
                <div key={`${trade.id}-${index}`} className="grid grid-cols-3 text-xs px-5 py-[3px]">
                  <div className={trade.side === "buy" ? "text-green-500" : "text-red-500"}>
                    {formatCurrency(trade.price)}
                  </div>
                  <div className="text-right text-gray-300">{formatAmount(trade.amount)}</div>
                  <div className="text-right text-gray-400">
                    {new Date(trade.time).toLocaleTimeString("en-US", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit"
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBook;