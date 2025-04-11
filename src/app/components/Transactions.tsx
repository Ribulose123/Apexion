'use client';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FaRegStar } from "react-icons/fa";
import { CgArrowsExchangeV } from "react-icons/cg";

const transactions = [
  { id: 1, sign:'BTC', type: 'Bitcoin', amount: '0.0035', date: '24/03/2024', status: 'Completed', price: 55140.50, img: '/img/bitcoin.png'},
  { id: 2, sign:'BNB', type: 'Binance', amount: '0.025', date: '24/03/2024', status: 'Pending', price: 55140.50, img: '/img/binance-smart-chain.png' },
  { id: 3, sign:'LTC', type: 'Litecoin', amount: '0.035', date: '24/03/2024', status: 'Failed', price: 55140.50, img:'/img/litecoin.png' },
  { id: 4, sign:'AWX', type: 'Avalanche', amount: '0.045', date: '24/03/2024', status: 'Completed', price: 55140.50, img: '/img/avalanche.png' },
];

export default function Transactions() {


  return (
    <div className="px-3  sm:border sm:border-[#141E32] rounded-xl p-6">
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
              <th className="text-right p-2 hidden sm:table-cell">Status</th>
              <th className="text-right p-4 sm:hidden table-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr 
                key={transaction.id} 
                className={`${index % 2 === 1 ? 'bg-transparent' : 'bg-gray-800/30'}`}
              >
                <td className="py-2 sm:py-3 px-2">
                  <FaRegStar className="text-gray-500" />
                </td>
                <td className="p-2">
                  <div className="flex items-center space-x-2">
                    <Image 
                      src={transaction.img} 
                      alt={transaction.type} 
                      width={16} 
                      height={16} 
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    <div>
                      <div className="text-xs sm:text-sm">{transaction.type}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{transaction.sign}</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">${transaction.price.toLocaleString()}</td>
                <td className="p-2 table-cell sm:hidden">
                  <div className="flex flex-col">
                    <span className="text-xs">{transaction.date}</span>
                    <span className="text-xs">{transaction.amount} {transaction.sign}</span>
                  </div>
                </td>
                <td className="p-2 hidden sm:table-cell">{transaction.date}</td>
                <td className="p-2 text-right hidden sm:table-cell">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs w-20 text-center Table`}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}