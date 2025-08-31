"use client";
import { ChevronDown, Wallet } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface CopyTradeModalProps {
  traderName: string;
  minAmount: number;
  maxAmount: number;
  commissionRate: number;
  onClose: () => void;
  onConfirmCopy: (copySettings: {
    copyAmount: number;
    copyRatio: number;
    stopLossEnabled: boolean;
    stopLossPercent: number;
    takeProfitEnabled: boolean;
    takeProfitPercent: number;
  }) => void;
}

const CopyTradeModal: React.FC<CopyTradeModalProps> = ({
  traderName,
  minAmount,
  maxAmount,
  commissionRate,
  onClose,
  onConfirmCopy,
}) => {
  const [investment, setInvestment] = useState(minAmount.toString());
  const [copyRatio, setCopyRatio] = useState("1");
  const [stopLossEnabled, setStopLossEnabled] = useState(false);
  const [stopLossPercent, setStopLossPercent] = useState("10");
  const [takeProfitEnabled, setTakeProfitEnabled] = useState(false);
  const [takeProfitPercent, setTakeProfitPercent] = useState("20");
  const [maxPositionMargin, setMaxPositionMargin] = useState("");
  const [maxDailyLimit, setMaxDailyLimit] = useState("");
  const [isMoreSettingsOpen, setIsMoreSettingsOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/35 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="flex md:flex-row flex-col bg-[#E8E8E8] rounded-xl max-w-4xl w-full shadow-xl max-h-[90vh] mt-15 md:mt-0 overflow-y-auto">
        {/* Left Side - Trader Profile */}
        <div className="bg-gradient-to-b from-[#04022E] via-[#05052D] to-[#090B1D] p-3 relative h-full py-7 rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none">
          <button 
            onClick={onClose}
            className="text-[#d4d7e2] hover:text-white transition-colors text-xl z-10 absolute right-3 md:hidden"
          >
            ✕
          </button>
          
          <div className="flex flex-col justify-center items-center gap-4 p-4">
            <div>
              <Image
                src="/img/Avatar DP.png"
                alt={traderName}
                width={100}
                height={100}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-2xl text-[#E8E8E8]">{traderName}</h2>
              <Image
                src="/img/Badges.png"
                alt="badges"
                width={60}
                height={60}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <p className="bg-[#439A8614] text-center p-2 text-[#439A86] text-[9px] rounded-xl">
                Most popular
              </p>
              <p className="bg-[#439A8614] text-center p-2 text-[#439A86] text-[9px] rounded-xl">
                Conservative
              </p>
              <p className="bg-[#141E325C] text-center p-2 text-[#6278A3] text-[9px] rounded-xl">
                High-frequency trading
              </p>
              <p className="bg-[#141E325C] text-center p-2 text-[#6278A3] text-[9px] rounded-xl">
                Multi-coin
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="border-r border-[#797A80] pr-4">
                <p className="text-[#797A80] text-sm">Followers</p>
                <h3 className="text-white text-lg font-bold">12</h3>
              </div>
              <div className="border-r border-[#797A80] pr-4">
                <p className="text-[#797A80] text-sm">AUM</p>
                <h3 className="text-white text-lg font-bold">334.0</h3>
              </div>
              <div className="">
                <p className="text-[#797A80] text-sm">Max.Drawdown</p>
                <h3 className="text-white text-lg font-bold">
                  255<span className="text-xs">/12.6%</span>
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#141E326B] p-3">
                <p className="text-[#6278A3] text-xs capitalize flex items-center gap-1 text-center justify-center">
                  <Wallet size={13} />
                  total assets
                </p>
                <p className="text-[#E8E8E8] text-[15px] text-center">
                  4716,82 USDT
                </p>
              </div>
              <div className="bg-[#141E326B] p-3">
                <p className="text-[#6278A3] text-xs capitalize flex items-center gap-1 text-center justify-center">
                  <Wallet size={13} />
                  Profit sharing ratio
                </p>
                <p className="text-[#E8E8E8] text-[15px] text-center">{commissionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Copy Trade Form */}
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="gap-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-[#01040F] font-semibold">
                {traderName}
              </h2>
              
              <button 
                onClick={onClose}
                className="text-[#01040F] hover:text-white transition-colors text-xl z-10 hidden md:block"
              >
                ✕
              </button>
            </div>
            
            {/* Investment Section */}
            <div className="mb-6">
              <label className="block text-[17px] font-semibold text-[#01040F] mb-2">
                Investment
              </label>
              <div className="flex items-center">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    Min: {minAmount}
                  </span>
                  <input
                    type="text"
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                    className="w-full bg-[#E2E6F9] border-0 rounded-lg px-16 py-3 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg font-medium text-[#01040F]">
                    USDT
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <p className="text-[#01040F66] font-medium text-[13px]">
                    Available Balance: 581.58USDT
                  </p>
                  <span className="flex items-center gap-1 text-[#01040F66] font-semibold text-[15px]">
                    Main Account <ChevronDown />
                  </span>
                </div>
                <span className="text-[#F2AF29]">Deposit | Transfer</span>
              </div>
            </div>

            {/* Copy Ratio */}
            <div className="mb-6">
              <label className="block text-[17px] font-semibold text-[#01040F] mb-2">
                Copy Ratio
              </label>
              <div className="flex items-center relative">
                <input
                  type="text"
                  value={copyRatio}
                  onChange={(e) => setCopyRatio(e.target.value)}
                  placeholder="Enter copy ratio (e.g., 1 for 1:1)"
                  className="flex-1 bg-[#E2E6F9] border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
                />
              </div>
            </div>

            {/* Stop Loss */}
            <div className="mb-6">
              <label className="flex items-center text-[17px] font-semibold text-[#01040F] mb-2">
                <input
                  type="checkbox"
                  checked={stopLossEnabled}
                  onChange={(e) => setStopLossEnabled(e.target.checked)}
                  className="mr-2"
                />
                Enable Stop Loss
              </label>
              {stopLossEnabled && (
                <div className="flex items-center relative">
                  <input
                    type="text"
                    value={stopLossPercent}
                    onChange={(e) => setStopLossPercent(e.target.value)}
                    placeholder="Stop Loss Percentage"
                    className="flex-1 bg-[#E2E6F9] border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg font-medium text-[#F2AF29]">
                    %
                  </span>
                </div>
              )}
            </div>

            {/* Take Profit */}
            <div className="mb-6">
              <label className="flex items-center text-[17px] font-semibold text-[#01040F] mb-2">
                <input
                  type="checkbox"
                  checked={takeProfitEnabled}
                  onChange={(e) => setTakeProfitEnabled(e.target.checked)}
                  className="mr-2"
                />
                Enable Take Profit
              </label>
              {takeProfitEnabled && (
                <div className="flex items-center relative">
                  <input
                    type="text"
                    value={takeProfitPercent}
                    onChange={(e) => setTakeProfitPercent(e.target.value)}
                    placeholder="Take Profit Percentage"
                    className="flex-1 bg-[#E2E6F9] border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg font-medium text-[#F2AF29]">
                    %
                  </span>
                </div>
              )}
            </div>

            {/* More Settings */}
            <div>
              <button
                onClick={() => setIsMoreSettingsOpen(!isMoreSettingsOpen)}
                className="flex items-center text-gray-700 font-medium"
              >
                More Settings
                <span
                  className={`ml-2 transition-transform ${
                    isMoreSettingsOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown />
                </span>
              </button>

              {isMoreSettingsOpen && (
                <div className="mt-3 space-y-4">
                  {/* Max Position Margin */}
                  <div>
                    <label className="block text-[17px] font-semibold text-[#01040F] mb-2">
                      Max. Position Margin Per Contract
                    </label>
                    <div className="flex items-center relative">
                      <input
                        type="text"
                        value={maxPositionMargin}
                        onChange={(e) => setMaxPositionMargin(e.target.value)}
                        placeholder={`Please Enter An Amount Between ${minAmount}～${maxAmount} USDT`}
                        className="flex-1 bg-[#E2E6F9] shadow-xl text-[#01040F3D] border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg font-medium text-[#01040F]">
                        USDT
                      </span>
                    </div>
                  </div>

                  {/* Max Daily Position Limit */}
                  <div>
                    <label className="block text-[17px] font-semibold text-[#01040F] mb-2">
                      Max. Daily Position Limit
                    </label>
                    <div className="flex items-center relative">
                      <input
                        type="text"
                        value={maxDailyLimit}
                        onChange={(e) => setMaxDailyLimit(e.target.value)}
                        placeholder={`Please Enter An Amount Between ${minAmount}～${maxAmount} USDT`}
                        className="flex-1 bg-[#E2E6F9] shadow-xl text-[#01040F3D] border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg font-medium text-[#01040F]">
                        USDT
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms Checkbox */}
              <div className="mb-6 mt-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#01040F]">
                    I have read and agree to Bitget Copy Trading Agreement.
                  </span>
                </label>
              </div>

              {/* Copy Now Button */}
              <button
                onClick={() => {
                  if (agreedToTerms) {
                    onConfirmCopy({
                      copyAmount: Number(investment),
                      copyRatio: Number(copyRatio),
                      stopLossEnabled,
                      stopLossPercent: Number(stopLossPercent),
                      takeProfitEnabled,
                      takeProfitPercent: Number(takeProfitPercent),
                    });
                  } else {
                    alert("Please agree to the terms first");
                  }
                }}
                disabled={!agreedToTerms}
                className="w-full bg-[#6967AE] hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-4 px-4 rounded-lg transition-colors mb-2"
              >
                Copy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyTradeModal;