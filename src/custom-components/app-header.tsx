"use client"

import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"

const AppHeader = () => {
    return (
        <header className="lg:hidden sticky top-0 z-50 w-full border-b border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black">
            <div className="flex h-14 items-center px-4 gap-4">
                <SidebarTrigger className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
                    <Menu className="size-5" />
                </SidebarTrigger>
                
                <Link href="/workflows" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Flowseidon" width={20} height={20} />
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                        Flowseidon
                    </span>
                </Link>
            </div>
        </header>
    )
}

export default AppHeader