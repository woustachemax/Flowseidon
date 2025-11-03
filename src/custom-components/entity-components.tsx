import { ReactNode } from "react";
import Link from "next/link";
import { Plus, Search, PackageOpen } from "lucide-react";
import { WorkflowIcon , Trash2, Copy, MoreVertical, Pencil} from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem,
    DropdownMenuContent, DropdownMenuSeparator, 
 } from "@/components/ui/dropdown-menu";
 import { Workflow } from "@prisma/client";
interface EntityHeaderProps {
    title: string;
    description?: string;
    newButtonLabel?: string;
    isCreating?: boolean;
    disabled?: boolean;
}

type EntityHeaderPropsWithAction = EntityHeaderProps & (
    | { onNew: () => void; newButtonHref?: never }
    | { newButtonHref: string; onNew?: never }
    | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
    title,
    description,
    newButtonLabel = "Create New",
    isCreating = false,
    disabled = false,
    onNew,
    newButtonHref,
}: EntityHeaderPropsWithAction) => {
    const showButton = onNew || newButtonHref;

    const renderButton = () => (
        <button
            onClick={onNew}
            disabled={disabled || isCreating}
            className="group relative px-4 h-10 transition-all flex items-center gap-2 text-sm
                text-neutral-600 dark:text-neutral-400
                hover:text-neutral-800 dark:hover:text-neutral-200
                rounded-md overflow-hidden
                disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, rgba(6, 182, 212, 0.08) 50%, rgba(6, 182, 212, 0.03) 100%)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                }}
            />
            <Plus className="size-4 relative z-10" />
            <span className="relative z-10">{isCreating ? "Creating..." : newButtonLabel}</span>
            
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                    style={{
                        animation: 'shimmer 2s ease-in-out infinite'
                    }}
                />
            </span>
        </button>
    );

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}} />
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            {description}
                        </p>
                    )}
                </div>
                
                {showButton && (
                    newButtonHref ? (
                        <Link href={newButtonHref}>
                            {renderButton()}
                        </Link>
                    ) : (
                        renderButton()
                    )
                )}
            </div>
        </>
    );
};

export const EntitySearch = ({
    value,
    onChange,
    placeholder = "Search...",
    className = ""
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}) => {
    return (
        <div className={`relative group ${className}`}>
            <div className="absolute inset-0 rounded-md pointer-events-none overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                    <div 
                        className="absolute inset-0 blur-sm" 
                        style={{ 
                            background: 'conic-gradient(from 0deg, transparent 0%, rgba(6,182,212,0.3) 10%, transparent 20%, transparent 100%)' 
                        }} 
                    />
                </div>
            </div>
            
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-600 pointer-events-none" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-10 pl-10 pr-4 text-sm
                        bg-white dark:bg-black
                        text-neutral-800 dark:text-neutral-200
                        placeholder:text-neutral-400 dark:placeholder:text-neutral-600
                        border border-neutral-300 dark:border-neutral-800
                        rounded-md
                        focus:outline-none
                        focus:border-cyan-500/50 dark:focus:border-cyan-500/50
                        shadow-[0_1px_2px_rgba(0,0,0,0.05)_inset,_0_-1px_2px_rgba(0,0,0,0.05)_inset]
                        dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)_inset,_0_-1px_2px_rgba(255,255,255,0.05)_inset]
                        transition-all duration-200"
                />
            </div>
        </div>
    );
};

export const EntityContainer = ({
    children,
    className = "",
    header,
    search,
    pagination
}: {
    children: ReactNode;
    className?: string;
    header?: ReactNode;
    search?: ReactNode;  
    pagination?: ReactNode;
}) => {
    return (
        <div className={`p-6 ${className} relative min-h-screen flex flex-col`}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div 
                    className="absolute top-0 right-0 w-96 h-96 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        background: 'radial-gradient(circle, cyan 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }}
                />
                <div 
                    className="absolute bottom-0 left-0 w-96 h-96 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        background: 'radial-gradient(circle, cyan 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }}
                />
            </div>
            <div className="relative z-10 flex-1 flex flex-col">
                {header && <div className="mb-6">{header}</div>}
                {search && <div className="mb-6">{search}</div>}
                <div className="flex-1">
                    {children}
                </div>
                {pagination && <div className="mt-auto pt-6">{pagination}</div>}
            </div>
        </div>
    );
};

