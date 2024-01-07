"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export default function CrispChat() {
  
    useEffect(() => {
        Crisp.configure("703f998a-d02f-4723-876f-9ee7f0756b22")
    }, [])
    
    return null
    
}