
import Topheader from "@/app/DashboardComp/copytrade/Topheader";
import TopMore from "@/app/DashboardComp/copytrade/copymore1/TopMore";

export default function CopymorePage(){
    return(
        <div className="flex flex-1 flex-col p-2 sm:p-6 md:mt-14 mt-20 w-full">
            <div>
                <Topheader/>
            </div>
            <div className="w-full">
                <TopMore/>
            </div>
        </div>
    )
}