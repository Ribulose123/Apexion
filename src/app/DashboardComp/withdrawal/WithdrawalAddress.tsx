import React, { useState } from "react";
import { CoinDepost } from "@/app/data/data";

interface DepositAddressProps {
  withdrawalAddress: string;
  selectedCoin: CoinDepost | null;
  onNext: (amount: number) => Promise<void>;
  isSubmitting: boolean;
  isLoading: boolean;
}

const WithdrawalAddress: React.FC<DepositAddressProps> = ({
  withdrawalAddress,
  selectedCoin,
  onNext,
  isSubmitting,
  isLoading
}) => {
  const [amount, setAmount] = useState<number | "">("");
  const [amountError, setAmountError] = useState<string | null>(null);

  const handleNextButtonClick = async () => {
    if (typeof amount !== "number" || amount <= 0) {
      setAmountError("Please enter a valid amount greater than 0");
      return;
    }
    setAmountError(null);
    await onNext(amount);
  };

  return (
    <div>
      <div>
        <h3 className="text-[#E8E8E8]">Withdrawal Address</h3>
        <div className="rounded-lg p-4 mb-4 border border-[#439A8633] mt-3 flex justify-between items-center cursor-pointer">
          {isLoading ? (
            <div className="animate-pulse h-6 w-full bg-gray-700 rounded"></div>
          ) : (
            <div className="text-[16px] text-[#E8E8E8] font-semibold truncate flex-grow">
              {withdrawalAddress || "No address available"}
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-[#E8E8E8]">Amount</h3>
        <div className="rounded-lg p-4 mb-4 border border-[#439A8633] mt-3">
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value ? parseFloat(e.target.value) : "")
            }
            placeholder={`Enter amount in ${selectedCoin?.symbol || "Coin"}`}
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
            disabled={isLoading}
          />
          {amountError && (
            <p className="text-red-400 text-sm mt-1">{amountError}</p>
          )}
        </div>
      </div>
      <button
        onClick={handleNextButtonClick}
        disabled={
          isSubmitting || 
          isLoading || 
          !withdrawalAddress || 
          amount === "" || 
          amount <= 0
        }
        className={`mt-4 mb-3 w-full p-2 flex items-center justify-center rounded-lg text-white ${
          (isSubmitting || isLoading) 
            ? "bg-[#3d665c] cursor-not-allowed" 
            : "bg-[#439A86] hover:bg-[#3d665c]"
        }`}
      >
        {isSubmitting ? "Submitting..." : isLoading ? "Loading..." : "Next"}
      </button>
    </div>
  );
};

export default WithdrawalAddress;