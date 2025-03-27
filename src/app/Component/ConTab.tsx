import React from 'react'

const ConTab = () => {
  return (
    <div className='mt-12 sm:mt-[70px] w-full px-4 sm:px-6 lg:px-8'>
      <div className="relative w-full max-w-[1300px] p-6 sm:p-12 lg:p-16 rounded-2xl bg-cn text-center flex flex-col items-center justify-center mx-auto">
        {/* Text */}
        <h1 className="text-white text-2xl sm:text-4xl lg:text-[48px] font-semibold leading-normal sm:leading-tight max-w-4xl mx-auto">
          Start Trading in Minutes – Join Now and <br className="hidden sm:block" /> Access Global Markets!
        </h1>

        {/* CTA Button */}
        <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 flex items-center gap-3 
          bg-white text-black font-medium rounded-full shadow-md 
          hover:bg-gray-100 transition text-base sm:text-lg">
          Get started for free
          <span className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-white rounded-full 
            flex items-center justify-center text-sm sm:text-base">
            →
          </span>
        </button>
      </div>
    </div>
  )
}

export default ConTab