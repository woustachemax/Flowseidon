"use client"

import { useSuspenseWorkflows, useCreateWorkflow } from "@/features/workflows/hooks/use-workflows";
import { EntityContainer, EntityHeader, EntityPagination, EntitySearch, LoadingView, ErrorView, EmptyView, EntityList } from "@/custom-components/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useWorkflowsParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Trash2, Copy } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WorkflowItemProps {
    workflow: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    };
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
}

export const WorkflowItem = ({
    workflow,
    onEdit,
    onDelete,
    onDuplicate
}: WorkflowItemProps) => {
    return (
        <div className="group relative p-4 rounded-md border border-neutral-300 dark:border-neutral-800 
            bg-neutral-50 dark:bg-neutral-900 
            hover:border-cyan-500/30 dark:hover:border-cyan-500/30
            transition-all duration-200">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {workflow.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-1">
                        Updated {new Date(workflow.updatedAt).toLocaleDateString()}
                    </p>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-md opacity-0 group-hover:opacity-100
                            text-neutral-600 dark:text-neutral-400
                            hover:text-neutral-800 dark:hover:text-neutral-200
                            hover:bg-neutral-200 dark:hover:bg-neutral-800
                            transition-all duration-200">
                            <MoreVertical className="size-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(workflow.id)}>
                                <Pencil className="size-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                        )}
                        {onDuplicate && (
                            <DropdownMenuItem onClick={() => onDuplicate(workflow.id)}>
                                <Copy className="size-4 mr-2" />
                                Duplicate
                            </DropdownMenuItem>
                        )}
                        {onDelete && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                    onClick={() => onDelete(workflow.id)}
                                    className="text-rose-600 dark:text-rose-400 focus:text-rose-600 dark:focus:text-rose-400"
                                >
                                    <Trash2 className="size-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export const WorkflowItems = () => {
    const [workflows] = useSuspenseWorkflows();
    const router = useRouter();
    
    const handleEdit = (id: string) => {
        router.push(`/workflows/${id}`);
    };
    
    const handleDelete = (id: string) => {
        console.log('Delete workflow:', id);
    };
    
    const handleDuplicate = (id: string) => {
        console.log('Duplicate workflow:', id);
    };
    
    return (
        <EntityList
            items={workflows.items}
            renderItem={(workflow) => (
                <WorkflowItem
                    workflow={workflow}
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
    return (   
        <EntityPagination 
            disabled={false} 
            totalPages={workflows.pagination.totalPages}
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