import { FaArrowRight } from "react-icons/fa";
import Card from "./Component/Card";
import ProductsSection from "./Component/ProductsSection";
import ExecutionSection from "./Component/ExecutionSection";
import ProductCard from "./Component/ProductCard";
import Testimony from "./Component/Testimony";
import FAQSection from "./Component/FAQSection";
import ConTab from "./Component/ConTab";
import LogoCarousel from "./Component/LogoCarousel";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section with Cards Integrated */}
      <section className="py-20 mt-10">
        <div className="text-center flex flex-col items-center">
          <h1 className="sm:text-[96px] text-[40px] font-semibold sm:font-medium leading-tight">
            Step into a new chapter of online trading.
          </h1>
          <p className="mt-4 text-[#797A80] max-w-2xl mx-auto sm:text-[16px] text-[14px] font-medium">
            Join Apexion Trades to enjoy the benefits of trading with a regulated,
            secure broker designed to execute your transactions in seconds. Open a
            Live Account to access an optimised set of trading features
          </p>
          <button className="w-[237px] h-[56px] gap-4 px-6 py-4 rounded-[48px] bg-[#6967AE] text-white text-[15px] font-medium flex items-center justify-center mt-3">
  Get started for free
  <FaArrowRight className="w-5 h-5 bg-white text-black rounded-full p-1" />
</button>

        </div>

        {/* Cards integrated directly into hero section */}
        <div className="mt-12">
          <Card />
        </div>
      </section>

     <div className="-mt-10">
       {/* Other sections remain unchanged */}
       <div className="w-full mt-0">
        <ProductsSection />
      </div>

      <div className="w-full mt-0">
        <ExecutionSection />
      </div>

      <div className="w-full -mt-10">
        <ProductCard />
      </div>

      <div className="w-full mt-10">
        <Testimony />
      </div>

      <div className="w-full mt-0">
        <FAQSection />
      </div>

      <div className="w-full mt-0">
        <ConTab />
      </div>

      <div className="w-full mt-0">
        <LogoCarousel />
      </div>
     </div>
    </main>
  );
}