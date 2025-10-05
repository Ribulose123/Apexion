import React from 'react';
import dynamic from 'next/dynamic';
import SecurityOption from './SecurityOption';
import { SecurityState } from '../data/data';

// Dynamically import only the icons you actually use
const UserCheck = dynamic(() => import('lucide-react').then(mod => mod.UserCheck), { ssr: false });
// Remove the unused Camera import

interface KycSectionProps {
  securityOptions: SecurityState;
  onActionClick: (option: string) => void;
}

const KycSection: React.FC<KycSectionProps> = ({ 
  securityOptions, 
  onActionClick 
}) => {
  // Safely access kycStatus with fallback
  const kycStatus = securityOptions.kycStatus || 'NOT_SUBMITTED';
  
  const kycStatusDisplay = kycStatus === 'APPROVED' ? 'enabled' : 
                          kycStatus === 'PENDING' ? 'pending' : 'disabled';

  const getKycDescription = () => {
    switch (kycStatus) {
      case 'APPROVED':
        return 'Your identity has been successfully verified.';
      case 'PENDING':
        return 'Your verification is under review. This may take 1-2 business days.';
      case 'REJECTED':
        return 'Your verification was rejected. Please upload new documents.';
      default:
        return 'Verify your identity to access all platform features and higher limits.';
    }
  };

  const getKycAction = () => {
    switch (kycStatus) {
      case 'APPROVED':
        return 'view';
      case 'PENDING':
        return 'pending';
      case 'REJECTED':
        return 'retry';
      default:
        return 'verify';
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-[15px] font-medium mb-4 text-white">Identity Verification</h2>
      
      <SecurityOption
        icon={<UserCheck size={18} />}
        title="KYC Verification"
        description={getKycDescription()}
        status={kycStatusDisplay}
        action={getKycAction()}
        onActionClick={() => onActionClick('kycVerification')}
        link="/security/kyc"
      />
    </div>
  );
};

export default KycSection;