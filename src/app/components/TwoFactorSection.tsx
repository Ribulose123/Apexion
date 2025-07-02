// TwoFactorSection.tsx - Two-Factor Authentication section
import React from 'react';
import { Lock, Mail, Shield } from 'lucide-react';
import SecurityOption from './SecurityOption';
import { SecurityState } from '../data/data';

interface TwoFactorSectionProps {
  securityOptions: SecurityState;
  onActionClick: (option: string) => void;
}

const TwoFactorSection: React.FC<TwoFactorSectionProps> = ({ securityOptions, onActionClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-[15px] font-medium mb-4 text-white">Protection</h2>
      
      <SecurityOption
        icon={<Lock size={18} />}
        title="Login Password"
        description="The login password helps protect your account and improves security."
        status={securityOptions.loginPassword.enabled ? 'enabled' : 'disabled'}
        action="edit"
        onActionClick={() => onActionClick('loginPassword')}
        link="/security/newpassword" 
      />
      
      <SecurityOption
        icon={<Mail size={18} />}
        title="Email Authentication"
        description="Enabling email verification provides an additional layer of protection for 24 hours."
        status={securityOptions.emailAuth.enabled ? 'enabled' : 'disabled'}
        email={securityOptions.emailAuth.email || undefined}
        action="edit"
        onActionClick={() => onActionClick('emailAuth')}
        link="/settings/emailauth" 
      />
      
      
      
      <SecurityOption
        icon={<Shield size={18} />}
        title="Two-Factor Authentication"
        description="Enabling Two-Factor Authentication provides enhanced protection for 24 hours."
        status={securityOptions.googleAuth.enabled ? 'enabled' : 'disabled'}
        action={securityOptions.googleAuth.enabled ? 'disable' : 'enable'}
        onActionClick={() => onActionClick('googleAuth')}
        link={undefined} 
      />
    </div>
  );
};

export default TwoFactorSection;