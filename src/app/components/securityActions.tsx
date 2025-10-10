'use client';

import { SecurityState } from '../data/data';
import { API_ENDPOINTS } from '../config/api';

type ModalHandler = (modalName: string) => void;
type NavigateFunction = (path: string) => void;

const SECURITY_STORAGE_KEY = 'securityPreferences';

// Enhanced SecurityState interface with KYC status
export interface EnhancedSecurityState extends SecurityState {
  kycStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_SUBMITTED';
  kycImage?: string;
}

export const initialSecurityState: EnhancedSecurityState = {
  loginPassword: { enabled: true, email: null },
  emailAuth: { enabled: true, email: 'user@example.com' },
  googleAuth: { enabled: false, email: null },
  fundPassword: { enabled: false },
  antiPhishing: { enabled: false },
  passKeys: { enabled: false },
  deviceManagement: {},
  accountActivity: {},
  kycStatus: 'NOT_SUBMITTED',
  kycImage: undefined,
};

export const loadSecurityPreferences = (): EnhancedSecurityState => {
  if (typeof window !== 'undefined') {
    try {
      const savedPrefs = localStorage.getItem(SECURITY_STORAGE_KEY);
      return savedPrefs ? JSON.parse(savedPrefs) : initialSecurityState;
    } catch (error) {
      console.warn('Failed to load security preferences from localStorage:', error);
      return initialSecurityState;
    }
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
  securityOptions: EnhancedSecurityState,
  setSecurityOptions: React.Dispatch<React.SetStateAction<EnhancedSecurityState>>,
  navigate?: NavigateFunction,
  openModal?: ModalHandler,
  userEmail?: string,
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
    
    // Safely update localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(newOptions));
      } catch (storageError) {
        console.warn('Could not save to localStorage:', storageError);
      }
    }

    if (option === 'googleAuth') {
      alert(`2FA ${newOptions.googleAuth.enabled ? 'enabled' : 'disabled'}! ${
        newOptions.googleAuth.enabled ? 'Please check your email at ' + (userEmail || '') : ''
      }`);
    }

  } catch (error) {
    console.error('Security action error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    alert(`Security action failed: ${errorMessage}`);
    
    throw error;
  }
};