import React, { useEffect, useMemo } from 'react'; // Ensure useMemo is imported
import { CoinDepost, Network } from '@/app/data/data';
import { Dropdown } from '@/app/ui/Dropdown';

interface NetworkSelectorProps {
    networks: Network[];
    selectedCoin: CoinDepost | null;
    selectedNetwork: Network | null;
    isLoading: boolean;
    onSelect: (network: Network | null) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ networks, selectedCoin, selectedNetwork, isLoading, onSelect }) => {

    // Memoize the filteredNetworks array to prevent unnecessary re-renders of the Dropdown
    const filteredNetworks = useMemo(() => {
        return selectedCoin
            ? networks.filter(network => selectedCoin.networks.includes(network.name))
            : [];
    }, [selectedCoin, networks]); // Dependencies for useMemo

    // Effect to manage selectedNetwork when selectedCoin changes or filteredNetworks updates
    useEffect(() => {
        if (selectedCoin) {
            if (!selectedNetwork || !filteredNetworks.some(net => net.id === selectedNetwork.id)) {
                // Set to the first available filtered network, or null if none
                onSelect(filteredNetworks.length > 0 ? filteredNetworks[0] : null);
            }
        } else {
            // If no coin is selected, clear the selected network
            onSelect(null);
        }
    }, [selectedCoin, selectedNetwork, filteredNetworks, onSelect]);


    return (
        <div className="p-2 mb-4">
            <div className="flex items-center mb-2">
                <div className="bg-[#439A86] text-white rounded-full w-7 h-7 flex items-center justify-center text-xs mr-2">2</div>
                <span className="font-semibold text-[20px] text-[#E8E8E8]">Choose a network</span>
            </div>
            
            <Dropdown<Network>
                value={selectedNetwork}
                onChange={onSelect}
                options={filteredNetworks} 
                loading={isLoading}
                loadingText="Loading networks..."
                placeholder={selectedCoin ? "Select a network" : "Select a coin first"}
               
                disabled={!selectedCoin || isLoading} 
                renderOption={(network) => (
                    <div className={`${selectedNetwork?.id === network.id ? 'bg-[#060A17] p-3' : 'p-3'}`}>
                        <span className='text-[#E8E8E8] text-[15px]'>{network.name}</span>
                        <p className='text-[#E8E8E8AB] text-[13px]'>{network.des}</p>
                        <p className='text-[#E8E8E8AB] text-[13px]'>{network.min}</p>
                    </div>
                )}
                renderValue={(network) => (
                    <div className="flex flex-col">
                        <span>{network.name}</span>
                        <span className='text-gray-400 text-xs'>{network.des}</span> 
                    </div>
                )}
            />
            {selectedNetwork && (
                <div className="text-xs text-gray-400 mt-2">
                    {selectedNetwork.min}
                </div>
            )}
        </div>
    );
};

export default NetworkSelector;