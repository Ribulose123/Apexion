'use client';
import React, { useState, useEffect } from 'react'; // Import useEffect
import TwoFactorSection from './TwoFactorSection';
import AdvancedProtectionSection from './AdvancedProtectionSection';
import DeviceActivitiesSection from './DeviceActivitiesSection';
import { useRouter } from 'next/navigation';
import { handleSecurityAction, loadSecurityPreferences } from './securityActions';
import { SecurityState } from '../data/data';

// Define a default/initial state that is guaranteed to be the same on server and client
const defaultSecurityState: SecurityState = {
  loginPassword: { enabled: false, email: null }, 
  emailAuth: { enabled: false, email: '' },
  googleAuth: { enabled: false, email: null },
  fundPassword: { enabled: false },
  antiPhishing: { enabled: false },
  passKeys: { enabled: false },
};

const SecurityPage: React.FC = () => {
  const router = useRouter();
  const [securityOptions, setSecurityOptions] = useState<SecurityState>(defaultSecurityState);

  useEffect(() => {
    const storedPreferences = loadSecurityPreferences();
    setSecurityOptions(storedPreferences);
  }, []); 

  const handleActionClick = (option: string) => {
    handleSecurityAction(
      option,
      securityOptions,
      setSecurityOptions,
      (path: string) => router.push(path),
      undefined,
      'user@example.com'
    );
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Security</h1>

        <TwoFactorSection
          securityOptions={securityOptions}
          onActionClick={handleActionClick}
        />

        <AdvancedProtectionSection
          securityOptions={securityOptions}
          onActionClick={handleActionClick}
        />

        <DeviceActivitiesSection
          onActionClick={handleActionClick}
        />
      </div>
    </div>
  );
};

export default SecurityPage;