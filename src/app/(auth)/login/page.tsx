import { LoginPage } from "@/custom-components/login-page"
import { dontrequireAuth } from "@/lib/auth-utils"
import Image from "next/image"

async function Page (){
    await dontrequireAuth();
    
    return(
    
        <LoginPage/>
    )
}

export default Page