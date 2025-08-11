'use client'

import Image from "next/image";
import ModeToggle from "./ModeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Topbar() {
  return (
    <header className="fixed top-0 right-0 md:left-64 left-0 px-6 
    py-4 border-b bg-background flex items-center justify-between md:z-[999]">
        <h1 className="text-lg font-medium">Welcome to your dashboard</h1>
        <div className="flex items-center gap-4">
            <ModeToggle />

            {/* Profile Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer" >
                        <AvatarImage 
                        src="/images/avatar-png.png" 
                        alt="User" 
                        className="object-cover cursor-pointer"
                        />
                        <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="z-[1000]">
                <DropdownMenuItem onClick={() => console.log("Profile clicked")}>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Settings clicked")}>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Logout clicked")}>
                    Logout
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  );
}