import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

const ExecutionSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 text-white mt-[70px]">
      {/* Left Content */}
      <div className="md:w-1/2 w-full">
        <h2 className="text-3xl md:text-[57px] font-semibold text-start">
          Lightning speed execution with razor-thin spreads
        </h2>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center gap-3">
            <span className="w-4 h-4 bg-blue-400 rounded-full text-center flex justify-center items-center">
                <FaCheck className="text-white" size={10} />
            </span>
            Zero commission
          </li>
          <li className="flex items-center gap-3">
             <span className="w-4 h-4 bg-blue-400 rounded-full text-center flex justify-center items-center">
                <FaCheck className="text-white" size={10} />
            </span>
            Spreads from 0.0 pips
          </li>
          <li className="flex items-center gap-3">
             <span className="w-4 h-4 bg-blue-400 rounded-full text-center flex justify-center items-center">
                <FaCheck className="text-white" size={10} />
            </span>
            Copy Trading Available
          </li>
        </ul>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 w-full flex justify-center mt-8 md:mt-0">
        <Image
          src='/img/image 1.png' // Ensure this image is stored in /public or replace with your path
          alt="Pricing Engine"
          width={632}
          height={476}
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default ExecutionSection;
