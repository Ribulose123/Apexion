import React from "react";
import Image from "next/image";
import { FaBitcoin, FaCopy, FaChartLine, FaHome, FaArrowRight } from "react-icons/fa";


const products = [
  {
    icon: <FaBitcoin size={28} className="text-gray-800" />,
    img: "/img/bt.png",
    title: "Crypto",
    description:
      "Trade and Mine Bitcoin and Other Leading Crypto Currencies with Decentralized Finance",
  },
  {
    icon: <FaCopy size={28} className="text-gray-800" />,
    img: "/img/copy1.png",
    title: "Copy",
    description:
      "Copy trading allows you to directly copy the positions taken by another trader. You simply copy everything",
  },
  {
    icon: <FaChartLine size={28} className="text-gray-800" />,
    img: "/img/coin.png",
    title: "Forex",
    description:
      "Trade currency pairs and be able to implement your own trading strategies with minimum slippage",
  },
  {
    icon: <FaHome size={28} className="text-gray-800" />,
    img: "/img/stock.png",
    title: "Stocks",
    description:
      "Stocks, also commonly referred to as shares, are issued by a public company and put up for sale.",
  },
];

const ProductsSection = () => { 
  return (
    <div className="text-white py-16 px-4 sm:px-6 mt-[70px] w-full">
      {/* Title & Description */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-medium">1 Account 200+ Products</h2>
        <p className="text-gray-400 mt-4">
          Diversify your portfolio with access to over 15,000 products across 7 asset classes.
          Trade CFDs on Forex, Futures, Indices, Metals, Energies, and Shares.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-none w-full mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-2xl shadow-lg p-6 flex flex-col items-center text-center h-full gap-4"
          >
            <Image
              src={product.img}
              alt={product.title}
              width={80}
              height={80}
              className="bg-gray-200 p-4 rounded-full mb-4"
            />
            <div className="flex-1 flex flex-col">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            </div>
            <button className="mt-auto border border-gray-600 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition items-center flex gap-2">
              More
              <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
