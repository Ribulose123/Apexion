import React  from 'react';
import { X,  Phone, Mail, IdCard} from 'lucide-react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}


interface RequiredVerificationModalProps extends BaseModalProps {
  onContinue: () => void;
}

const RequiredVerificationModal: React.FC<RequiredVerificationModalProps> = ({ 
  isOpen, 
  onClose, 
  onContinue 
}) => {
  if (!isOpen) return null;

  const verificationItems = [
    {
      icon: <IdCard size={20} />,
      label: 'Verify identity',
      sublabel: 'View identity verification perks',
      status: 'Verified',
      completed: true
    },
    {
      icon: <Mail size={20} />,
      label: 'Email verification',
      sublabel: '',
      status: 'Verified',
      completed: true
    },
    {
      icon: <Phone size={20} />,
      label: 'Bind mobile number',
      sublabel: '',
      status: 'Configure',
      completed: false
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 w-80 max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-sm font-medium">Required Verification Popup</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-white text-lg font-semibold mb-2">Verification required</h3>
          <p className="text-gray-300 text-sm">
          To access all Bidvest serivces, you must be completely verified:
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {verificationItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-[#10131F] p-2 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-gray-400">
                  {item.icon}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{item.label}</div>
                  {item.sublabel && (
                    <div className="text-gray-400 text-xs">{item.sublabel}</div>
                  )}
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                item.completed 
                  ? 'text-teal-400 bg-teal-400/10' 
                  : 'text-orange-400 bg-orange-400/10'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            console.log('Continue verification clicked');
            onContinue();
          }}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-md transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RequiredVerificationModal
