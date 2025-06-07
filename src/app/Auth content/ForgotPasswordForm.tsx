"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import useForgotPasswordStore from './useForgotPasswordStore';

interface FormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  
  // Destructure only what we need from the store
  const {
    email,
    verificationCode,
    isSubmitting,
    showCodeInput,
    apiError,
    setEmail,
    updateVerificationCodeDigit,
    setIsSubmitting,
    setShowCodeInput,
    setApiError,
    reset,
    initializeWithExample
  } = useForgotPasswordStore();

  useEffect(() => {
    initializeWithExample();
    setValue('email', 'john.doe@example.com');
  }, [initializeWithExample, setValue]);

  const API_ENDPOINT = "https://new-bidvest-backend-production.up.railway.app/api/auth/user/forgot-password";

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    updateVerificationCodeDigit(index, value);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      const payload = showCodeInput
        ? { 
            email: email, 
            code: verificationCode.join(""),
            action: "verify" 
          }
        : { 
            email: data.email,
            action: "request" 
          };

      const response = await fetch(API_ENDPOINT, {
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
          errorData.message || 
          errorData.error || 
          `Request failed with status ${response.status}`
        );
      }

      

      if (!showCodeInput) {
        setEmail(data.email);
        setShowCodeInput(true);
        toast.success("Verification code sent to your email!");
      } else {
        toast.success("Code verified successfully!");
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        reset();
      }
    } catch (error: unknown) {
      console.error("Full Error Details:", error);
      
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setApiError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-lg sm:shadow-md w-full max-w-md p-6 md:p-8">
        <h1 className="text-2xl text-black font-semibold text-center mb-8">
          {showCodeInput ? "Verify Your Code" : "Forgot your password?"}
        </h1>

        <p className="text-[#797A80] text-[14px] font-medium text-center mb-2">
          {showCodeInput 
            ? `Enter the 6-digit code sent to ${email}`
            : "Reset your password and get back to trading in no time!"}
        </p>

        {apiError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {!showCodeInput ? (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-[#E2E6F9]"
                } rounded focus:outline-none placeholder:text-[#797A80] placeholder:text-[15px]`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          ) : (
            <div className="mb-6">
              <div className="flex space-x-2 mb-2 justify-center">
                {verificationCode.map((digit: string, index: number) => (
                  <input
                    type="text"
                    key={`code-${index}`}
                    id={`code-${index}`}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="sm:w-[60px] sm:h-[60px] w-13 h-13 text-center border border-gray-300 rounded font-bold outline-0 text-black bg-[#f4fcfa]"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength={1}
                    disabled={isSubmitting}
                  />
                ))}
              </div>
              <p className="text-xs text-center text-gray-500 mt-2">
                Didn&apos;t receive code? <button 
                  type="button" 
                  className="text-teal-600 hover:underline"
                  onClick={() => setShowCodeInput(false)}
                >
                  Resend
                </button>
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors mb-4 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {showCodeInput ? "Verifying..." : "Sending..."}
              </span>
            ) : (
              showCodeInput ? "Verify Code" : "Send Verification Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;