// AdvancedProtectionSection.tsx - Advanced Protection section
import React from 'react';
import { Key, ShieldAlert, KeyRound } from 'lucide-react';
import SecurityOption from './SecurityOption';
import { SecurityState } from '../data/data';

interface AdvancedProtectionSectionProps {
  securityOptions: SecurityState;
  onActionClick: (option: string) => void;
}

const AdvancedProtectionSection: React.FC<AdvancedProtectionSectionProps> = ({ 
  securityOptions, 
  onActionClick 
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-medium mb-4">Advanced Protection</h2>
      
      <SecurityOption
        icon={<Key size={18} />}
        title="Fund Password"
        description="Use a fund password when a P2P trading, withdrawal, conversion, or connect security verification."
        status={securityOptions.fundPassword.enabled ? 'enabled' : 'disabled'}
        action="enable"
        onActionClick={() => onActionClick('fundPassword')}
      />
      
      <SecurityOption
        icon={<ShieldAlert size={18} />}
        title="Anti-Phishing Code"
        description="Protect yourself from impersonators who might impersonate official communications."
        status={securityOptions.antiPhishing.enabled ? 'enabled' : 'disabled'}
        action="enable"
        onActionClick={() => onActionClick('antiPhishing')}
      />
      
      <SecurityOption
        icon={<KeyRound size={18} />}
        title="Pass Keys"
        description="Your account and devices are safer with passkeys."
        status={securityOptions.passKeys.enabled ? 'enabled' : 'disabled'}
        action="enable"
        onActionClick={() => onActionClick('passKeys')}
      />
    </div>
  );
};

export default AdvancedProtectionSection;