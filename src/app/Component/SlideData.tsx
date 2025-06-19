import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  coinIcon: string;
}

const SlideData = () => {
  const slides: SlideData[] = [
    {
      id: 1,
      title: "Protect Your First",
      subtitle: "Copy Trade",
      description: "Get Up To 100 USDT Loss Coverage",
      buttonText: "Copy Trade Now",
      coinIcon: '/img/golden.png',
    },
    {
      id: 2,
      title: "Secure Your",
      subtitle: "Trading Journey",
      description: "Risk-Free Trading with Full Protection",
      buttonText: "Start Trading",
      coinIcon: '/img/golden.png',
    },
    {
      id: 3,
      title: "Maximize Your",
      subtitle: "Profit Potential",
      description: "Professional Traders, Proven Results",
      buttonText: "Join Now",
      coinIcon: '/img/golden.png',
    }
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); 
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className='w-full max-w-4xl bg-gradient-to-r from-[#844D0D14] to-[#c26b093d] p-6 rounded-lg flex flex-col md:flex-row gap-6'>
      {/* Left Side - Content */}
      <div className='flex-1 flex flex-col justify-between'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold text-white'>
            {currentSlideData.title} <span className='text-yellow-400 text-2xl'>{currentSlideData.subtitle}</span>
          </h2>
          <p className='text-gray-300 mt-2'>{currentSlideData.description}</p>

          <Link href='#' className='flex items-center gap-1 text-[14px] mt-1 text-[#F2AF29]'>
          {currentSlideData.buttonText}
          <ArrowRight size={15}/>
          </Link>
        </div>
        
        <div className='flex items-center justify-center mx-auto gap-4 mt-4'>
          
          {/* Slide indicators */}
          <div className='flex gap-2 justify-center mx-auto'>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-yellow-500 w-6' : 'bg-gray-500'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className='flex-1 -mt-7'>
        <div className='relative  w-full h-48 md:h-6 -top-1'>
          <Image 
            src={currentSlideData.coinIcon} 
            alt={currentSlideData.title}
            width={300}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default SlideData;