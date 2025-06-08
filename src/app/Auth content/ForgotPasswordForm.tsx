"use client";

import React from "react"; // Import useState
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForgotPasswordStore } from './useForgotPasswordStore'; 

interface FormData {
  email: string;
  newPassword?: string; 
  confirmNewPassword?: string; 
}

const ForgotPasswordForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: formReset, 
    watch, 
    setError, 
    clearErrors,
    
  } = useForm<FormData>();

  const newPassword = watch("newPassword"); 

  const {
    email, 
    verificationCode,
    isSubmitting,
    showCodeInput,
    showNewPasswordInput, 
    apiError,
    
    updateVerificationCodeDigit,
    setApiError, 
    resetStore, 
    setShowCodeInput, 
    setShowNewPasswordInput, 
    
    requestPasswordReset,
    resetPasswordWithOtp, 
  } = useForgotPasswordStore();

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    updateVerificationCodeDigit(index, value);

    // Auto-focus logic
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
    
    // Check if all digits are entered to trigger password input display
    const currentCode = [...verificationCode];
    currentCode[index] = value.slice(0, 1).replace(/[^0-9]/g, ''); 
    
    const fullCodeEntered = currentCode.join("");
    if (fullCodeEntered.length === 6) {
      // If all digits are entered, transition to password input view
      setShowNewPasswordInput(true);
      setShowCodeInput(false); // Hide OTP input
      // Optionally, clear the OTP digits from the inputs, but keep in store for submission
      // setValue("otp", ""); // Not needed with direct input fields
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && verificationCode[index] === "" && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  // This will now handle two separate submission phases
  const onSubmit = async (data: FormData) => {
    setApiError(null); 
    clearErrors(); 

    if (!showCodeInput && !showNewPasswordInput) {
      // Phase 1: Request OTP (initial form submission)
      await requestPasswordReset(data.email);
    } else if (showCodeInput && !showNewPasswordInput) {
      // Phase 2: OTP input completed, but actual API call hasn't happened yet.
      // The UI transitions here based on handleInputChange filling all digits.
      // This path in onSubmit should ideally not be hit if handleInputChange handles the transition.
      // However, if a user clicks submit button with OTP, this will be the fallback.
      const fullOtp = verificationCode.join(""); 
      if (fullOtp.length !== 6) {
        setApiError("Please enter the full 6-digit verification code.");
        toast.error("Please enter the full 6-digit verification code.");
        return;
      }
      // If they click submit with full OTP, we can also transition here
      setShowNewPasswordInput(true);
      setShowCodeInput(false);
    } else if (showNewPasswordInput) {
      // Phase 3: Submit New Password and OTP to backend
      const fullOtp = verificationCode.join(""); // Still need the OTP for the final submission

      if (!data.newPassword) {
        setError("newPassword", { type: "required", message: "New password is required." });
        return;
      }
      if (!data.confirmNewPassword) {
        setError("confirmNewPassword", { type: "required", message: "Confirm password is required." });
        return;
      }
      if (data.newPassword !== data.confirmNewPassword) {
        setError("confirmNewPassword", { type: "manual", message: "Passwords do not match." });
        return;
      }
      if (data.newPassword.length < 8) { 
        setError("newPassword", { type: "minLength", message: "Password must be at least 8 characters long." });
        return;
      }

      // Make the API call to reset password with OTP and new password
      const didReset = await resetPasswordWithOtp(email, fullOtp, data.newPassword); 
      if (didReset) {
        toast.success("Password reset successfully! Redirecting to login page.");
        router.push("/login"); 
        resetStore(); 
        formReset();  
      }
    }
  };

  const getTitle = () => {
    if (showNewPasswordInput) {
      return "Set New Password";
    }
    if (showCodeInput) {
      return "Verify Your Code";
    }
    return "Forgot Your Password?";
  };

  const getDescription = () => {
    if (showNewPasswordInput) {
      return "Enter your new password below.";
    }
    if (showCodeInput) {
      return `We've sent a 6-digit code to ${email}. Please enter it to proceed.`;
    }
    return "No worries! Enter your email address below to receive a verification code.";
  };

  return (
    <div className="flex items-center justify-center px-4 py-6 min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg sm:shadow-lg w-full max-w-md p-6 md:p-8 border border-gray-200">
        <h1 className="text-3xl text-gray-800 font-extrabold text-center mb-6">
          {getTitle()}
        </h1>

        <p className="text-gray-600 text-sm font-medium text-center mb-6">
          {getDescription()}
        </p>

        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm animate-fade-in">
            <p className="font-semibold">Error:</p>
            <p>{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email Input - Always visible but disabled in later stages */}
          <div className="mb-5">
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder:text-gray-500 text-base transition-colors`}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address format.",
                },
              })}
              disabled={isSubmitting || showCodeInput || showNewPasswordInput} 
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-600 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Verification Code Input - Only shown after email is submitted */}
          {showCodeInput && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Verification Code</label>
              <div className="flex space-x-2 mb-4 justify-center">
                {verificationCode.map((digit: string, index: number) => (
                  <input
                    type="text"
                    key={`code-${index}`}
                    id={`code-${index}`}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg text-2xl font-bold outline-none text-gray-800 bg-gray-50 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength={1}
                    disabled={isSubmitting}
                  />
                ))}
              </div>
              <p className="text-sm text-center text-gray-500 mt-4">
                Didn&apos;t receive code?{" "}
                <button
                  type="button"
                  className="text-teal-600 font-semibold hover:underline disabled:opacity-50"
                  onClick={() => {
                    resetStore(); 
                    formReset();  
                  }}
                  disabled={isSubmitting}
                >
                  Resend Code
                </button>
              </p>
            </div>
          )}

          {/* New Password Inputs - Only shown after OTP is (client-side) complete */}
          {showNewPasswordInput && (
            <>
              <div className="mb-5">
                <label htmlFor="newPassword" className="sr-only">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                  className={`w-full px-4 py-3 border ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder:text-gray-500 text-base transition-colors`}
                  {...register("newPassword", {
                    required: "New password is required.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long."
                    }
                  })}
                  disabled={isSubmitting}
                />
                {errors.newPassword && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="confirmNewPassword" className="sr-only">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  placeholder="Confirm new password"
                  className={`w-full px-4 py-3 border ${
                    errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder:text-gray-500 text-base transition-colors`}
                  {...register("confirmNewPassword", {
                    required: "Confirm password is required.",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match."
                  })}
                  disabled={isSubmitting}
                />
                {errors.confirmNewPassword && (
                  <p className="mt-2 text-xs text-red-600 font-medium">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {showNewPasswordInput ? "Resetting Password..." : "Sending Code..."}
              </>
            ) : (
              (showNewPasswordInput ? "Reset Password" : showCodeInput ? "Verify Code" : "Send Verification Code")
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Remember your password?{" "}
            <Link href="/login" className="text-teal-600 font-semibold hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;