import CryptoWithdraw from "@/app/DashboardComp/withdrawal/CryptoWithdraw";

export default function withDrawPage(){
    return(
        <div className="flex flex-1 flex-col p-2 sm:p-4 md:mt-6 mt-12">
            <CryptoWithdraw/>
        </div>
    )
}