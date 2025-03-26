"use client"

import React, { useEffect, useState } from 'react';
import { CgArrowsExchangeAltV } from "react-icons/cg";

const currencySymbols: { [key: string]: string } = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$", CAD: "C$", CHF: "CHF", CNY: "¥",
  SEK: "kr", NZD: "NZ$", INR: "₹", RUB: "₽", ZAR: "R", NGN: "₦"
};

const currencies = Object.keys(currencySymbols);

const Exchange = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("EUR");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(189);
  const [exchangeAmount, setExchangeAmount] = useState<number>(215.79);
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency] || 1;
        
        setExchangeRate(rate);
        setExchangeAmount(amount * rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(exchangeAmount);
    setExchangeRate(1 / exchangeRate); // Reverse exchange rate
  };

  return (
    <div className="sm:w-[355px] sm:h-[355px] w-[450px] h-[290px] mx-auto p-6 bg-[#0D0E13] text-white shadow-xl rounded-2xl border border-gray-800 relative">
      <h2 className="text-center sm:text-lg text-[15px] font-semibold mb-6 opacity-80">Online Money Exchange</h2>

      {/* Swap Button */}
     

      {/* CURRENCY CONTAINER */}
      <div className=" p-4 rounded-xl shadow-lg relative">


      <div className="absolute left-1/2 transform -translate-x-1/2 top-[75px] z-10">
        <button 
          onClick={swapCurrency} 
          className="bg-[#5E5FE0] p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#6E70F2]"
        >
          <CgArrowsExchangeAltV className="text-white text-[20px]" />
        </button>
      </div>
        
        {/* FROM CURRENCY */}
        <div className="relative flex items-center mb-3 border border-gray-200/10 top-1.5 bg-transparent p-4 rounded-lg">
          <span className="absolute left-4 text-2xl">{currencySymbols[fromCurrency]}</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 1)}
            className="bg-transparent text-white w-full text-xl text-center outline-none py-2"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="absolute right-4 bg-[#0D0E13] border border-gray-100/10 text-white p-2 rounded-lg cursor-pointer"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        {/* TO CURRENCY */}
        <div className="relative flex items-center mt-3 bg-[#191B23] p-4 rounded-lg bottom-1.5">
          <span className="absolute left-4 text-2xl">{currencySymbols[toCurrency]}</span>
          <input
            type="number"
            value={exchangeAmount.toFixed(2)}
            readOnly
            className="bg-transparent text-white w-full text-xl text-center outline-none py-2"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="absolute right-4 bg-[#0D0E13]  border border-gray-100/10 text-white p-2 rounded-lg cursor-pointer outline-0"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default Exchange;