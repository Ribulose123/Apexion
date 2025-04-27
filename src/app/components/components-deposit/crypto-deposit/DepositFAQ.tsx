// src/components/crypto-deposit/DepositFAQ.tsx
import React, { useState } from 'react';
import {  FileText } from 'lucide-react';


const faqItems = [
  {
    question: 'How to make deposit fix problem?',
    answer: 'If you encounter issues with your deposit, please check that you\'ve selected the correct network and address. Most deposit issues occur when funds are sent on the wrong network. If your deposit doesn\'t arrive after 24 hours, please contact support.'
  },
  {
    question: 'How to check network transfer requirements',
    answer: 'Each network has different requirements for confirmations and minimum deposit amounts. These are displayed below the deposit address. Make sure your deposit meets the minimum amount required to avoid loss of funds.'
  },
  {
    question: 'What to do if the deposit hasn\'t arrived',
    answer: 'First, check the transaction status on the blockchain explorer for the network you used. If the transaction is confirmed on the blockchain but not showing in your account after 24 hours, please submit a support ticket with your transaction ID.'
  }
];

const DepositFAQ: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
  <div>
      <div className="border border-[#141E32] rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          
          <span className="font-semibold text-[#E8E8E8] text-[16px]">FAQ</span>
        </div>
        <span className="text-[#6B6B6B] text-[12px] cursor-pointer ">More {'>'}</span>
      </div>
      
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-gray-700 pb-2">
            <div 
              className="flex gap-3 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
                 <FileText 
                size={16} 
                className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} 
              />
              <span className="text-sm text-start">{item.question}</span>
             
            </div>
            {expandedFaq === index && (
              <div className="mt-2 text-xs text-gray-400 pl-2 border-l-2 border-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
      
    </div>
    <div className="mt-4 ">
    <p className="text-sm text-end">Deposit not credited? <span className="text-[#439A86] text-sm ml-2 cursor-pointer">Request a refund</span></p>
    
  </div>
  </div>
  );
};

export default DepositFAQ;