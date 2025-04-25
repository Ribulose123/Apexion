// SecurityOption.tsx - Responsive component for each security option
import React from 'react';
import { BadgeCheck, OctagonAlert } from 'lucide-react';
import { SecurityOptionProps } from '../data/data';
import Link from 'next/link';


interface ExtendedSecurityOptionProps extends SecurityOptionProps {
  link?: string; 
}

const SecurityOption: React.FC<ExtendedSecurityOptionProps> = ({ 
  icon, 
  title, 
  description, 
  status, 
  email, 
  action, 
  onActionClick,
  link
}) => {
  // Button label mapping with 'more' included
  const actionLabel: Record<string, string> = {
    edit: 'Edit',
    settings: 'Settings',
    enable: 'Enable',
    disable: 'Disable',
    manage: 'Manage',
    more: 'More'  
  };
  
  
  const buttonLabel = email ? 'Edit' : (actionLabel[action] || 'More');
  
  // Button style classes based on action type
  const buttonClasses = `px-[16px] py-[10px] w-20 sm:w-20 text-xs rounded-xl ${
    action === 'edit' ? 'currency-display text-white' : 
    action === 'settings' ? 'bg-[#6967AE] text-white' :
    action === 'enable' ? 'bg-[#6967AE] text-white' :
    action === 'disable' ? 'currency-display text-white' :
    action === 'manage' ? 'bg-[#6967AE] text-white' :
    'bg-[#6967AE] text-white'
  }`;
  
  // Create the action button
  const ActionButton = () => (
    <button 
      onClick={onActionClick}
      className={buttonClasses}
    >
      {buttonLabel}
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-800">
      <div className="flex flex-col sm:flex-row items-start">
        <div className="flex-shrink-0 mr-3 mt-1 text-gray-400">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between sm:justify-start">
            <h3 className="text-white text-sm font-medium mr-2">{title}</h3>
            {/* Status indicator for mobile - show at top level */}
            <div className="sm:hidden">
              {!email && (
                <div className="flex items-center text-xs text-gray-400 -mt-5">
                  {status === 'enabled' ? (
                    <>
                      <BadgeCheck size={14} className="mr-1 text-green-500" />
                      <span>Enabled</span>
                    </>
                  ) : (
                    <>
                      <OctagonAlert size={14} className="mr-1 text-gray-400" />
                      <span>Disabled</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-400 text-xs mt-1 pr-2">{description}</p>
          
          {email && (
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-400">{email}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-3 sm:mt-0">
        {/* Status indicator for desktop - show on right side */}
        <div className="hidden sm:flex sm:items-center sm:mr-5">
          {!email && (
            <div className="flex items-center text-xs text-gray-400">
              {status === 'enabled' ? (
                <>
                  <BadgeCheck size={14} className="mr-1 text-green-500" />
                  <span>Enabled</span>
                </>
              ) : (
                <>
                  <OctagonAlert size={14} className="mr-1 text-gray-400" />
                  <span>Disabled</span>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Render button with link if provided */}
        {link ? (
          <Link href={link} className="block">
            <div className={buttonClasses}>
              <span className="flex items-center justify-center h-full">{buttonLabel}</span>
            </div>
          </Link>
        ) : (
          <ActionButton />
        )}
      </div>
    </div>
  );
};

export default SecurityOption;