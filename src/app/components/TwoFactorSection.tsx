// TwoFactorSection.tsx - Two-Factor Authentication section
import React from 'react';
import { Lock, Mail, MessageSquare, Shield } from 'lucide-react';
import SecurityOption from './SecurityOption';
import { SecurityState } from '../data/data';

interface TwoFactorSectionProps {
  securityOptions: SecurityState;
  onActionClick: (option: string) => void;
}

const TwoFactorSection: React.FC<TwoFactorSectionProps> = ({ securityOptions, onActionClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-medium mb-4 text-white">Two-Factor Authentication</h2>
      
      <SecurityOption
        icon={<Lock size={18} />}
        title="Login Password"
        description="The login password helps protect your account and improves security."
        status={securityOptions.loginPassword.enabled ? 'enabled' : 'disabled'}
        action="edit"
        onActionClick={() => onActionClick('loginPassword')}
        link="/settings" // Optional direct link
      />
      
      <SecurityOption
        icon={<Mail size={18} />}
        title="Email Authentication"
        description="Enabling email verification provides an additional layer of protection for 24 hours."
        status={securityOptions.emailAuth.enabled ? 'enabled' : 'disabled'}
        email={securityOptions.emailAuth.email || undefined}
        action="edit"
        onActionClick={() => onActionClick('emailAuth')}
        link="/security/email-auth" 
      />
      
      <SecurityOption
        icon={<MessageSquare size={18} />}
        title="SMS Authentication"
        description="Enabling SMS verification provides an additional layer of protection for 24 hours."
        status={securityOptions.smsAuth.enabled ? 'enabled' : 'disabled'}
        action="settings"
        onActionClick={() => onActionClick('smsAuth')}
        link="/settings/phoneauth" 
      />
      
      <SecurityOption
        icon={<Shield size={18} />}
        title="Google Two-Factor Authentication"
        description="Enabling Two-Factor Authentication provides enhanced protection for 24 hours."
        status={securityOptions.googleAuth.enabled ? 'enabled' : 'disabled'}
        action={securityOptions.googleAuth.enabled ? 'disable' : 'enable'}
        onActionClick={() => onActionClick('googleAuth')}
        link={securityOptions.googleAuth.enabled ? undefined : "/settings/goggleauth"} 
      />
    </div>
  );
};

export default TwoFactorSection;