import { create } from 'zustand';

interface ForgotPasswordState {
  email: string;
  verificationCode: string[];
  isSubmitting: boolean;
  showCodeInput: boolean;
  apiError: string | null;
  setEmail: (email: string) => void;
  setVerificationCode: (code: string[]) => void;
  updateVerificationCodeDigit: (index: number, value: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setShowCodeInput: (show: boolean) => void;
  setApiError: (error: string | null) => void;
  reset: () => void;
  initializeWithExample: () => void;
}

const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
  email: '',
  verificationCode: ['', '', '', '', '', ''],
  isSubmitting: false,
  showCodeInput: false,
  apiError: null,
  
  setEmail: (email: string) => set({ email }),
  setVerificationCode: (code: string[]) => set({ verificationCode: code }),
  updateVerificationCodeDigit: (index: number, value: string) => 
    set((state: ForgotPasswordState) => {
      const newCode = [...state.verificationCode];
      newCode[index] = value.slice(0, 1);
      return { verificationCode: newCode };
    }),
  setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
  setShowCodeInput: (showCodeInput: boolean) => set({ showCodeInput }),
  setApiError: (apiError: string | null) => set({ apiError }),
  reset: () => set({ 
    email: '', 
    verificationCode: ['', '', '', '', '', ''], 
    isSubmitting: false, 
    showCodeInput: false, 
    apiError: null 
  }),
  initializeWithExample: () => set({ 
    email: 'john.doe@example.com' 
  }),
}));

export default useForgotPasswordStore;