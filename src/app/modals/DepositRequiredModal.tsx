// Create a new component for the modal
interface DepositRequiredModalProps {
  isOpen: boolean;
  onNavigateToDeposit: () => void;
}

const DepositRequiredModal: React.FC<DepositRequiredModalProps> = ({
  isOpen,
  onNavigateToDeposit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">200 Withdrawal</h2>
        <p>
          All Deposit & withdrawal to USD Withdrawal permissions comes after
          they click the withdrawal button Cooytrade edit traders not working
          for admin. Add other data to the create trader modal like followers
          and win-rate and risk score. View user Kyc for admin & update kyc
          status in settings. Reset button for wallet connect and the balance
          after wallet is connected should be a loading feature Also for copy
          trade when creating trader modal for users there’s no place to select
          the trader placing the trades.
        </p>
        <p className="mb-6">
          Please make a deposit to enable withdrawal functionality.
        </p>
        <div className="flex justify-end space-x-3">
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
