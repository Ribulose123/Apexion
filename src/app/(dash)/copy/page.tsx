import TopCopy from "@/app/DashboardComp/copytrade/TopCopy";
import Footer from "@/app/DashboardComp/Footer";
import Topheader from "@/app/DashboardComp/copytrade/Topheader"
import Image from "next/image";

export default function CopyTrade(){
    return(
        <div className="flex flex-1 flex-col p-2 sm:p-6 md:mt-14 mt-20">

            <div>
                <Topheader/>
            </div>
            <div>
                <TopCopy/>
            </div>

            <div className="md:flex justify-between items-center ml-3 hidden">
                <Image src="/img/follower.png" alt="follower" width={450} height={450}/>
                <Image src="/img/master.png" alt="master" width={450} height={450} />
            </div>

            <Footer/>
        </div>
    )
}