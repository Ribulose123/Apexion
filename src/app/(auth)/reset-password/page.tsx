import PasswordReset from "@/app/Auth content/PasswordReset";
import { Suspense } from "react";

export default function ResetPasswordPage (){
    return(
        <div className="">
            <Suspense>
            <PasswordReset/>
            </Suspense>
        </div>
    )
}