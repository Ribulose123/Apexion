import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

const ExecutionSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-0  flex flex-col md:flex-row  justify-between py-12 text-white mt-[40px]">
      {/* Left Content */}
      <div className="w-full md:w-1/2 md:pr-12 text-center md:text-left">
  <h2 className="text-2xl md:text-4xl font-medium leading-tight">
    Lightning speed execution with razor-thin spreads
  </h2>
  <ul className="mt-6 space-y-3 flex flex-col justify-center items-center md:items-start">
    {[
      "Zero commission",
      "Spreads from 0.0 pips",
      "Copy Trading Available"
    ].map((item, index) => (
      <li key={index} className="flex items-center gap-2 w-[80%] ml-35 sm:ml-0 md:w-auto">
        <span className="w-5 h-5 border-2 border-[#439A86] rounded-full flex justify-center items-center">
          <FaCheck className="text-[#439A86]" size={10} />
        </span>
        <span className="text-base">{item}</span>
      </li>
    ))}
  </ul>
</div>


      {/* Right Image */}
      <div className="w-full md:w-full  flex justify-center mt-8 md:mt-0">
        <div className="w-full max-w-6xl ">
          <Image
            src='/img/image 1.png'
            alt="Pricing Engine"
            width={1000}
            height={476}
            layout="responsive"
            
          />
        </div>
      </div>
    </div>
  );
};

export default ExecutionSection;