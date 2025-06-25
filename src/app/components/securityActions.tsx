
import { SecurityState } from '../data/data';


type ModalHandler = (modalName: string) => void;


type NavigateFunction = (path: string) => void;

export const handleSecurityAction = (
  option: string,
  securityOptions: SecurityState,
  setSecurityOptions: React.Dispatch<React.SetStateAction<SecurityState>>,
  navigate?: NavigateFunction,
  openModal?: ModalHandler
) => {
  // Handle different actions based on the option
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
      
    case 'smsAuth':
      // Handle SMS authentication - either open modal or navigate
      if (openModal) {
        openModal('smsAuthModal');
      } else if (navigate) {
        navigate('/settings');
      }
      break;
      
    case 'googleAuth':
      // For Google Auth - toggle state or navigate to setup page
      if (!securityOptions.googleAuth.enabled && navigate) {
        navigate('/settings');
      } else {
        // Toggle Google 2FA
        setSecurityOptions(prev => ({
          ...prev,
          googleAuth: {
            ...prev.googleAuth,
            enabled: !prev.googleAuth.enabled
          }
        }));
      }
      break;
      
    case 'fundPassword':
      // Handle fund password - open modal or update state
      if (openModal) {
        openModal('fundPasswordModal');
      } else {
        setSecurityOptions(prev => ({
          ...prev,
          fundPassword: {
            ...prev.fundPassword,
            enabled: true
          }
        }));
      }
      break;
      
    case 'antiPhishing':
      // Handle anti-phishing code - open modal or update state
      if (openModal) {
        openModal('antiPhishingModal');
      } else {
        setSecurityOptions(prev => ({
          ...prev,
          antiPhishing: {
            ...prev.antiPhishing,
            enabled: true
          }
        }));
      }
      break;
      
    case 'passKeys':
      // Handle pass keys - update state
      setSecurityOptions(prev => ({
        ...prev,
        passKeys: {
          ...prev.passKeys,
          enabled: true
        }
      }));
      break;
      
    case 'deviceManagement':
      // Navigate to device management
      if (navigate) {
        navigate('/security/device-management');
      }
      break;
      
    case 'accountActivity':
      // Navigate to account activity
      if (navigate) {
        navigate('/security/account-activity');
      }
      break;
      
    default:
      break;
  }
};