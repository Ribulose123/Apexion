import React, { useState } from "react";
import { CoinDepost, WithdrawalType } from "@/app/data/data";

interface WithdrawalAddressProps {
  withdrawalAddress: string;
  selectedCoin: CoinDepost | null;
  withdrawalType: WithdrawalType;
  onNext: (amount: number, destinationAddress?: string) => Promise<void>;
  isSubmitting: boolean;
  isLoading: boolean;
}

const WithdrawalAddress: React.FC<WithdrawalAddressProps> = ({
  withdrawalAddress,
  selectedCoin,
  withdrawalType,
  onNext,
  isSubmitting,
  isLoading
}) => {
  const [amount, setAmount] = useState<number | "">("");
  const [customAddress, setCustomAddress] = useState("");
  const [amountError, setAmountError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  const handleNextButtonClick = async () => {
    // Validate amount
    if (typeof amount !== "number" || amount <= 0) {
      setAmountError("Please enter a valid amount greater than 0");
      return;
    }
    
    // Validate address for crypto withdrawals
    let finalDestinationAddress = withdrawalAddress;
    
    if (withdrawalType === WithdrawalType.CRYPTO) {
      if (!customAddress.trim()) {
        setAddressError("Please enter a destination address");
        return;
      }
      finalDestinationAddress = customAddress;
    }
    
    setAmountError(null);
    setAddressError(null);
    await onNext(amount, finalDestinationAddress);
  };

  const renderAddressField = () => {
    switch (withdrawalType) {
      case WithdrawalType.CRYPTO:
        return (
          <div className="mb-4">
            <h3 className="text-[#E8E8E8] mb-2">Destination Address</h3>
            <div className="rounded-lg p-4 border border-[#439A8633]">
              <input
                type="text"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                placeholder={`Enter your ${selectedCoin?.symbol || "crypto"} address`}
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                disabled={isLoading}
              />
            </div>
            {addressError && (
              <p className="text-red-400 text-sm mt-1">{addressError}</p>
            )}
          </div>
        );
      
      case WithdrawalType.BANK_TRANSFER:
        return (
          <div className="mb-4">
            <h3 className="text-[#E8E8E8] mb-2">Bank Details</h3>
            <div className="rounded-lg p-4 border border-[#439A8633] text-[#E8E8E8]">
              <div className="text-sm opacity-75">
                Funds will be transferred to your registered bank account
              </div>
              <div className="text-xs mt-2 opacity-60">
                Bank of America account ending in 1234
              </div>
            </div>
          </div>
        );
      
      case WithdrawalType.PAYPAL:
        return (
          <div className="mb-4">
            <h3 className="text-[#E8E8E8] mb-2">PayPal Account</h3>
            <div className="rounded-lg p-4 border border-[#439A8633] text-[#E8E8E8]">
              <div className="text-sm opacity-75">
                Funds will be sent to your registered PayPal email
              </div>
              <div className="text-xs mt-2 opacity-60">
                user@example.com
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      {renderAddressField()}
      
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
          amount === "" || 
          amount <= 0 ||
          (withdrawalType === WithdrawalType.CRYPTO && !customAddress.trim())
        }
        className={`mt-4 mb-3 w-full p-2 flex items-center justify-center rounded-lg text-white ${
          (isSubmitting || isLoading) 
            ? "bg-[#3d665c] cursor-not-allowed" 
            : "bg-[#439A86] hover:bg-[#3d665c]"
        }`}
      >
        {isSubmitting ? "Processing..." : isLoading ? "Loading..." : "Withdraw"}
      </button>
    </div>
  );
};

export default WithdrawalAddress;