"use client"

import { FolderOpen, History, Key, LogOut, CreditCard, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar, 
    SidebarContent,
    SidebarMenu,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscitption"

const menuItems = [
    {
        title: "Workflows",
        items: [
            {
                title: "Workflows",
                icon: FolderOpen,
                url: '/workflows'
            },
            {
                title: "Credentials",
                icon: Key,
                url: '/credentials'
            },
            {
                title: "Executions",
                icon: History,
                url: '/executions'
            }
        ]
    }
]

const footerItems = [
    {
        title: "Upgrade to Pro",
        icon: Sparkles,
        action: async () => {
            console.log("Checkout button clicked!");
            try {
                const result = await authClient.checkout({
                    slug: "Flowseidon-Pro"  
                });
                console.log("Checkout result:", result);
            } catch (error) {
                console.error("Checkout error:", error);
            }
        },
        className: "text-cyan-600 dark:text-cyan-400"
    },
    {
        title: "Billing Portal",
        icon: CreditCard,
        action: () => authClient.customer.portal()
    }
]

const AppSidebar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const {HasActiveSubscription, isLoading} = useHasActiveSubscription();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/login"),
            },
        })
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-4 relative">
                <Link href='/workflows' prefetch>
                    <div className="flex items-center gap-2 px-2">
                        <Image src="/logo.svg" alt="Flowseidon" width={24} height={24} />
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                            Flowseidon
                        </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                        <div 
                            className="absolute inset-0 animate-glow-slide"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, transparent 40%, cyan 50%, transparent 60%, transparent 100%)',
                                backgroundSize: '200% 100%'
                            }}
                        />
                    </div>
                    <style jsx>{`
                        @keyframes glow-slide {
                            0% {
                                background-position: 200% 0;
                            }
                            100% {
                                background-position: -200% 0;
                            }
                        }
                        .animate-glow-slide {
                            animation: glow-slide 5s linear infinite;
                        }
                    `}</style>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title} className="list-none">
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={pathname === item.url}
                                            asChild
                                            className={`gap-x-3 h-10 px-4 transition-colors
                                                text-neutral-600 dark:text-neutral-400
                                                hover:bg-neutral-100 dark:hover:bg-neutral-900
                                                hover:text-neutral-800 dark:hover:text-neutral-200
                                                data-[active=true]:bg-neutral-100 dark:data-[active=true]:bg-neutral-900
                                                data-[active=true]:text-neutral-800 dark:data-[active=true]:text-neutral-200
                                                border border-transparent
                                                data-[active=true]:border-neutral-300 dark:data-[active=true]:border-neutral-800
                                                data-[active=true]:shadow-[0_1px_2px_rgba(0,0,0,0.05)_inset,_0_-1px_2px_rgba(0,0,0,0.05)_inset]
                                                dark:data-[active=true]:shadow-[0_1px_2px_rgba(255,255,255,0.05)_inset,_0_-1px_2px_rgba(255,255,255,0.05)_inset]
                                            `}
                                        >
                                            <Link href={item.url} prefetch className="flex items-center gap-x-3">
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="p-4 space-y-2">
            {!HasActiveSubscription && !isLoading &&(
                <>
                {footerItems.map((item) => (
                    <button
                        key={item.title}
                        onClick={item.action}
                        className={`group relative w-full px-4 h-10 transition-all flex items-center gap-3 text-sm
                            text-neutral-600 dark:text-neutral-400
                            hover:text-neutral-800 dark:hover:text-neutral-200
                            rounded-md
                            ${item.className || ''}
                        `}
                    >
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                    </button>
                ))}
                </>
                )}
                
                <button
                    onClick={handleLogout}
                    className={`group relative w-full px-4 h-10 transition-all flex items-center gap-3 text-sm
                        text-neutral-600 dark:text-neutral-400
                        hover:text-rose-500 dark:hover:text-rose-400
                        rounded-md overflow-hidden
                    `}
                >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.03) 0%, rgba(244, 63, 94, 0.08) 50%, rgba(244, 63, 94, 0.03) 100%)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)'
                        }}
                    />
                    <LogOut className="size-4 relative z-10" />
                    <span className="relative z-10">Logout</span>
                    
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent animate-shimmer" />
                    </span>
                    
                    <style jsx>{`
                        @keyframes shimmer {
                            0% {
                                transform: translateX(-100%);
                            }
                            100% {
                                transform: translateX(100%);
                            }
                        }
                        .animate-shimmer {
                            animation: shimmer 2s ease-in-out infinite;
                        }
                    `}</style>
                </button>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar