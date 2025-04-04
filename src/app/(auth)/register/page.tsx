'use client'
import SignupForm from "@/app/Auth content/SignupForm";
import { useState } from "react";
import EmailVerification from "@/app/Auth content/EmailVerification";
import PhoneVerification from "@/app/Auth content/PhoneVerification";
import finalizeSignUp from "@/app/Auth content/finalizeSignUp";

export default function Register() {
    const [step, setStep] = useState(1)
    const [userData, setUserData] = useState({})

    const renderStep = () => {
        switch (step) {
          case 1:
            return (
              <SignupForm
                onNext={(data) => {
                  setUserData({ ...userData, ...data });
                  setStep(2);
                }}
              />
            );
          case 2:
            return <EmailVerification onNext={() => setStep(3)} />;
          case 3:
            return <PhoneVerification onNext={finalizeSignUp} />;
          default:
            return <SignupForm onNext={() => {}} />;
        }
      };
   
    return(
       <div className="sm:bg-[#E8E8E8] bg-white w-full min-h-screen pt-5 ">
            {renderStep()}
       </div>
    )
}