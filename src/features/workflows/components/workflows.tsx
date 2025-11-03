"use client"

import { useSuspenseWorkflows, useCreateWorkflow, useDeleteWorkflow, useDuplicateWorkflow } from "@/features/workflows/hooks/use-workflows";
import { EntityContainer, EntityHeader, EntityPagination, EntitySearch, LoadingView, ErrorView, EmptyView, EntityList } from "@/custom-components/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useWorkflowsParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useRouter } from "next/navigation";
import { WorkflowItem } from "@/custom-components/entity-components";


export const WorkflowItems = () => {
    const [workflows] = useSuspenseWorkflows();
    const router = useRouter();
    const deleteWorkflow = useDeleteWorkflow();
    const duplicateWorkflow = useDuplicateWorkflow();
    
    if (!workflows) {
        return <LoadingView entity="Workflows" />;
    }
    
    const handleEdit = (id: string) => {
        router.push(`/workflows/${id}`);
    };
    
    const handleDelete = (id: string) => {
        deleteWorkflow.mutate({ id });
    };
    
    const handleDuplicate = (id: string) => {
        duplicateWorkflow.mutate({ id });
    };
    
    const data = workflows as any;
    const workflowData = data.json || data; 
    const items = (workflowData.items || []) as typeof workflows.items;
    
    if (items.length === 0) {
        return <WorkflowsEmpty />;
    }
    
    return (
        <EntityList
            items={items}
            renderItem={(workflow) => (
                <WorkflowItem
                    data={workflow}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                />
            )}
            keyExtractor={(workflow) => workflow.id}
            emptyMessage="No workflows found. Create your first workflow to get started."
        />
    );
};

export const WorkflowSearch = () => {
    const [params, setParams] = useWorkflowsParams();
    const {searchValue, onSearchChange} = useEntitySearch({
        params,
        setParams
    });
    return (
        <EntitySearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search Workflows"
        />
    );
}

export default function WorkflowList() {
    return <WorkflowItems />;
}

export const WorkflowsHeader = () => {
    const createWorkflow = useCreateWorkflow();
    const {handleError, modal} = useUpgradeModal();
    
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error);
            }
        });
    };

    return (
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
    );
}

export const WorkflowsPagination = () => { 
    const [workflows] = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowsParams();
    
    if (!workflows) {
        return null;
    }
    
    const data = workflows as any;
    const workflowData = data.json || data;
    const pagination = workflowData.pagination;
    
    if (!pagination) {
        return null;
    }
    
    return (   
        <EntityPagination 
            disabled={false} 
            totalPages={pagination.totalPages}
            page={params.page}
            onPageChange={(page) => setParams({
                ...params,
                page
            })}
        />
    );
}

export const WorkflowsContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<WorkflowSearch />}
            pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    );
}

export const WorkflowsLoading = () => {
    return (
        <LoadingView 
            entity="Workflows"
        />
    );
}

export const WorkflowsError = () => {
    return (
       <ErrorView message="Failed to load workflows." />    
    );
}

export const WorkflowsEmpty = () => {
    const router = useRouter();
    const createWorkflow = useCreateWorkflow();
    const {handleError, modal} = useUpgradeModal();
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error);
            },
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            }
        });
    };
    return (
        <>
            {modal}
            <EmptyView
                onNew={handleCreate}
                message="You haven't created any workflows yet, but that could change if you'd like!"
            />
        </>
    );
}