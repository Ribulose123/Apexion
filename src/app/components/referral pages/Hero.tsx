import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full relative overflow-hidden mt-10">
      {/* Background Flare */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80 -z-10"
        style={{
          backgroundImage: `url('/img/Flare.png')`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
          Earn More With Our
          <br />
          <span className="text-white">Referral Program</span>
        </h1>

        {/* Description Text */}
        <p className="text-gray-300 text-xs md:text-[16px] max-w-4xl mx-auto leading-relaxed mb-12 text-center">
          Invite Friends, Earn Rewards, Get Paid Every Time Someone You Refer
          Signs Up And Trades. The More You Refer, The More You Earn—It&apos;s
          That Simple. Track Your Referrals, Monitor Your Earnings, And Grow
          Your Network With Ease.
        </p>

        {/* Main Image */}
        <div className="flex justify-center items-center relative">
          <Image
            src="/img/Referral_01 1.png"
            alt="referral"
            width={500}
            height={600}
            className="w-full max-w-2xl"
          />
        </div>

        {/* Floating Cards */}
        <div className="absolute top-1/3 left-4 lg:left-16 z-20 md:block hidden">
          <Image
            src="/img/Card_01.png"
            alt="Earnings card"
            width={200}
            height={120}
            className="max-w-full h-auto"
          />
        </div>

        <div className="absolute bottom-1/6 right-4 lg:right-16 z-20 md:block hidden">
          <Image
            src="/img/Card_02.png" 
            alt="Reward card"
            width={200}
            height={120}
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* CTA Button at Bottom Center */}
      <div className="relative z-10 text-center pb-2 cursor-pointer">
        <button className="bg-gradient-to-r from-[#342659] to-[#8281B8] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-lg hover:from-[#423075] hover:to-[#9392C1]">
          Start Referring Now
        </button>
      </div>
    </div>
  );
};

export default Hero;