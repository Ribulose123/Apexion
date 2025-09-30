import React from "react";
import { WithdrawalType } from "@/app/data/data";

interface WithdrawalTypeSelectorProps {
  selectedType: WithdrawalType;
  onTypeChange: (type: WithdrawalType) => void;
}

const WithdrawalTypeSelector: React.FC<WithdrawalTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const withdrawalTypes = [
    { value: WithdrawalType.CRYPTO, label: "Crypto" },
    { value: WithdrawalType.BANK_TRANSFER, label: "Bank Transfer" },
    { value: WithdrawalType.PAYPAL, label: "PayPal" },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-[#E8E8E8] mb-3">Withdrawal Method</h3>
      <div className="grid grid-cols-3 gap-3">
        {withdrawalTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            className={`p-3 rounded-lg border text-center transition-colors ${
              selectedType === type.value
                ? "bg-[#439A86] border-[#439A86] text-white"
                : "bg-transparent border-[#439A8633] text-[#E8E8E8] hover:bg-[#439A8622]"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WithdrawalTypeSelector;