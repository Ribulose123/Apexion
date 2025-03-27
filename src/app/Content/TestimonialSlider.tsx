"use client";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import React, { useRef } from "react";
import Slider from "react-slick";

const testimonials = [
  {
    id: 1,
    rating: 5.0,
    text: `"Fast execution, low spreads, and great customer support. Highly recommend!"`,
    name: "Mike Pence",
    role: "Trader",
    avatar: "/img/Avatar DP.png",
    img: '/img/image 3.png'
  },
  {
    id: 2,
    rating: 4.5,
    text: `"A seamless experience with useful tools for trading. Execution speed is fantastic!"`,
    name: "Sarah Johnson",
    role: "Investor",
    avatar: "/img/Avatar DP.png",
    img: '/img/image 3.png'
  },
  {
    id: 3,
    rating: 5.0,
    text: `"I've tried many platforms, but this one is by far the best. Smooth and reliable!"`,
    name: "David Smith",
    role: "Analyst",
    avatar: "/img/Avatar DP.png",
    img: '/img/image 3.png'
  },
  {
    id: 4,
    rating: 4.8,
    text: `"Customer service is outstanding! They helped me whenever I had issues."`,
    name: "Lisa Brown",
    role: "Financial Advisor",
    avatar: "/img/Avatar DP.png",
    img: '/img/image 3.png'
  },
  {
    id: 5,
    rating: 5.0,
    text: `"Easy-to-use interface with great features. Definitely recommend!"`,
    name: "James Williams",
    role: "Day Trader",
    avatar: "/img/Avatar DP.png",
    img: '/img/image 3.png'
  },
];

const TestimonialSlider: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="w-full flex justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-7xl text-white text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">What People Say About Us</h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Trusted by millions of customers worldwide.
        </p>

        <div className="relative mt-8">
          <Slider {...settings} ref={sliderRef} className="flex justify-center">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-2 md:px-4">
                <div className="bg-[#0A0E17] rounded-xl p-4 md:p-6 shadow-lg border-2 border-[#141E32] 
                  w-full max-w-[320px] sm:max-w-[380px] md:max-w-[400px] mx-auto 
                  h-[240px] sm:h-[260px] flex flex-col justify-between">
                  
                  {/* Rating (Stars) */}
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-base md:text-lg">
                      {"★".repeat(Math.round(testimonial.rating))}
                    </span>
                    <span className="text-gray-400 ml-2 text-sm">{testimonial.rating}</span>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-400 flex-1 text-sm sm:text-base mt-4 sm:mt-10 leading-relaxed line-clamp-3">
                    {testimonial.text}
                  </p>

                  {/* User Info */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-3 text-left">
                        <h4 className="text-xs sm:text-sm font-semibold">{testimonial.name}</h4>
                        <p className="text-[10px] sm:text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <Image
                      src={testimonial.img}
                      alt={testimonial.name}
                      width={80}
                      height={40}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrevClick}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
              bg-gray-800 rounded-full text-white hover:bg-gray-600 transition text-sm sm:text-base"
            >
              ←
            </button>
            <button
              onClick={handleNextClick}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
              bg-gray-800 rounded-full text-white hover:bg-gray-600 transition text-sm sm:text-base"
            >
              →
            </button>
          </div>

          {/* Add Comment Button */}
          <div className="sm:hidden block mt-4 text-center">
            <button className="bg-[#6967AE] px-4 py-2 rounded-full cursor-pointer text-sm">
              Add comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;