import { create } from 'zustand';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api'; // Assuming this path is correct

interface ForgotPasswordState {
  email: string;
  verificationCode: string[]; 
  newPassword: string;
  isSubmitting: boolean;
  showCodeInput: boolean; 
  showNewPasswordInput: boolean;
  apiError: string | null;

  setEmail: (email: string) => void;
  updateVerificationCodeDigit: (index: number, value: string) => void;
  setNewPassword: (password: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setShowCodeInput: (show: boolean) => void;
  setShowNewPasswordInput: (show: boolean) => void; 
  setApiError: (error: string | null) => void;
  
  resetStore: () => void;
  requestPasswordReset: (email: string) => Promise<boolean>;
 
  resetPasswordWithOtp: (email: string, otp: string, newPassword: string) => Promise<boolean>;
}

export const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
  email: '',
  verificationCode: Array(6).fill(''),
  newPassword: '',
  isSubmitting: false,
  showCodeInput: false,
  showNewPasswordInput: false, 
  apiError: null,

  setEmail: (email) => set({ email }),
  
  updateVerificationCodeDigit: (index, value) => 
    set((state) => {
      const newCode = [...state.verificationCode];
      newCode[index] = value.slice(0, 1).replace(/[^0-9]/g, ''); 
      return { verificationCode: newCode };
    }),
    
  setNewPassword: (password) => set({ newPassword: password }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setShowCodeInput: (showCodeInput) => set({ showCodeInput }),
  setShowNewPasswordInput: (showNewPasswordInput) => set({ showNewPasswordInput }), // Implement setter
  setApiError: (apiError) => set({ apiError }),

  resetStore: () => set({ 
    email: '', 
    verificationCode: Array(6).fill(''), 
    newPassword: '', 
    isSubmitting: false, 
    showCodeInput: false, 
    showNewPasswordInput: false, // Reset this too
    apiError: null 
  }),

  requestPasswordReset: async (emailToSend: string): Promise<boolean> => {
    set({ isSubmitting: true, apiError: null });
    try {
      const payload = { 
        email: emailToSend
      };

      const response = await fetch(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          Array.isArray(errorData.message) ? errorData.message[0] : errorData.message || 
          errorData.error || 
          `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();

      set({ 
        email: emailToSend, 
        showCodeInput: true,
        verificationCode: Array(6).fill(''), 
        showNewPasswordInput: false, 
      });
      toast.success(result.message || "Verification code sent to your email!");
      return true;
    } catch (error: unknown) {
      let errorMessage = "Failed to send verification code. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ apiError: errorMessage });
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },

  resetPasswordWithOtp: async (email: string, otp: string, newPassword: string): Promise<boolean> => {
    set({ isSubmitting: true, apiError: null });
    try {
      const payload = { 
        email: email, 
        otp: otp, 
        newPassword: newPassword 
      };

      const response = await fetch(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          Array.isArray(errorData.message) ? errorData.message[0] : errorData.message || 
          errorData.error || 
          `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();

      toast.success(result.message || "Password reset successfully!");
      return true;
    } catch (error: unknown) {
      let errorMessage = "Password reset failed. Please check the code and try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ apiError: errorMessage });
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },
}));

export default useForgotPasswordStore;