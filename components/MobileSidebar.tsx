"use client"

import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
    apiLimitCount: number;
}

export default function MobileSidebar({ apiLimitCount }: MobileSidebarProps) {

    const [ isMounted, setIsMounted ] = useState(false)
    
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button className="md:hidden" variant="ghost" size="icon">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none">
                <Sidebar apiLimitCount={apiLimitCount} />
            </SheetContent>
        </Sheet>
    )
}