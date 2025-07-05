// src/app/components/securityActions.ts
'use client';

import { SecurityState } from '../data/data';
import { API_ENDPOINTS } from '../config/api';

type ModalHandler = (modalName: string) => void;
type NavigateFunction = (path: string) => void;

const SECURITY_STORAGE_KEY = 'securityPreferences';

export const initialSecurityState: SecurityState = {
  loginPassword: { enabled: true, email: null },
  emailAuth: { enabled: true, email: 'user@example.com' },
  googleAuth: { enabled: false, email: null },
  fundPassword: { enabled: false },
  antiPhishing: { enabled: false },
  passKeys: { enabled: false },
};

export const loadSecurityPreferences = (): SecurityState => {
  if (typeof window !== 'undefined') {
    const savedPrefs = localStorage.getItem(SECURITY_STORAGE_KEY);
    return savedPrefs ? JSON.parse(savedPrefs) : initialSecurityState;
  }
  return initialSecurityState;
};

export const clearSecurityPreferences = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SECURITY_STORAGE_KEY);
  }
};

export const handleSecurityAction = async (
  option: string,
  securityOptions: SecurityState,
  setSecurityOptions: React.Dispatch<React.SetStateAction<SecurityState>>,
  navigate?: NavigateFunction,
  openModal?: ModalHandler,
  userEmail?: string
) => {
  try {
    const newOptions = { ...securityOptions };

    switch (option) {
      case 'loginPassword':
        if (openModal) openModal('/security/newpassword');
        else if (navigate) navigate('/settings');
        break;

      case 'emailAuth':
        if (openModal) openModal('emailAuthModal');
        else if (navigate) navigate('/settings');
        break;

     

      case 'googleAuth':
        const token = localStorage.getItem('authToken');
        if (!token?.trim()) throw new Error('Please login first');

        const isEnabling = !newOptions.googleAuth.enabled;
        const response = await fetch(API_ENDPOINTS.USER.TWO_FACTOR, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ twoFactorEnabled: isEnabling })
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || `Failed to ${isEnabling ? 'enable' : 'disable'} 2FA`);
        }

        newOptions.googleAuth.enabled = isEnabling;
        break;

      case 'fundPassword':
        newOptions.fundPassword.enabled = !newOptions.fundPassword.enabled;
        break;

      case 'antiPhishing':
        newOptions.antiPhishing.enabled = !newOptions.antiPhishing.enabled;
        break;

      case 'passKeys':
        newOptions.passKeys.enabled = !newOptions.passKeys.enabled;
        break;

      case 'deviceManagement':
        if (navigate) navigate('/security/device-management');
        break;

      case 'accountActivity':
        if (navigate) navigate('/security/account-activity');
        break;

      default:
        console.warn('Unknown security option:', option);
        return;
    }

    setSecurityOptions(newOptions);
    localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(newOptions));

    if (option === 'googleAuth') {
      alert(`2FA ${newOptions.googleAuth.enabled ? 'enabled' : 'disabled'}! ${
        newOptions.googleAuth.enabled ? 'Please check your email at ' + (userEmail || '') : ''
      }`);
    }

  } catch (error) {
    console.error('Security action error:', error);
    alert(error instanceof Error ? error.message : 'An error occurred');
  }
};