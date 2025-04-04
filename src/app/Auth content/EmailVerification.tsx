'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react'

interface FormData {
  email: string;
}

interface EmailVerificationProps {
  onNext: (data: FormData) => void
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onNext }) => {
  const [emailVerification, setEmailVerification] = useState(['', '', '', '', '', '']);
  const [showResend, setShowResend] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  
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

  
  useEffect(() => {
    const isComplete = emailVerification.every((digit) => digit !== '');
    if (isComplete) {
      const fullCode = emailVerification.join('');
      console.log("Auto-submitting code:", fullCode);
      onNext({ email: "" }); // Replace with actual email if needed
    }
  }, [emailVerification, onNext]);

  const handleInputChange = (index: number, value: string) => {
    const newCode = [...emailVerification];
    newCode[index] = value.slice(0, 1);
    setEmailVerification(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const regenerateCode = () => {
    setEmailVerification(["", "", "", "", "", ""]);
    setTimerCount(90);
    setShowResend(false);
    setTimerActive(true);
    setCodeSent(true);
    console.log("Resending verification code");
  };

  const sendVerificationCode = () => {
    setCodeSent(true);
    setShowResend(false);
    setTimerCount(90);
    setTimerActive(true);
    console.log("Sending verification code");
  };

  return (
    <div className='flex items-center justify-center px-4 py-6'>
      <div className='bg-white rounded-lg sm:shadow-md w-full max-w-md p-6 md:p-8'>
       <div className='flex justify-center items-center '>
       <Image src='/img/Group 4.png' alt='mail' width={100} height={100} className='mb-6' />
       </div>
        <h1 className='text-2xl text-black font-semibold text-center mb-8'>Check your email</h1>
        <p className='text-center text-[15px] font-medium text-[#797A80]'>
          To complete your registration, enter the verification code we sent to jeanrenard32@gmail.com
        </p>

        <div className="mb-6">
          <div className="flex space-x-2 mb-2 mt-4 justify-center">
            {emailVerification.map((digit, index) => (
              <input
                type="text"
                key={`code-${index}`}
                id={`code-${index}`}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="sm:w-[60px] sm:h-[60px] w-12 h-12 text-center border border-gray-300 rounded font-bold outline-0 text-black bg-[#f4fcfa]"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={1}
              />
            ))}
          </div>
        </div>

        {!codeSent && (
          <div className="flex justify-end items-center -mt-5">
            <button
              type="button"
              onClick={sendVerificationCode}
              className="text-teal-600 rounded hover:bg-gray-200 transition-colors mb-4 text-[13px]"
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
      </div>
    </div>
  );
};

export default EmailVerification;
