"use client";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { CgArrowsExchangeV } from "react-icons/cg";

const assets = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    quantity: "0.0035",
    type: "Crypto",
    price: 55140.5,
    img: "/img/bitcoin.png",
  },
  {
    id: 2,
    name: "Binance",
    symbol: "BNB",
    quantity: "0.025",
    type: "Crypto",
    price: 55140.5,
    img: "/img/binance-smart-chain.png",
  },
  {
    id: 3,
    name: "Litecoin",
    symbol: "LTC",
    quantity: "0.035",
    type: "Crypto",
    price: 55140.5,
    img: "/img/litecoin.png",
  },
  {
    id: 4,
    name: "Avalanche",
    symbol: "AVAX",
    quantity: "0.045",
    type: "Crypto",
    price: 55140.5,
    img: "/img/avalanche.png",
  },
];

export default function Assets() {
  return (
    <div className="mb-6 px-3 sm:border sm:border-[#141E32] rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">My Assets</h3>
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search..."
            className="bg-gray-800 rounded-lg px-4 py-2 text-sm sm:block hidden"
          />
          <button className="sm:bg-[#6967AE] sm:text-white text-[#F2AF29] px-3 py-2 rounded-lg text-sm flex items-center">
            View All <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div className=" rounded-xl ">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left p-4 "></th>
              <th className="text-left p-4 ">Asset</th>
              <th className="text-left p-4 sm:table-cell hidden">Quantity</th>
              <th className="text-left p-4 sm:table-cell hidden">Type</th>
              <th className="text-left p-4 sm:table-cell hidden">
                Current Price
              </th>
              <th className="p-4 table-cell sm:hidden sm:ml-0 ">
                <button className="flex gap-1">
                  <span className="flex items-center gap">
                    Last Price <CgArrowsExchangeV size={15} />
                  </span>
                  <br />
                  <span className="flex items-center">
                    24hr Change <CgArrowsExchangeV size={15} />
                  </span>
                </button>
              </th>
              <th className="text-right p-4 sm:table-cell hidden">Action</th>
              <th className="text-right p-4 sm:hidden table-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr
                key={asset.id}
                className={`${
                  index % 2 === 1 ? "bg-transparent" : "bg-gray-800/30"
                } w-full`}
              >
                <td className="py-2 sm:py-3 px-2 ">
                  <FaRegStar className="text-gray-500" />
                </td>
                <td className="p-2 flex items-center space-x-2">
                  <Image
                    src={asset.img}
                    alt={asset.type}
                    width={16}
                    height={16}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />

                  <span className="text-xs sm:text-sm">
                    {asset.name}
                    <p className="text-xs sm:text-sm text-gray-400">
                      {asset.symbol}
                    </p>
                  </span>
                </td>
                <td className="p-2 sm:table-cell hidden">{asset.quantity}</td>
                <td className="p-2 sm:table-cell hidden">{asset.type}</td>
                <td className="p-2 text-center sm:text-start">
                  ${asset.price.toLocaleString()}
                </td>
                <td className="p-2 text-right sm:table-cell hidden">
                  <button className="text-indigo-400 mr-2 Table px-2 py-1 text-xs">
                    Deposit
                  </button>
                  <button className="text-indigo-400 Table px-2 py-1 text-xs">
                    Withdraw
                  </button>
                </td>
                <td className="sm:hidden text-right">
                  <button className="rounded-full text-white sm:hidden">
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
