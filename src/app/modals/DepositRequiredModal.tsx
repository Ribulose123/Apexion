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
        <h2 className="text-xl font-semibold mb-4">Deposit Required</h2>
        <p className="mb-6">Please make a deposit to enable withdrawal functionality.</p>
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

export default DepositRequiredModal