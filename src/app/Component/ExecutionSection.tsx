import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

const ExecutionSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-12 text-white mt-[70px]">
      {/* Left Content */}
      <div className="w-full md:w-1/2 md:pr-12">
        <h2 className="text-3xl md:text-[57px] font-semibold text-start leading-tight">
          Lightning speed execution with razor-thin spreads
        </h2>
        <ul className="mt-6 space-y-4">
          {[
            "Zero commission",
            "Spreads from 0.0 pips",
            "Copy Trading Available"
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="w-4 h-4 bg-blue-400 rounded-full text-center flex justify-center items-center">
                <FaCheck className="text-white" size={10} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
        <div className="w-full max-w-md">
          <Image
            src='/img/image 1.png'
            alt="Pricing Engine"
            width={800}
            height={476}
            layout="responsive"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ExecutionSection;