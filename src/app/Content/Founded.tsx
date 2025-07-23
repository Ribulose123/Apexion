import Image from 'next/image'
import React from 'react'

const Founded = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between  text-white p-8 rounded-lg">
      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <p className="text-lg md:text-[30px]  text-center sm:text-start leading-relaxed font-medium" 
           style={{
             background: "linear-gradient(to right, #439A86, #6ABEA7, #8FFFEA, #80E6ED, #69ADD1)",
             WebkitBackgroundClip: "text",
             WebkitTextFillColor: "transparent",
             backgroundClip: "text"
           }}>
          Founded in 2014 by a team of experts, we combine technical expertise with innovative trading solutions, enabling users to copy professional traders in Forex, Crypto, and Stock Trading.
        </p>
      </div>
      <div className="w-full md:w-1/3 flex justify-center md:justify-end">
        <Image 
          src='/img/Rocket asset 1.png' 
          alt='rocket' 
          width={350} 
          height={240}
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default Founded