export const EntityPagination = ({
    page,
    totalPages,
    onPageChange,
    disabled = false
}: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}) => {
    return (
        <div className="flex items-center justify-center gap-4">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={disabled || page <= 1}
                className="px-3 py-1 rounded-md
                    bg-neutral-200 dark:bg-neutral-800
                    text-neutral-600 dark:text-neutral-400
                    hover:bg-neutral-300 dark:hover:bg-neutral-700
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all"
            >
                Previous
            </button>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Page {page} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={disabled || page >= totalPages}
                className="px-3 py-1 rounded-md
                    bg-neutral-200 dark:bg-neutral-800
                    text-neutral-600 dark:text-neutral-400
                    hover:bg-neutral-300 dark:hover:bg-neutral-700
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all"
            >
                Next
            </button>
        </div>
    );
}

export const LoadingView = ({
    message,
    entity = "items" 
}: {
    message?: string;
    entity?: string;
}) => {
    return (
        <div className="w-full h-48 flex items-center justify-center">
            <p className="text-cyan-600 dark:text-cyan-400">
                {message || `Loading ${entity}...`}
            </p>
        </div>
    );
}

export const EmptyView = ({
    message = "No items found.",
    onNew
}: {
    message?: string;
    onNew?: () => void;
}) => {
    return (
        <div className="w-full h-48 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3 px-8 py-6 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700">
                <div className="relative">
                    <PackageOpen className="size-12 text-neutral-400 dark:text-neutral-600" />
                    <div 
                        className="absolute inset-0 blur-xl opacity-30"
                        style={{
                            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)'
                        }}
                    />
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center max-w-md">
                    {message}
                </p>
                {onNew && (
                    <button
                        onClick={onNew}
                        className="group relative px-4 h-10 transition-all flex items-center gap-2 text-sm
                            text-neutral-600 dark:text-neutral-400
                            hover:text-neutral-800 dark:hover:text-neutral-200
                            rounded-md overflow-hidden mt-2"
                    >
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, rgba(6, 182, 212, 0.08) 50%, rgba(6, 182, 212, 0.03) 100%)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)'
                            }}
                        />
                        <Plus className="size-4 relative z-10" />
                        <span className="relative z-10">Create New</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export const ErrorView = ({
    message = "An error occurred. Please try again."
}: {
    message?: string;
}) => {
    return (
        <div className="w-full h-48 flex items-center justify-center">
            <div className="px-4 py-2 rounded-md border border-rose-500 bg-rose-500/10 backdrop-blur-sm">
                <p className="text-sm text-black dark:text-white">
                    {message}
                </p>
            </div>
        </div>
    );
}

export function EntityList<T>({
    items,
    renderItem,
    keyExtractor,
    emptyMessage = "No items found.",
    onNew,
    className = ""
}: {
    items: T[];
    renderItem: (item: T) => ReactNode;
    keyExtractor: (item: T) => string;
    emptyMessage?: string;
    onNew?: () => void;
    className?: string;
}) {
    if (items.length === 0) {
        return <EmptyView message={emptyMessage} onNew={onNew} />;
    }

    return (
        <div className={`space-y-2 ${className}`}>
            {items.map((item) => (
                <div key={keyExtractor(item)}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}

interface WorkflowItemProps {
    data: Workflow;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
}

export const WorkflowItem = ({
    data,
    onEdit,
    onDelete,
    onDuplicate
}: WorkflowItemProps) => {
    return (
        <div 
            className="group relative p-4 rounded-md border border-neutral-300 dark:border-neutral-800 
                bg-neutral-50 dark:bg-neutral-900 
                hover:border-cyan-500/30 dark:hover:border-cyan-500/30
                transition-all duration-200"
        >
            <div className="flex items-center justify-between">
                <div 
                    onClick={() => onEdit?.(data.id)}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                >
                    <div className="p-2 rounded-md bg-neutral-200 dark:bg-neutral-800">
                        <WorkflowIcon className="size-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                            {data.name}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-1">
                            Updated {new Date(data.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button 
                            className="p-2 rounded-md opacity-0 group-hover:opacity-100
                                text-neutral-600 dark:text-neutral-400
                                hover:text-neutral-800 dark:hover:text-neutral-200
                                hover:bg-neutral-200 dark:hover:bg-neutral-800
                                transition-all duration-200"
                        >
                            <MoreVertical className="size-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(data.id)}>
                                <Pencil className="size-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                        )}
                        {onDuplicate && (
                            <DropdownMenuItem onClick={() => onDuplicate(data.id)}>
                                <Copy className="size-4 mr-2" />
                                Duplicate
                            </DropdownMenuItem>
                        )}
                        {onDelete && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                    onClick={() => onDelete(data.id)}
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