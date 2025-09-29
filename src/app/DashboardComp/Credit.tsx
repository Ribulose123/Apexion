"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { featuredCoins, newlyListedCoins } from "../data/data";

const CryptoInterface = () => {
  const [tab, setTab] = useState("buy");
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("0.7751");
  const [selectedFiat, setSelectedFiat] = useState("USD");
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");
  const [showRegionModal, setShowRegionModal] = useState(false); // Changed to false initially
  const [countdown, setCountdown] = useState(5); 

  // Countdown timer for automatic redirect (only when modal is shown)
  useEffect(() => {
    if (showRegionModal) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleCloseModal();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showRegionModal]);

  const handleCloseModal = () => {
    setShowRegionModal(false);
    setCountdown(5); // Reset countdown for next time
  };

  const handleBuyClick = () => {
    setShowRegionModal(true);
  };

  // Modal component
  const RegionModal = () => {
    if (!showRegionModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#141E32] border border-[#439A8633] rounded-xl p-8 max-w-md w-full mx-auto text-center">
          {/* Warning Icon */}
          <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          
          {/* Modal Title */}
          <h2 className="text-2xl font-bold text-white mb-3">
            NOT AVAILABLE IN YOUR REGION
          </h2>
          
          {/* Modal Message */}
          <p className="text-gray-300 mb-6 leading-relaxed">
            This service is currently not available in your geographic region. 
            Please check back later or contact support for more information.
          </p>
          
          {/* Countdown Timer */}
          <div className="text-sm text-gray-400 mb-6">
            Redirecting in <span className="text-[#439A86] font-bold">{countdown}</span> seconds...
          </div>
          
          {/* Action Button */}
          <button
            onClick={handleCloseModal}
            className="w-full bg-[#439A86] hover:bg-teal-600 text-white rounded-md py-3 transition duration-200 font-medium"
          >
            Go Back Now
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="text-white w-full">
      {/* Region Modal */}
      <RegionModal />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl w-full py-8">
        <div className="mb-8 md:ml-28">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
            Buy Crypto Instantly In
            <br className="hidden md:block" />
            Just A Few Steps
          </h1>
          <p className="text-[#7D8491] mb-6 text-center md:text-left">
            Enjoy a seamless crypto purchase experience with
            <br className="hidden md:block" />
            multiple payment methods.
          </p>
        </div>

        {/* Responsive layout - reversed on desktop */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          {/* Featured/Newly Listed Section */}
          <div className="w-full md:w-1/2 order-2 md:order-1 mb-8 md:mb-0 md md:-mt-5 md:ml-28">
            <div className="flex flex-col border border-[#141E32] text-white rounded-lg overflow-hidden w-full max-w-md mx-auto md:mx-0 shadow-lg">
              <div className="flex flex-col md:flex-row">
                {/* Featured Column */}
                <div className="md:w-1/2 w-full border-r border-gray-800 p-4">
                  <h3 className="text-gray-400 mb-4 text-sm font-medium">
                    Featured
                  </h3>
                  <div className="space-y-1">
                    {featuredCoins.map((coin) => (
                      <div
                        key={coin.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                          <span className="text-sm">{coin.symbol}</span>
                        </div>
                        <span className="text-sm">{coin.price}</span>
                        <span
                          className={`text-sm ${
                            coin.positive ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {coin.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newly Listed Column */}
                <div className="md:w-1/2 w-full p-4">
                  <h3 className="text-gray-400 mb-4 text-sm font-medium">
                    Newly Listed
                  </h3>
                  <div className="space-y-1">
                    {newlyListedCoins.map((coin) => (
                      <div
                        key={coin.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                          <span className="text-sm">{coin.symbol}</span>
                        </div>
                        <span className="text-sm">{coin.price}</span>
                        <span
                          className={`text-sm ${
                            coin.positive ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {coin.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buy/Sell Form */}
          <div className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0 md:-mt-42">
            <div className="bg-linear-to-b from-[#141E323D] to-[#141E32] text-white w-full max-w-md mx-auto md:mx-0 p-6 rounded-lg shadow-lg">
              {/* Tab buttons */}
              <div className="flex justify-between mb-3">
                <button
                  onClick={() => setTab("buy")}
                  className={`text-xl font-medium ${
                    tab === "buy" ? "text-white" : "text-gray-400"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTab("sell")}
                  className={`text-xl font-medium text-right ${
                    tab === "sell" ? "text-white" : "text-gray-400"
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Pay input field */}
              <div className="mb-6">
                <div className="border border-[#439A8633] rounded-lg p-2">
                  <div className="text-xs font-medium text-[#E8E8E8] mb-1">
                    Pay
                  </div>
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      placeholder="4 - 20000"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="bg-transparent focus:outline-none w-2/3 text-[#E8E8E8]"
                    />
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                      <select
                        value={selectedFiat}
                        onChange={(e) => setSelectedFiat(e.target.value)}
                        className="bg-[#0A0D19] bg-opacity-50 rounded-md focus:outline-none text-[#E8E8E8] px-2 py-1"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receive input field */}
              <div className="mb-6">
                <div className="border border-[#439A8633] rounded-lg p-2">
                  <div className="text-xs font-medium text-[#E8E8E8] mb-1">
                    Receive
                  </div>
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={receiveAmount}
                      onChange={(e) => setReceiveAmount(e.target.value)}
                      className="bg-transparent focus:outline-none w-2/3 text-[#439A86]"
                    />
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <select
                        value={selectedCrypto}
                        onChange={(e) => setSelectedCrypto(e.target.value)}
                        className="bg-[#0A0D19] bg-opacity-50 rounded-md focus:outline-none text-[#E8E8E8] px-2 py-1"
                      >
                        <option value="USDT">USDT</option>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-[#E8E8E8] mt-1">
                  Est Price: USDT = 19.3437 USD
                </div>
              </div>

              {/* Buy button - Now triggers the modal */}
              <button 
                onClick={handleBuyClick}
                className="w-full bg-[#439A86] hover:bg-teal-600 text-white rounded-md py-3 transition duration-200 font-medium"
              >
                Buy
              </button>
            </div>
          </div>
        </div>

        {/* How To Buy Crypto Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center md:text-left md:ml-28">
            How To Buy Crypto Instantly?
          </h2>
          <div className="flex flex-col md:flex-row justify-evenly gap-6 md:gap-8 border md:border-0 border-[#439A8633] py-3 rounded-lg">
            {/* Step 1 */}
            <div className="text-center mb-6 md:mb-0 flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/img/step1.png"
                  alt="Step 1"
                  width={130}
                  height={130}
                />
              </div>
              <h3 className="font-medium mb-2">Enter the amount</h3>
              <p className="text-[#7D8491] text-sm">to create an order.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center mb-6 md:mb-0 flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/img/Group.png"
                  alt="Choose payment method"
                  width={90}
                  height={90}
                />
              </div>
              <h3 className="font-medium mb-2">Choose your preferred</h3>
              <p className="text-[#7D8491] text-sm">payment method.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center flex flex-col items-center">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/img/Group (1).png"
                  alt="Confirm payment"
                  width={90}
                  height={90}
                />
              </div>
              <h3 className="font-medium mb-2">Confirm the payment and</h3>
              <p className="text-[#7D8491] text-sm">
                follow the steps to complete the purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoInterface;