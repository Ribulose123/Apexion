import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

const ConTab = () => {
  return (
    <div className="mt-12 sm:mt-[40px] w-full max-w-7xl  ">
      <div className="relative w-full max-w-7xl p-6 sm:p-12 lg:p-26 rounded-2xl bg-cn text-center flex flex-col items-center justify-center mx-auto">
        {/* Text */}
        <h1 className="text-white text-2xl sm:text-4xl lg:text-[48px] font-medium leading-normal sm:leading-tight max-w-5xl mx-auto">
          Start Trading in Minutes – Join Now and{" "}
          <br className="hidden sm:block" /> Access Global Markets!
        </h1>

        {/* CTA Button */}
        <button
          className="mt-6 sm:mt-8 px-8 sm:px-10 py-4 flex items-center gap-4 
          bg-white text-black font-medium rounded-full shadow-md 
          hover:bg-gray-100 transition text-lg sm:text-xl"
        >
          Get started for free
          <span
            className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white rounded-full 
            flex items-center justify-center text-base sm:text-lg"
          >
            <HiOutlineArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ConTab;