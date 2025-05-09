import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="mt-[70px] text-white py-12  max-w-[90rem]">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-medium">Discover More Products</h2>
        <p className="mt-2 text-gray-400 text-sm md:text-base">
          Explore a wide range of trading opportunities across multiple asset classes
        </p>
      </div>

      {/* Card Container - Reduced gap from 6 to 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full max-w-[90rem] mx-auto">
        
        {/* Card 1 */}
        <div className="relative w-full h-[250px] p-6 rounded-xl border-t-[3px] border-l-[2px] border-r-[2px] border-b-0 
                      border-purple-600 backdrop-blur-lg shadow-lg
                      before:absolute before:inset-0 before:-z-10 before:rounded-xl
                      before:bg-gradient-to-br before:from-[#030611e5] before:to-[#01040FE5] before:blur-lg before:opacity-50">
          
          {/* Card Content */}
          <div className="flex flex-col justify-start items-start h-full">
            <h3 className="text-lg md:text-3xl font-medium relative z-10">Bidvest Card</h3>
            <p className="text-gray-400 mt-2 relative z-10 text-start text-sm md:text-[16px] w-[65%]">
              Up to 10% Cashback, 8% AVR, VIP Privileges and More
            </p>
            <a href="#" className="text-[#6967AE] mt-auto inline-block relative z-10">Details →</a>
           </div>

            {/* Floating Card Image */}
            <div className="absolute top-4 right-4 z-10">
              <Image 
                src="/img/card12.png" 
                alt="Apexion Card" 
                width={130} 
                height={60} 
                className="rotate-3 max-w-[100px] md:max-w-none" 
              />
            </div>
        </div>

        {/* Card 2 */}
        <div className="relative w-full h-[250px] p-6 rounded-xl border-t-[3px] border-l-[2px] border-r-[2px] border-b-0 
                      border-purple-600 backdrop-blur-lg shadow-lg
                      before:absolute before:inset-0 before:-z-10 before:rounded-xl
                      before:bg-gradient-to-br before:from-[#030611e5] before:to-[#01040FE5] before:blur-lg before:opacity-50">
          
          {/* Card Content */}
          <div className="flex flex-col justify-start items-start h-full">
            <h3 className="text-lg md:text-3xl font-medium relative z-10">Bidvest Card</h3>
            <p className="text-gray-400 mt-2 relative z-10 text-start text-sm md:text-[16px] w-[65%]">
              Up to 10% Cashback, 8% AVR, VIP Privileges and More
            </p>
            <a href="#" className="text-[#6967AE] mt-auto inline-block relative z-10">Details →</a>
           </div>

            {/* Floating Card Image */}
            <div className="absolute top-4 right-4 z-10">
              <Image 
                src="/img/card12.png" 
                alt="Apexion Card" 
                width={130} 
                height={60} 
                className="rotate-3 max-w-[100px] md:max-w-none" 
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;