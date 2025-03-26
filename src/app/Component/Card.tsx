import React from 'react';
import Exchange from '../Content/Exchange';
import TradingStats from '../Content/TradingStat';
import BillManagementCard from '../Content/BillManagementCard';

const Card = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-[24px] mt-[70px]">
      <Exchange />
      <TradingStats />
      <BillManagementCard />
    </div>
  );
};

export default Card;
