import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { FaRegStar } from "react-icons/fa";
import { API_ENDPOINTS } from "../config/api";
import Link from "next/link";

interface BackendTransaction {
  id: string;
  platformAssetId: string;
  amount: number;
  type: string; // 'DEPOSIT', 'WITHDRAWAL', 'TRADE', etc.
  status: string;
  createdAt: string;
  price?: number; // Added price field
}

interface BackendAsset {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  currentPrice?: number; // Added current price
}

interface EnhancedTransaction {
  id: string;
  sign: string;
  type: string;
  amount: string;
  date: string;
  status: string;
  price: string;
  img: string;
  transactionType: string; // Added transaction type
  value: string; // Added calculated value
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<EnhancedTransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        // Fetch assets with current prices
        const assetsResponse = await fetch(API_ENDPOINTS.ASSET.ASSET_LIST, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!assetsResponse.ok) {
          throw new Error('Failed to fetch assets');
        }

        const assetsData = await assetsResponse.json();
        const assets = assetsData?.data || [];

        // Fetch transactions (limited to 5)
        const transactionsResponse = await fetch(`${API_ENDPOINTS.TRANSACTION.TRANSACTION_HISTORY}?limit=5`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!transactionsResponse.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const transactionsData = await transactionsResponse.json();
        const backendTransactions = transactionsData?.data || [];

        // Enhance transactions with asset info and calculate values
        const enhancedTransactions = backendTransactions.map((tx: BackendTransaction) => {
          const asset = assets.find((a: BackendAsset) => a.id === tx.platformAssetId) || {
            symbol: 'UNKN',
            name: 'Unknown Asset',
            image: '/img/default-crypto.png',
            currentPrice: 0
          };

          const amount = typeof tx.amount === 'number' ? tx.amount.toFixed(8) : '0.00000000';
          const price = tx.price || asset.currentPrice || 0;
          const value = (parseFloat(amount) * price).toFixed(2);

          return {
            id: tx.id,
            sign: asset.symbol,
            type: asset.name,
            amount: amount,
            date: tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'N/A',
            status: tx.status || 'UNKNOWN',
            price: price.toFixed(2),
            img: asset.image || '/img/default-crypto.png',
            transactionType: tx.type || 'UNKNOWN',
            value: value
          };
        });

        setTransactions(enhancedTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTypeBadgeColor = (type: string) => {
    switch(type.toUpperCase()) {
      case 'DEPOSIT': return 'bg-blue-900/30 text-blue-400';
      case 'WITHDRAWAL': return 'bg-purple-900/30 text-purple-400';
      case 'TRADE': return 'bg-indigo-900/30 text-indigo-400';
      case 'STAKING': return 'bg-green-900/30 text-green-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="px-3 sm:border sm:border-[#141E32] rounded-xl p-6 text-center">
        <p className="text-white mt-2">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 sm:border sm:border-[#141E32] rounded-xl p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="px-3 sm:border sm:border-[#141E32] rounded-xl p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>
        <Link href='/fund' className="sm:bg-[#6967AE] sm:text-white text-[#F2AF29] px-3 py-2 rounded-lg text-sm flex items-center gap-1">
          View All <ArrowRight size={18}/>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="p-2"></th>
              <th className="text-left p-2">Transaction</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Amount</th>
              
              <th className="text-left p-2 ">Date</th>
              <th className=" p-2  text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr 
                  key={transaction.id} 
                  className={`${index % 2 === 1 ? 'bg-transparent' : 'bg-gray-800/30'}`}
                >
                  <td className="py-2 sm:py-3 px-2">
                    <FaRegStar className="text-gray-500 hover:text-yellow-400 cursor-pointer" />
                  </td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                     
                      <div>
                        <div className="text-xs sm:text-sm">{transaction.type}</div>
                        <div className="text-xs text-gray-400">{transaction.sign}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeBadgeColor(transaction.transactionType)}`}>
                      {transaction.transactionType}
                    </span>
                  </td>
                  <td className="p-2">
                    {transaction.amount} {transaction.sign}
                  </td>
                 
                  <td className="p-2">{transaction.date}</td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-center">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'COMPLETED' ? 'bg-green-900/30 text-green-400' :
                        transaction.status === 'PENDING' ? 'bg-yellow-900/30 text-yellow-400' :
                        transaction.status === 'FAILED' ? 'bg-red-900/30 text-red-400' :
                        'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}