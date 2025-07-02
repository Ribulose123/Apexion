'use client'

import { SecurityState } from '../data/data';
import { API_ENDPOINTS } from '../config/api';

type ModalHandler = (modalName: string) => void;
type NavigateFunction = (path: string) => void;

export const handleSecurityAction = async (
  option: string,
  securityOptions: SecurityState,
  setSecurityOptions: React.Dispatch<React.SetStateAction<SecurityState>>,
  navigate?: NavigateFunction,
  openModal?: ModalHandler,
  userEmail?: string // Added parameter for user's email
) => {
  try {
    switch (option) {
      case 'loginPassword':
        if (openModal) {
          openModal('/security/newpassword');
        } else if (navigate) {
          navigate('/settings');
        }
        break;

      case 'emailAuth':
        if (openModal) {
          openModal('emailAuthModal');
        } else if (navigate) {
          navigate('/settings');
        }
        break;

      case 'googleAuth':
        if (!securityOptions.googleAuth.enabled) {
          const token = localStorage.getItem('authToken');
          if (!token || token.trim() === '') {
            throw new Error('Please login first');
          }

          const response = await fetch(API_ENDPOINTS.USER.TWO_FACTOR, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ twoFactorEnabled: true })
          });

          const result = await response.json();
          
          if (!response.ok) {
            throw new Error(result.message || 'Failed to enable 2FA');
          }

          // Update UI state
          setSecurityOptions(prev => ({
            ...prev,
            googleAuth: { ...prev.googleAuth, enabled: true }
          }));

          // Redirect to email verification
          if (response.ok) {
           alert('2FA enabled! Please check your email at ' + userEmail);
          } 
            
        }
        break;

      case 'fundPassword':
        if (openModal) {
          openModal('fundPasswordModal');
        } else {
          setSecurityOptions(prev => ({
            ...prev,
            fundPassword: { ...prev.fundPassword, enabled: true }
          }));
        }
        break;

      case 'antiPhishing':
        if (openModal) {
          openModal('antiPhishingModal');
        } else {
          setSecurityOptions(prev => ({
            ...prev,
            antiPhishing: { ...prev.antiPhishing, enabled: true }
          }));
        }
        break;

      case 'deviceManagement':
        if (navigate) navigate('/security/device-management');
        break;

      case 'accountActivity':
        if (navigate) navigate('/security/account-activity');
        break;

      default:
        console.warn('Unknown security option:', option);
    }
  } catch (error) {
    console.error('Security action error:', error);
    alert(error instanceof Error ? error.message : 'An error occurred');
  }
};