"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS } from "../config/api";

const EmailVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = useCallback(async () => {
    const otp = code.join("");
    if (otp.length !== 6 || isVerifying) return;

    setIsVerifying(true);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response body:", result);
      if (!response.ok) {
        throw new Error(
          result.message || `HTTP ${response.status}: Verification failed`
        );
      }

      router.push("/dashboard");
      toast.success("Verified successfully!");
      return;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Verification failed"
      );
      setCode(["", "", "", "", "", ""]);
    } finally {
      setIsVerifying(false);
    }
  }, [code, email, isVerifying, router]);

  // Auto-submit when all digits are entered
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleVerify();
    }
  }, [code, handleVerify]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `code-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 md:p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/img/Group 4.png"
            alt="Email verification"
            width={100}
            height={100}
          />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-4">
          Enter verification code
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sent to {email || "your email"}
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              maxLength={1}
              className="w-12 h-12 text-center text-black border-2 border-gray-300 rounded-lg text-xl focus:border-teal-500 focus:outline-none"
              disabled={isVerifying}
              inputMode="numeric"
            />
          ))}
        </div>

        {isVerifying && (
          <div className="text-center">
            <p className="text-gray-600">Verifying...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
