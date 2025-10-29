"use client"

import { useSuspenseWorkflows, useCreateWorkflow } from "@/features/workflows/hooks/use-workflows";
import { EntityContainer, EntityHeader } from "@/custom-components/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

export default function WorkflowList() {
    const [workflows] = useSuspenseWorkflows();
    
    return (
        <div className="space-y-2">
            {workflows.map(workflow => (
                <div 
                    key={workflow.id}
                    className="p-4 rounded-md border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
                >
                    {workflow.name}
                </div>
            ))}
        </div>
    );
}

export const WorkflowsHeader = () => {
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();
    
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error);
            }
        });
    };
    
    return(
        <>
            {modal}
            <EntityHeader
                title="Workflows"
                description="Create and Manage your workflows"
                onNew={handleCreate}
                newButtonLabel="New Workflow"
                disabled={createWorkflow.isPending}
                isCreating={createWorkflow.isPending}
            />
        </>
    )
}

export const WorkflowsContainer = ({children}: {children: React.ReactNode}) => {
    return <EntityContainer>{children}</EntityContainer>
}