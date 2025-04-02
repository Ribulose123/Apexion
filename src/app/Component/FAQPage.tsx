"use client";
import React, { useState } from 'react';
import { FaArrowDown } from "react-icons/fa";
import { faqData } from '../data/data';

interface FAQitems {
    question: string;
    answer: string;
}

interface FAQCategory {
    category: string;
    questions: FAQitems[];
}

const FAQPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<FAQCategory>(faqData[0]); // Store entire object
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);

    return (
        <div className="text-white px-6 md:px-20 w-full max-w-7xl mx-auto mt-42">
            <div className='flex flex-col items-center justify-center mb-16 text-center'>
                <h2 className='text-white text-2xl md:text-4xl  font-medium'>Frequently Asked Questions</h2>
                <p className='text-[#7D8491] text-[14px] sm:text-[18px] font-medium max-w-2xl mx-auto mt-4'>
                    Everything you need to know—clear answers for a seamless trading experience
                </p>
            </div>

            <div className='flex flex-col md:flex-row justify-center gap-8'>
                {/* Sidebar Navigation */}
                <aside className='hidden md:flex flex-col w-1/4 md:max-w-xs relative p-4'>
                    <div className='absolute left-[19px] top-[50px] h-[525px] bottom-[30px] w-[2px] bg-gray-500'></div>
                    {faqData.map((item, index) => (
                        <div 
                            key={index} 
                            className='relative flex items-center gap-3 cursor-pointer py-4' 
                            onClick={() => {
                                setSelectedCategory(item);
                                setOpenQuestion(null);
                            }}
                        >
                            <div className='relative flex items-center justify-center'>
                                <div className={`w-2 h-2 rounded-full border-2 flex items-center justify-center bg-[#7D8491] ${
                                    selectedCategory.category === item.category 
                                        ? 'bg-blue-400 border-blue-400' 
                                        : 'border-[#E8E8E8] bg-[#E8E8E8]'
                                }`}></div>
                            </div>
                            <span className={`${
                                selectedCategory.category === item.category 
                                    ? 'text-blue-100' 
                                    : 'text-white'
                            } text-[15px] font-semibold`}>
                                {item.category}
                            </span>
                        </div>
                    ))}
                </aside>

                {/* Mobile Dropdown */}
                <div className="md:hidden w-full mb-8 flex justify-center flex-col gap-2">
                    <label className="text-center mb-2">Make Selection</label>
                    <select
                        onChange={(e) => {
                            const category = faqData.find(cat => cat.category === e.target.value);
                            if (category) {
                                setSelectedCategory(category);
                                setOpenQuestion(null);
                            }
                        }}
                        className="w-full max-w-md p-2 mx-auto bg-[#10131F] rounded outline-0 border-0"
                        value={selectedCategory.category}
                    >
                        {faqData.map((item, index) => (
                            <option key={index} value={item.category}>{item.category}</option>
                        ))}
                    </select>
                </div>

                {/* FAQ Content */}
                <main className="flex-1 max-w-2xl mx-auto">
                    {selectedCategory.questions.map((faq, index) => (
                        <div key={index} className="mb-6 border-b border-gray-700 pb-4">
                            <span 
                                onClick={() => setOpenQuestion(openQuestion === index ? null : index)} 
                                className="flex justify-between items-center w-full text-left text-white p-2 cursor-pointer font-medium"
                            >
                                {faq.question}
                                <button>
                                    <FaArrowDown className={`transition-transform ${openQuestion === index ? "rotate-180" : ""}`} />
                                </button>
                            </span>
                            {openQuestion === index && (
                                <p className="text-gray-300 p-2 pt-4">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default FAQPage;