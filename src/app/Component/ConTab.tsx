import React from 'react'

const ConTab = () => {
  return (
    <div className='mt-12 sm:mt-[70px] w-full px-4 sm:px-6'>
      <div className="relative w-full max-w-5xl p-6 sm:p-16 rounded-2xl bg-cn text-center flex flex-col items-center justify-center mx-auto">
        {/* Text */}
        <h1 className="text-white text-xl sm:text-3xl md:text-[40px] font-semibold leading-normal sm:leading-relaxed text-balance">
          Start Trading in Minutes – Join Now and <br className="hidden sm:block" /> Access Global Markets!
        </h1>

        {/* CTA Button */}
        <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 flex items-center gap-2 
          bg-white text-black font-medium rounded-full shadow-md 
          hover:bg-gray-200 transition text-sm sm:text-base">
          Get started for free
          <span className="w-5 h-5 sm:w-6 sm:h-6 bg-black text-white rounded-full 
            flex items-center justify-center text-xs sm:text-sm">
            →
          </span>
        </button>
      </div>
    </div>
  )
}

export default ConTab