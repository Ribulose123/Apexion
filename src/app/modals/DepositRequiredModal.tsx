import { CoinDepost } from "../data/data";

interface DepositRequiredModalProps {
  isOpen: boolean;
  onNavigateToDeposit: () => void;
  amount?: number;
  withdrawalPercentage?: number;
  fullName?: string;
  selectedCoin?: CoinDepost | null;
}

const DepositRequiredModal: React.FC<DepositRequiredModalProps> = ({
  isOpen,
  onNavigateToDeposit,
  amount,
  withdrawalPercentage = 0,
  selectedCoin,
  fullName
}) => {
  if (!isOpen) return null;

  // Add debugging
  console.log("DepositRequiredModal props:", {
    isOpen,
    amount,
    withdrawalPercentage,
    fullName,
    selectedCoin
  });

  const calculatedAmount = amount ? amount * (withdrawalPercentage / 100) : 0;

  console.log("Calculated amount:", calculatedAmount);

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Withdrawal Required</h2>
        <div className="space-y-3 mb-4">
         
          
          <p className="text-sm text-gray-300">
            Hello {fullName || "User"}, We wish to inform you that withdrawal requests are subject to a withdrawal Processing fee of {withdrawalPercentage}%. The withdrawal fee is calculated based on your account balance and should be paid directly to our company&apos;s account. 
          </p>
          
          {amount && amount > 0 ? (
            <p className="text-sm text-gray-300">
              Your withdrawal amount is <span className="text-white font-medium">{amount} {selectedCoin?.symbol || 'USD'}</span>, it implies you are paying <span className="text-white font-medium">{calculatedAmount.toFixed(2)} {selectedCoin?.symbol || 'USD'}</span> for the withdrawal fee.
            </p>
          ) : (
            <p className="text-sm text-red-300">
              Amount information is not available. Please try again.
            </p>
          )}
          
          <p className="text-sm text-gray-300 mt-4">
            This fee is used for the preparation and processing of the necessary transactions associated with your withdrawal request and other attached expenses.
          </p>
          <p className="text-sm text-gray-300 mt-4">Please note that you can&apos;t withdrawal profit until you pay for the withdrawal fee.</p>
          <p className="text-sm text-gray-300 mt-4">For more information contact via our official email address.</p>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onNavigateToDeposit}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositRequiredModal;