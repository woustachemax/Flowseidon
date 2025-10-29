import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import WorkflowList, { WorkflowsContainer, WorkflowsHeader } from "@/features/workflows/components/workflows";

const Page = async () => {
    await requireAuth();
    await prefetchWorkflows(); 
    
    return( 
        <HydrateClient>
            <WorkflowsContainer>
                <WorkflowsHeader />
                <ErrorBoundary fallback={<p>Error</p>}>
                    <Suspense fallback={<p>Loading...</p>}>
                        <WorkflowList/>
                    </Suspense>
                </ErrorBoundary>
            </WorkflowsContainer>
        </HydrateClient>
    )
}

export default Page