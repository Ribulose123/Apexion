"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "../config/api";

interface FormData {
  email: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const [verificationCode, setVerificationCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [showResend, setShowResend] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [codeSent, setCodeSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format seconds into mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerCount > 0 && codeSent) {
      interval = setInterval(() => {
        setTimerCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (timerCount === 0 && codeSent) {
      setShowResend(true);
    }

    return () => clearInterval(interval);
  }, [timerCount, codeSent]);

  const onSubmit = async (data: FormData) => {
    const fullCode = verificationCode.join("");
    if (fullCode.length !== 6) {
      toast.error("Please enter a complete 6-digit verification code");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          verificationCode: fullCode,
        }),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Password reset failed");
      }

      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: unknown) {
      let errorMessage = "An error occurred during password reset";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return; // Only allow numbers

    const newCode = [...verificationCode];
    newCode[index] = value.slice(0, 1);
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `code-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const resendVerificationCode = async (email: string) => {
    try {
      const response = await fetch("https://new-bidvest-backend-production.up.railway.app/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to resend verification code");
      }

      setVerificationCode(["", "", "", "", "", ""]);
      setTimerCount(60);
      setShowResend(false);
      setCodeSent(true);
      toast.success("Verification code resent!");
    } catch (error: unknown) {
      let errorMessage = "Failed to resend verification code";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  const sendVerificationCode = async (data: FormData) => {
    try {
      const response = await fetch("https://new-bidvest-backend-production.up.railway.app/api/auth/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send verification code");
      }

      setCodeSent(true);
      setTimerCount(60);
      toast.success("Verification code sent to your email!");
    } catch (error: unknown) {
      let errorMessage = "Failed to send verification code";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-lg sm:shadow-md w-full max-w-md p-6 md:p-8">
        <h1 className="text-2xl text-black font-semibold text-center mb-8">
          Forgot your password?
        </h1>

        <p className="text-[#797A80] text-[14px] font-medium text-center mb-2">
          Reset your password and get back to trading in no time!
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email/Mobile"
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

          {/* Verification Code input */}
          {codeSent && (
            <div className="mb-6">
              <label className="block text-[16px] font-medium text-[#01040F] mb-1">
                Verification code:
              </label>
              <div className="flex space-x-2 mb-2">
                {verificationCode.map((digit, index) => (
                  <input
                    type="text"
                    key={`code-${index}`}
                    id={`code-${index}`}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="sm:w-[60px] sm:h-[60px] w-13 h-13 text-center border border-gray-300 rounded font-bold outline-0 text-black bg-[#f4fcfa]"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    disabled={isSubmitting}
                  />
                ))}
              </div>
            </div>
          )}

          {!codeSent ? (
            <button
              type="button"
              onClick={handleSubmit(sendVerificationCode)}
              className="w-full py-3 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors mb-4"
            >
              Send Verification Code
            </button>
          ) : (
            <>
              {!showResend ? (
                <p className="text-sm text-gray-600 mb-4 text-end">
                  Resend code in {formatTime(timerCount)}
                </p>
              ) : (
                <div className="flex justify-between items-center text-sm mb-6">
                  <span className="text-gray-600">
                    Didn&#39;t receive verification code?
                  </span>
                  <button
                    type="button"
                    className="text-teal-600 hover:text-teal-800"
                    onClick={() => handleSubmit((data) => resendVerificationCode(data.email))}
                  >
                    Resend Code
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors mb-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Reset Password"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;