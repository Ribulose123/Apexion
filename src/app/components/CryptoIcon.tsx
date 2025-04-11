interface CryptoIconProps {
  symbol: string;
  size?: number;
}

const ICON_COLORS: { [key: string]: string } = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  BNB: '#F3BA2F',
  LTC: '#345D9D',
  AVAX: '#E84142',
};

export default function CryptoIcon({ symbol, size = 32 }: CryptoIconProps) {
  const backgroundColor = ICON_COLORS[symbol] || '#6B7280';
  
  return (
    <div 
      className="rounded-full flex items-center justify-center"
      style={{ 
        backgroundColor,
        width: size,
        height: size,
        fontSize: size * 0.5
      }}
    >
      {symbol.slice(0, 1)}
    </div>
  );
} 