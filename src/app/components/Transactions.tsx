import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { FaRegStar } from "react-icons/fa";
import { CgArrowsExchangeV } from "react-icons/cg";
import { API_ENDPOINTS } from "../config/api";

interface BackendTransaction {
  id: string;
  platformAssetId: string;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
}

interface BackendAsset {
  id: string;
  symbol: string;
  name: string;
  image?: string;
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

        // Fetch assets
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

        // Enhance transactions with asset info
        const enhancedTransactions = backendTransactions.map((tx: BackendTransaction) => {
          const asset = assets.find((a: BackendAsset) => a.id === tx.platformAssetId) || {
            symbol: 'UNKN',
            name: 'Unknown Asset',
            image: '/img/default-crypto.png'
          };

          // Safely format amount
          const amount = typeof tx.amount === 'number' 
            ? tx.amount.toFixed(8) 
            : '0.00000000';

          return {
            id: tx.id,
            sign: asset.symbol,
            type: asset.name,
            amount: amount,
            date: tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'N/A',
            status: tx.status || 'UNKNOWN',
            price: '0.00', // Default price (you'll need to fetch real prices)
            img: asset.image || '/img/default-crypto.png'
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
        <button className="sm:bg-[#6967AE] sm:text-white text-[#F2AF29] px-3 py-2 rounded-lg text-sm flex items-center gap-1">
          View All <ArrowRight size={18}/>
        </button>
      </div>
      <div className="rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="p-2"></th>
              <th className="text-left p-2">Transaction</th>
              <th className="text-left p-2">Amount</th>
              <th className="p-4 table-cell sm:hidden">
                <div className="flex flex-col">
                  <span className="flex items-center gap-1">Date <CgArrowsExchangeV size={15}/></span>
                  <span className="flex items-center gap-1">Amount <CgArrowsExchangeV size={15}/></span>
                </div>
              </th>
              <th className="text-left p-2 hidden sm:table-cell">Date</th>
              <th className="text- p-2 hidden sm:table-cell">Status</th>
             
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
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
                        <div className="text-xs sm:text-sm text-gray-400">{transaction.sign}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">${transaction.price}</td>
                  <td className="p-2 table-cell sm:hidden">
                    <div className="flex flex-col">
                      <span className="text-xs">{transaction.date}</span>
                      <span className="text-xs">{transaction.amount} {transaction.sign}</span>
                    </div>
                  </td>
                  <td className="p-2 hidden sm:table-cell">{transaction.date}</td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-center hidden sm:table-cell">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'COMPLETED' ? 'bg-green-900/30 text-xl text-green-400' :
                        transaction.status === 'PENDING' ? 'bg-yellow-900/30 text-yellow-400' :
                        transaction.status === 'FAILED' ? 'bg-red-900/30 text-red-400' :
                        'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-2 text-right sm:hidden">
                    <button className="rounded-full text-white">
                      ...
                    </button>
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