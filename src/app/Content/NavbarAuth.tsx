'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Flag from 'react-world-flags';

const countryOptions = ['gb', 'us', 'fr', 'de', 'ng'];

const NavbarAuth = () => {
  const [country, setCountry] = useState('gb');
  const selectRef = useRef<HTMLSelectElement | null>(null);
  
  // Custom styles for the select element
  useEffect(() => {
    if (selectRef.current) {
      // Hide the default dropdown arrow
      selectRef.current.style.appearance = 'none';
  
    }
  }, []);

  return (
    <nav className="w-full bg-[#10131F] shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
         <Image src='/img/logo2.jpg' alt="logo" width={50} height={50}/>
        {/* Flag Dropdown */}
        <div className="relative">
          <div className="flex items-center">
            {/* Current flag display */}
            <div className="absolute pointer-events-none z-10 flex items-center left-2">
              <Flag code={country.toUpperCase()} style={{ width: 34, height: 18 }} />
            </div>
            
            {/* Custom dropdown arrow */}
            <div className="absolute pointer-events-none z-10 right-2">
              <svg 
                className="w-4 h-4 fill-current text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
            
            {/* Actual select element */}
            <select
              ref={selectRef}
              className="bg-transparent text-transparent pl-10 pr-8 py-1 rounded cursor-pointer outline-0"
              
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countryOptions.map((code) => (
                <option key={code} value={code} className='bg-[#10131F]'>
                  {code.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAuth;