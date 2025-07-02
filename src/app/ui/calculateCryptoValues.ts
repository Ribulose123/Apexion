// utils/cryptoCalculations.ts

export interface CryptoCalculations {
  pricePerUnit: number;
  displayPrice: string;
  displayBalance: string;
  displayUsdValue: string;
  displayQuantityPerDollar: string;
  percentageOfPortfolio: string;
}

export const calculateCryptoValues = (
  balance: number,
  usdBalance: number,
  totalPortfolioValue?: number
): CryptoCalculations => {
  if (usdBalance <= 0 || isNaN(usdBalance)) {
    return {
      pricePerUnit: 0,
      displayPrice: '0.00',
      displayBalance: balance.toFixed(13),
      displayUsdValue: '$0.00',
      displayQuantityPerDollar: '0.00',
      percentageOfPortfolio: '0.00%'
    };
  }

  const quantityPerDollar = balance / usdBalance;
  
  return {
    pricePerUnit: usdBalance / balance, 
    displayPrice: (usdBalance / balance).toFixed(2), 
    displayBalance: balance.toFixed(8), 
    displayUsdValue: usdBalance.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    }),
    displayQuantityPerDollar: quantityPerDollar.toFixed(2), // New calculation
    percentageOfPortfolio: totalPortfolioValue 
      ? `${((usdBalance / totalPortfolioValue) * 100).toFixed(2)}%`
      : '0.00%'
  };
};