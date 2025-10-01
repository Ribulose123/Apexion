import React from 'react';
import { Check, X } from 'lucide-react';

// Define the coin interface to match your data structure
interface CoinDepost {
    id: string;
    name: string;
    symbol: string;
    networks: string[]; 
}

interface WithdrawalStatusModalProps {
    status: 'approved' | 'pending' | 'failed'; 
    onClose: () => void;
    amount?: number; 
    selectedCoin?: CoinDepost
}

const WithdrawalStatusModal: React.FC<WithdrawalStatusModalProps> = ({ 
    status, 
    onClose,
    amount,
    selectedCoin
}) => {
    const isApproved = status === 'approved';
    const isFailed = status === 'failed';

    // Defines the steps for the status tracker
    const statusItems = [
        { label: 'Submitted', completed: true },
        { label: 'Processing', completed: status !== 'pending' },
        { label: status === 'failed' ? 'Failed' : 'Completed', completed: status !== 'pending' }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 w-80 max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-sm font-medium">
                        {isFailed ? 'Withdrawal Failed' : 
                         isApproved ? 'Withdrawal Approved' : 'Withdrawal Submission'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${
                        isFailed ? 'bg-red-500' : 
                        isApproved ? 'bg-teal-500' : 'bg-orange-400'
                    } rounded-full flex items-center justify-center mx-auto mb-4`}>
                        {isFailed ? <X size={32} /> : <Check size={32} />}
                    </div>
                    
                    <h3 className="text-white text-lg font-semibold mb-2">
                        {isFailed ? 'Withdrawal Failed' : 
                         isApproved ? 'Withdrawal Approved' : 'Withdrawal Submitted'}
                    </h3>
                    
                    <div className={`w-8 h-1 ${
                        isFailed ? 'bg-red-500' : 
                        isApproved ? 'bg-teal-500' : 'bg-orange-400'
                    } mx-auto mb-4`}></div>
                    
                    <p className="text-gray-300 text-sm">
                        {isFailed 
                            ? 'Your withdrawal request could not be processed.'
                            : isApproved 
                                ? `${amount} ${selectedCoin?.symbol || 'coins'} successfully withdrawn.` // Safe access with optional chaining
                                : 'Your withdrawal request has been submitted.'}
                    </p>
                </div>

                {/* Status tracker timeline */}
                <div className="relative flex items-center justify-between mb-6">
                    {statusItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center z-10">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center mb-1 ${
                                item.completed ? 'bg-teal-500' : 'bg-gray-600'
                            }`}>
                                {item.completed && <Check size={10} className="text-white" />}
                            </div>
                            <span className="text-xs text-gray-400">{item.label}</span>
                        </div>
                    ))}
                    <div className="absolute top-2 left-0 right-0 flex items-center justify-between px-2">
                        <div className="flex-1 border-t-2 border-dashed border-gray-600 mx-2"></div>
                        <div className="flex-1 border-t-2 border-dashed border-gray-600 mx-2"></div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className={`w-full ${
                        isFailed ? 'bg-red-500 hover:bg-red-600' :
                        isApproved ? 'bg-teal-500 hover:bg-teal-600' : 'bg-orange-400 hover:bg-orange-500'
                    } text-white font-medium py-3 rounded-md transition-colors`}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export { WithdrawalStatusModal };
export default WithdrawalStatusModal;