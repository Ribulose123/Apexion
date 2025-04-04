"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [showResend, setShowResend] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  // Format seconds into mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timerCount > 0) {
      interval = setInterval(() => {
        setTimerCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (timerCount === 0 && codeSent) {
      setShowResend(true);
      setTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [timerActive, timerCount, codeSent]);

  const onSubmit = (data: FormData) => {
    const fullCode = verificationCode.join("");
    console.log("Form submitted:", { ...data, verificationCode: fullCode });
  };

  const handleInputChange = (index: number, value: string) => {
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

  const regenerateCode = () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setTimerCount(60);
    setShowResend(false);
    setTimerActive(true);
    setCodeSent(true);
    console.log("Resending verification code");
  };

  const sendVerificationCode = () => {
    setCodeSent(true);
    setShowResend(false);
    setTimerCount(60);
    setTimerActive(true);
    console.log("Sending verification code");
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
                />
              ))}
            </div>
          </div>

          {!codeSent && (
           <div className="flex justify-end items-center -mt-5">
                 <button
              type="button"
              onClick={sendVerificationCode}
              className=" text-teal-600 rounded hover:bg-gray-200 transition-colors mb-4 text-[13px] "
            >
              Send Code
            </button>
           </div>
          )}

          {codeSent && (
            <>
              {!showResend ? (
                <p className="text-sm text-gray-600 mb-4 text-end">
                  Resend {formatTime(timerCount)}
                </p>
              ) : (
                <div className="flex justify-between items-center text-sm mb-6">
                  <span className="text-gray-600">
                    Didn&apos;t receive verification code?
                  </span>
                  <button
                    type="button"
                    className="text-teal-600 hover:text-teal-800"
                    onClick={regenerateCode}
                  >
                    Resend Code
                  </button>
                </div>
              )}
            </>
          )}

          {/* Next Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors mb-4"
          >
            Next
          </button>

          {/* Send code button (only show initially) */}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;