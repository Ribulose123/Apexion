// OrderBook.tsx
import React, { useState, useEffect } from 'react';

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

interface OrderBookProps {
  currentPrice?: number;
  updateInterval?: number;
}

const OrderBookMobile: React.FC<OrderBookProps> = ({ 
  currentPrice = 73500, 
  updateInterval = 5000 
}) => {
  const [orderBook, setOrderBook] = useState<{
    asks: OrderBookEntry[];
    bids: OrderBookEntry[];
  }>({ asks: [], bids: [] });

  // Format currency with 2 decimal places
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Format amount with 4 decimal places
  const formatAmount = (value: number): string => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  };

  // Generate order book data
  const generateOrderBook = (price: number) => {
    const basePrice = price || 73500;
    const asks: OrderBookEntry[] = [];
    const bids: OrderBookEntry[] = [];

    let askPrice = basePrice + 10;
    let askTotal = 0;

    for (let i = 0; i < 15; i++) {
      const amount = Math.random() * 5 + 0.1;
      askTotal += amount;
      asks.push({
        price: askPrice,
        amount,
        total: askTotal,
      });
      askPrice += Math.floor(Math.random() * 100) + 10;
    }

    let bidPrice = basePrice - 10;
    let bidTotal = 0;

    for (let i = 0; i < 15; i++) {
      const amount = Math.random() * 5 + 0.1;
      bidTotal += amount;
      bids.push({
        price: bidPrice,
        amount,
        total: bidTotal,
      });
      bidPrice -= Math.floor(Math.random() * 100) + 10;
    }

    return { asks, bids };
  };

  useEffect(() => {
    // Initialize order book
    setOrderBook(generateOrderBook(currentPrice));

    // Set up interval for updates
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook(currentPrice));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [currentPrice, updateInterval]);

  return (
    <div className="order-book-container">
      <h2 className="text-lg font-semibold mb-2">Order Book</h2>
      
      <div className="flex text-sm">
        <div className="w-1/2 pr-2">
          <div className="grid grid-cols-3 font-medium text-gray-400 mb-1">
            <div>Price (USD)</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Total</div>
          </div>
          
          {orderBook.asks.slice().reverse().map((ask, index) => (
            <div key={`ask-${index}`} className="grid grid-cols-3 text-red-500">
              <div>{formatCurrency(ask.price)}</div>
              <div className="text-right">{formatAmount(ask.amount)}</div>
              <div className="text-right">{formatAmount(ask.total)}</div>
            </div>
          ))}
        </div>
        
        <div className="w-1/2 pl-2">
          <div className="grid grid-cols-3 font-medium text-gray-400 mb-1">
            <div>Price (USD)</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Total</div>
          </div>
          
          {orderBook.bids.map((bid, index) => (
            <div key={`bid-${index}`} className="grid grid-cols-3 text-green-500">
              <div>{formatCurrency(bid.price)}</div>
              <div className="text-right">{formatAmount(bid.amount)}</div>
              <div className="text-right">{formatAmount(bid.total)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBookMobile;