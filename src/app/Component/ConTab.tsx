import React from 'react'

const ConTab = () => {
  return (
    <div className='mt-[70px] w-full'>
      <div className="relative sm:w-[80%] w-full  max-w-7xl p-10 sm:p-16 rounded-2xl bg-cn text-center flex flex-col items-center justify-center mx-auto">
        {/* Text */}
        <h1 className="text-white text-[20px] sm:text-[40px] font-semibold leading-relaxed">
          Start Trading in Minutes – Join Now and <br /> Access Global Markets!
        </h1>

        {/* CTA Button */}
        <button className="mt-6 px-6 py-2 flex items-center gap-2 bg-white text-black font-medium rounded-full shadow-md hover:bg-gray-200 transition">
          Get started for free
          <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center">→</span>
        </button>
      </div>
    </div>
  )
}

export default ConTab
