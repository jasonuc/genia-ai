import { Code, ImageIcon, MessageSquare, MusicIcon, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export interface ToolInterface {
    label: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    href: string;
}

export const tools: ToolInterface[] = [
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500",
        bgColor: "bg-emerald-700/10"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-500",
        bgColor: "bg-pink-700/10"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-500",
        bgColor: "bg-orange-700/10"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-500",
        bgColor: "bg-green-700/10"
    }
]