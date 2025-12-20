"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
    message?: string;
}

export default function Loader({ message = "Loading..." }: LoaderProps) {
    return (
        <div className={cn(
        "fixed inset-0 flex flex-col items-center justify-center",
        "bg-background/90 backdrop-blur-sm z-[10000]"
        )}>
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground text-lg">{message}</p>
        </div>
    );
}
