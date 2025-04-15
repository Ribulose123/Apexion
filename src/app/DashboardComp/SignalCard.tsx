import React from 'react';


interface SignalProps {
  id: string;
  status: string;
  pair: string;
  minimum: string;
  signalStrength: number;
  amount: string;
  currency: string;
}

const SignalCard: React.FC<SignalProps> = ({
    pair,
    minimum,
    signalStrength,
    currency
  }) => {
    return (
        <div className="rounded-2xl p-[1px] bg-gradient-to-b from-gray-900 to-indigo-900 shadow-lg h-[250px] sm:w-[365apx]">
        <div className="rounded-2xl p-4 h-full flex flex-col justify-between gradient-border">
          
          {/* Top Section */}
          <div>
            <h2 className="text-[#D2D1EE] sm:text-[20px] text-[16px] font-medium mb-8">{pair}</h2>
      
            <div className="flex justify-between text-[12px] border-b border-[#6967AE29] font-semibold sm:text-[16px] text-[#C4C4C4] mb-2">
              <span>Minimum</span>
              <span className="text-white  text-[12px] font-semibold sm:text-[16px]">{minimum}</span>
            </div>
      
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span className='text-[12px] font-semibold sm:text-[16px]'>Signal Strength</span>
              <span className="text-[#00F66C] text-[12px] font-semibold sm:text-[14px]">{signalStrength}%</span>
            </div>
      
            <div className="flex justify-between text-xs text-gray-400 currency-display rounded-lg">
              <span className='text-[12px] font-semibold sm:text-[16px] text-white '>Amount</span>
              <span className="text-white">{currency}</span>
            </div>
      
            
          </div>
      
          {/* Bottom Button */}
          <button className="w-full bg-gradient-to-b from-[#6967AE]/30 to-[#6967AE]/10 text-white py-2 rounded-lg text-sm hover:opacity-80 transition cursor-pointer">
            Edit
          </button>
        </div>
      </div>
      
    );
  };
  


const SignalGrid: React.FC = () => {
  const signals = [
    {
      id: '1',
      status: 'active',
      pair: 'CD VS',
      minimum: '16 ETH',
      signalStrength: 10,
      amount: '1,000,000',
      currency: 'USD'
    },
    {
      id: '2',
      status: 'active',
      pair: 'CD VS',
      minimum: '16 ETH',
      signalStrength: 10,
      amount: '1,000,000',
      currency: 'USD'
    },
    {
      id: '3',
      status: 'active',
      pair: 'CD VS',
      minimum: '16 ETH',
      signalStrength: 10,
      amount: '1,000,000',
      currency: 'USD'
    },
    {
      id: '4',
      status: 'active',
      pair: 'CD VS',
      minimum: '16 ETH',
      signalStrength: 10,
      amount: '1,000,000',
      currency: 'USD'
    },
    {
      id: '5',
      status: 'active',
      pair: 'CD VS',
      minimum: '16 ETH',
      signalStrength: 10,
      amount: '1,000,000',
      currency: 'USD'
    },
    {
      id: '6',
      status: 'active',
      pair: 'CD VS',
      minimum: '16 ETH',
      signalStrength: 10,
      amount: '1,000,000',
      currency: 'USD'
    },
    {
      id: '7',
      status: 'active',
      pair: 'CD VS',
      minimum: '16 ETH',
      signalStrength: 10,
      amount: '1,000,000',
      currency: 'USD'
    },
    {
      id: '8',
      status: 'active',
      pair: 'CD VS',
      minimum: '16 ETH',
      signalStrength: 10,
      amount: '1,000,000',
      currency: 'USD'
    }
  ];

  return (
    <div className="mt-6">
      <h2 className="text-white text-lg font-medium mb-4">Signals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {signals.map(signal => (
          <SignalCard 
            key={signal.id}
            id={signal.id}
            status={signal.status}
            pair={signal.pair}
            minimum={signal.minimum}
            signalStrength={signal.signalStrength}
            amount={signal.amount}
            currency={signal.currency}
          />
        ))}
      </div>
    </div>
  );
};

export default SignalGrid;