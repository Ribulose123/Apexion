import React from 'react'
import { CoinDepost, Network } from '@/app/data/data'
import { Dropdown } from '@/app/ui/Dropdown'

interface NetworkSelectorProps {
    networks: Network[];
    selectedCoin: CoinDepost | null;
    selectedNetwork: Network | null;
    isLoading: boolean;
    onSelect: (network: Network) => void;
  }
const NetworkSelector:React.FC<NetworkSelectorProps> = ({networks, selectedCoin, selectedNetwork, isLoading, onSelect}) => {

    const filteredNetworks = networks.filter(network => 
        !selectedCoin?.networks || 
        selectedCoin.networks.some(n => network.id.toLowerCase().includes(n.toLowerCase()))
      );
  return (
    <div className="">
    <div className="flex items-center mb-2">
      <div className="bg-[#439A86] text-white rounded-full w-7 h-7 flex items-center justify-center text-xs mr-2">2</div>
      <span className="font-semibold text-[20px] text-[#E8E8E8]">Choose a network</span>
    </div>
    
    <Dropdown<Network>
      value={selectedNetwork}
      options={filteredNetworks}
      loading={isLoading}
      loadingText="Loading networks..."
      placeholder="Select a network"
      renderOption={(network) => (
        <span>{network.name}</span>
      )}
      renderValue={(network) => (
        <span>{network.name}</span>
      )}
      onChange={onSelect}
    />
  </div>
  )
}

export default NetworkSelector
