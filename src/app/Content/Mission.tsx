import React from 'react';
import Image from 'next/image';

const Mission = () => {
  return (
    <div className="relative w-full min-h-[80vh] flex items-start sm:items-end  text-white px-6 sm:px-12">
      {/* Background Image - Hidden on mobile */}
      <div className="absolute inset-0 hidden sm:block">
        <Image 
          src="/img/Capa 1.png" 
          alt="Bitcoin Mission"
          fill
          className="object-cover opacity-30"
          quality={100}
          priority
        />
      </div>
      
      {/* Content - Left aligned on mobile, right aligned on larger screens */}
      <div className="relative z-10 w-full md:w-1/2 sm:ml-auto 
                      text-left sm:text-right 
                      flex flex-col items-start sm:items-end 
                      justify-start sm:justify-end 
                      pt-12 sm:pb-12">
        <h2 className="text-xl sm:text-3xl lg:text-3xl font-bold text-blue-400">
          Our Mission
        </h2>
        <h3 className="text-[16px] sm:text-[20px] leading-relaxed mt-4">
          Empower individuals by providing a cutting-edge trading platform 
          that combines <span className="text-blue-400 font-semibold">
          technical expertise, innovation, and accessibility</span>.
        </h3>
        <p className="text-[12px] sm:text-[14px] leading-relaxed mt-4">
          We are dedicated to offering seamless opportunities in Forex, 
          Cryptocurrency, and Stock Trading, enabling users to leverage 
          the skills of professional traders.
        </p>
        <p className="text-sm sm:text-lg leading-relaxed mt-4">
          With a passion for market-leading firms, we strive to stay ahead 
          of the industry, delivering exceptional value through our 
          state-of-the-art trading services, dedicated broker integration, 
          and streamlined trading platforms.
        </p>
      </div>
    </div>
  );
};

export default Mission;