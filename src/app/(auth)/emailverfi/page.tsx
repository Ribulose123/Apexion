import { Suspense } from "react";
import EmailVerification from "@/app/Auth content/EmailVerification";


export default function EmailVerify() {
   

    return(
        <Suspense fallback={<div>Loading...</div>}>
                <EmailVerification />
        </Suspense>
        
    )
}