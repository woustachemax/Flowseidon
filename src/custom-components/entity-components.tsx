import { ReactNode } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

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

interface EntityContainerProps {
    children: ReactNode;
    className?: string;
}

export const EntityContainer = ({
    children,
    className = ""
}: EntityContainerProps) => {
    return (
        <div className={`p-6 ${className} relative`}>
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
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};