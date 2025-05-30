'use client';
import React, { useState } from 'react';
import TwoFactorSection from './TwoFactorSection';
import AdvancedProtectionSection from './AdvancedProtectionSection';
import DeviceActivitiesSection from './DeviceActivitiesSection';
import { useRouter } from 'next/navigation';
import { handleSecurityAction } from './securityActions';
import { SecurityState } from '../data/data';

// Define the initial security state
const initialSecurityState: SecurityState = {
  loginPassword: { enabled: true, email: null },
  emailAuth: { enabled: true, email: 'user@example.com' },
  smsAuth: { enabled: false, phone: null },
  googleAuth: { enabled: false, email: null },
  fundPassword: { enabled: false },
  antiPhishing: { enabled: false },
  passKeys: { enabled: false },
  
};

const SecurityPage: React.FC = () => {
  const router = useRouter();
  const [securityOptions, setSecurityOptions] = useState<SecurityState>(initialSecurityState);
  
  // Add proper type annotation for the option parameter
  const handleActionClick = (option: string) => {
    handleSecurityAction(
      option, 
      securityOptions, 
      setSecurityOptions, 
      (path: string) => router.push(path), // Navigation function with type
    );
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Security</h1>
        
        {/* Two-Factor Authentication Section */}
        <TwoFactorSection 
          securityOptions={securityOptions} 
          onActionClick={handleActionClick} 
        />
        
        {/* Advanced Protection Section */}
        <AdvancedProtectionSection 
          securityOptions={securityOptions} 
          onActionClick={handleActionClick} 
        />
        
        {/* Device & Activities Section */}
        <DeviceActivitiesSection 
          onActionClick={handleActionClick} 
        />
      </div>
    </div>
  );
};

export default SecurityPage;