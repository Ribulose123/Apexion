'use client';
import React, { useState, useEffect } from 'react';
import TwoFactorSection from './TwoFactorSection';
import AdvancedProtectionSection from './AdvancedProtectionSection';
import DeviceActivitiesSection from './DeviceActivitiesSection';
import { useRouter } from 'next/navigation';
import { handleSecurityAction, loadSecurityPreferences } from './securityActions';
import { SecurityState } from '../data/data';

const defaultSecurityState: SecurityState = {
  loginPassword: { enabled: false, email: null },
  emailAuth: { enabled: false, email: '' },
  googleAuth: { enabled: false, email: null },
  fundPassword: { enabled: false },
  antiPhishing: { enabled: false },
  passKeys: { enabled: false },
  deviceManagement: {},
  accountActivity: {},
  kycStatus: 'NOT_SUBMITTED', // Add KYC status
};

const SecurityPage: React.FC = () => {
  const router = useRouter();
  const [securityOptions, setSecurityOptions] = useState<SecurityState>(defaultSecurityState);

  useEffect(() => {
    const storedPreferences = loadSecurityPreferences();
    setSecurityOptions(storedPreferences);
  }, []);

  const handleActionClick = (option: string) => {
    if (option === 'kycVerification') {
      // Navigate to KYC verification page
      router.push('/security/kyc-verification');
    } else {
      handleSecurityAction(
        option,
        securityOptions,
        setSecurityOptions,
        (path: string) => router.push(path),
        undefined,
        'user@example.com'
      );
    }
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
          securityOptions={securityOptions}
          onActionClick={handleActionClick}
        />
      </div>
    </div>
  );
};

export default SecurityPage;