import React from 'react';
import { Check, X } from 'lucide-react';

interface DepositStatusModalProps {
  status: 'approved' | 'pending';
  onClose: () => void;
}

const DepositStatusModal: React.FC<DepositStatusModalProps> = ({ status, onClose }) => {
  const isApproved = status === 'approved';
  
  const statusItems = [
    { label: 'Submitted', completed: true },
    { label: 'Awaiting Approval', completed: isApproved ? true : false },
    { label: 'Completed', completed: isApproved ? true : false }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 w-80 max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-sm font-medium">
            {isApproved ? 'Deposit Approval Popup' : 'Deposit Submission Popup'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className={`w-16 h-16 ${isApproved ? 'bg-teal-500' : 'bg-orange-400'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Check size={32} className="text-white" />
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">
            {isApproved ? 'Deposit Approved' : 'Deposit Submitted'}
          </h3>
          <div className={`w-8 h-1 ${isApproved ? 'bg-teal-500' : 'bg-orange-400'} mx-auto mb-4`}></div>
          <p className="text-gray-300 text-sm">
            {isApproved 
              ? 'Your deposit request has been approved. Your payment has been successfully deposited to your account.'
              : 'Your deposit request has been submitted successfully to admin. Currently being processed for approval.'}
          </p>
          {!isApproved && (
            <p className="text-gray-300 text-sm mt-2">
              We will notify you once your payment is affected to your wallet balance successfully.
            </p>
          )}
        </div>

        {!isApproved && (
          <div className="bg-slate-700 rounded-lg p-3 mb-4">
            <p className="text-gray-400 text-xs mb-2">
              For fast tracking of deposit please screenshot below transaction hash to any contact Agent and forward to complete this payment.
            </p>
          </div>
        )}

        <div className="relative flex items-center justify-between mb-6">
          {statusItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center z-10">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center mb-1 ${
                item.completed ? 'bg-teal-500' : 'bg-gray-600'
              }`}>
                {item.completed && <Check size={10} className="text-white" />}
              </div>
              <span className="text-xs text-gray-400 text-center">{item.label}</span>
            </div>
          ))}
          {/* Dashed connecting lines */}
          <div className="absolute top-2 left-0 right-0 flex items-center justify-between px-2">
            <div className="flex-1 border-t-2 border-dashed border-gray-600 mx-2"></div>
            <div className="flex-1 border-t-2 border-dashed border-gray-600 mx-2"></div>
          </div>
        </div>

        <button
          onClick={onClose}
          className={`w-full ${isApproved ? 'bg-teal-500 hover:bg-teal-600' : 'bg-orange-400 hover:bg-orange-500'} text-white font-medium py-3 rounded-md transition-colors`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DepositStatusModal;
/* 
// For approved state
<DepositStatusModal status="approved" onClose={() => setIsOpen(false)} />

// For pending state
<DepositStatusModal status="pending" onClose={() => setIsOpen(false)} /> */