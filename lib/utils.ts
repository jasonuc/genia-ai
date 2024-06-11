import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (process.env.NODE_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_APP_DEV_URL}${path}`
    } 
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}