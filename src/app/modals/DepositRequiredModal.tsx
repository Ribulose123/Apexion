import { CoinDepost } from "../data/data";

interface DepositRequiredModalProps {
  isOpen: boolean;
  onNavigateToDeposit: () => void;
  amount?: number;
  withdrawalPercentage?: number;
  selectedCoin?: CoinDepost | null;
}
const DepositRequiredModal: React.FC<DepositRequiredModalProps> = ({
 isOpen,
  onNavigateToDeposit,
  amount,
  withdrawalPercentage = 0,
  selectedCoin,
}) => {
  if (!isOpen) return null;

   const calculatedAmount = amount ? amount * (withdrawalPercentage / 100) : 0;

  return (
     <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Withdrawal Required</h2>
        
        <div className="space-y-3 mb-4">
          <p className="text-sm text-gray-300">
            Your withdrawal percentage is set to <span className="text-white font-medium">{withdrawalPercentage}%</span>.
          </p>
          
          {amount && (
            <>
              <p className="text-sm text-gray-300">
                Requested withdrawal amount: <span className="text-white font-medium">{amount} {selectedCoin?.symbol || 'USD'}</span>
              </p>
              <p className="text-sm text-gray-300">
                Final amount to deposit: <span className="text-white font-medium">{calculatedAmount} {selectedCoin?.symbol || 'USD'}</span>
              </p>
            </>
          )}
          
          <p className="text-sm text-gray-300 mt-4">
            All Deposit & withdrawal to USD Withdrawal permissions comes after
            they click the withdrawal button. Please make a deposit to enable 
            withdrawal functionality.
          </p>
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
    </div>  );
};

export default DepositRequiredModal;
