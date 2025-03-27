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
      <section className="text-center py-20 flex flex-col items-center">
        <h1 className="sm:text-[96px] text-[40px] font-semibold sm:font-medium leading-tight">
          Step into a new chapter of online trading.
        </h1>
        <p className="mt-4 text-[#797A80] max-w-2xl mx-auto sm:text-[15px] text-[12px] font-medium">
          Join Apexion Trades to enjoy the benefits of trading with a regulated,
          secure broker designed to execute your transactions in seconds. Open a
          Live Account to access an optimised set of trading features
        </p>
        <button className="mt-6 bg-[#6967AE] p-4 rounded-full text-[15px] font-medium flex items-center justify-center gap-2 mx-auto">
          Get started for free
          <FaArrowRight className="w-4 h-4 bg-white text-black text-[14px] rounded-full p-1" />
        </button>

        <div className="w-full mt-20">
          <Card />
        </div>

        <div className="w-full mt-20">
          <ProductsSection />
        </div>

        <div className="w-full mt-20">
          <ExecutionSection />
        </div>

        <div className="w-full mt-20">
          <ProductCard />
        </div>

        <div className="w-full mt-20">
          <Testimony />
        </div>

        <div className="w-full mt-20">
          <FAQSection />
        </div>

        <div className="w-full mt-20">
          <ConTab />
        </div>

        <div className="w-full mt-20">
          <LogoCarousel />
        </div>
      </section>
    </main>
  );
}