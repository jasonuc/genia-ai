"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from 'next/font/google'
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import FreeCounter from "@/components/FreeCounter";

const montserrat = Montserrat({
    weight: '600',
    subsets: ['latin']
})

interface RouteInterface {
    label: string;
    icon: React.ElementType;
    href: string,
    color?: string
}

const routes: RouteInterface[] = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    }
]

interface SidebarProps {
    apiLimitCount: number;
    isPro?: boolean;
}

export default function Sidebar({ apiLimitCount=0, isPro=false }: SidebarProps) {

    const pathname = usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col items-start h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1 w-full">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    {/* <div className="relative w-8 h-8 mr-4">
                    <Image fill alt="Logo" src="/logo.png" />
                </div> */}
                    <Image alt="Logo" src="/logo.png" height={32} width={32} className="mr-4" />
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>Genia</h1>
                </Link>

                <div className="space-y-5">
                    {routes.map(route => (
                        <Link href={route.href} key={route.href} className={cn("text-sm group w-full flex p-3 justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter isPro apiLimitCount={apiLimitCount} />
        </div>
    )
}