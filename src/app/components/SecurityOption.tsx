'use client';
import Link from 'next/link';
import { BadgeCheck, OctagonAlert } from 'lucide-react';
import { SecurityOptionProps } from '../data/data';

const SecurityOption: React.FC<SecurityOptionProps> = ({
  icon,
  title,
  description,
  status, // Status is now optional based on SecurityOptionProps
  email,
  action = 'more',
  onActionClick,
  link
}) => {
  const actionLabels = {
    edit: 'Edit',
    settings: 'Settings',
    enable: 'Enable',
    disable: 'Disable',
    manage: 'Manage',
    more: 'More'
  };

  const buttonLabel = email ? 'Edit' : (actionLabels[action as keyof typeof actionLabels] || 'More');

  const buttonClasses = `px-4 py-2 w-20 sm:w-20 text-xs rounded-xl ${
    action === 'edit' ? 'currency-display text-white' :
    action === 'disable' ? 'currency-display text-white' :
    'bg-[#6967AE] text-white'
  }`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-800">
      <div className="flex flex-col sm:flex-row items-start w-full">
        <div className="flex-shrink-0 mr-3 mt-1 text-gray-400">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between sm:justify-start">
            <h3 className="text-white text-sm font-medium mr-2">{title}</h3>
            <div className="sm:hidden">
              {!email && (
                <div className="flex items-center text-xs text-gray-400 -mt-5">
                  {/* Conditionally render status only if it's provided */}
                  {status === 'enabled' ? (
                    <>
                      <BadgeCheck size={14} className="mr-1 text-green-500" />
                      <span>Enabled</span>
                    </>
                  ) : status === 'disabled' ? ( // Check explicitly for 'disabled'
                    <>
                      <OctagonAlert size={14} className="mr-1 text-gray-400" />
                      <span>Disabled</span>
                    </>
                  ) : null} {/* Render nothing if status is undefined */}
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
        <div className="hidden sm:flex sm:items-center sm:mr-5">
          {!email && (
            <div className="flex items-center text-xs text-gray-400">
              {/* Conditionally render status only if it's provided */}
              {status === 'enabled' ? (
                <>
                  <BadgeCheck size={14} className="mr-1 text-green-500" />
                  <span>Enabled</span>
                </>
              ) : status === 'disabled' ? ( // Check explicitly for 'disabled'
                <>
                  <OctagonAlert size={14} className="mr-1 text-gray-400" />
                  <span>Disabled</span>
                </>
              ) : null} {/* Render nothing if status is undefined */}
            </div>
          )}
        </div>

        {link ? (
          <Link href={link} className={buttonClasses}>
            {buttonLabel}
          </Link>
        ) : (
          <button
            onClick={() => onActionClick?.(action || 'more')}
            className={buttonClasses}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default SecurityOption;