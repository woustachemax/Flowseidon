import { SignupPage } from "@/custom-components/signup-form"
import { dontrequireAuth } from "@/lib/auth-utils"

async function Page (){
    await dontrequireAuth();
    return(
        <div> 
            <SignupPage/>
        </div>
    )
}

export default Page