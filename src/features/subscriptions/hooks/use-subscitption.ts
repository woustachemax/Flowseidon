import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import client from "@/lib/db";


export const useSubscription = ()=>{
    return useQuery({
        queryKey: ["subscription"],
        queryFn : async()=>{
            const {data} = await authClient.customer.state();
            return data; 
        }
    })
}

export const useHasActiveSubscription = ()=>{
    const {data: customerState, isLoading, ...rest} = useSubscription();

    const HasActiveSubscription = customerState?.activeSubscriptions &&
    customerState?.activeSubscriptions.length > 0;

    return{
        HasActiveSubscription,
        subsciption: customerState?.activeSubscriptions?.[0],
        isLoading,
        ...rest

    }
}