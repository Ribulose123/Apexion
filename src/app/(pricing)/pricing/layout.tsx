// app/cryptocurrency/layout.js
import React from 'react';


export const metadata = {
  title: 'Cryptocurrency Prices | Your Platform',
  description: 'Latest cryptocurrency prices, trends, and market data',
};

export default function CryptoLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="crypto-layout">
     <main>{children}</main>
      
    </div>
  );
}