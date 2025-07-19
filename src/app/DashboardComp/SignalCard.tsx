'use client'
import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';


interface SignalProps {
  id: string;
 name:string;
 amount:number;
 price:number;
 strength:number;
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  </div>
);
const SignalCard: React.FC<SignalProps> = ({
    name,
    amount,
    strength,
    price
  }) => {
    return (
        <div className="rounded-2xl p-[1px]  bg-gradient-to-b from-[#06023daf] from-25%   via-[#240a6b] to-[#644ca1] shadow-lg h-[250px] sm:w-[365px]">
        <div className="rounded-2xl p-4 h-full flex flex-col justify-between gradient-border">
          
          {/* Top Section */}
          <div>
            <h2 className="text-[#D2D1EE] sm:text-[20px] text-[16px] font-medium mb-8">{name}</h2>
      
            <div className="flex justify-between text-[12px] border-b border-[#6967AE29] font-semibold sm:text-[16px] text-[#C4C4C4] mb-2">
              <span>Amount</span>
              <span className="text-white  text-[12px] font-semibold sm:text-[16px]">{amount}</span>
            </div>
      
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span className='text-[12px] font-semibold sm:text-[16px]'>Signal Strength</span>
              <span className="text-[#00F66C] text-[12px] font-semibold sm:text-[14px]">{strength}</span>
            </div>
      
            <div className="flex justify-between text-xs text-gray-400 currency-display rounded-lg">
              <span className='text-[12px] font-semibold sm:text-[16px] text-white '>price</span>
              <span className="text-white">{price}</span>
            </div>
      
            
          </div>
      
          {/* Bottom Button */}
          <button className="w-full bg-gradient-to-b from-[#6967AE]/30 to-[#6967AE]/10 text-white py-2 rounded-lg text-sm hover:opacity-80 transition cursor-pointer">
            Buy
          </button>
        </div>
      </div>
      
    );
  };
  


const SignalGrid: React.FC = () => {
  const [signals, setSignals] = useState<SignalProps[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignals = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('No authentication token found. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.SIGNAL.GET_SIGNAL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch signals');
        }

        const result = await response.json();
        setSignals(result.data);
      } catch (err) {
        console.error("Error fetching signals:", err);
        setError('Failed to load signals. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignals();
  }, []);

   if (isLoading) {
    return (
      <div className="mt-6 text-white text-center">
        <LoadingSpinner />
        <p className="mt-2">Loading signals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <h2 className="text-white text-lg font-medium mb-4">Signals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.length > 0 ? (
          signals.map(signal =>(
            <SignalCard
            key={signal.id}
            id={signal.id}
            name={signal.name}
            amount={signal.amount}
            price={signal.price}
            strength={signal.strength}
            />
          ))
        ):(
           <p className="text-white text-center col-span-full">No signals available at the moment.</p>
        )}
       
      </div>
    </div>
  );
};

export default SignalGrid;