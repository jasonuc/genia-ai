"use client"

import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const font = Montserrat({
    subsets: ["latin"],
    weight: ["600"],
})

export default function LandingNavbar() {

    const { isSignedIn } = useAuth()

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image src="/logo.png" alt="Logo" fill />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>Genia</h1>
            </Link>

            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                    <Button variant="outline" className="px-4 py-2 rounded-full">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}