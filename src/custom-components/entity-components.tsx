import { ReactNode } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

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

interface EntitySearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const EntitySearch = ({
    value,
    onChange,
    placeholder = "Search...",
    className = ""
}: EntitySearchProps) => {
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

interface EntityContainerProps {
    children: ReactNode;
    className?: string;
    header?: ReactNode;
    search?: ReactNode;  
    pagination?: ReactNode;
}

export const EntityContainer = ({
    children,
    className = "",
    header,
    search,
    pagination
}: EntityContainerProps) => {
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
interface EntityPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
};
export const EntityPagination = ({
    page,
    totalPages,
    onPageChange,
    disabled = false
}: EntityPaginationProps) => {
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