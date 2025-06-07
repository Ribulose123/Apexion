"use client";
import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface Transaction {
  coin: string;
  type: string;
  qty: string;
  address: string;
  status: string;
  txId: string;
  dateTime: string;
}
const FundingHome = () => {

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Transactions");
  const [activeDepositTab, setActiveDepositTab] = useState("Deposit");
  const [coinFilter, setCoinFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const transactions: Transaction[] = [
    {
      coin: "USDT",
      type: "BEP20",
      qty: "0.0020",
      address: "RbCJnPPEJCqcMhC",
      status: "Completed",
      txId: "RbCJnPPEJCqcMhC",
      dateTime: "22-05-2025",
    },
  ];

  const tabs = ["All Transactions", "History"];
  const depositTabs = ["Deposit", "Withdraw", "Convert", "Bidvest Card"];
  return (
    <div className="p-1 md:p-8">
      {/* Header */}
      <div className="flex items-center ">
        <button onClick={()=>router.back()}>
          <ArrowLeft className="w-6 h-6 mr-3" />
        </button>
        
        <span className="text-lg">Deposit/Funding History</span>
      </div>

      {/* Content */}
      <div className="mt-10 ">
        <p className="text-[24px]">funding Account History</p>
        {/* Tab toogle */}
        <div className="flex space-x-4 mt-4 ml-4 border-b border-[#797A8033] md:border-b-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2  ${
                activeTab === tab
                  ? "md:bg-[#0A0D19] md:h-19 text-white border-b md:border-b-0"
                  : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* All Transactions */}
        {activeTab === "All Transactions" && (
          <div className="md:bg-[#0A0D19] p-2">
            <h2> no Transactions</h2>
          </div>
        )}

        {/* History */}
        {activeTab === "History" && (
          <div className="md:bg-[#0A0D19] p-2">
            {/* History tab */}
            <div className="flex space-x-4 md:space-x-8 mb-6 md:mb-8 overflow-x-auto border-b border-[#141E325C]">
              {depositTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDepositTab(tab)}
                  className={`pb-2 transition-colors whitespace-nowrap text-sm md:text-base ${
                    activeDepositTab === tab
                      ? " border-b-2 border-[#439A86]"
                      : ""
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Deposit Tab Content */}
            {activeDepositTab === "Deposit" && (
              <div>
                <div className="flex items-center space-x-1">
                  {/* Coin Filter */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Coin
                    </label>
                    <div className="relative inline-block">
                      <select
                        value={coinFilter}
                        onChange={(e) => setCoinFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white appearance-none pr-8 text-sm md:text-base md:w-40 "
                      >
                        <option value="All">All</option>
                        <option value="USDT">USDT</option>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Status
                    </label>
                    <div className="relative inline-block">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white appearance-none pr-8 text-sm md:text-base md:w-40"
                      >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Date
                    </label>
                    <div className="relative inline-block">
                      <input
                        type="text"
                        placeholder="Start date → End date"
                        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-500 pr-10 text-sm md:text-base mdw-56  "
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Transaction List */}
                <div>
                  {/* Desktop Table */}
                  <table className="w-full mt-6 hidden md:table">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">
                          Coin
                        </th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">
                          Type
                        </th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">
                          Qty
                        </th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">
                          Address
                        </th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">
                          Status
                        </th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">
                          TxID
                        </th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">
                          Date & Time
                        </th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {transactions.map((transaction, index) => (
                        <tr key={index} className="border-b border-gray-800 space-x-15">
                          <td className="py-4 px-2 text-white">
                            {transaction.coin}
                          </td>
                          <td className="py-4 px-2 text-white">
                            {transaction.type}
                          </td>
                          <td className="py-4 px-2 text-white">
                            {transaction.qty}
                          </td>
                          <td className="py-4 px-2 text-white truncate max-w-32">
                            {transaction.address}
                          </td>
                          <td className="py-4 px-2">
                            <span className="text-green-400">
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-white truncate max-w-32">
                            {transaction.txId}
                          </td>
                          <td className="py-4 px-2 text-white">
                            {transaction.dateTime}
                          </td>
                          <td className="py-4 px-2">
                            <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile List */}
                 <div>
                     <div>
                   <table className="table md:hidden w-full mt-5">
                    <thead>
                        <tr className="border-b border-gray-800">
                             <th className="text-left py-3 px-2 text-gray-400 font-medium">Qty/Coin</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">Type</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">25-05-2025</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">....</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b border-gray-800">
                            <td className="py-4 px-2 text-white">0.0025 USDT</td>
                            <td className="py-4 px-2 text-white">BEP20</td>
                            <td className="py-4 px-2 text-white"></td>
                            <td className="py-4 px-2 text-white"></td>
                        </tr>
                    </tbody>
                   </table>
                  </div>

                   <div>
                   <table className="table md:hidden w-full mt-5">
                    <thead>
                        <tr className="border-b border-gray-800">
                             <th className="text-left py-3 px-2 text-gray-400 font-medium">Qty/Coin</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">Type</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">25-05-2025</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">....</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b border-gray-800">
                            <td className="py-4 px-2 text-white">0.0025 USDT</td>
                            <td className="py-4 px-2 text-white">BEP20</td>
                            <td className="py-4 px-2 text-white"></td>
                            <td className="py-4 px-2 text-white"></td>
                        </tr>
                    </tbody>
                   </table>
                  </div>
                   <div>
                   <table className="table md:hidden w-full mt-5">
                    <thead>
                        <tr className="border-b border-gray-800">
                             <th className="text-left py-3 px-2 text-gray-400 font-medium">Qty/Coin</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">Type</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">25-05-2025</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">....</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b border-gray-800">
                            <td className="py-4 px-2 text-white">0.0025 USDT</td>
                            <td className="py-4 px-2 text-white">BEP20</td>
                            <td className="py-4 px-2 text-white"></td>
                            <td className="py-4 px-2 text-white"></td>
                        </tr>
                    </tbody>
                   </table>
                  </div>
                 </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FundingHome;
