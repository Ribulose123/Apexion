import React from 'react';

interface UncopyConfirmModalProps {
  traderName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const UncopyConfirmModal: React.FC<UncopyConfirmModalProps> = ({ 
  traderName, 
  onClose, 
  onConfirm 
}) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#141E32] p-6 rounded-lg shadow-2xl max-w-sm w-full border border-[#1e2a4a]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-xl font-bold text-white mb-4">Confirm Uncopy</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to **stop copying** the trader **{traderName}**? 
          This will close all open trades copied from this trader and stop new trades from being placed.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
          >
            Confirm Uncopy
          </button>
        </div>
      </div>
    </div>
  );
};

export default UncopyConfirmModal;