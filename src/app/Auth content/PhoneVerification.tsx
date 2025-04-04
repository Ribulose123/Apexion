'use client'

import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";

interface FormData{
    phone: number;
}

interface PhoneVerificationProps {
  onNext: (data: FormData) => void
}

const PhoneVerification:React.FC<PhoneVerificationProps> = ({onNext}) => {
    const {handleSubmit} = useForm<FormData>({
        defaultValues:{
            phone:0,
        }
    })
    const [PhoneVerification, setPhoneVerification] = React.useState(['', '', '', '', '', '']);
    const [showResend, setShowResend] = React.useState(false);
    const [timerCount, setTimerCount] = React.useState(60);
    const [timerActive, setTimerActive] = React.useState(false);
    const [codeSent, setCodeSent] = React.useState(false);

    const formateTime =(seconds:number)=>{
        const minutes = Math.floor(seconds /60)
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''} `
    }


    useEffect(()=>{
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
    },[timerActive, timerCount, codeSent])

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        onNext(data); 
    };

    const handleInputChange = (index:number, value:string)=>{
        const newCode  = [...PhoneVerification]
        newCode[index] = value.slice(0, 1);

        if(value && index < 5){
            const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
            if (nextInput) nextInput.focus();
        }
    }


    const handleResendCode = () => {
        setPhoneVerification(['', '', '', '', '', '']);
        setTimerCount(60);
        setShowResend(false);
        setTimerActive(true);
        setCodeSent(true);
        console.log("Resending code...");
    };

  return (
    <div className='flex items-center justify-center px-4 py-6'>
      <div className='bg-white rounded-lg sm:shadow-md w-full max-w-md p-6 md:p-8'>
        <h2 className='text-2xl text-black font-semibold text-center mb-8'>You’re almost there</h2>
        <p className='text-center text-[15px] font-medium text-[#797A80]'>To complete your registration, enter the verification code we sent to +234 - 913 542 5311</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Verification Code Inputs */}
            <div className="mb-6">
          <div className="flex space-x-2 mb-2 mt-4 justify-center">
            {PhoneVerification.map((digit, index) => (
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
             {codeSent && (
          <>
            {!showResend ? (
              <p className="text-sm text-gray-600 mb-4 text-end">
                Resend {formateTime(timerCount)}
              </p>
            ) : (
              <div className="flex justify-between items-center text-sm mb-6">
                <span className="text-gray-600">
                  Didn&apos;t receive verification code?
                </span>
                <button
                  type="button"
                  className="text-teal-600 hover:text-teal-800"
                  onClick={handleResendCode}
                >
                  Resend Code
                </button>
              </div>
            )}
          </>
        )}
          </div>
        </div>

        <button type="submit" className="w-full py-3 bg-[#439A86] text-white rounded-2xl hover:bg-teal-600 transition-colors">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default PhoneVerification
