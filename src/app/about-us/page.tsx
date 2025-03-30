import Image from "next/image";
import Mission from "../Content/Mission";
import Founded from "../Content/Founded";
import GoalAndTechnology from "../Content/GoalAndTechnology";
import ExecutionSection from "../Component/ExecutionSection";
import LogoCarousel from "../Component/LogoCarousel";

export default function About() {
  return (
    <main className="min-h-screen ">
      <section className="relative w-full min-h-screen md:min-h-[70vh] flex items-center justify-center sm:-top-0">
      {/* Background Image */}
      <div className="absolute inset-1">
        <Image 
          src="/img/Mask group.png" 
          alt="Moon" 
          layout="fill"
          objectFit="contain"  // Ensures the full image is visible
          quality={100}
          priority
          className="w-full h-full"
        />
      </div>

      {/* Text Overlay */}
      <div className="relative text-center text-white px-4">
        <h1 className="text-5xl sm:text-6xl md:text-4xl lg:text-6xl font-bold leading-tight">
          Redefining the Future of <span className="text-blue-400">Trading</span>
        </h1>
        <h1 className="text-5xl sm:text-6xl md:text-4xl lg:text-6xl font-bold leading-tight">
          with Innovation and <span className="text-blue-400">Trust</span>
        </h1>
      </div>
    </section>
    <section className="sm:mt-20 -mt-40">
        <Mission/>
    </section>
    <section className="-mt-30 sm:-mt-0">
        <Founded/>
    </section>
    <section>
        <GoalAndTechnology/>
    </section>
    <section>
        <ExecutionSection/>
    </section>
    <section>
        <div>
            <p className="font-medium sm:text-[30px] text-[20px] text-[#E8E8E8]">The world&apos;s most innovative enterprises are working with us</p>
        </div>
    </section>
    <section>
        <LogoCarousel/>
    </section>
    </main>
  );
}