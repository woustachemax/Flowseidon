import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import WorkflowList, { WorkflowsContainer } from "@/features/workflows/components/workflows";
import { SearchParams } from "nuqs/server";
import { workFlowsParamsLoader } from "@/features/workflows/server/params-loader";
import {WorkflowsLoading, WorkflowsError} from "@/features/workflows/components/workflows";



type Props = {
    searchParams: Promise<SearchParams>
}

const Page = async ({searchParams}: Props) => {
    await requireAuth();

    const params = await workFlowsParamsLoader(searchParams);
    
    await prefetchWorkflows(params); 
    
    return( 
        <HydrateClient>
            <WorkflowsContainer>
                <ErrorBoundary fallback={<WorkflowsError/>}>
                    <Suspense fallback={<WorkflowsLoading/>}>
                        <WorkflowList/>
                    </Suspense>
                </ErrorBoundary>
            </WorkflowsContainer>
        </HydrateClient>
    )
}

export default Page