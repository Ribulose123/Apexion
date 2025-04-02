import React from 'react'

const GoalAndTechnology = () => {
  return (
    <div className=" text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Our Goal Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-5xl font-bold">Our goal</h2>
            <p className="font-medium text-[#E8E8E8]">
              To deliver a cutting-edge and seamless trading experience
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We strive to provide a platform that combines technical expertise with a 
              user-friendly interface, ensuring all traders, regardless of experience level, 
              can navigate the markets with confidence and find trading success.
            </p>
          </div>

          {/* Our Technology Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-5xl font-bold">Our technology</h2>
            <p className="font-medium text-[#E8E8E8]">
              Our leading-edge solutions and knowledge form the foundation of our success and allow us to further the true principles of Bitcoin: equality, justice and freedom
            </p>
            <p className="text-sm text-[#7D8491] leading-relaxed">
              By implementing cutting-edge technology combined with deep financial 
              market expertise, we&apos;ve created a platform that empowers all users to benefit from 
              professional trading strategies while maintaining complete control over their assets.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoalAndTechnology
