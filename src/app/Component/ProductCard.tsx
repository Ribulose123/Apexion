import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="mt-[70px] text-white py-12 px-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Discover More Products</h2>
        <p className="mt-2 text-gray-400">
          Explore a wide range of trading opportunities across multiple asset classes
        </p>
      </div>

      {/* Card Container */}
      <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-6xl mx-auto">
        
        {/* Card 1 */}
        <div className="relative w-[450px] h-[250px] p-6 rounded-xl border-t-[3px] border-l-[2px] border-r-[2px] border-b-0 
                      border-blue-500  backdrop-blur-lg shadow-lg
                      before:absolute before:inset-0 before:-z-10 before:rounded-xl
                      before:bg-gradient-to-br before:from-[#030611e5] before:to-[#01040FE5] before:blur-lg before:opacity-50">
          
          {/* Card Content */}
          {/* Card Content */}
          <div className="flex flex-col justify-start items-start">
           <h3 className="text-xl font-medium relative z-10">Apexion Card</h3>
            <p className="text-gray-400 mt-2 relative z-10 text-start text-[16px] w-[80%]">
              Up to 10% Cashback, 8% AVR, VIP Privileges and More
            </p>
            <a href="#" className="text-blue-400 mt-12 inline-block relative z-10">Details →</a>
           </div>

            {/* Floating Card Image */}
            <div className="absolute top-4 right-4 z-10">
              <Image src="/img/card12.png" alt="Apexion Card" width={130} height={60} className="rotate-3" />
            </div>

        </div>

        {/* Card 2 */}
        <div className="relative w-[450px] h-[250px] p-6 rounded-xl border-t-[3px] border-l-[2px] border-r-[2px] border-b-0 
                      border-blue-500  backdrop-blur-lg shadow-lg
                      before:absolute before:inset-0 before:-z-10 before:rounded-xl
                      before:bg-gradient-to-br before:from-[#030611e5] before:to-[#01040FE5] before:blur-lg before:opacity-50">
          
          {/* Card Content */}
          <div className="flex flex-col justify-start items-start">
           <h3 className="text-xl font-medium relative z-10">Apexion Card</h3>
            <p className="text-gray-400 mt-2 relative z-10 text-start text-[16px] w-[70%]">
              Up to 10% Cashback, 8% AVR, VIP Privileges and More
            </p>
            <a href="#" className="text-blue-400 mt-12 inline-block relative z-10">Details →</a>
           </div>

            {/* Floating Card Image */}
            <div className="absolute top-4 right-4 z-10">
              <Image src="/img/card12.png" alt="Apexion Card" width={130} height={60} className="rotate-3" />
            </div>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;
